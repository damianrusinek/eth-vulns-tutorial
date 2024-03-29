
pragma solidity >=0.7.0 <0.8.0;

import "@openzeppelin/contracts@3.3/token/ERC20/IERC20.sol";

contract MyProxyWalletImplementation {

    bytes32 private reserved;

    address private _owner;
    IERC20 private _token;
   
    function initialize(address token) external {
        _token = IERC20(token);
        _owner = msg.sender;
    }

    function transfer(address recipient, uint256 amount) external {
        require(msg.sender == _owner, "Only owner can transfer");
        _token.transfer(recipient, amount);
    } 

}