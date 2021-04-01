pragma solidity >=0.7.0 <0.8.0;

import "@openzeppelin/contracts@3.3/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts@3.3/token/ERC20/ERC20.sol";

contract ERC20_Visibility is ERC20 {

    constructor (string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, 100 * 10 ** uint(decimals()));
    }

    function withdrawOther(address token) public {
        uint256 balance = IERC20(token).balanceOf(address(this));
        IERC20(token).transfer(msg.sender, balance);
    }

}