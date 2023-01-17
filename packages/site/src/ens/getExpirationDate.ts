import { ethers } from 'ethers';

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
