/** @jsxRuntime classic */
/** @jsx jsx */

import React, { useEffect, useState } from "react";
import { jsx, Box } from 'theme-ui';
import { ethers } from "ethers";
import axios from "axios";
import { useRouter } from 'next/router'
import { useNavigate, useLocation } from "react-router-dom";
import Web3Modal from "web3modal";
import Image from 'next/image';
import { rgba } from 'polished';
import Popup from 'reactjs-popup';

import fileNFTABI from "../artifacts/contracts/Egypt.sol/Egypt.json";
import fileNFTABI2 from "../artifacts/contracts/Badgry.sol/Badagry.json";
import { egyptAddressarbitrum } from "../config";
import { egyptAddresschiado } from "../config";
import { egyptAddressneon } from "../config";

import { badagryAddressarbitrum } from "../config";
import { badagryAddresschiado } from "../config";
import { badagryAddressneon  } from "../config";

export default function ViewFiles() {
  const router = useRouter();
  //const navigate = useNavigate();
  const [nfts, setNfts] = useState([]);
  const [nfts2, setNfts2] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const [loadingState2, setLoadingState2] = useState("not-loaded");
  const [fileNFT, setFileNFT] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [fileNFT2, setFileNFT2] = useState("");
  const [contractAddress2, setContractAddress2] = useState("");

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    console.log('Entered UseEffect');
    checkNetwork();
    try {
    // arbitrum sepolia testnet
    if (window.ethereum.networkVersion == "421614")  {
      console.log('currently inside Arbitrum Sepolia Testnet');
      setFileNFT(fileNFTABI);
      setContractAddress(egyptAddressarbitrum);
      setFileNFT2(fileNFTABI2);
      setContractAddress2(badagryAddressarbitrum);
      loadfileNFTAbitrum();
      return;
    } 
    // gnosis chiado testnet
    else if (window.ethereum.networkVersion == "10200") {
      console.log('currently inside Gnosis Chiado Testnet');
      setFileNFT(fileNFTABI);
      setContractAddress(egyptAddresschiado);
      setFileNFT2(fileNFTABI2);
      setContractAddress2(badagryAddresschiado);
      loadfileNFTChiado()
      return;
    } 
    // neon devnet
    else if (window.ethereum.networkVersion == "245022926") {
      console.log('currently inside Neon Devnet');
      setFileNFT(fileNFTABI);
      setContractAddress(egyptAddressneon);
      setFileNFT2(fileNFTABI2);
      setContractAddress2(badagryAddressneon);
      loadfileNFTNeon()
      return;
    } 
    else {
      router.push("/");
      return;
    }
      
    } catch (error) {
      console.log(error);
    }
    
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

  const getIPFSGatewayURL = (ipfsURL) => {
    const urlArray = ipfsURL.split("/");
    const ipfsGateWayURL = `https://${urlArray[2]}.ipfs.nftstorage.link/${urlArray[3]}`;
    return ipfsGateWayURL;
  };

  async function loadfileNFTAbitrum() {
    const web3Modal = new Web3Modal({
      cacheProvider: true,
    })
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(egyptAddressarbitrum, fileNFTABI.abi, signer);
    const data = await contract.fetchAllStorageItems();

    const contract2 = new ethers.Contract(badagryAddressarbitrum, fileNFTABI.abi, signer);
    const data2 = await contract2.fetchAllStorageItems();
    /*
    *  map over items returned from smart contract and format
    *  them as well as fetch their token metadata
    */
    const items = await Promise.all(data.map(async i => {
      console.log("i is ", i);
      console.log("i.tokenId ", i.tokenId);
      const tokenUri = await contract.tokenURI(i.tokenId);
      console.log("token Uri is ", tokenUri);
      const httpUri = getIPFSGatewayURL(tokenUri);
      console.log("Http Uri is ", httpUri);
      const meta = await axios.get(httpUri);

      const filename = i.fileName;
      console.log("Filename is ", filename);
      const created = new Date((i.dateCreated).toNumber() * 1000).toLocaleDateString();
      console.log("date created is ", created);
      const description = i.description;
      console.log("description is ", description);

      const item = {
        tokenId: i.tokenId.toNumber(),
        image: getIPFSGatewayURL(meta.data.image),
        name: meta.data.name,
        description: meta.data.description,
        sharelink: getIPFSGatewayURL(meta.data.image),

      };
      console.log("item returned is ", item);
      return item;
    }));

    setNfts(items);
    setLoadingState("loaded");

    console.log ("END OF ITEM 1 START OF ITEM 2")

    const items2 = await Promise.all(data2.map(async i => {
      console.log("i is ", i);
      console.log("i.tokenId ", i.tokenId);
      const tokenUri2 = await contract2.tokenURI(i.tokenId);
      console.log("token Uri2 is ", tokenUri2);
      const httpUri2 = getIPFSGatewayURL(tokenUri2);
      console.log("Http Uri 2is ", httpUri2);
      const meta2 = await axios.get(httpUri2);

      const filename2 = i.fileName;
      console.log("Filename2 is ", filename2);
      const created2 = new Date((i.dateCreated).toNumber() * 1000).toLocaleDateString();
      console.log("date2 created is ", created2);
      const description2 = i.description;
      console.log("description2 is ", description2);

      const item2 = {
        tokenId: i.tokenId.toNumber(),
        image: getIPFSGatewayURL(meta2.data.image),
        name: meta2.data.name,
        description: meta2.data.description,
        sharelink: getIPFSGatewayURL(meta2.data.image),

      };
      console.log("item2 returned is ", item2);
      return item2;
    }));

    setNfts2(items2);
    setLoadingState2("loaded");
  }

  async function loadfileNFTChiado() {
    const web3Modal = new Web3Modal({
      cacheProvider: true,
    })
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(egyptAddresschiado, fileNFTABI.abi, signer);
    const data = await contract.fetchAllStorageItems();

    const contract2 = new ethers.Contract(badagryAddresschiado, fileNFTABI2.abi, signer);
    const data2 = await contract2.fetchAllStorageItems();
    /*
    *  map over items returned from smart contract and format
    *  them as well as fetch their token metadata
    */
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await contract.tokenURI(i.tokenId);
      console.log("token Uri is ", tokenUri);
      const httpUri = getIPFSGatewayURL(tokenUri);
      console.log("Http Uri is ", httpUri);
      const meta = await axios.get(httpUri);

      const filename = i.fileName;
      console.log("Filename is ", filename);
      const created = new Date((i.dateCreated).toNumber() * 1000).toLocaleDateString();
      console.log("date created is ", created);
      const description = i.description;
      console.log("description is ", description);

      const item = {
        tokenId: i.tokenId.toNumber(),
        image: getIPFSGatewayURL(meta.data.image),
        name: meta.data.name,
        description: meta.data.description,
        sharelink: getIPFSGatewayURL(meta.data.image),

      };
      console.log("item returned is ", item);
      return item;
    }));

    setNfts(items);
    setLoadingState("loaded");

    console.log ("END OF ITEM 1 START OF ITEM 2")

    const items2 = await Promise.all(data2.map(async i => {
      console.log("i is ", i);
      console.log("i.tokenId ", i.tokenId);
      const tokenUri2 = await contract2.tokenURI(i.tokenId);
      console.log("token Uri2 is ", tokenUri2);
      const httpUri2 = getIPFSGatewayURL(tokenUri2);
      console.log("Http Uri 2is ", httpUri2);
      const meta2 = await axios.get(httpUri2);

      const filename2 = i.fileName;
      console.log("Filename2 is ", filename2);
      const created2 = new Date((i.dateCreated).toNumber() * 1000).toLocaleDateString();
      console.log("date2 created is ", created2);
      const description2 = i.description;
      console.log("description2 is ", description2);

      const item2 = {
        tokenId: i.tokenId.toNumber(),
        image: getIPFSGatewayURL(meta2.data.image),
        name: meta2.data.name,
        description: meta2.data.description,
        sharelink: getIPFSGatewayURL(meta2.data.image),

      };
      console.log("item2 returned is ", item2);
      return item2;
    }));

    setNfts2(items2);
    setLoadingState2("loaded");
  }

  async function loadfileNFTNeon() {
    const web3Modal = new Web3Modal({
      cacheProvider: true,
    })
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(egyptAddressneon, fileNFTABI.abi, signer);
    const data = await contract.fetchAllStorageItems();

    const contract2 = new ethers.Contract(badagryAddressneon, fileNFTABI2.abi, signer);
    const data2 = await contract2.fetchAllStorageItems();
    /*
    *  map over items returned from smart contract and format
    *  them as well as fetch their token metadata
    */
    const items = await Promise.all(data.map(async i => {
      console.log("i is ", i);
      console.log("i.tokenId ", i.tokenId);
      const tokenUri = await contract.tokenURI(i.tokenId);
      console.log("token Uri is ", tokenUri);
      const httpUri = getIPFSGatewayURL(tokenUri);
      console.log("Http Uri is ", httpUri);
      const meta = await axios.get(httpUri);

      const filename = i.fileName;
      console.log("Filename is ", filename);
      const created = new Date((i.dateCreated).toNumber() * 1000).toLocaleDateString();
      console.log("date created is ", created);
      const description = i.description;
      console.log("description is ", description);

      const item = {
        tokenId: i.tokenId.toNumber(),
        image: getIPFSGatewayURL(meta.data.image),
        name: meta.data.name,
        description: meta.data.description,
        sharelink: getIPFSGatewayURL(meta.data.image),

      };
      console.log("item returned is ", item);
      return item;
    }));

    setNfts(items);
    setLoadingState("loaded");

    console.log ("END OF ITEM 1 START OF ITEM 2")

    const items2 = await Promise.all(data2.map(async i => {
      console.log("i is ", i);
      console.log("i.tokenId ", i.tokenId);
      const tokenUri2 = await contract2.tokenURI(i.tokenId);
      console.log("token Uri2 is ", tokenUri2);
      const httpUri2 = getIPFSGatewayURL(tokenUri2);
      console.log("Http Uri 2is ", httpUri2);
      const meta2 = await axios.get(httpUri2);

      const filename2 = i.fileName;
      console.log("Filename2 is ", filename2);
      const created2 = new Date((i.dateCreated).toNumber() * 1000).toLocaleDateString();
      console.log("date2 created is ", created2);
      const description2 = i.description;
      console.log("description2 is ", description2);

      const item2 = {
        tokenId: i.tokenId.toNumber(),
        image: getIPFSGatewayURL(meta2.data.image),
        name: meta2.data.name,
        description: meta2.data.description,
        sharelink: getIPFSGatewayURL(meta2.data.image),

      };
      console.log("item2 returned is ", item2);
      return item2;
    }));

    setNfts2(items2);
    setLoadingState2("loaded");
  }

  async function NewsDetails(nft) {
    console.log("item id clicked is", nft.tokenId);
    const vid = nft.tokenId;
    router.push({
        pathname: "/watch",
        query: {vid}
      });
      console.log('Prop result is ', { vid } )
  }

  const PosterImage = () => {
    return (
      <Image
        src={blenderPoster}
        layout="fill"
        objectFit="cover"
        priority
        placeholder="blur"
      />
    );
  };


  if ((loadingState === "loaded" && !nfts.length) && (loadingState === "loaded" && !nfts2.length)) {
    return ( 
      <div sx={styles.section}>
        <h1 className="px-20 py-10 text-3xl text-white">Empty drive, no file yet</h1>
      </div>
    );
  }
  return (
    <Box as="section"  sx={styles.section}>
      <div className="bg-red-400 text-4xl text-center text-white font-bold pt-5 pb-4">
        <h1> Museum 3 Marketplace</h1>
      </div>

      <div className="bg-red-400 text-2xl text-center text-black font-bold pt-5 pb-4">
        <h2>Egypt collections</h2>
      </div>
      <div className="flex justify-center bg-blue-100 mb-12">

      <div className="px-4" style={{ maxWidth: "1600px" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-2">
          {nfts.map((nft, i) => (

            <div key={i} className="shadow rounded-xl overflow-hidden border-2 border-white-500">
              
              <img
                title="file NFT"
                height="auto"
                width="100%"
                objectfit="cover"
                src={`${nft.image}#toolbar=0&embedded=true`}
                //className="py-3 object-cover h-500"
                style={{ height: "300px", overflow: 'hidden' }}
              />
              <div className="p-1">
                <p style={{ height: "45px", overflow: 'hidden' }} className="text-xl text-blue-800 font-semibold leading-none"> {nft.name}      </p>
                <div style={{ height: '100px', overflow: 'hidden' }}>
                    <p className="text-gray-700 pt-2">Description : {nft.description} </p>
                </div>
                
              </div>

              <div className="p-2 bg-black">
                <button type="button" className="mt-1 w-full bg-blue-500 text-white font-bold py-2 px-12 rounded" onClick={() => NewsDetails(nft)}>Buy Collectible</button>
              </div>
  
              
            </div>
          ))}
        </div>
      </div>

      </div>
      


      <div className="bg-red-400 text-2xl text-center text-black font-bold pt-5 pb-4">
        
        <h2>Badagry Slave collections</h2>
      </div>
      <div className="flex justify-center bg-blue-100 mb-12">

      <div className="px-4" style={{ maxWidth: "1600px" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-2">
          {nfts2.map((nft2, i) => (

            <div key={i} className="shadow rounded-xl overflow-hidden border-2 border-white-500">
              
              <img
                title="file NFT"
                height="auto"
                width="100%"
                objectfit="cover"
                src={`${nft2.image}#toolbar=0&embedded=true`}
                //className="py-3 object-cover h-500"
                style={{ height: "300px", overflow: 'hidden' }}
              />
              <div className="p-1">
                <p style={{ height: "45px", overflow: 'hidden' }} className="text-xl text-blue-800 font-semibold leading-none"> {nft2.name}      </p>
                <div style={{ height: '100px', overflow: 'hidden' }}>
                    <p className="text-gray-700 pt-2">Description : {nft2.description} </p>
                </div>
                
              </div>

              <div className="p-2 bg-black">
                <button type="button" className="mt-1 w-full bg-blue-500 text-white font-bold py-2 px-12 rounded" onClick={() => NewsDetails(nft2)}>Buy Collectible</button>
              </div>
  
              
            </div>
          ))}
        </div>
      </div>

    </div>
    </Box>
  );
}

const styles = {
  section: {
    backgroundColor: '#000',
    pt: [4, null, null, null, null],
    pb: [6, null, null, 12, 16],
  },
 };
