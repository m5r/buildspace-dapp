import useContract from "./use-contract";

import wavePortal from "../utils/WavePortal.json";

export default function useWaveContract() {
	return useContract({
		address: "0x9BBcB8Bc4AA2b33a9E5be46280651205Ada4A1fF",
		abi: wavePortal.abi,
	});
}
