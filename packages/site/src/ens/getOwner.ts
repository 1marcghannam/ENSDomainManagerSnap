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
