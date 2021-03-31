# Typical vulnes in Ethereum smart contracts

Exercises prepared on the base of Top 10 vulnerabilities from https://dasp.co/ and partially on code examples from https://solidity-by-example.org/.

# Exercises

## Access control

* Exercise 1: Publicly visible function.
* Exercise 2: Non-internal internal function.
* Exercise 3: Initializable proxy implementation (transparent proxy pattern: https://blog.openzeppelin.com/the-transparent-proxy-pattern/).
* Exercise 3: DoS via re-initializable proxy and selfdestruct.

## Arithmetic

Examples:
* overflows
* batch overflow

## Unchecked Return Values For Low Level Calls

## Reentrancy (untrusted external call)

Examples:
* typical reentrancy
* reentrancy as a unintended feature 

## Denial of service

## Bad randomness

## Front running

## Time Manipulation


## Short Addresses

This category is out of scope as it is a security bug in the integration with smart contracts.

See it here: https://www.youtube.com/watch?v=EKU8T58kYCw&t=1760s

## Unknown Unknowns

This category is out of scope as we do not know it yet ;)