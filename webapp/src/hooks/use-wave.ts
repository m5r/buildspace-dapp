import { useCallback, useEffect, useState } from "react";
import { atom, useAtom } from "jotai";

import useWaveContract from "./use-wave-contract";
import useWallet from "./use-wallet";

export default function useWave() {
	const wavePortalContract = useWaveContract();
	const { wallet } = useWallet();

	const [count, setCount] = useAtom(countAtom);
	const [isFetchingCount, setIsFetchingCount] = useAtom(fetchingCountAtom);
	const fetchCount = useCallback(async () => {
		console.log("fetch count");
		console.log("count wavePortalContract", wavePortalContract);
		if (!wavePortalContract || isFetchingCount) {
			return;
		}

		setIsFetchingCount(true);
		const count = await wavePortalContract.getAddressTotalWaves();
		setCount(count.toNumber());
		setIsFetchingCount(false);
	}, [wavePortalContract, isFetchingCount]);
	useEffect(() => {
		fetchCount();
	}, []);

	const [waves, setWaves] = useAtom(wavesAtom);
	const [isFetchingWaves, setIsFetchingWaves] = useAtom(fetchingWavesAtom);
	const fetchWaves = useCallback(async () => {
		console.log("fetch waves");
		console.log("wavePortalContract", wavePortalContract);
		console.log("wallet", wallet);
		console.log("isFetchingWaves", isFetchingWaves);
		if (!wavePortalContract || !wallet || isFetchingWaves) {
			return;
		}

		setIsFetchingWaves(true);
		const rawWaves = await wavePortalContract.getAllWaves();
		console.log("rawWaves", rawWaves);
		const waves = rawWaves.map((rawWave: any) => ({
			address: rawWave.waver,
			timestamp: new Date(rawWave.timestamp * 1000),
			message: rawWave.message,
		}));
		setWaves(waves);
		console.log("waves", waves);
		setIsFetchingWaves(false);
	}, [wavePortalContract, wallet, isFetchingWaves]);
	useEffect(() => {
		fetchWaves();
	}, []);

	const [isWaving, setIsWaving] = useState(false);
	const wave = useCallback(async (message: string) => {
		if (!wavePortalContract) {
			console.log("Connection to contract is not ready yet")
			return;
		}

		if (isWaving) {
			return;
		}
		setIsWaving(true);
		const waveTxn = await wavePortalContract.wave(message);
		console.log("Mining...", waveTxn.hash);
		await waveTxn.wait();
		console.log("Mined -- ", waveTxn.hash);
		await Promise.all([fetchCount(), fetchWaves()]);
		setIsWaving(false);
	}, [wavePortalContract, isWaving, fetchCount, fetchWaves]);

	return {
		wave,
		isWaving,
		count,
		isFetchingCount,
		waves,
		isFetchingWaves,
	};
}

const countAtom = atom(0);
const fetchingCountAtom = atom(false);
const wavesAtom = atom<any[]>([]);
const fetchingWavesAtom = atom(false);