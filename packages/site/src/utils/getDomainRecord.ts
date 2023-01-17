import {
  getContract,
  getExpirationDate,
  getTokenId,
  getOwner,
  ENS_CONTRACT_ADDRESS,
} from '../ens';

import ContractABI from '../ens/ContractABI.json';

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
      `Error getting the domain record. Reason: ${error.message}`,
    );
  }
};
