import { useMemo } from 'react';
import { ItemBackground, ItemContainer, ItemHeader, ItemTitle, ItemImage, ItemBodySelect, ItemBodyPlay, ItemMintButton, ItemPetsSection, ItemPet, ItemPetAction, ItemPetImg, SquareButton } from "../InteractPageStyle";
import React, { useCallback, useEffect, useState } from "react";
import { A } from '@/components/layout/guide';

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
    const play = () => {
        // const contract = new ethers.Contract(
        //     virtualPetContract,
        //     virtualPetAbi.body,
        //     Ethers.provider().getSigner()
        // );
        // contract.play(tokenId).then((res:any) => {
        //     setIsBusy(true);
        //     setIsPlay(true);
        // });
        setCurrentImg(_getPlayImg(pet.image));
        setIsBusy(true);
        setTimeout(() => {
            getNft();
        }, 10000);    };

    // Method to eat
    const eat = () => {
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
        setCurrentImg(_getEatImg(pet.image));
        setIsBusy(true);
        setTimeout(() => {
            getNft();
        }, 10000);
    };

    // Method to sleep
    const sleep = () => {
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
        <div>
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