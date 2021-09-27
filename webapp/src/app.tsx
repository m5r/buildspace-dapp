import * as React from "react";

import Counter from "./component/counter";
import useWallet from "./hooks/use-wallet";
import useWave from "./hooks/use-wave";

import "./app.css";

export default function App() {
	const { wallet, connectWallet } = useWallet();
	const { waves, wave, isWaving } = useWave();
	const [message, setMessage] = React.useState("");

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

				<input
					type="text"
					value={message}
					placeholder="What's on your mind?"
					disabled={isWaving}
					onChange={e => !isWaving && setMessage(e.target.value)}
				/>
				<button className="waveButton" onClick={async () => {
					if (isWaving) {
						return;
					}

					if (!message) {
						return;
					}

					await wave(message);
					setMessage("");
				}}>
					{isWaving ? "Waving..." : "Wave at Me"}
				</button>

				{!wallet ? (
					<button className="waveButton" onClick={connectWallet}>
						Connect Wallet
					</button>
				) : null}

				{waves.map((wave) => {
					return (
						<div key={`${wave.address}-${wave.timestamp.toString()}`} style={{ backgroundColor: "OldLace", marginTop: "16px", padding: "8px" }}>
							<div>Address: {wave.address}</div>
							<div>Time: {wave.timestamp.toString()}</div>
							<div>Message: {wave.message}</div>
						</div>)
				})}
			</div>
		</div>
	);
}
