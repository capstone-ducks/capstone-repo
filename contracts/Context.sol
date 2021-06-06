// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.8.0;

/*
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
// *********** Logging error:
// ParserError: Expected pragma, import directive or contract/interface/library definition >>> abstract contract. Syntax is for an older solidity version OR we need to

// removed abstract before contract
contract Context {
    // removed virtual between view and returns

    function _msgSender() internal view  returns (address) {
        return msg.sender;
    }
    // removed virtual between view and returns and added memory
    function _msgData() internal view  returns (bytes calldata) {
        this; // silence state mutability warning without generating bytecode - see https://github.com/ethereum/solidity/issues/2691
        return msg.data;
    }
}
