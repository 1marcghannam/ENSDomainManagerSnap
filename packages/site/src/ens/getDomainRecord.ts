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
