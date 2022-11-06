// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@thirdweb-dev/contracts/base/ERC721LazyMint.sol";

contract ZKSyncPayableNFT is ERC721LazyMint {

    uint256 price = 0.001 ether;

    constructor(
        string memory _name,
        string memory _symbol,
        address _royaltyRecipient,
        uint128 _royaltyBps
    )
        ERC721LazyMint(
            _name,
            _symbol,
            _royaltyRecipient,
            _royaltyBps
        )
    {}

    function _transferTokensOnClaim(address _receiver, uint256 _quantity) internal override returns (uint256 startTokenId) {
        require(msg.value == _quantity * price, "send correct price");
        return super._transferTokensOnClaim(_receiver, _quantity);
    }
}