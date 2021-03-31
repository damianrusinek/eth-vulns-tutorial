pragma solidity ^0.7.0;

// Remix
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/solc-0.7/contracts/proxy/Proxy.sol";

// Hardhat
// import "@openzeppelin/contracts/proxy/Proxy.sol";


contract MyProxyWallet is Proxy {

    address private _impl;

    constructor(address impl) {
        _impl = impl;
    } 

    function _implementation() internal view override returns (address) {
        return _impl;
    } 
}