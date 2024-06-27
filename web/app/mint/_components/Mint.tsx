import { useMemo } from 'react';
import { ItemBackground, ItemContainer, ItemHeader, ItemTitle, ItemImage, ItemBody, ItemMintNumber, ItemMintButton } from "../MintPageStyle";
import React, { useCallback, useEffect, useState } from "react";

export default function Mint() {

    const [init, setInit] = useState(false);
    const [mintedBurritos, setMintedBurritos] = useState(0);
    const [burritoName, setBurritoName] = useState("");
    const [minting, setMinting] = useState(false);
    const [sender, setSender] = useState(true);


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

    const mint = () => {
        console.log("Mint");
        console.log(burritoName);
      };

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
                                        Last Burrito Id: {mintedBurritos}
                                    </ItemMintNumber>
                                </div>
                                <br />
                                {!minting ? (
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
                                                    mint();
                                                }}
                                            >
                                                Mint Burrito
                                            </ItemMintButton>
                                            <br /> <br />
                                            <div>
                                                <a
                                                    href="#/burrito-pets.near/widget/Burrito-Pets-Interact"
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
                                                    0xc533FCB43DEf76ac1A175Ee6beB0Ad7d39469220
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
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
