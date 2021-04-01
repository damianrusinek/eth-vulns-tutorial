pragma solidity >=0.7.0 <0.8.0;

import "@openzeppelin/contracts@3.3/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts@3.3/token/ERC20/ERC20.sol";

contract DummyToken is ERC20 {

    constructor () ERC20("Dummy Token", "DMT") {
        _mint(msg.sender, 100 * 10 ** uint(decimals()));
    }

}