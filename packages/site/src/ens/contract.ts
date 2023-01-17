import { ethers } from 'ethers';

export const ENS_CONTRACT_ADDRESS =
  '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85';

export const getContract = async (
  contractAddress: string,
  contractAbi: any,
) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    return new ethers.Contract(contractAddress, contractAbi, provider);
  } catch (error: any) {
    throw new Error(`Error initiating the contract. Reason: ${error.message}`);
  }
};
