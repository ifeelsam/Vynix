// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

import { VynixCard } from "./contract.sol";


/**
 * @title VynixMarketplace - Marketplace for buying, selling and auctioning Vynix cards
 */
contract VynixMarketplace is ReentrancyGuard, Ownable {
    // ID trackers
    uint256 private _nextListingId = 1;
    uint256 private _nextAuctionId = 1;
    uint256 private _nextOfferId = 1;
    
    // Fee settings
    uint256 public marketplaceFeePercentage = 250; // 2.5% (in basis points)
    
    // Emergency stop
    bool public paused = false;
    
    // Reference to the trading card contract
    VynixCard public vynixCardContract;
    
    // Market structs
    struct Listing {
        uint256 tokenId;
        address payable seller;
        uint256 price;
        bool active;
    }
    
    struct Auction {
        uint256 tokenId;
        address payable seller;
        uint256 startingPrice;
        uint256 currentBid;
        address payable highestBidder;
        uint256 endTime;
        bool active;
    }
    
    struct Offer {
        uint256 tokenId;
        address payable buyer;
        uint256 amount;
        uint256 expiration;
        bool active;
    }
    
    // Market mappings
    mapping(uint256 => Listing) public listings;
    mapping(uint256 => Auction) public auctions;
    mapping(uint256 => Offer) public offers;
    
    // Market stats
    uint256 public totalVolume;
    uint256 public totalSales;
    
    // Events
    event CardListed(uint256 indexed listingId, uint256 indexed tokenId, address seller, uint256 price);
    event CardSold(uint256 indexed listingId, uint256 indexed tokenId, address seller, address buyer, uint256 price);
    event ListingCancelled(uint256 indexed listingId, uint256 indexed tokenId, address seller);
    event AuctionCreated(uint256 indexed auctionId, uint256 indexed tokenId, address seller, uint256 startingPrice, uint256 endTime);
    event BidPlaced(uint256 indexed auctionId, uint256 indexed tokenId, address bidder, uint256 bid);
    event AuctionEnded(uint256 indexed auctionId, uint256 indexed tokenId, address winner, uint256 amount);
    event OfferCreated(uint256 indexed offerId, uint256 indexed tokenId, address buyer, uint256 amount, uint256 expiration);
    event OfferAccepted(uint256 indexed offerId, uint256 indexed tokenId, address seller, address buyer, uint256 amount);
    event OfferCancelled(uint256 indexed offerId, uint256 indexed tokenId, address buyer);
    
    // Modifiers
    modifier notPaused() {
        require(!paused, "Marketplace is paused");
        _;
    }
    
    constructor(address _vynixCardAddress, address initialOwner) Ownable(initialOwner) {
        vynixCardContract = VynixCard(_vynixCardAddress);
    }
    
    // =============== Admin functions ===============
    
    function pause() external onlyOwner {
        paused = true;
    }
    
    function unpause() external onlyOwner {
        paused = false;
    }
    
    function setMarketplaceFee(uint256 _feePercentage) external onlyOwner {
        require(_feePercentage <= 1000, "Fee cannot exceed 10%");
        marketplaceFeePercentage = _feePercentage;
    }
    
    function withdrawFunds() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Withdrawal failed");
    }
    
    // =============== Listing functions ===============
    
    function listCard(uint256 tokenId, uint256 price) external notPaused nonReentrant {
        require(price > 0, "Price must be greater than 0");
        require(vynixCardContract.ownerOf(tokenId) == msg.sender, "Not the card owner");
        require(
            vynixCardContract.getApproved(tokenId) == address(this) || 
            vynixCardContract.isApprovedForAll(msg.sender, address(this)),
            "Marketplace not approved to transfer card"
        );
        
        uint256 listingId = _nextListingId++;
        
        listings[listingId] = Listing(
            tokenId,
            payable(msg.sender),
            price,
            true
        );
        
        emit CardListed(listingId, tokenId, msg.sender, price);
    }
    
    function buyCard(uint256 listingId) external payable notPaused nonReentrant {
        Listing storage listing = listings[listingId];
        require(listing.active, "Listing is not active");
        require(msg.value == listing.price, "Incorrect payment amount");
        
        address cardOwner = vynixCardContract.ownerOf(listing.tokenId);
        require(cardOwner == listing.seller, "Seller no longer owns this card");
        
        listing.active = false;
        
        // Calculate marketplace fee
        uint256 fee = (msg.value * marketplaceFeePercentage) / 10000;
        uint256 sellerProceeds = msg.value - fee;
        
        // Transfer the card
        vynixCardContract.safeTransferFrom(listing.seller, msg.sender, listing.tokenId);
        
        // Transfer payment to seller
        (bool success, ) = listing.seller.call{value: sellerProceeds}("");
        require(success, "Failed to send payment to seller");
        
        // Update stats
        totalVolume += msg.value;
        totalSales++;
        
        emit CardSold(listingId, listing.tokenId, listing.seller, msg.sender, msg.value);
    }
    
    function cancelListing(uint256 listingId) external nonReentrant {
        Listing storage listing = listings[listingId];
        require(listing.active, "Listing is not active");
        require(listing.seller == msg.sender || owner() == msg.sender, "Not authorized to cancel");
        
        listing.active = false;
        
        emit ListingCancelled(listingId, listing.tokenId, listing.seller);
    }
    
    // =============== Auction functions ===============
    
    function createAuction(uint256 tokenId, uint256 startingPrice, uint256 duration) external notPaused nonReentrant {
        require(startingPrice > 0, "Starting price must be greater than 0");
        require(duration >= 1 hours, "Duration too short");
        require(vynixCardContract.ownerOf(tokenId) == msg.sender, "Not the card owner");
        require(
            vynixCardContract.getApproved(tokenId) == address(this) || 
            vynixCardContract.isApprovedForAll(msg.sender, address(this)),
            "Marketplace not approved to transfer card"
        );
        
        uint256 auctionId = _nextAuctionId++;
        
        auctions[auctionId] = Auction(
            tokenId,
            payable(msg.sender),
            startingPrice,
            0,
            payable(address(0)),
            block.timestamp + duration,
            true
        );
        
        emit AuctionCreated(auctionId, tokenId, msg.sender, startingPrice, block.timestamp + duration);
    }
    
    function placeBid(uint256 auctionId) external payable notPaused nonReentrant {
        Auction storage auction = auctions[auctionId];
        require(auction.active, "Auction is not active");
        require(block.timestamp < auction.endTime, "Auction has ended");
        require(msg.sender != auction.seller, "Cannot bid on your own auction");
        
        // Check if seller still owns the card
        require(vynixCardContract.ownerOf(auction.tokenId) == auction.seller, "Seller no longer owns this card");
        
        // Check if bid is high enough
        if (auction.currentBid == 0) {
            require(msg.value >= auction.startingPrice, "Bid must be at least the starting price");
        } else {
            require(msg.value > auction.currentBid, "Bid must be higher than current bid");
            
            // Refund the previous highest bidder
            address payable previousBidder = auction.highestBidder;
            uint256 previousBid = auction.currentBid;
            
            (bool success, ) = previousBidder.call{value: previousBid}("");
            require(success, "Failed to refund previous bidder");
        }
        
        // Update auction state
        auction.currentBid = msg.value;
        auction.highestBidder = payable(msg.sender);
        
        emit BidPlaced(auctionId, auction.tokenId, msg.sender, msg.value);
    }
    
    function endAuction(uint256 auctionId) external nonReentrant {
        Auction storage auction = auctions[auctionId];
        require(auction.active, "Auction is not active");
        require(
            block.timestamp >= auction.endTime || 
            msg.sender == owner(),
            "Auction not yet ended or not admin"
        );
        
        auction.active = false;
        
        // If there were no bids, just end the auction
        if (auction.highestBidder == address(0)) {
            emit AuctionEnded(auctionId, auction.tokenId, address(0), 0);
            return;
        }
        
        // Calculate marketplace fee
        uint256 fee = (auction.currentBid * marketplaceFeePercentage) / 10000;
        uint256 sellerProceeds = auction.currentBid - fee;
        
        // Transfer the card to the highest bidder
        vynixCardContract.safeTransferFrom(auction.seller, auction.highestBidder, auction.tokenId);
        
        // Transfer payment to seller
        (bool success, ) = auction.seller.call{value: sellerProceeds}("");
        require(success, "Failed to send payment to seller");
        
        // Update stats
        totalVolume += auction.currentBid;
        totalSales++;
        
        emit AuctionEnded(auctionId, auction.tokenId, auction.highestBidder, auction.currentBid);
    }
    
    // =============== Offer functions ===============
    
    function makeOffer(uint256 tokenId, uint256 duration) external payable notPaused nonReentrant {
        require(msg.value > 0, "Offer amount must be greater than 0");
        require(duration >= 1 hours, "Duration too short");
        
        address cardOwner = vynixCardContract.ownerOf(tokenId);
        require(cardOwner != msg.sender, "Cannot make offer on your own card");
        
        uint256 offerId = _nextOfferId++;
        
        offers[offerId] = Offer(
            tokenId,
            payable(msg.sender),
            msg.value,
            block.timestamp + duration,
            true
        );
        
        emit OfferCreated(offerId, tokenId, msg.sender, msg.value, block.timestamp + duration);
    }
    
    function acceptOffer(uint256 offerId) external notPaused nonReentrant {
        Offer storage offer = offers[offerId];
        require(offer.active, "Offer is not active");
        require(block.timestamp < offer.expiration, "Offer has expired");
        
        address cardOwner = vynixCardContract.ownerOf(offer.tokenId);
        require(cardOwner == msg.sender, "Not the card owner");
        
        offer.active = false;
        
        // Calculate marketplace fee
        uint256 fee = (offer.amount * marketplaceFeePercentage) / 10000;
        uint256 sellerProceeds = offer.amount - fee;
        
        // Ensure approval
        require(
            vynixCardContract.getApproved(offer.tokenId) == address(this) || 
            vynixCardContract.isApprovedForAll(msg.sender, address(this)),
            "Marketplace not approved to transfer card"
        );
        
        // Transfer the card
        vynixCardContract.safeTransferFrom(msg.sender, offer.buyer, offer.tokenId);
        
        // Transfer payment to seller
        (bool success, ) = payable(msg.sender).call{value: sellerProceeds}("");
        require(success, "Failed to send payment to seller");
        
        // Update stats
        totalVolume += offer.amount;
        totalSales++;
        
        emit OfferAccepted(offerId, offer.tokenId, msg.sender, offer.buyer, offer.amount);
    }
    
    function cancelOffer(uint256 offerId) external nonReentrant {
        Offer storage offer = offers[offerId];
        require(offer.active, "Offer is not active");
        require(offer.buyer == msg.sender, "Not the offer creator");
        
        offer.active = false;
        
        // Refund the buyer
        (bool success, ) = offer.buyer.call{value: offer.amount}("");
        require(success, "Failed to refund buyer");
        
        emit OfferCancelled(offerId, offer.tokenId, offer.buyer);
    }
    
    // =============== View functions ===============
    
    function getActiveListings(uint256 startIndex, uint256 count) external view returns (uint256[] memory) {
        uint256 totalListings = _nextListingId - 1;
        uint256[] memory activeListingIds = new uint256[](count);
        
        uint256 currentIndex = 0;
        uint256 resultIndex = 0;
        
        for (uint256 i = 1; i <= totalListings && resultIndex < count; i++) {
            if (listings[i].active) {
                if (currentIndex >= startIndex) {
                    activeListingIds[resultIndex] = i;
                    resultIndex++;
                }
                currentIndex++;
            }
        }
        
        // Resize the array if we didn't fill it completely
        assembly {
            mstore(activeListingIds, resultIndex)
        }
        
        return activeListingIds;
    }
    
    function getActiveAuctions(uint256 startIndex, uint256 count) external view returns (uint256[] memory) {
        uint256 totalAuctions = _nextAuctionId - 1;
        uint256[] memory activeAuctionIds = new uint256[](count);
        
        uint256 currentIndex = 0;
        uint256 resultIndex = 0;
        
        for (uint256 i = 1; i <= totalAuctions && resultIndex < count; i++) {
            if (auctions[i].active && block.timestamp < auctions[i].endTime) {
                if (currentIndex >= startIndex) {
                    activeAuctionIds[resultIndex] = i;
                    resultIndex++;
                }
                currentIndex++;
            }
        }
        
        // Resize the array if we didn't fill it completely
        assembly {
            mstore(activeAuctionIds, resultIndex)
        }
        
        return activeAuctionIds;
    }
    
    function getStats() external view returns (uint256, uint256) {
        return (totalVolume, totalSales);
    }
}
