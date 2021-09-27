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
		if (!wavePortalContract || !wallet || isFetchingCount) {
			return;
		}

		setIsFetchingCount(true);
		const count = await wavePortalContract.getAddressTotalWaves();
		setCount(count.toNumber());
		setIsFetchingCount(false);
	}, [wavePortalContract, isFetchingCount]);
	useEffect(() => {
		fetchCount();
	}, [wallet]);

	const [waves, setWaves] = useAtom(wavesAtom);
	const [isFetchingWaves, setIsFetchingWaves] = useAtom(fetchingWavesAtom);
	const fetchWaves = useCallback(async () => {
		if (!wavePortalContract || !wallet || isFetchingWaves) {
			return;
		}

		setIsFetchingWaves(true);
		const rawWaves = await wavePortalContract.getAllWaves();
		const waves = rawWaves.map((rawWave: any) => ({
			address: rawWave.waver,
			timestamp: new Date(rawWave.timestamp * 1000),
			message: rawWave.message,
		}));
		setWaves(waves);
		setIsFetchingWaves(false);
	}, [wavePortalContract, wallet, isFetchingWaves]);
	useEffect(() => {
		fetchWaves();
	}, [wallet]);

	const [isWaving, setIsWaving] = useState(false);
	const wave = useCallback(async (message: string) => {
		if (!wavePortalContract) {
			return;
		}

		if (isWaving) {
			return;
		}
		setIsWaving(true);
		const waveTxn = await wavePortalContract.wave(message, { gasLimit: 300000 });
		await waveTxn.wait();
		setIsWaving(false);
	}, [wavePortalContract, isWaving, fetchCount, fetchWaves]);

	useEffect(() => {
		if (!wavePortalContract) {
			return;
		}

		async function onNewWaveHandler() {
			await Promise.all([fetchCount(), fetchWaves()]);
		}

		wavePortalContract.on("NewWave", onNewWaveHandler);

		return () => void wavePortalContract.off("NewWave", onNewWaveHandler);
	}, [fetchCount, fetchWaves, wavePortalContract]);

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