import { ethers, BigNumber, utils } from 'ethers';

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
    const provider = new ethers.providers.Web3Provider(wallet as any);
    return new ethers.Contract(contractAddress, contractAbi, provider);
  } catch (error: any) {
    throw new Error(`Error initiating the contract. Reason: ${error.message}`);
  }
};

/**
 * getTokenId is a function that returns the token ID of an ENS domain.
 * It takes the domain as a parameter and returns the token ID as a string.
 * It first calculates the label hash of the domain using the keccak256 function from the utils library,
 * then it creates a big number from the label hash and returns its string representation as the token ID.
 * If the token ID is retrieved successfully it returns the token ID,
 * otherwise it throws an error with a message that includes the reason of the error.
 *
 * @param {string} domain - the ENS domain to get the token ID for.
 * @returns {bigint} the token ID of the ENS domain.
 */

export const getTokenId = (domain: string): bigint => {
  try {
    const labelHash = utils.keccak256(utils.toUtf8Bytes(domain));
    const tokenId = BigInt(BigNumber.from(labelHash).toString());
    return tokenId;
  } catch (error: any) {
    throw new Error(`Error getting the token ID. Reason: ${error.message}`);
  }
};

/**
 * getOwner is an async function that returns the owner of an ENS domain.
 * It takes the token ID and an instance of the ENS contract as parameters.
 * It uses the contract instance to call the ownerOf function which returns the owner of the ENS domain.
 * If the owner is retrieved successfully it returns the owner,
 * otherwise it throws an error with a message that includes the reason of the error.
 *
 * @param {bigint} tokenId - the token ID of the ENS domain.
 * @param {any} contract - the instance of the ENS contract.
 * @returns {Promise<string>} a promise that resolves with the owner of the ENS domain.
 */

export const getOwner = async (
  tokenId: bigint,
  contract: any,
): Promise<string> => {
  try {
    const owner = await contract.ownerOf(tokenId);
    return owner;
  } catch (error: any) {
    throw new Error(
      `Error getting the owner of the tokenId: ${tokenId}. Reason: ${error.message}`,
    );
  }
};

/**
 * getExpirationDate is an async function that returns the expiration date of an ENS domain.
 * It takes the token ID and an instance of the ENS contract as parameters.
 * It uses the contract instance to call the nameExpires function which returns the expiration date of the ENS domain.
 * It then converts the expiration date from a bigint to a number and returns it.
 * If the expiration date is retrieved successfully it returns the expiration date,
 * otherwise it throws an error with a message that includes the reason of the error.
 *
 * @param {bigint} tokenId - the token ID of the ENS domain.
 * @param {any} contract - the instance of the ENS contract.
 * @returns {Promise<number>} a promise that resolves with the expiration date of the ENS domain.
 */

export const getExpirationDate = async (
  tokenId: bigint,
  contract: any,
): Promise<number> => {
  try {
    const expirationDate = await contract.nameExpires(tokenId);
    return Number(ethers.utils.formatUnits(expirationDate, 0));
  } catch (error: any) {
    throw new Error(
      `Error getting the expiration date. Reason: ${error.message}`,
    );
  }
};
