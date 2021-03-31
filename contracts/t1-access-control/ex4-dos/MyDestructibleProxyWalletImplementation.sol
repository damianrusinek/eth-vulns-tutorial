
pragma solidity ^0.7.0;

// Remix
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/solc-0.7/contracts/token/ERC20/IERC20.sol";

// Hardhat
// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MyDestructibleProxyWalletImplementation {

    bytes32 private reserved;

    bool internal _initialized;
    address private _owner;
    IERC20 private _token;
   
    function initialize(address token) external {
        require(!_initialized);
        _token = IERC20(token);
        _owner = msg.sender;
        _initialized = true;
    }

    function transfer(address recipient, uint256 amount) external {
        require(msg.sender == _owner, "Only owner can transfer");
        _token.transfer(recipient, amount);
    } 

    function destroy(address payable receiver) external {
        require(msg.sender == _owner, "Only owner can destroy");
        _token.transfer(receiver, _token.balanceOf(address(this)));
        selfdestruct(receiver);
    }

}