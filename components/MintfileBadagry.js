/** @jsxRuntime classic */
/** @jsx jsx */

import React, { useEffect, useState } from "react";
import { jsx, Box } from 'theme-ui';
import { NFTStorage } from "nft.storage";
import { useRouter } from 'next/router'
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import axios from 'axios'
import { rgba } from 'polished';
import { Wallet, providers } from "ethers";
import 'dotenv/config';

import fileNFTABI2 from "../artifacts/contracts/Badgry.sol/Badagry.json";
import { badagryAddressarbitrum } from "../config";
import { badagryAddresschiado } from "../config";
import { badagryAddressneon  } from "../config";


const APIKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDA4Zjc4ODAwMkUzZDAwNEIxMDI3NTFGMUQ0OTJlNmI1NjNFODE3NmMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1MzA1NjE4NzM4MCwibmFtZSI6InBlbnNpb25maSJ9.agI-2V-FeK_eVRAZ-T6KGGfE9ltWrTUQ7brFzzYVwdM";

const MintFile = () => {
  const navigate = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);
  const [uploadedFile, setUploadedFile] = useState();
  const [imageView, setImageView] = useState();
  const [metaDataURL, setMetaDataURl] = useState();
  const [txURL, setTxURL] = useState();
  const [txStatus, setTxStatus] = useState();
  const [formInput, updateFormInput] = useState({ name: "" });

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    console.log('Entered UseEffect');
    checkNetwork();
        
  }, []);

  const checkNetwork = async () => {
    try {
      if ((window.ethereum.networkVersion !== "421614") && (window.ethereum.networkVersion !== "245022926") && (window.ethereum.networkVersion !== "10200")) {
    
        alert("Please connect to Arbitrum Sepolia Testnet or Gnosis Chiado Testnet or Neon Devnet Blockchain! \n You can add it to your Wallet using \n https://chainlist.org/?testnets=true");
        router.push("/select");
        return;
      } 
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileUpload = (event) => {
    console.log("file for upload selected...");
    setUploadedFile(event.target.files[0]);
    setTxStatus("");
    setImageView("");
    setMetaDataURl("");
    setTxURL("");
  };

  const uploadNFTContent = async (inputFile) => {
    const { name, description } = formInput;
    if (!name || !description || !inputFile) return;
    const nftStorage = new NFTStorage({ token: APIKEY, });
    try {
      console.log("Trying to upload file to ipfs");
      setTxStatus("Uploading Item to IPFS & Filecoin via NFT.storage.");
      console.log("close to metadata");
      const metaData = await nftStorage.store({
        name,
        description,
        image: inputFile,
      });
      setMetaDataURl(metaData.url);
      console.log("metadata is: ", { metaData });
      return metaData;
    } catch (error) {
      setErrorMessage("Could store file to NFT.Storage - Aborted file upload.");
      console.log("Error Uploading Content", error);
    }
  };

  const sendTxToBlockchain = async (metadata) => {
    try {
      if (window.ethereum.networkVersion == "421614")  {
      setTxStatus("Adding transaction to Blockchain");
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
          console.log('currently inside Arbitrum Sepolia Testnet');
          const connectedContract = new ethers.Contract(badagryAddressarbitrum , fileNFTABI2.abi, provider.getSigner());
          console.log("Connected to contract", badagryAddressarbitrum );
          console.log("IPFS blockchain uri is ", metadata.url);
    
          const mintNFTTx = await connectedContract.createFile(metadata.url);
          console.log("File successfully created and added to Blockchain");
          await mintNFTTx.wait();
          return mintNFTTx;
        } 
        // gnosis chiado testnet
        else if (window.ethereum.networkVersion == "10200") {
          console.log('currently inside Gnosis Chiado Testnet');
          setTxStatus("Adding transaction to Blockchain");
          const web3Modal = new Web3Modal();
          const connection = await web3Modal.connect();
          const provider = new ethers.providers.Web3Provider(connection);
              const connectedContract = new ethers.Contract(badagryAddresschiado , fileNFTABI2.abi, provider.getSigner());
              console.log("Connected to contract", badagryAddresschiado );
              console.log("IPFS blockchain uri is ", metadata.url);
        
              const mintNFTTx = await connectedContract.createFile(metadata.url);
              console.log("File successfully created and added to Blockchain");
              await mintNFTTx.wait();
              return mintNFTTx;
        } 
        // neon devnet
        else if (window.ethereum.networkVersion == "245022926") {
          console.log('currently inside Neon Devnet');
          setTxStatus("Adding transaction to Blockchain");
          const web3Modal = new Web3Modal();
          const connection = await web3Modal.connect();
          const provider = new ethers.providers.Web3Provider(connection);
              const connectedContract = new ethers.Contract(badagryAddressneon , fileNFTABI2.abi, provider.getSigner());
              console.log("Connected to contract", badagryAddressneon );
              console.log("IPFS blockchain uri is ", metadata.url);
        
              const mintNFTTx = await connectedContract.createFile(metadata.url);
              console.log("File successfully created and added to Blockchain");
              await mintNFTTx.wait();
              return mintNFTTx;
        } 
        else {
          router.push("/");
          return;
        }
    } catch (error) {
      setErrorMessage("Failed to send tx to Blockchain.");
      console.log(error);
    }
  };

  const previewNFT = (metaData, mintNFTTx) => {
    console.log("getIPFSGatewayURL2 two is ...");
    const imgViewString = getIPFSGatewayURL(metaData.data.image.pathname);
    console.log("image ipfs path is", imgViewString);
    setImageView(imgViewString);
    setMetaDataURl(getIPFSGatewayURL(metaData.url));
    setTxURL(`Check transaction on Blockchain Explorer`);
    setTxStatus("File addition was successfully!");
    console.log("File preview completed");
  };

  const mintNFTFile = async (e, uploadedFile) => {
    e.preventDefault();
    // 1. upload File content via NFT.storage
    const metaData = await uploadNFTContent(uploadedFile);

    // 2. Mint a NFT token on Chain
    const mintNFTTx = await sendTxToBlockchain(metaData);

    // 3. preview the minted nft
   previewNFT(metaData, mintNFTTx);

    //4. Mint Reward
    navigate.push('/marketplace');
  };

  const getIPFSGatewayURL = (ipfsURL) => {
    const urlArray = ipfsURL.split("/");
    console.log("urlArray = ", urlArray);
    const ipfsGateWayURL = `https://${urlArray[2]}.ipfs.nftstorage.link/${urlArray[3]}`;
    console.log("ipfsGateWayURL = ", ipfsGateWayURL)
    return ipfsGateWayURL;
  };

  return (
    <Box as="section"  sx={styles.section}>
      <div className="text-4xl text-center text-black font-bold pt-1">
        <h1> Upload Badagry NFT</h1>
      </div>
      <div className="flex justify-center bg-blue-100 text-black">
        <div className="w-1/2 flex flex-col pb-12 ">
        <input
            placeholder="Name of NFT"
            className="mt-5 border rounded p-4 text-xl"
            onChange={(e) => updateFormInput({ ...formInput, name: e.target.value })}
          />
          <br />
          <textarea
            placeholder="Brief description of NFT"
            className="mt-5 border rounded p-4 text-xl"
            onChange={(e) => updateFormInput({ ...formInput, description: e.target.value })}
            rows={2}
          />
          <br />
          <div className="MintNFT text-black text-xl">
            <form>
              <h3>Select a File</h3>
              <input type="file" onChange={handleFileUpload} className="text-black mt-2 border rounded  text-2xl" />
            </form>
            {txStatus && <p>{txStatus}</p>}
            
            {metaDataURL && <p className="text-blue"><a href={metaDataURL} className="text-blue">Metadata on IPFS</a></p>}
            
            {txURL && <p><a href={txURL} className="text-blue">See the mint transaction</a></p>}
           
            {errorMessage}

            
            {imageView && (
            <iframe
              className="mb-10"
              title="File"
              src={imageView}
              alt="File preview"
              frameBorder="0"
              scrolling="auto"
              height="50%"
              width="100%"
            />
            )}

          </div>

          <button type="button" onClick={(e) => mintNFTFile(e, uploadedFile)} className="font-bold mt-20 bg-yellow-500 text-white text-2xl rounded p-4 shadow-lg">
            Publish NFT to Marketplace
          </button>
        </div>
      </div>
    </Box>

  );
};
export default MintFile;

const styles = {
  section: {
    backgroundColor: 'primary',
    pt: [7, null, null, 20, null],
    pb: [6, null, null, 12, 16],
  },
};
