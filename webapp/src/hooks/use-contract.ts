import { useEffect, useState } from "react";
import type { Contract, ContractInterface } from "ethers";
import { ethers } from "ethers";

type Params = {
	address: string;
	abi: ContractInterface;
}

export default function useContract({ address, abi }: Params) {
	const [contract, setContract] = useState<Contract | null>(null);

	useEffect(() => {
		const { ethereum } = window;
		if (!ethereum) {
			return;
		}

		const provider = new ethers.providers.Web3Provider(ethereum);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(address, abi, signer);
		setContract(contract);
	}, [address, abi]);

	return contract;
}
