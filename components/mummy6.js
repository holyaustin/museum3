import React, { useEffect, useState } from "react";
import { jsx, Box } from 'theme-ui';
import { ethers } from "ethers";
import Web3Modal from 'web3modal'
import axios from "axios";
import { useRouter } from 'next/router'

import fileNFTABI from "../artifacts/contracts/MinterEgypt.sol/MinterEgypt.json";
import { minterEgyptAddressneon } from "../config";

import fileNFTABI2 from "../artifacts/contracts/MinterEgypt.sol/MinterEgypt.json";
import { minterEgyptAddresschiado } from "../config";

import fileNFTABI3 from "../artifacts/contracts/MinterEgypt.sol/MinterEgypt.json";
import { minterEgyptAddressarbitrum } from "../config";

import fileNFTABI4 from "../artifacts/contracts/MinterEgypt.sol/MinterEgypt.json";
import { minterEgyptAddressmorph } from "../config";

export default function ViewFile() {
  console.log('Entered viewing component');
  const router = useRouter();
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const [fileNFT, setFileNFT] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const image = "/egypt/status1.avif"
  const image2 = "/egypt/asset8.jpg"
  const image3 = "/egypt/asset9.jpg"
  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    console.log('Entered UseEffect');
    checkNetwork();
    try {
    // arbitrum sepolia testnet
    if (window.ethereum.networkVersion == "421614")  {
      console.log('currently inside Arbitrum Sepolia Testnet');
      setFileNFT(fileNFTABI3);
      setContractAddress(minterEgyptAddressarbitrum);
      return;
    } 
    // gnosis chiado testnet
    else if (window.ethereum.networkVersion == "10200") {
      console.log('currently inside Gnosis Chiado Testnet');
      setFileNFT(fileNFTABI2);
      setContractAddress(minterEgyptAddresschiado);
      return;
    } 
    // neon devnet
    else if (window.ethereum.networkVersion == "245022926") {
      setFileNFT(fileNFTABI);
      setContractAddress(minterEgyptAddressneon);
      console.log('currently inside Neon Devnet');
      return;
    }
          // Morph Testnet
          else if (window.ethereum.networkVersion == "2710") {
            setFileNFT(fileNFTABI4);
            setContractAddress(minterEgyptAddressmorph );
            console.log('currently inside Morph Testnet');
            return;
          } 
    else {
      router.push("/select");
      return;
    }
      
    } catch (error) {
      console.log(error);
    }
  }, []);



  const getIPFSGatewayURL = (ipfsURL) => {
    const urlArray = ipfsURL.split("/");
    const ipfsGateWayURL = `https://${urlArray[2]}.ipfs.nftstorage.link/${urlArray[3]}`;
    return ipfsGateWayURL;
  };
 
  const checkNetwork = async () => {
    try {
      if ((window.ethereum.networkVersion !== "421614") && (window.ethereum.networkVersion !== "245022926") && (window.ethereum.networkVersion !== "2710")  && (window.ethereum.networkVersion !== "10200")) {
    
        alert("Please connect to Arbitrum Sepolia Testnet or Morph Testnet or Gnosis Chiado Testnet or Neon Devnet Blockchain! \n You can add it to your Wallet using \n https://chainlist.org/?testnets=true");
        router.push("/select");
        return;
      } 
      
    } catch (error) {
      console.log(error);
    }
  };

  async function Next() {
    router.push("/egypt7");
  }

   async function Mint2() {
    console.log("Minting NFT2");
    const url2 = "https://bafybeih6x7pjn4jjatjmgp4wewooa7g4vvch2xjudwyxyxo47risfehhbi.ipfs.dweb.link/mummy.jpg";
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    /* create the NFT */
    //const price = ethers.utils.parseUnits(formInput.price, 'ether')
    let contract = new ethers.Contract(contractAddress, fileNFT.abi, signer)
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()
    console.log("Listing price is ", listingPrice)
    let transaction = await contract.createFile(url2, { value: listingPrice })
    await transaction.wait()
    alert("NFT Successfully minted");
  }

  async function Mint1() {
    console.log("Minting NFT1");
     const url = "https://bafybeih6x7pjn4jjatjmgp4wewooa7g4vvch2xjudwyxyxo47risfehhbi.ipfs.dweb.link/lionstatue.avif";

    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    /* create the NFT */
    let contract = new ethers.Contract(contractAddress, fileNFT.abi, signer)
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()
    console.log("Listing price is ", listingPrice)
    let transaction = await contract.createFile(url, { value: listingPrice })
    await transaction.wait()
    alert("NFT Successfully minted");

  }

  if (loadingState === "loaded" && !nfts.length) {
    return (
      <div>
        <Navbar />
        <h1 className="px-20 py-10 text-3xl">You have not selected</h1>
        <Footer />
      </div>
    );
  }
  return (
    <Box as="section"  sx={styles.section} className="bg-blue-100 ">
    <>
    <div className=" text-4xl text-center text-white font-bold ">
        <h1>Interior design and collections</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 grid-rows-5 sm:grid-rows-3 lg:grid-rows-3 col-gap-2 row-gap-5 bg-gray-300 mx-20 my-5">

      <div className="col-start-1 col-end-3 sm:col-end-3 lg:col-end-3 row-span-2 sm:row-span-2 lg:row-span-2 text-white bg-indigo-500 text-4xl flex items-center justify-center border-4 border-red-500">

  <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 pt-4">

    <div  className="shadow rounded-xl overflow-hidden">
      <img
        title="Car Pics"
        frameBorder="0"
        scrolling="no"
        height="450px"
        width="100%"
        src={`${image}#toolbar=0`}
        className="object-fill h-400 w-full"
      />
      <div className="p-4">
        <p style={{ height: "20px" }} className="text-3xl font-semibold"></p>
      </div>
      <div className="p-4">
        <p style={{ height: "20px" }} className="text-3xl font-semibold"></p>
      </div>
    
      <div className="p-4">
        <p style={{ height: "50px" }} className="text-2xl font-semibold"></p>
      </div>

    </div>

</div>
    
  </div>
	<div className="text-white bg-indigo-500 text-4xl flex items-center justify-center border-4 border-red-500">
  <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 pt-4">

    <div className="rounded-xl overflow-hidden">
      <img
        title="Car Pics"
        frameBorder="0"
        scrolling="no"
        height="450px"
        width="100%"
        src={`${image2}#toolbar=0`}
        className="object-fill h-400 w-full"
      />

    </div>
</div>
    
    
  </div>
	<div className="row-span-3 text-black bg-white text-2xl flex text-left p-3 ">
    
    <div className="bg-white shadow rounded-xl overflow-hidden">
      <div className="p-4">
        <p style={{ height: "20px" }} className="text-3xl font-semibold underline">collections</p>
      </div>
      <br/><p>
      Also on the ground floor are artifacts from the New Kingdom, the time period between 1550 and 1069 BC. These artifacts are generally larger than items created in earlier centuries. Those items include statues, tables, and coffins (sarcophagi). It contains 42 rooms; with many items on view from sarcophagi and boats to enormous statues. </p>
      <br/><p>
      On the first floor are artifacts from the final two dynasties of Egypt, including items from the tombs of the Pharaohs Thutmosis III, Thutmosis IV, Amenophis II, Hatshepsut, and the courtier Maiherpri, as well as many artifacts from the Valley of the Kings, in particular the material from the intact tombs of Tutankhamun and Psusennes I. </p>
<br/><p>
Until 2021, two rooms contained a number of mummies of kings and other royal family members of the New Kingdom. On April 3, 2021, twenty-two of these mummies were transferred to the National Museum of Egyptian Civilization in Fustat in a grand parade dubbed The Pharaohs' Golden Parade.[</p>

  </div> </div>
	<div className="text-white bg-indigo-500  text-4xl flex items-center justify-center border-4 border-red-500">
    
  <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 pt-4">

    <div className="shadow rounded-xl overflow-hidden">
      <img
        title="Car Pics"
        frameBorder="0"
        scrolling="no"
        height="450px"
        width="100%"
        src={`${image3}#toolbar=0`}
        className="object-fill h-400 w-full"
      />

    </div>

</div>

</div>
<div className="grid grid-rows-2 lg:grid-cols-4 col-span-2 lg:col-span-3 text-white bg-indigo-500  text-2xl  items-center justify-center">
    
    <div className="p-4 bg-indigo-500 ">
                  <button type="button" className="w-full bg-blue-800 text-white font-bold py-2 px-12 border-b-4 border-blue-200 hover:border-blue-500 rounded-full">
                    <a
                      className="social-icon-link github"
                      href="https://web3chat-holyaustin.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="chat"
                    >Chat 
                    </a>
                  </button>
                </div>
                <div className="p-4 bg-indigo-500">
                  <button type="button" className="w-full bg-blue-800 text-white font-bold py-2 px-12 border-b-4 border-blue-200 hover:border-blue-500 rounded-full" onClick={() => Mint1()}> Mint NFT 1</button>
                </div>
                <div className="p-4 bg-indigo-500">
                  <button type="button" className="w-full bg-blue-800 text-white font-bold py-2 px-12 border-b-4 border-blue-200 hover:border-blue-500 rounded-full" onClick={() => Mint2()}> Mint NFT 2</button>
                </div>
                <div className="p-4 bg-indigo-500">
                  <button type="button" className="w-full bg-blue-800 text-white font-bold py-2 px-12 border-b-4 border-blue-200 hover:border-blue-500 rounded-full" onClick={() => Next()}>Next page</button>
                </div>
            
    </div>

   
</div>
    </>
      </Box>
  );
}

const styles = {
  section: {
    backgroundColor: '#101233',
    pt: [17, null, null, 20, null],
    pb: [6, null, null, 12, 16],
  },
 };
