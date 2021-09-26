import { useCallback, useEffect } from "react";
import { atom, useAtom } from "jotai";

import useWaveContract from "./use-wave-contract";

export default function useWaveCount() {
	const wavePortalContract = useWaveContract();
	const [count, setCount] = useAtom(countAtom);
	const [isLoading, setIsLoading] = useAtom(loadingAtom);

	const refetch = useCallback(async () => {
		console.log("fetching");
		setIsLoading(true);
		if (!wavePortalContract) {
			console.log("ddddd");
			return;
		}

		const count = await wavePortalContract.getAddressTotalWaves();
		console.log("count", count.toNumber());
		setCount(count.toNumber());
		setIsLoading(false);
	}, [wavePortalContract]);
	useEffect(() => {
		refetch();
	}, [refetch]);

	return {
		count,
		isLoading,
		refetch,
	};
}

const countAtom = atom(0);
const loadingAtom = atom(false);