import { useCallback, useState } from "react";

import useWaveContract from "./use-wave-contract";
import useWaveCount from "./use-wave-count";

export default function useWave() {
	const { refetch } = useWaveCount();
	const [isWaving, setIsWaving] = useState(false);
	const wavePortalContract = useWaveContract();
	const wave = useCallback(async () => {
		if (!wavePortalContract) {
			console.log("Connection to contract is not ready yet")
			return;
		}

		if (isWaving) {
			return;
		}
		setIsWaving(true);
		const waveTxn = await wavePortalContract.wave();
		console.log("Mining...", waveTxn.hash);

		await waveTxn.wait();
		console.log("Mined -- ", waveTxn.hash);
		await refetch();
		setIsWaving(false);
	}, [wavePortalContract, isWaving, refetch]);

	return {
		wave,
		isWaving,
	};
}