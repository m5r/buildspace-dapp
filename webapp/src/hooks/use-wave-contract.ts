import useContract from "./use-contract";

import wavePortal from "../utils/WavePortal.json";

export default function useWaveContract() {
	return useContract({
		address: "0xC8d1141b57b52f4e00A625e053391C099bD4F63E",
		abi: wavePortal.abi,
	});
}
