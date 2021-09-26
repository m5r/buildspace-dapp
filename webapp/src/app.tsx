import * as React from "react";

import Counter from "./component/counter";
import useWallet from "./hooks/use-wallet";
import useWave from "./hooks/use-wave";

import "./app.css";

export default function App() {
	const { wallet, connectWallet } = useWallet();
	const { wave, isWaving } = useWave();

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

				<Counter />

				<button className="waveButton" onClick={wave}>
					{isWaving ? "Waving..." : "Wave at Me"}
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
