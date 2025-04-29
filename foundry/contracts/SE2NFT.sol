// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

error PriceMustBeAboveZero();
error NotTokenOwner();
error AlreadyListed(uint256 tokenId);
error NotListed(uint256 tokenId);
error PriceNotMet(address buyer, uint256 price);
error NoProceeds();
error TransferFailed();

contract VynixMarket is ERC721URIStorage, Ownable, ReentrancyGuard {
    // Token ID tracker
    uint256 private _nextTokenId;

    // Listing data
    struct Listing {
        address seller;
        uint256 price;
    }
    // tokenId => Listing
    mapping(uint256 => Listing) private s_listings;

    // seller address => accumulated proceeds
    mapping(address => uint256) private s_proceeds;


    // Events
    event CardCreated(uint256 indexed tokenId, address indexed owner, string uri);
    event CardListed(uint256 indexed tokenId, uint256 price, address indexed seller);
    event ListingCanceled(uint256 indexed tokenId, address indexed seller);
    event CardBought(uint256 indexed tokenId, uint256 price, address indexed buyer);
    event ProceedsWithdrawn(address indexed seller, uint256 amount);

    constructor() ERC721("VynixCard", "VYNX") Ownable(msg.sender) {}

    /// @notice Mint a new card to `to` with the given `uri`.
    function createCard(address to, string calldata uri)
        external
        onlyOwner
        returns (uint256)
    {
        uint256 tokenId = _nextTokenId++;
        _mint(to, tokenId);
        _setTokenURI(tokenId, uri);
        emit CardCreated(tokenId, to, uri);
        return tokenId;
    }

    /// @notice Mint a new card to yourself and immediately list it.
    function createAndListCard(string calldata uri, uint256 price)
        external
        returns (uint256)
    {
        if (price == 0) revert PriceMustBeAboveZero();

        // 1) Mint
        uint256 tokenId = _nextTokenId++;
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
        emit CardCreated(tokenId, msg.sender, uri);

        // 2) Escrow (internal transfer) + list
        _listForSale(tokenId, price);
        return tokenId;
    }

    /// @notice List an existing card you own at `price` (escrows the NFT).
    function listCard(uint256 tokenId, uint256 price) external {
        if (price == 0) revert PriceMustBeAboveZero();
        if (ownerOf(tokenId) != msg.sender) revert NotTokenOwner();
        if (s_listings[tokenId].price != 0) revert AlreadyListed(tokenId);

        _listForSale(tokenId, price);
    }

    /// @dev internal helper to escrow + record listing
    function _listForSale(uint256 tokenId, uint256 price) private {
        // transfer from seller → this contract
        _transfer(msg.sender, address(this), tokenId);

        s_listings[tokenId] = Listing({
            seller: msg.sender,
            price: price
        });

        emit CardListed(tokenId, price, msg.sender);
    }

    /// @notice Cancel your listing and get your NFT back.
    function cancelListing(uint256 tokenId) external nonReentrant {
        Listing memory listed = s_listings[tokenId];
        if (listed.price == 0) revert NotListed(tokenId);
        if (listed.seller != msg.sender) revert NotTokenOwner();

        // remove listing
        delete s_listings[tokenId];

        // return NFT
        _transfer(address(this), msg.sender, tokenId);
        emit ListingCanceled(tokenId, msg.sender);
    }

    /// @notice Buy a listed card by sending exactly its price in ETH.
    function buyCard(uint256 tokenId)
        external
        payable
        nonReentrant
    {
        Listing memory listed = s_listings[tokenId];
        if (listed.price == 0) revert NotListed(tokenId);
        if (msg.value < listed.price) revert PriceNotMet(msg.sender, listed.price);

        // record proceeds for seller
        s_proceeds[listed.seller] += msg.value;

        // remove listing
        delete s_listings[tokenId];

        // transfer NFT to buyer
        _transfer(address(this), msg.sender, tokenId);

        emit CardBought(tokenId, listed.price, msg.sender);
    }

    /// @notice Withdraw all your accumulated sale proceeds.
    function withdrawProceeds() external nonReentrant {
        uint256 amount = s_proceeds[msg.sender];
        if (amount == 0) revert NoProceeds();

        // zero out before transfer (checks-effects-interactions)
        s_proceeds[msg.sender] = 0;

        (bool success, ) = payable(msg.sender).call{value: amount}("");
        if (!success) revert TransferFailed();

        emit ProceedsWithdrawn(msg.sender, amount);
    }

    /* ========== VIEW FUNCTIONS ========== */

    /// @notice Get the listing for a given tokenId.
    function getListing(uint256 tokenId)
        external
        view
        returns (Listing memory)
    {
        return s_listings[tokenId];
    }

    /// @notice Get how much ETH you have to withdraw.
    function getProceeds(address seller)
        external
        view
        returns (uint256)
    {
        return s_proceeds[seller];
    }

    
    /// @notice A summary of a token’s on‐chain state for the frontend
    struct CardDetails {
        uint256 tokenId;
        address owner;
        string tokenURI;
        uint256 listingPrice;
        address seller;
    }

    /// @notice Get all cards that are actively listed (price > 0).
    function getListedCards() external view returns (CardDetails[] memory) {
        uint256 total = _nextTokenId;
        uint256 listedCount = 0;

        // 1) count how many are listed
        for (uint256 i = 0; i < total; i++) {
            if (s_listings[i].price > 0) {
                listedCount++;
            }
        }

        // 2) build an array of just the listed ones
        CardDetails[] memory cards = new CardDetails[](listedCount);
        uint256 idx = 0;

        for (uint256 i = 0; i < total; i++) {
            Listing memory l = s_listings[i];
            if (l.price == 0) {
                continue; // not listed
            }
            cards[idx] = CardDetails({
                tokenId:      i,
                owner:        ownerOf(i),      // will be address(this) if escrow-style
                tokenURI:     tokenURI(i),
                listingPrice: l.price,
                seller:       l.seller
            });
            idx++;
        }

        return cards;
    }


}
