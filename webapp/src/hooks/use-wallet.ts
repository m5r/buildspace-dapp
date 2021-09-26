import { useState, useEffect, useCallback } from "react";

export default function useWallet() {
	const [currentAccount, setCurrentAccount] = useState("");

	const checkIfWalletIsConnected = useCallback(async () => {
		const { ethereum } = window;
		if (!ethereum) {
			console.log("Make sure you have metamask!");
			return;
		}

		const accounts = await ethereum.request({ method: "eth_accounts" });
		console.log("accounts", accounts);
		if (accounts.length === 0) {
			console.log("No authorized account found");
			return;
		}

		const account = accounts[0];
		console.log("Found an authorized account:", account);
		setCurrentAccount(account);
	}, []);

	const connectWallet = useCallback(async () => {
		const { ethereum } = window;
		if (!ethereum) {
			alert("Get MetaMask!");
			return;
		}

		const accounts = await ethereum.request({ method: "eth_requestAccounts" });

		console.log("Connected", accounts[0]);
		setCurrentAccount(accounts[0]);
	}, []);

	useEffect(() => {
		checkIfWalletIsConnected();
	}, []);

	return {
		wallet: currentAccount,
		connectWallet,
	}
}