import React, { useEffect, useState } from "react";
import { jsx, Box } from 'theme-ui';
import { ethers } from "ethers";
import Web3Modal from 'web3modal'
import axios from "axios";
import { useRouter } from 'next/router'

import fileNFT from "../artifacts/contracts/Minter.sol/Minter.json";
import { MinterAddress } from "../config2";

export default function ViewFile() {
  console.log('Entered viewing component');
  const router = useRouter();
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const image = "/slave/SlaveShipplan.webp"
  const image2 = "/slave/7.webp"
  const image3 = "/slave/2.jpg"
  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    // loadBounties();
  }, []);
  const getIPFSGatewayURL = (ipfsURL) => {
    const urlArray = ipfsURL.split("/");
    const ipfsGateWayURL = `https://${urlArray[2]}.ipfs.nftstorage.link/${urlArray[3]}`;
    return ipfsGateWayURL;
  };

  const getId = (props) => {
    console.log(props);
    return props;
  };

  async function Next() {
    router.push("/page7");
  }
  const rpcUrl = "https://data-seed-prebsc-1-s3.binance.org:8545/";

   const { query: id } = router; 
   const props =  id ;
   console.log('Props result is without ', props.id);


   async function Mint2() {
    console.log("Minting NFT1");
    const url2 = "https://dweb.link/ipfs/bafkreidjp2mriqgeaheap2m7o2ypvwj4fb3r3isjtvkdppyiud7z3ek27i";
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    /* create the NFT */
    //const price = ethers.utils.parseUnits(formInput.price, 'ether')
    let contract = new ethers.Contract(MinterAddress, fileNFT.abi, signer)
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()
    console.log("Listing price is ", listingPrice)
    let transaction = await contract.createFile(url2, { value: listingPrice })
    await transaction.wait()
    alert("NFT Successfully minted");
  }

  async function Mint1() {
    console.log("Minting NFT1");
     const url = "https://dweb.link/ipfs/bafkreigums2o5e7zowjuoincidxvmz77lk7dv2euovxivcgt6lw5pa4pxq ";

    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    /* create the NFT */
    let contract = new ethers.Contract(MinterAddress, fileNFT.abi, signer)
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
        <h1>Mobilizing public support</h1>
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
        <p style={{ height: "20px" }} className="text-3xl font-semibold underline">Page One Information</p>
      </div>
      <br/><p>
      Abolitionists succeeded in mobilizing unprecedented public support. Through a campaign of information they demonstrated what lay behind the sugar, tobacco and coffee enjoyed by Britons. People signed petitions, attended lectures and abstained from eating West Indian sugar.</p>
      <br/><p>
Many people who signed petitions could not vote and this was their only means of expressing their opinion to Parliament. Over 100 petitions against the slave trade were submitted to Parliament in 1788, rising to 519 in 1792. For the first time in a public political campaign, women were extensively involved, adding their voices to the calls for abolition.</p>
<br/><p>
Although the British Parliament outlawed slavery in 1807, a quarter of all Africans who were enslaved were transported across the Atlantic after this date. In British colonies, the institution of slavery carried on as before, until Parliament passed an Emancipation Act in 1833. This was achieved by a combination of active resistance in the Caribbean and campaigning in Britain. Even then, full emancipation was not realized until 1838 when a period of unpaid labour ended and 800,000 people were freed across the British Caribbean. But Parliament also voted to pay the plantation owners £20 million in compensation. No payment was made to the ex-slaves.</p>

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
