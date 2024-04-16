// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";

contract Minter is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter public _tokenIds;
 
    uint256 listingPrice = 0.0002 ether;
    address payable owner;

    constructor() ERC721("Badagry Minter", "BADGY") {
        owner = payable(msg.sender);
    }

        event ReceivedEth(uint256 amount);

    receive() external payable  { 
        emit ReceivedEth(msg.value);
    }

    fallback() external payable {
        emit ReceivedEth(msg.value);
    }
       /* Updates the listing price of the contract */
    function updateListingPrice(uint _listingPrice) public payable {
      require(owner == msg.sender, "Only marketplace owner can update listing price.");
      listingPrice = _listingPrice;
    }

        /* Returns the listing price of the contract */
    function getListingPrice() public view returns (uint256) {
      return listingPrice;
    }

     /* Mints a File*/
    function createFile(string memory tokenURI ) public payable returns (uint) {
        require(msg.value == listingPrice, "Price must be equal to listing price");

      _tokenIds.increment();
      uint256 newTokenId = _tokenIds.current();

      payable(address(this)).transfer(listingPrice);
      _mint(msg.sender, newTokenId);
      _setTokenURI(newTokenId, tokenURI);
      return newTokenId;
    }

    
    function withdraw(uint value) external {
        require(msg.sender == owner, "Address is not the owner");
        require(value <= address(this).balance, "Value higher than balance.");

        (bool success, ) = owner.call{value: value}("");
        require(success, "There was an error!");
    }

}