import ContractABI from './ContractABI.json';
import {
  getContract,
  getExpirationDate,
  getTokenId,
  getOwner,
  ENS_CONTRACT_ADDRESS,
} from '.';

export type DomainRecord = {
  owner: string;
  expirationDate: number;
};

/**
 * getDomainRecord is an async function that returns the domain record of an ENS domain.
 * It takes an ENS domain as a parameter and returns an object containing the owner and expiration date of the domain.
 * It first gets the token ID of the domain, then creates an instance of the ENS contract using the getContract function,
 * and finally, it gets the owner and expiration date of the domain from the contract using the getOwner and getExpirationDate functions.
 * If the domain record is retrieved successfully it returns the domain record,
 * otherwise it throws an error with a message that includes the reason of the error.
 *
 * @param {string} ensDomain - the ENS domain to get the record for.
 * @returns {Promise<DomainRecord>} a promise that resolves with the domain record of the ENS domain.
 */

export const getDomainRecord = async (
  ensDomain: string,
): Promise<DomainRecord> => {
  try {
    const tokenId = BigInt(getTokenId(ensDomain));
    const contract = await getContract(ENS_CONTRACT_ADDRESS, ContractABI);
    const owner = await getOwner(tokenId, contract);
    const expirationDate = await getExpirationDate(tokenId, contract);
    return { owner, expirationDate };
  } catch (error: any) {
    throw new Error(
      `Error getting the domain record. Please make sure that you're storing a valid ENS Domain.`,
    );
  }
};
