import { ethers } from 'ethers';

// The address of the ENS contract on Ethereum mainnet.
export const ENS_CONTRACT_ADDRESS =
  '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85';

/**
 * getContract is an async function that returns an instance of a contract.
 * It takes the contract address and the ABI (Application Binary Interface) of the contract,
 * and creates a new instance of the contract using the ethers library.
 * If the contract instance is created successfully it returns the contract instance,
 * otherwise it throws an error with a message that includes the reason of the error.
 *
 * @param {string} contractAddress - the address of the contract on the blockchain.
 * @param {any} contractAbi - the ABI of the contract, which is used to interact with the contract.
 * @returns {Promise<ethers.Contract>} a promise that resolves with an instance of the contract.
 */

export const getContract = async (
  contractAddress: string,
  contractAbi: any,
): Promise<ethers.Contract> => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    return new ethers.Contract(contractAddress, contractAbi, provider);
  } catch (error: any) {
    throw new Error(`Error initiating the contract. Reason: ${error.message}`);
  }
};
