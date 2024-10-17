const { ethers } = require('hardhat');
async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);
    const Contract = await ethers.getContractFactory("LendingContract");
    const contract = await Contract.deploy();
    console.log(await contract.getAddress())
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });