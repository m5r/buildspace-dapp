import { useState, useEffect, useCallback } from "react";

export default function useWallet() {
	const [currentAccount, setCurrentAccount] = useState("");

	const checkIfWalletIsConnected = useCallback(async () => {
		const { ethereum } = window;
		if (!ethereum) {
			return;
		}

		const accounts = await ethereum.request({ method: "eth_accounts" });
		if (accounts.length === 0) {
			return;
		}

		const account = accounts[0];
		setCurrentAccount(account);
	}, []);

	const connectWallet = useCallback(async () => {
		const { ethereum } = window;
		if (!ethereum) {
			alert("Get MetaMask!");
			return;
		}

		const accounts = await ethereum.request({ method: "eth_requestAccounts" });

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