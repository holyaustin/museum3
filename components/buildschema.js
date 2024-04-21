import React from 'react';
const {
    SignProtocolClient,
    SpMode,
    EvmChains
  } = require("@ethsign/sp-sdk");
const { privateKeyToAccount } = require("viem/accounts");
require('dotenv').config();
  const privateKey = process.env.ACCOUNT_PRIVATE_KEY;
  const client = new SignProtocolClient(SpMode.OnChain, {
    chain: EvmChains.arbitrumSepolia,
    account: privateKeyToAccount(privateKey) // optional
  });
  
export default function BuildSchema() { }
