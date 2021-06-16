// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MAToken is ERC20("MAToken", "MAT") {
  constructor() {
    _mint(msg.sender, 10000);
  }

  function decimals() public view virtual override returns (uint8) {
      return 0;
  }
}
