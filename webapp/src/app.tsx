import * as React from "react";
import { ethers } from "ethers";

import useWallet from "./hooks/use-wallet";

import "./app.css";

export default function App() {
	const { wallet, connectWallet } = useWallet();
	console.log("wallet", wallet);

	const wave = () => {

	};

	return (
		<div className="mainContainer">
			<div className="dataContainer">
				<div className="header">
					👋 Hey there!
				</div>

				<div className="bio">
					I am farza and I worked on self-driving cars so that's pretty cool right? Connect your Ethereum
					wallet and wave at me!
				</div>

				<button className="waveButton" onClick={wave}>
					Wave at Me
				</button>

				{!wallet ? (
					<button className="waveButton" onClick={connectWallet}>
						Connect Wallet
					</button>
				) : null}
			</div>
		</div>
	);
}
