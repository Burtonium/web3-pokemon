// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {Multicall} from "@openzeppelin/contracts/utils/Multicall.sol";
import {Ownable2Step, Ownable} from "@openzeppelin/contracts/access/Ownable2Step.sol";

contract PokemonNFT is ERC1155, Ownable2Step, Multicall {
    using Strings for uint256;
    string public baseURI;
    uint256 public constant TOTAL_POKEMON = 151;
    mapping(uint256 requestId => address minter) requests;

    event PokemonMinted(address indexed minter, uint256 indexed pokemonId);

    constructor() ERC1155("") {
        baseURI = "ipfs://QmTw8zK2fehxRyCoifcKDgoZsF6H8zTKz4bARKfR3cfLAQ/";
    }

    function setURI(string memory newuri) public onlyOwner {
        baseURI = newuri;
    }

    function uri(uint256 id) public view override returns (string memory) {
        return string(abi.encodePacked(baseURI, id.toString()));
    }

    function mint(uint256 id) public {
        require(id <= TOTAL_POKEMON, "PokemonNFT: Invalid Pokemon ID");

        _mint(msg.sender, id, 1, "");
        emit PokemonMinted(msg.sender, id);
    }
}
