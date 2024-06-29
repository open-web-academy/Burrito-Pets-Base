import { useMemo } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { ItemBackground, ItemContainer, ItemHeader, ItemTitle, ItemImage, ItemBodySelect, ItemBodyPlay, ItemMintButton, ItemPetsSection, ItemPet, ItemPetAction, ItemPetImg, SquareButton } from "../InteractPageStyle";
import React, { useCallback, useEffect, useState } from "react";
import { A } from '@/components/layout/guide';
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

export default function Interact() {

    const [inputTokenId, setInputTokenId] = useState<any>(0);
    const [tokenId, setTokenId] = useState(0);
    const [isBusy, setIsBusy] = useState(false);
    const [isPlay, setIsPlay] = useState(false);
    const [error, setError] = useState("");
    const [pet, setPet] = useState<any>(null);
    const [sender, setSender] = useState("0x34149390029Bbf4f4D9E7AdEa715D7055e145C05");
    const [firstSearch, setFirstSearch] = useState(true);
    const [currentActivity, setCurrentActivity] = useState<any>(null);
    const [currentImg, setCurrentImg] = useState<any>(null);
    const { writeContractAsync, isSuccess, isPending } = useWriteContract()
    
    

    const contents = useMemo(
        () => [
            {
                href: '#contract-summary',
                label: 'Contract Summary',
            },
            {
                href: '#publicMint-explanation',
                label: (
                    <>
                        <code className="text-xs">publicMint</code> Explanation
                    </>
                ),
            },
        ],
        [],
    );

    // We make the conversion of information from the NFT
    const _castData = (data: any) => {
        console.log(data);
        return {
            tokenId: data[0],
            image: data[1],
            name: data[2],
            happiness: data[3].toNumber(),
            hunger: data[4].toNumber(),
            sleep: data[5].toNumber(),
            currentActivity: data[6],
            isHungry: data[7],
            isSleepy: data[8],
            isBored: data[9],
        };
    };
    const getNFTData = useCallback(()=>{
        const result = useReadContract({
            abi,
            address: "0xAc9221060455f60dfFF8bf8C4f601E500AC095D7",
            functionName: "getTokenInfoById",
            args: [inputTokenId],
        })
        console.log(result)
        return result
    },[inputTokenId])
    // Method to get NFT information
    const getNft = () => {
        setTokenId(inputTokenId);

        // const contract = new ethers.Contract(
        //     virtualPetContract,
        //     virtualPetAbi.body,
        //     Ethers.provider().getSigner()
        // );

        // contract.getTokenInfoById(inputTokenId).then((res:any) => {
        //     console.log(res);
        //     if (!res[1]) {
        //         setError("Burrito's ID doesn't exist or You don't own the Burrito");
        //     }
        //     if (res[1]) {
        //         const petInfo = [res].map(_castData);
        //         setFirstSearch(false);
        //         setPet(petInfo[0]);
        //         setCurrentActivity(petInfo[0].currentActivity);
        //         setCurrentImg(_getCurrentImg(petInfo[0]));
        //         setIsBusy(false);
        //         setError("");
        //     }
        // });
        
        const petInfo = {
            tokenId: 1,
            image: "https://pin.ski/3Jjp95g",
            name: "Juan",
            happiness: 50,
            hunger: 0,
            sleep: 0,
            currentActivity: "idle",
            isHungry: false,
            isSleepy: false,
            isBored: false
        };
        setFirstSearch(false);
        setPet(petInfo);
        setCurrentActivity(petInfo.currentActivity);
        setCurrentImg(_getCurrentImg(petInfo));
        setIsBusy(false);
        setError("");
    };

    // Methods to obtain the NFT image depending on its status
    const _getCurrentImg = (petInfo: any) => {
        if (petInfo.isHungry) {
            return _getIsHungryImg(petInfo.image);
        } else if (petInfo.isSleepy) {
            return _getIsSleepyImg(petInfo.image);
        } else if (petInfo.isBored) {
            return _getIsBoredImg(petInfo.image);
        } else if (!petInfo.isHungry && !petInfo.isSleepy && !petInfo.isBored) {
            return _getIdleImg(petInfo.image);
        }
    };

    const _getIdleImg = (img: any) => {
        switch (img) {
            case "https://pin.ski/3Jjp95g":
                return "https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/Burrito-Fuego-Idle.gif";
            case "https://pin.ski/3NwRR57":
                return "https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/Burrito-Planta-Idle.gif";
            case "https://pin.ski/3JfJ1X6":
                return "https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/Burrito-Agua-Idle.gif";
        }
    };

    const _getPlayImg = (img: any) => {
        switch (img) {
            case "https://pin.ski/3Jjp95g":
                return "https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/Burrito-Play.gif";
            case "https://pin.ski/3NwRR57":
                return "https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/Burrito-Play.gif";
            case "https://pin.ski/3JfJ1X6":
                return "https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/Burrito-Play.gif";
        }
    };

    const _getEatImg = (img: any) => {
        switch (img) {
            case "https://pin.ski/3Jjp95g":
                return "https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/Burrito-Fuego-Eat.gif";
            case "https://pin.ski/3NwRR57":
                return "https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/Burrito-Planta-Eat.gif";
            case "https://pin.ski/3JfJ1X6":
                return "https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/Burrito-Agua-Eat.gif";
        }
    };

    const _getSleepImg = (img: any) => {
        switch (img) {
            case "https://pin.ski/3Jjp95g":
                return "https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/Burrito-Fuego-Sleep.gif";
            case "https://pin.ski/3NwRR57":
                return "https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/Burrito-Planta-Sleep.gif";
            case "https://pin.ski/3JfJ1X6":
                return "https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/Burrito-Agua-Sleep.gif";
        }
    };

    const _getIsBoredImg = (img: any) => {
        switch (img) {
            case "https://pin.ski/3Jjp95g":
                return "https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/Burrito-Fuego-Bored.gif";
            case "https://pin.ski/3NwRR57":
                return "https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/Burrito-Planta-Bored.gif";
            case "https://pin.ski/3JfJ1X6":
                return "https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/Burrito-Agua-Bored.gif";
        }
    };

    const _getIsHungryImg = (img: any) => {
        switch (img) {
            case "https://pin.ski/3Jjp95g":
                return "https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/Burrito-Fuego-Hungry.gif";
            case "https://pin.ski/3NwRR57":
                return "https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/Burrito-Planta-Hungry.gif";
            case "https://pin.ski/3JfJ1X6":
                return "https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/Burrito-Agua-Hungry.gif";
        }
    };

    const _getIsSleepyImg = (img: any) => {
        switch (img) {
            case "https://pin.ski/3Jjp95g":
                return "https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/Burrito-Fuego-Sleepy.gif";
            case "https://pin.ski/3NwRR57":
                return "https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/Burrito-Planta-Sleepy.gif";
            case "https://pin.ski/3JfJ1X6":
                return "https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/Burrito-Agua-Sleepy.gif";
        }
    };

    // Method to play
    const play = async () => {
        // const contract = new ethers.Contract(
        //     virtualPetContract,
        //     virtualPetAbi.body,
        //     Ethers.provider().getSigner()
        // );
        // contract.play(tokenId).then((res:any) => {
        //     setIsBusy(true);
        //     setIsPlay(true);
        // });
        const transaction = await writeContractAsync({
            abi,
            address: "0xAc9221060455f60dfFF8bf8C4f601E500AC095D7",
            functionName: "play",
            args: [BigInt(tokenId)],
        })
        console.log(transaction)
        setCurrentImg(_getPlayImg(pet.image));
        setIsBusy(true);
        setTimeout(() => {
            getNft();
        }, 10000);    };

    // Method to eat
    const eat = async () => {
        // const contract = new ethers.Contract(
        //     virtualPetContract,
        //     virtualPetAbi.body,
        //     Ethers.provider().getSigner()
        // );

        // contract.eat(tokenId).then((res:any) => {
        //     setCurrentImg(_getEatImg(pet.image));
        //     setIsBusy(true);                            
        //     setTimeout(() => {
        //         getNft();
        //     }, "20000");
        // });
        const transaction = await writeContractAsync({
            abi,
            address: "0xAc9221060455f60dfFF8bf8C4f601E500AC095D7",
            functionName: "eat",
            args: [BigInt(tokenId)],
        })
        console.log(transaction)
        setCurrentImg(_getEatImg(pet.image));
        setIsBusy(true);
        setTimeout(() => {
            getNft();
        }, 10000);
    };

    // Method to sleep
    const sleep = async () => {
        // const contract = new ethers.Contract(
        //     virtualPetContract,
        //     virtualPetAbi.body,
        //     Ethers.provider().getSigner()
        // );

        // contract.doze(tokenId).then((res:any) => {
        //     setCurrentImg(_getSleepImg(pet.image));
        //     setIsBusy(true); 
        //     setTimeout(() => {
        //         getNft();
        //     }, "20000");
        // });
        const transaction = await writeContractAsync({
            abi,
            address: "0xAc9221060455f60dfFF8bf8C4f601E500AC095D7",
            functionName: "doze",
            args: [BigInt(tokenId)],
        })
        console.log(transaction)
        setCurrentImg(_getSleepImg(pet.image));
        setIsBusy(true);
        setTimeout(() => {
            getNft();
        }, 10000);
    };

    // Method to back menu
    const back = () => {
        setTokenId(0);
        setPet(null);
    };

    // Method to select random game
    const getGame = () => {
        return Math.floor(Math.random() * 2);
    };

    // Méthod to finish playing
    const onFinish = () => {
        setIsPlay(false);
        getNft();
    };
    return (
        <div style={{marginBottom:"40px", marginTop:"40px"}}>
            <ItemBackground>
                <ItemContainer>
                    <ItemHeader>
                        <ItemTitle className="row">
                            <div className="col-4" style={{ "textAlign": "left" }}>
                                <ItemImage src="https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/icon.png"></ItemImage>
                            </div>
                            <div
                                className="col-4"
                                style={{
                                    "textShadow":
                                        "black 1px 0px 0px, black 0px 1px 0px, black -1px 0px 0px, black 0px -1px 0px",
                                }}
                            >
                                {pet && pet.name}
                            </div>
                            <div className="col-4" style={{ "textAlign": "right" }}>
                                {sender ? (
                                    pet && (
                                        <ItemMintButton
                                            onClick={async () => {
                                                back();
                                            }}
                                        >
                                            Back
                                        </ItemMintButton>
                                    )
                                ) : null}
                            </div>
                        </ItemTitle>
                    </ItemHeader>
                    {sender ? (
                        !pet ? (
                            <ItemBodySelect>
                                <div className="m-5">
                                    <div style={{ "display": "flex", "justifyContent": "center" }}>
                                        <img
                                            src="https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/find.png"
                                            style={{
                                                height: "230px",
                                                background: "#ffe5bc",
                                                "borderRadius": "10px",
                                            }}
                                        ></img>
                                    </div>
                                    <br />
                                    <div className="">
                                        <div className="row justify-content-center">
                                            <div className="col-12" style={{ textAlign: "center" }}>
                                                <input
                                                    style={{ background: "white" }}
                                                    placeholder="Token Id"
                                                    onChange={(e) =>
                                                        setInputTokenId(e.target.value)
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <br />
                                        <div style={{ "textAlign": "center" }}>
                                            <ItemMintButton
                                                onClick={async () => {
                                                    getNft();
                                                }}
                                            >
                                                Get NFT
                                            </ItemMintButton>
                                        </div>
                                        <div style={{ "textAlign": "center" }}>{error}</div>
                                    </div>
                                </div>
                            </ItemBodySelect>
                        ) : (
                            <div
                                style={{
                                    background: "rgb(242, 167, 115)",
                                    "borderRadius": "20px",
                                }}
                            >
                                <ItemBodyPlay>
                                    <div
                                        className="row"
                                        style={{
                                            "textAlign": "center",
                                            background: "rgb(242, 167, 115)",
                                            "marginInline": "-10px",
                                            "borderRadius": "1px 1px 0px 0px",
                                        }}
                                    >
                                        <div
                                            className="col-4"
                                            style={{
                                                color: "black",
                                                display: "flex",
                                                "justifyContent": "center",
                                                "alignItems": "center",
                                            }}
                                        >
                                            <img
                                                style={{ height: "50px", "marginRight": "10px" }}
                                                src="https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/happy.png"
                                            ></img>
                                            <label style={{ "fontWeight": "900" }}>
                                                {pet && pet.happiness}
                                            </label>
                                        </div>
                                        <div
                                            className="col-4"
                                            style={{
                                                color: "black",
                                                display: "flex",
                                                "justifyContent": "center",
                                                "alignItems": "center",
                                            }}
                                        >
                                            <img
                                                style={{ height: "50px", "marginRight": "10px" }}
                                                src="https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/eat.png"
                                            ></img>
                                            <label style={{ "fontWeight": "900" }}>
                                                {pet && pet.hunger}
                                            </label>
                                        </div>
                                        <div
                                            className="col-4"
                                            style={{
                                                color: "black",
                                                display: "flex",
                                                "justifyContent": "center",
                                                "alignItems": "center",
                                            }}
                                        >
                                            <img
                                                style={{ height: "50px", "marginRight": "10px" }}
                                                src="https://raw.githubusercontent.com/yaairnaavaa/Burrito-Virtual-Pet/main/sleep.png"
                                            ></img>
                                            <label style={{ "fontWeight": "900" }}>
                                                {pet && pet.sleep}
                                            </label>
                                        </div>
                                    </div>
                                    <ItemPetsSection>
                                        <ItemPet>
                                            <div>
                                                {!isPlay ? (
                                                    <ItemPetImg src={currentImg} />
                                                ) : getGame() == 0 ? (
                                                    <></>
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
                                        </ItemPet>
                                    </ItemPetsSection>
                                </ItemBodyPlay>
                                <div
                                    style={{
                                        "textAlign": "center",
                                        "marginInline": "5px",
                                        "marginTop": "7px",
                                        "paddingBottom": "7px",
                                        height: "68.33px",
                                    }}
                                >
                                    {!isBusy ? (
                                        pet && pet.isHungry ? (
                                            <div className="row">
                                                <div className="col-4"></div>
                                                <div className="col-4">
                                                    <ItemPetAction
                                                        onClick={async () => {
                                                            eat();
                                                        }}
                                                    >
                                                        <label
                                                            style={{
                                                                color: "white",
                                                                "fontWeight": "900",
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            Eat
                                                        </label>
                                                    </ItemPetAction>
                                                </div>
                                                <div className="col-4"></div>
                                            </div>
                                        ) : pet && pet.isSleepy ? (
                                            <div className="row">
                                                <div className="col-4"></div>
                                                <div className="col-4"></div>
                                                <div className="col-4">
                                                    <ItemPetAction
                                                        onClick={async () => {
                                                            sleep();
                                                        }}
                                                    >
                                                        <label
                                                            style={{
                                                                color: "white",
                                                                "fontWeight": "900",
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            Sleep
                                                        </label>
                                                    </ItemPetAction>
                                                </div>
                                            </div>
                                        ) : pet && pet.isBored ? (
                                            <div className="row">
                                                <div className="col-4">
                                                    <ItemPetAction
                                                        onClick={async () => {
                                                            play();
                                                        }}
                                                    >
                                                        <label
                                                            style={{
                                                                color: "white",
                                                                "fontWeight": "900",
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            Play
                                                        </label>
                                                    </ItemPetAction>
                                                </div>
                                                <div className="col-4"></div>
                                                <div className="col-4"></div>
                                            </div>
                                        ) : (
                                            <div className="row">
                                                <div className="col-4">
                                                    <ItemPetAction
                                                        onClick={async () => {
                                                            play();
                                                        }}
                                                    >
                                                        <label
                                                            style={{
                                                                color: "white",
                                                                "fontWeight": "900",
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            Play
                                                        </label>
                                                    </ItemPetAction>
                                                </div>
                                                <div className="col-4">
                                                    <ItemPetAction
                                                        onClick={async () => {
                                                            eat();
                                                        }}
                                                    >
                                                        <label
                                                            style={{
                                                                color: "white",
                                                                "fontWeight": "900",
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            Eat
                                                        </label>
                                                    </ItemPetAction>
                                                </div>
                                                <div className="col-4">
                                                    <ItemPetAction
                                                        onClick={async () => {
                                                            sleep();
                                                        }}
                                                    >
                                                        <label
                                                            style={{
                                                                color: "white",
                                                                "fontWeight": "900",
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            Sleep
                                                        </label>
                                                    </ItemPetAction>
                                                </div>
                                            </div>
                                        )
                                    ) : null}
                                </div>
                            </div>
                        )
                    ) : (
                        <ItemBodySelect>
                            <br />
                            <div style={{ "textAlign": "center" }}>
                                <button>Connect with Web3</button>
                            </div>
                        </ItemBodySelect>
                    )}
                </ItemContainer>
            </ItemBackground>
        </div>
    );
}