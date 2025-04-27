// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title VynixCard - The NFT contract for Vynix trading cards
 */
contract VynixCard is ERC721URIStorage, Ownable {
    // ID tracker for new tokens
    uint256 private _nextTokenId;
    
    // Events
    event CardCreated(uint256 indexed tokenId, address owner, string tokenURI);
    
    constructor(address initialOwner) ERC721("VynixCard", "VYNX") Ownable(initialOwner) {}
    
    // Function to mint a new trading card
    function createCard(
        address player,
        string memory tokenURI
    ) public returns (uint256) {
        uint256 newCardId = _nextTokenId++;
        
        _mint(player, newCardId);
        _setTokenURI(newCardId, tokenURI);
        
        emit CardCreated(newCardId, player, tokenURI);
        
        return newCardId;
    }
    
    // Batch create cards
    function batchCreateCards(
        address[] memory players,
        string[] memory tokenURIs
    ) public returns (uint256[] memory) {
        require(
            players.length == tokenURIs.length,
            "Input arrays must have the same length"
        );
        
        uint256[] memory newCardIds = new uint256[](players.length);
        
        for (uint256 i = 0; i < players.length; i++) {
            newCardIds[i] = createCard(
                players[i],
                tokenURIs[i]
            );
        }
        
        return newCardIds;
    }
}
