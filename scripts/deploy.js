// const hre = require("hardhat");
const fs = require('fs');

const main = async() => {
  const contractFactory = await ethers.getContractFactory('Galleria');
  const contract = await contractFactory.deploy();
  await contract.deployed();
  console.log("Galleria Contract deployed to: ", contract.address);

  fs.writeFileSync('./config.js', `
  export const galleriaAddress = "${contract.address}"
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
