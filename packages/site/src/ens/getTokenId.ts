import { BigNumber, utils } from 'ethers';

/**
 * getTokenId is a function that returns the token ID of an ENS domain.
 * It takes the domain as a parameter and returns the token ID as a string.
 * It first calculates the label hash of the domain using the keccak256 function from the utils library,
 * then it creates a big number from the label hash and returns its string representation as the token ID.
 * If the token ID is retrieved successfully it returns the token ID,
 * otherwise it throws an error with a message that includes the reason of the error.
 *
 * @param {string} domain - the ENS domain to get the token ID for.
 * @returns {string} the token ID of the ENS domain.
 */

export const getTokenId = (domain: string): string => {
  try {
    const labelHash = utils.keccak256(utils.toUtf8Bytes(domain));
    const tokenId = BigNumber.from(labelHash).toString();
    return tokenId;
  } catch (error: any) {
    throw new Error(`Error getting the token ID. Reason: ${error.message}`);
  }
};
