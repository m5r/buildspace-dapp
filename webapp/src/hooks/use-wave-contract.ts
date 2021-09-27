import useContract from "./use-contract";

import wavePortal from "../utils/WavePortal.json";

export default function useWaveContract() {
	return useContract({
		address: "0x629324fC069287D73ba5C98a2b25b6fC4B21dEE4",
		abi: wavePortal.abi,
	});
}
