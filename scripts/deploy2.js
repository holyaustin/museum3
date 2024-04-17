// const hre = require("hardhat");
const fs = require('fs');

const main = async () => {
  console.log("About to deploy contract Egypt on neon ");
  const contractFactory = await ethers.getContractFactory('Egypt');
  const contract = await contractFactory.deploy();
  await contract.deployed();
  console.log("Egypt Contract deployed to: ", contract.address);

  // Deploy contract Minter
  console.log("About to deploy contract Egypt Minter on neon: ");
  const contractFactory2 = await ethers.getContractFactory('MinterEgypt');
  const contract2 = await contractFactory2.deploy();
  await contract2.deployed();
  console.log("Egypt Minter Contract deployed to: ", contract2.address);

  fs.writeFileSync('./configneonegypt.js', `
  export const egyptAddressneon = "${contract.address}" \n
  export const minterEgyptAddressneon = "${contract2.address}"
`);
}

const runMain = async() => {
  try {
    await main();
    process.exit(0);
  } catch(error) {
    console.log(error);
    process.exit(1);
  }
}

runMain();
