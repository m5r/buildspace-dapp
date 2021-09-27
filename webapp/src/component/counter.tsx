import * as React from "react";

import useWallet from "../hooks/use-wallet";
import useWave from "../hooks/use-wave";

export default function Counter() {
	const { wallet } = useWallet();

	return (
		<div className="bio">
			{wallet ? (
				false ? <span>Loading...</span> : <span>You waved {0} times in total!</span>
			) : null}
		</div>
	);
}