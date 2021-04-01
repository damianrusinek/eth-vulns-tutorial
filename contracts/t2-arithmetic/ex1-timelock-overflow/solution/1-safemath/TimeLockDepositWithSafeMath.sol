// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.8.0;

import "@openzeppelin/contracts@3.3/math/SafeMath.sol";

contract TimeLockDepositWithSafeMath {

    using SafeMath for uint;

    mapping(address => uint) public balances;
    mapping(address => uint) public lockTime;

    function deposit() external payable {
        // Save deposited balance
        balances[msg.sender] += msg.value;
        // Set timelock for withdrawal
        lockTime[msg.sender] = block.timestamp + 1 weeks;
    }

    // Function used to extend the timelock
    function increaseLockTime(uint _secondsToIncrease) public {
        lockTime[msg.sender].add(_secondsToIncrease);
    }

    function withdraw() public {
        // Check whether user has deposited some Ether
        require(balances[msg.sender] > 0, "Insufficient funds");

        // Check whether timelock has expired
        require(block.timestamp > lockTime[msg.sender], "Lock time not expired");

        // Update balance
        uint amount = balances[msg.sender];
        balances[msg.sender] = 0;

        // Send Ether 
        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }
}