// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {VRFConsumerBaseV2Plus} from "@chainlink/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import {VRFV2PlusClient} from "@chainlink/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";
import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {Multicall} from "@openzeppelin/contracts/utils/Multicall.sol";

contract PokemonNFT is VRFConsumerBaseV2Plus, ERC1155, Multicall {
    using Strings for uint256;
    string private baseURI;
    uint256 public constant TOTAL_POKEMON = 151;
    uint256 public s_subscriptionId;
    address public vrfCoordinator = 0x9DdfaCa8183c41ad55329BdeeD9F6A8d53168B1B;
    bytes32 public s_keyHash =
        0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae;
    uint32 public callbackGasLimit = 350000;
    uint16 public requestConfirmations = 3;
    uint32 public numWords = 1;
    mapping(uint256 requestId => address minter) requests;

    event PokemonRequested(uint256 indexed requestId, address indexed minter);
    event PokemonMinted(address indexed minter, uint256 indexed requestId, uint256 indexed pokemonId);

    constructor(uint256 subscriptionId) ERC1155("") VRFConsumerBaseV2Plus(vrfCoordinator) {
        baseURI = "ipfs://QmTw8zK2fehxRyCoifcKDgoZsF6H8zTKz4bARKfR3cfLAQ";
        s_subscriptionId = subscriptionId;
    }


    function setURI(string memory newuri) public onlyOwner {
      baseURI = newuri;
    }

    function uri(uint256 id) public view override returns (string memory) {
      return string(abi.encodePacked(baseURI, id.toString()));
    }

    function requestPokemon() public returns (uint256 requestId) {
        requestId = s_vrfCoordinator.requestRandomWords(
            VRFV2PlusClient.RandomWordsRequest({
                keyHash: s_keyHash,
                subId: s_subscriptionId,
                requestConfirmations: requestConfirmations,
                callbackGasLimit: callbackGasLimit,
                numWords: numWords,
                extraArgs: VRFV2PlusClient._argsToBytes(
                    VRFV2PlusClient.ExtraArgsV1({nativePayment: false})
                )
            })
        );

        requests[requestId] = msg.sender;

        emit PokemonRequested(requestId, msg.sender);
    }


    function mint(address minter, uint256 id) internal {
      _mint(minter, id, 1, "");
    }

    function fulfillRandomWords(
        uint256 requestId,
        uint256[] calldata randomWords
    ) internal override {
        uint256 pokemonId = (randomWords[0] % TOTAL_POKEMON);
        address minter = requests[requestId];
        mint(minter, pokemonId);
        emit PokemonMinted(minter, requestId, pokemonId);
    }
}
