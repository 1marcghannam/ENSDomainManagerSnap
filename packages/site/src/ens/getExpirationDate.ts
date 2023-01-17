export const ENS_CONTRACT_ADDRESS =
  '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85';

export const getExpirationDate = async (
  tokenId: bigint,
  contract: any,
): Promise<number> => {
  try {
    const expirationDate = await contract.nameExpires(tokenId);
    return expirationDate;
  } catch (error: any) {
    throw new Error(
      `Error getting the expiration date. Reason: ${error.message}`,
    );
  }
};
