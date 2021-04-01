pragma solidity >=0.7.0 <0.8.0;

import "@openzeppelin/contracts@3.3/proxy/Proxy.sol";


contract MyProxyWallet is Proxy {

    address private _impl;

    constructor(address impl) {
        _impl = impl;
    } 

    function _implementation() internal view override returns (address) {
        return _impl;
    } 
}