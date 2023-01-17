import { ethers } from 'ethers';

export const getContract = (contractAddress: string, contractAbi: any) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(
      'https://eth-rpc.gateway.pokt.network/',
    );
    return new ethers.Contract(contractAddress, contractAbi, provider);
  } catch (error: any) {
    throw new Error(`Error initiating the contract. Reason: ${error.message}`);
  }
};
