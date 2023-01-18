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
