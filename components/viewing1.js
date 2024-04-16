import React, { useEffect, useState } from "react";
import { jsx, Box } from 'theme-ui';
import { ethers } from "ethers";
import Web3Modal from 'web3modal'
import axios from "axios";
import { useRouter } from 'next/router'

import fileNFT from "../artifacts/contracts/Minter.sol/Minter.json";
import { MinterAddress } from "../config2";

const containerStyle = {
  position: "relative",
  overflow: "hidden",
  width: "50%",
  paddingTop: "56.25%", /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
};
const responsiveIframe = {
  position: "absolute",
  top: "0",
  left: "0",
  bottom: "0",
  right: "0",
  width: "100%",
  height: "100%",
};


export default function ViewFile() {
  console.log('Entered viewing component');
  const router = useRouter();
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const sharelink = "https://www.youtube.com/embed/Zwqy4XRiNBU";
  const image2 = "/slave/1.jpg"
  const image3 = "/slave/6.jpg"
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
    router.push("/page2");
  }
  const rpcUrl = "https://data-seed-prebsc-1-s3.binance.org:8545/";
   // const rpcUrl = "localhost";

   const { query: id } = router; 
   const props =  id ;
   console.log('Props result is without ', props.id);

   async function Mint2() {
    console.log("Minting NFT1");
    const url2 = "https://bafkreidjp2mriqgeaheap2m7o2ypvwj4fb3r3isjtvkdppyiud7z3ek27i.ipfs.dweb.link/";
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
     const url = "https://dweb.link/ipfs/bafkreifm6dg5eh7hwui3fac2jrewiewcu4e7vm5opwuhwznr3p7n4gsdum";

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
        <h1 className="px-20 py-10 text-3xl">You have not selected </h1>
        <Footer />
      </div>
    );
  }
  return (
    <Box as="section"  sx={styles.section} className="bg-blue-100 ">
    <>
    <div className=" text-4xl text-center text-white font-bold ">
        <h1>Africa and Enslavement</h1>
        </div>
        <div className="px-4" style={{ maxWidth: "1600px" }}>
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 grid-rows-5 sm:grid-rows-3 lg:grid-rows-3 col-gap-2 row-gap-5 bg-gray-300 mx-20 my-5">

<div className="col-start-1 col-end-3 sm:col-end-3 lg:col-end-3 row-span-2 sm:row-span-2 lg:row-span-2 text-white bg-indigo-500 text-4xl flex items-center justify-center border-4 border-red-500">

<div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 pt-4">

    <div className="shadow rounded-xl overflow-hidden">

      <iframe
        title="page1"
        //style={responsiveIframe}
        src={`${sharelink}#toolbar=0`}
        //className="py-3 object-fit h-full w-full"
        // objectFit="cover"
        allowFullScreen="allowFullScreen"
        width="720px"
        height= "100%"
      />
      <div className="p-4">
        <p style={{ height: "20px" }} className="text-3xl font-semibold"></p>
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
	<div className="row-span-3 text-black bg-white text-xl flex text-left p-3 ">
       <div  className="bg-white shadow rounded-xl overflow-hidden">
      <div className="p-4">
        <p style={{ height: "20px" }} className="text-3xl font-semibold underline">Page One Information</p>
      </div>
      <br/>
      <p>
      Ivory, gold and other trade resources attracted Europeans to West Africa. As demand for cheap labour to work on plantations in the Americas grew, people enslaved in West Africa became the most valuable ‘commodity’ for European traders.
      </p>
      <br/>
      <p>
Slavery existed in Africa before Europeans arrived. However, their demand for slave labour was so great that traders and their agents searched far inland, devastating the region. Powerful African leaders fuelled the practice by exchanging enslaved people for goods such as alcohol, beads and cloth.</p><br/>
<p>
Britain became the world’s leading slave-trading country. Transatlantic slavery was especially lucrative because ships could sail with full holds on every stage of their voyage, making large profits for merchants in London, Bristol and Liverpool.</p><br/>
<p>
Around 12 million Africans were enslaved in the course of the transatlantic slave trade. Between 1640 and 1807, British ships transported about 3.4 million Africans across the Atlantic.</p>

     
    </div>
  


  </div>
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
    
    <div className="p-4 bg-indigo-500 flex-auto">
                  <button type="button" className="w-full bg-blue-800 text-white font-bold py-2 px-12 border-b-4 border-blue-200 hover:border-blue-500 rounded-full">
                    <a
                      className="social-icon-link github"
                      href="https://web3chat-holyaustin.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="chat"
                    > Chat  
                    </a>
                  </button>
                </div>
                <div className="p-4 bg-indigo-500 flex-auto">
                  <button type="button" className="w-full bg-blue-800 text-white font-bold py-2 px-12 border-b-4 border-blue-200 hover:border-blue-500 rounded-full" onClick={() => Mint1()}> Mint NFT 1</button>
                </div>
                <div className="p-4 bg-indigo-500 flex-auto">
                  <button type="button" className="w-full bg-blue-800 text-white font-bold py-2 px-12 border-b-4 border-blue-200 hover:border-blue-500 rounded-full" onClick={() => Mint2()}>Mint NFT 2</button>
                </div>
                <div className="p-4 bg-indigo-500 flex-auto">
                  <button type="button" className="w-full bg-blue-800 text-white font-bold py-2 px-12 border-b-4 border-blue-200 hover:border-blue-500 rounded-full" onClick={() => Next()}>Next page</button>
                </div>
            
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
    pt: [4, null, null, 20, null],
    pb: [6, null, null, 12, 16],
    display: 'flex', // using flexbox
    flexDirection: 'column', // stack items vertically
    alignItems: 'center', // center items horizontally
    justifyContent: 'center', // center items vertically
  },
  
  // Update your grid container class to include responsive behavior
  // You can add this as inline styles or as a part of your styles object
  
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)', // 4 columns in large screens
    gridTemplateRows: 'auto', // auto rows
    gap: '20px', // space between grid items
    '@media (max-width: 768px)': { // media query for smaller screens
      gridTemplateColumns: 'repeat(2, 1fr)', // 2 columns in smaller screens
    },
    '@media (max-width: 480px)': { // media query for mobile screens
      gridTemplateColumns: '1fr', // 1 column in mobile screens
    },
  },


 };

