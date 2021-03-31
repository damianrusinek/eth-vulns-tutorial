pragma solidity ^0.7.0;

// Remix
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/solc-0.7/contracts/token/ERC20/IERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/solc-0.7/contracts/token/ERC20/ERC20.sol";

// Hardhat
// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DummyToken is ERC20 {

    constructor () ERC20("Dummy Token", "DMT") {
        _mint(msg.sender, 100 * 10 ** uint(decimals()));
    }

}