pragma solidity >=0.8.0;

import "@openzeppelin/contracts@4.0/token/ERC20/IERC20.sol";
import "./MyERC20_v8.sol";

contract BatchTokenNewVersion is MyERC20_v8 {

    constructor () MyERC20_v8("Batch Token", "BT") {
        _mint(msg.sender, 100 * 10 ** uint(decimals()));
    }

    function batchTransfer(address[] memory recipients, uint256[] memory amounts) public {
        require(recipients.length == amounts.length);
        uint totalAmount = 0;
        for (uint i = 0; i < recipients.length; i += 1) {
            totalAmount += amounts[i];
        }

        require(totalAmount < balanceOf(msg.sender));

        for (uint i = 0; i < recipients.length; i += 1) {
            _balances[msg.sender] = _balances[msg.sender] - amounts[i];
            _balances[recipients[i]] = _balances[recipients[i]] + amounts[i];
        }
    }

}