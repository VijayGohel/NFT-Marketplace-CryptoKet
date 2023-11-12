// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract NFTMarketplace is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

    uint256 listingPrice = 0.025 ether;
    address payable owner;
    mapping(uint256 => MarketItem) private idToMarketItem;

    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold; 
    }

    event MarketItemCreated (
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    constructor() ERC721("Metaverse Tokens", "METT") {
        owner = payable(msg.sender);
    }

    function updateListingPrice(uint _listingPrice) public payable {
        require(owner == msg.sender, "Only marketplace onwer can update the listing price");

        listingPrice = _listingPrice;
    }

    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    function createToken(string memory tokenURI, uint256 price) public payable returns (uint) {
        _tokenIds.increment();

        uint256 newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        createMarketItem(newTokenId, price);

        return newTokenId;
    }

    function createMarketItem(uint256 tokenId, uint256 price) private {
        require(price  > 0, "Price must be greater than 0.");
        require(msg.value == listingPrice, "Price must be equal to listing price.");

        idToMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            price,
            false
        );
        
        _transfer(msg.sender, address(this), tokenId);

        emit MarketItemCreated(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            price,
            false
        );
    }

    function resellToken(uint256 tokenId, uint256 price) public payable {
        require(idToMarketItem[tokenId].owner == msg.sender, "Only item owner can perform this operation.");
        require(msg.value == listingPrice, "Price must be equal to listing price.");

        idToMarketItem[tokenId].price = price;
        idToMarketItem[tokenId].owner = payable(address(this));
        idToMarketItem[tokenId].seller = payable(msg.sender);
        idToMarketItem[tokenId].sold = false;

        _itemsSold.decrement();

        _transfer(msg.sender, address(this), tokenId);
    }

    function createMarketSale(uint256 tokenId) public payable {
        uint price = idToMarketItem[tokenId].price;

        require(msg.value == price, "Please submit the asking price in order to complete the purchase.");

        idToMarketItem[tokenId].owner = payable(msg.sender);
        idToMarketItem[tokenId].seller = payable(address(0));
        idToMarketItem[tokenId].sold = true;

        _itemsSold.increment();
        
        _transfer(address(this), msg.sender, tokenId);

        payable(owner).transfer(listingPrice);
        payable(idToMarketItem[tokenId].seller).transfer(msg.value);
    }

    function fetchMarketItems() public view returns(MarketItem[] memory) {
        uint256 unsoldItems = _tokenIds.current() - _itemsSold.current();
        MarketItem[] memory items = new MarketItem[](unsoldItems);
        uint256 curIndex = 0;
        for(uint i=0;i<unsoldItems;i++) {
            if(idToMarketItem[i+1].owner == address(this)) {
                items[curIndex] = idToMarketItem[i+1];
                curIndex+=1;
            }
        }

        return items;
    }

    function fetchMyNFTs() public view returns(MarketItem[] memory) {
        uint256 itemsCount = 0;
        uint256 curIndex = 0;

        for(uint i=0;i<_tokenIds.current();i++) {
            if(idToMarketItem[i+1].owner == msg.sender){
                itemsCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemsCount);
        for(uint i=0;i<itemsCount;i++) {
            if(idToMarketItem[i+1].owner == msg.sender) {
                items[curIndex] = idToMarketItem[i+1];
                curIndex+=1;
            }
        }

        return items;
    }

    function fetchItemsListed() public view returns(MarketItem[] memory) {
        uint256 itemsCount = 0;
        uint256 curIndex = 0;

        for(uint i=0;i<_tokenIds.current();i++) {
            if(idToMarketItem[i+1].seller == msg.sender){
                itemsCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemsCount);
        for(uint i=0;i<itemsCount;i++) {
            if(idToMarketItem[i+1].seller == msg.sender) {
                items[curIndex] = idToMarketItem[i+1];
                curIndex+=1;
            }
        }

        return items;
    }
}