import { ethers } from 'ethers';

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
