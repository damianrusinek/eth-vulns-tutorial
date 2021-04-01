pragma solidity >=0.7.0 <0.8.0;

import "@openzeppelin/contracts@3.3/math/SafeMath.sol";
import "@openzeppelin/contracts@3.3/token/ERC20/IERC20.sol";
import "../../MyERC20.sol";

contract BatchTokenWithSafeMath is MyERC20 {
    
    using SafeMath for uint256;

    constructor () MyERC20("Batch Token", "BT") {
        _mint(msg.sender, 100 * 10 ** uint(decimals()));
    }

    function batchTransfer(address[] memory recipients, uint256[] memory amounts) public {
        require(recipients.length == amounts.length);
        uint totalAmount = 0;
        for (uint i = 0; i < recipients.length; i += 1) {
            totalAmount = totalAmount.add(amounts[i]);
        }

        require(totalAmount < balanceOf(msg.sender));

        for (uint i = 0; i < recipients.length; i += 1) {
            _balances[msg.sender] = _balances[msg.sender].sub(amounts[i]);
            _balances[recipients[i]] = _balances[recipients[i]].add(amounts[i]);
        }
    }

}
