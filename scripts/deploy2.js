// const hre = require("hardhat");
const fs = require('fs');

const main = async() => {
  const contractFactory = await ethers.getContractFactory('Minter');
  const contract = await contractFactory.deploy();
  await contract.deployed();
  console.log("Contract deployed to: ", contract.address);

  fs.writeFileSync('./config2.js', `
  export const MinterAddress = "${contract.address}"
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
