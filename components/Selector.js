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


export default function ViewFiles() {
  const router = useRouter();

  const [loadingState, setLoadingState] = useState("not-loaded");
  
  async function Page1() {
    console.log("Page 1 clicked");
    router.push({
        pathname: "/page1",
      });
  }

  if (loadingState === "loaded" && !nfts.length) {
    return (
      <div sx={styles.section}>
        <h1 className="px-20 py-10 text-3xl text-white">Empty drive, no file yet</h1>
      </div>
    );
  }
  return (
    <Box as="section"  sx={styles.section}>
      <div className="bg-blue-100 text-4xl text-center text-black font-bold pt-5 pb-4 bg-[#101233]">
        <h1> Select a Museum</h1>
      </div>
    <div className="flex justify-center bg-blue-100 mb-12">

      <div className="px-4" style={{ maxWidth: "1600px" }}>


      <div className="text-2xl  p-3 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 mb-5">
                <button type="button" className="mt-2 w-full bg-blue-800 text-white font-bold py-3 px-12 rounded" onClick={() => Page1()}>Museum of African Slave Trade (Badagry) - Nigeria</button>

                <button type="button" className="mt-1 w-full bg-blue-800 text-white font-bold py-3 px-12 rounded  disabled:opacity-75 " disabled onClick={() => NewsDetails(nft)} >Museum of Modern Art of Algiers – Algeria</button>

                <button type="button" className="mt-1 w-full bg-blue-800 text-white font-bold py-2 px-12 rounded disabled:opacity-75 " disabled onClick={() => NewsDetails(nft)}>Museum of Egyptian Antiquities – Egypt</button>

                <button type="button" className="mt-1 w-full bg-blue-800 text-white font-bold py-2 px-12 rounded disabled:opacity-75 " disabled onClick={() => NewsDetails(nft)}>National Museum of Ethiopia – Ethiopia</button>

                <button type="button" className="mt-1 w-full bg-blue-800 text-white font-bold py-2 px-12 rounded disabled:opacity-75 " disabled onClick={() => NewsDetails(nft)}>Cape Coast Castle Museum – Ghana</button>

                <button type="button" className="mt-1 w-full bg-blue-800 text-white font-bold py-2 px-12 rounded disabled:opacity-75 " disabled onClick={() => NewsDetails(nft)}>National Museum of Mali – Mali</button>

                <button type="button" className="mt-1 w-full bg-blue-800 text-white font-bold py-2 px-12 rounded disabled:opacity-75 " disabled onClick={() => NewsDetails(nft)}>Apartheid Museum – South Africa</button>

                <button type="button" className="mt-1 w-full bg-blue-800 text-white font-bold py-2 px-12 rounded disabled:opacity-75 " disabled onClick={() => NewsDetails(nft)}> Iziko South African Museum – South Africa</button>

                <button type="button" className="mt-1 w-full bg-blue-800 text-white font-bold py-2 px-12 rounded disabled:opacity-75 " disabled onClick={() => NewsDetails(nft)}>Zanzibar National Museum of History and Culture – Tanzania</button>
              </div>
              
      </div>

    </div>
    </Box>
  );
}

const styles = {
  section: {
    backgroundColor: '#101233',
    pt: [17, null, null, 20, null],
    pb: [null, null, null, 12, null],
  },
 };
