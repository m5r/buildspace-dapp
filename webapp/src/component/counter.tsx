import * as React from "react";

import useWaveCount from "../hooks/use-wave-count";
import useWallet from "../hooks/use-wallet";

export default function Counter() {
	const { wallet } = useWallet();
	const { count, isLoading } = useWaveCount();

	return (
		<div className="bio">
			{wallet ? (
				isLoading ? <span>Loading...</span> : <span>You waved {count} times in total!</span>
			) : null}
		</div>
	);
}