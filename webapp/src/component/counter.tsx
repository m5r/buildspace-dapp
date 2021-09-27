import * as React from "react";

import useWallet from "../hooks/use-wallet";
import useWave from "../hooks/use-wave";

export default function Counter() {
	const { wallet } = useWallet();
	const { isFetchingCount, count } = useWave();

	return (
		<div className="bio">
			{wallet ? (
				isFetchingCount ? <span>Loading...</span> : <span>You waved {count} times in total!</span>
			) : null}
		</div>
	);
}