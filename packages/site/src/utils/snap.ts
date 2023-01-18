import { defaultSnapOrigin } from '../config';
import { GetSnapsResponse, Snap } from '../types';

/**
 * Get the installed snaps in MetaMask.
 *
 * @returns The snaps installed in MetaMask.
 */
export const getSnaps = async (): Promise<GetSnapsResponse> => {
  return (await window.ethereum.request({
    method: 'wallet_getSnaps',
  })) as unknown as GetSnapsResponse;
};

/**
 * Connect a snap to MetaMask.
 *
 * @param snapId - The ID of the snap.
 * @param params - The params to pass with the snap to connect.
 */
export const connectSnap = async (
  snapId: string = defaultSnapOrigin,
  params: Record<'version' | string, unknown> = {},
) => {
  await window.ethereum.request({
    method: 'wallet_enable',
    params: [
      {
        wallet_snap: {
          [snapId]: {
            ...params,
          },
        },
      },
    ],
  });
};

/**
 * Get the snap from MetaMask.
 *
 * @param version - The version of the snap to install (optional).
 * @returns The snap object returned by the extension.
 */
export const getSnap = async (version?: string): Promise<Snap | undefined> => {
  try {
    const snaps = await getSnaps();

    return Object.values(snaps).find(
      (snap) =>
        snap.id === defaultSnapOrigin && (!version || snap.version === version),
    );
  } catch (e) {
    console.log('Failed to obtain installed snap', e);
    return undefined;
  }
};

/**
 * addOrRemoveENSDomain is an async function that adds or removes an ENS domain.
 * It takes the ENS domain, the owner and the expiration date as parameters.
 * It uses the window.ethereum.request method to invoke the Snap function addOrRemoveENSDomain with the provided parameters.
 * If the domain is added or removed successfully it doesn't return anything,
 * otherwise it throws an error with a message that includes the reason of the error.
 *
 * @param {string} ensDomain - the ENS domain to add or remove.
 * @param {string} owner - the owner of the ENS domain.
 * @param {number} expirationDate - the expiration date of the ENS domain.
 */

export const addOrRemoveENSDomain = async (
  ensDomain: string,
  owner: string,
  expirationDate: number,
) => {
  await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: [
      defaultSnapOrigin,
      {
        method: 'addOrRemoveENSDomain',
        params: {
          ensDomain,
          owner,
          expirationDate,
        },
      },
    ],
  });
};

export const isLocalSnap = (snapId: string) => snapId.startsWith('local:');
