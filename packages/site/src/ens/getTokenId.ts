import { BigNumber, utils } from 'ethers';

export const getTokenId = (domain: string): string => {
  try {
    const labelHash = utils.keccak256(utils.toUtf8Bytes(domain));
    const tokenId = BigNumber.from(labelHash).toString();
    return tokenId;
  } catch (error: any) {
    throw new Error(`Error getting the token ID. Reason: ${error.message}`);
  }
};
