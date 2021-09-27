import useContract from "./use-contract";

import wavePortal from "../utils/WavePortal.json";

export default function useWaveContract() {
	return useContract({
		address: "0xB8D06E44dd378acB5622236a9FC4C299a3720191",
		abi: wavePortal.abi,
	});
}
