import { useMemo } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { ItemBackground, ItemContainer, ItemHeader, ItemTitle, ItemImage, ItemBody, ItemMintNumber, ItemMintButton } from "../MintPageStyle";
import React, { useCallback, useEffect, useState } from "react";
import { get } from 'http';
const abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "ERC721IncorrectOwner",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ERC721InsufficientApproval",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "approver",
          "type": "address"
        }
      ],
      "name": "ERC721InvalidApprover",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "ERC721InvalidOperator",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "ERC721InvalidOwner",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        }
      ],
      "name": "ERC721InvalidReceiver",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "ERC721InvalidSender",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ERC721NonexistentToken",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "approved",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_fromTokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_toTokenId",
          "type": "uint256"
        }
      ],
      "name": "BatchMetadataUpdate",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "MetadataUpdate",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "doze",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "eat",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getApproved",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getMintedTokens",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getTokenInfoById",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "image",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "happiness",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "hunger",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "sleep",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "activity",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "isHungry",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "isSleepy",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "isBored",
              "type": "bool"
            }
          ],
          "internalType": "struct BurritoBattleVP.PetInfo",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "petName",
          "type": "string"
        }
      ],
      "name": "mintPet",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "play",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "tokenURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ] as const


export default function Mint() {

    const [init, setInit] = useState(false);
    const [mintedBurritos, setMintedBurritos] = useState();
    const [burritoName, setBurritoName] = useState("");
    const [minting, setMinting] = useState(false);
    const [sender, setSender] = useState("0x34149390029Bbf4f4D9E7AdEa715D7055e145C05");
    const account = useAccount();
    const { writeContractAsync, isSuccess, isPending } = useWriteContract()
    function getData(){
        const result = useReadContract({
            abi,
            address: "0xAc9221060455f60dfFF8bf8C4f601E500AC095D7",
            functionName: "getMintedTokens",
        })
        if(result.isSuccess){
            console.log(parseInt(result.data?.toString()))
            return parseInt(result.data?.toString())
        }
    }
    const handleMint = async () => {
        const transaction = await writeContractAsync({
            abi,
            address: "0xAc9221060455f60dfFF8bf8C4f601E500AC095D7",
            functionName: "mintPet",
            args: [burritoName],
        })
        console.log(transaction)
      }
      
      // if(isSuccess){
      //   setTimeout(() => {
      //     window.location.reload();
      // }, 5000);
      // }

    const mint = () => {
        console.log("Mint");
        console.log(burritoName);
      };
    
      let ID= getData()

    return (
        <div>
            
            <ItemBackground>
            <ItemContainer>
                <ItemHeader>
                    <ItemTitle>
                        <ItemImage src="https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/d2c54b3423f07d0e9e22bf8aa105b12cf7973922/icon.png"></ItemImage>
                        <label
                            style={{
                                "textShadow":
                                    "1px 0px 0px black, 0px 1px 0px black, -1px 0px 0px black, 0px -1px 0px black",
                            }}
                        >
                            Burrito Virtual Pets
                        </label>
                    </ItemTitle>
                </ItemHeader>
                <ItemBody>
                    {sender ? (
                        <div className="container text-center">
                            <div>
                                <ItemMintNumber>
                                    Last Burrito Id: {ID}
                                </ItemMintNumber>
                            </div>
                            <br />
                            {!isPending ? (
                                <div>
                                    <div>
                                        <input
                                            style={{background: "white"}}
                                            placeholder="Burrito name"
                                            value={burritoName}
                                            onChange={(e) =>
                                                setBurritoName(e.target.value )
                                            }
                                        />
                                    </div>
                                    <br />
                                    <div>
                                        <ItemMintButton
                                            onClick={async () => {
                                                handleMint();
                                            }}
                                        >
                                            Mint Burrito
                                        </ItemMintButton>
                                        <br /> <br />
                                        <div>
                                            <a
                                                href="interact"
                                                style={{ color: "black" }}
                                            >
                                                Go to Play
                                            </a>
                                        </div>
                                        <br />
                                        <div>
                                            <label style={{ color: "black", "fontWeight": "500" }}>
                                                {" "}
                                                Burrito’s contract to add your NFTs to wallet
                                                0xAc9221060455f60dfFF8bf8C4f601E500AC095D7
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div style={{display:"grid", justifyContent:"center"}}>
                                    <img
                                        src="https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/d2c54b3423f07d0e9e22bf8aa105b12cf7973922/loading.gif"
                                        style={{
                                            height: "169px",
                                            background: "rgb(255, 229, 188)",
                                            "borderRadius": "10px",
                                        }}
                                    ></img>
                                    <br />
                                    <label style={{ "fontSize": "20px", "fontWeight": "400" }}>
                                        Minting...
                                    </label>
                                </div>
                            )}
                            <br />
                        </div>
                    ) : (
                        <div style={{ "textAlign": "center" }}>
                            <button>Connect with Web3</button>
                        </div>
                    )}
                </ItemBody>
            </ItemContainer>
        </ItemBackground>
            
        </div>
    );
}
