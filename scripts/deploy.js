// const hre = require("hardhat");
const fs = require('fs');

const main = async () => {
  console.log("About to deploy contract Badagry on neon: ");
  const contractFactory = await ethers.getContractFactory('Badagry');
  const contract = await contractFactory.deploy();
  await contract.deployed();
  console.log("Badagry Contract deployed to: ", contract.address);

  // Deploy contract Minter
  console.log("About to deploy contract Badagry Minter neon: ");
  const contractFactory2 = await ethers.getContractFactory('MinterBadagry');
  const contract2 = await contractFactory2.deploy();
  await contract2.deployed();
  console.log("Badagry Minter Contract deployed to: ", contract2.address);

  fs.writeFileSync('./configneonbadagry.js', `
  export const badagryAddressneon = "${contract.address}" \n
  export const minterBadagryAddressneon = "${contract2.address}"
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
