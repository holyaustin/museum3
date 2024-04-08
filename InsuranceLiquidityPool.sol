// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract InsuranceLiquidityPool is ERC20 {
    address public owner;

    constructor() ERC20("DataCoverToken", "DCT") {
        owner = msg.sender;
    }

    event DepositReceived(address depositor, uint256 amount);
    
    function depositTo(address recipient) public payable {
        require(msg.value > 0, "Deposit amount must be greater than 0");
        _mint(recipient, msg.value);  // Mint DCT tokens to the specified recipient
        emit DepositReceived(recipient, msg.value);
    }

   
    
    function withdraw(uint256 amount, address tokenHolder, address payable recipient) public {
    require(balanceOf(tokenHolder) >= amount, "Insufficient balance");
    _burn(tokenHolder, amount);  // Burn DCT tokens from the specified token holder

    recipient.transfer(amount);  // Transfer FIL to the specified recipient
}

   
}
