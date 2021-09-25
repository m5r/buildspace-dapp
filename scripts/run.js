const main = async () => {
	const [owner, randoPerson] = await hre.ethers.getSigners();
	const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
	const waveContract = await waveContractFactory.deploy();
	await waveContract.deployed();

	console.log("Contract deployed to:", waveContract.address);
	console.log("Contract deployed by:", owner.address);

	await (await waveContract.wave()).wait();
	await (await waveContract.wave()).wait();

	const ownerWaveCount = await waveContract.getAddressTotalWaves();
	console.log("ownerWaveCount", ownerWaveCount.toString());

	await (await waveContract.connect(randoPerson).wave()).wait()
	await (await waveContract.connect(randoPerson).wave()).wait()
	await (await waveContract.connect(randoPerson).wave()).wait()
	const randoWaveCount = await waveContract.connect(randoPerson).getAddressTotalWaves();
	console.log("randoWaveCount", randoWaveCount.toString());
};

const runMain = async () => {
	try {
		await main();
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

runMain();
