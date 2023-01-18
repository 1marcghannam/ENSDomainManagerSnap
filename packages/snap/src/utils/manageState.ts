import { PersistedData } from '../types';

/**
 * getPersistedData is an async function that returns the persisted data from the storage.
 * It makes a request to the storage with the method 'snap_manageState' and the parameter 'get'
 * If the request is successful it returns the persisted data,
 * otherwise it throws an error with a message that includes the reason of the error.
 *
 * @returns {Promise<Partial<PersistedData>>} a promise that resolves with the persisted data or an empty object if no data is found.
 */

export const getPersistedData = async (): Promise<Partial<PersistedData>> => {
  try {
    const persistedData = await wallet.request<PersistedData>({
      method: 'snap_manageState',
      params: ['get'],
    });
    if (persistedData) {
      return persistedData;
    }
    return {};
  } catch (error: any) {
    throw new Error(
      `Error getting the persisted data. Reason: ${error.message}`,
    );
  }
};

/**
 * addDomainToPersistedData is an async function that adds a domain to the persisted data.
 * It creates a new object with the new domain added to the existing persisted data,
 * and makes a request to the storage with the method 'snap_manageState' and the parameters 'update' and the new persisted data
 * If the request is successful it returns void,
 * otherwise it throws an error with a message that includes the reason of the error.
 *
 * @param {string} ENSDomain - the ENS domain to add.
 * @param {string} owner - the owner of the ENS domain.
 * @param {number} expirationDate - the expiration date of the ENS domain.
 * @param {Partial<PersistedData>} persistedData - the current persisted data.
 * @returns {Promise<void>} a promise that resolves without returning any value.
 */

export const addDomainToPersistedData = async (
  ENSDomain: string,
  owner: string,
  expirationDate: number,
  persistedData: Partial<PersistedData>,
): Promise<void> => {
  try {
    const newPersistedData = {
      ...persistedData,
      [ENSDomain]: {
        owner,
        expirationDate,
      },
    };
    await wallet.request({
      method: 'snap_manageState',
      params: ['update', newPersistedData],
    });
  } catch (error: any) {
    throw new Error(
      `Error adding domain to the persisted data. Reason: ${error.message}`,
    );
  }
};

/**
 * removeDomainFromPersistedData is an async function that removes a domain from the persisted data.
 * It deletes the domain from the existing persisted data,
 * and makes a request to the storage with the method 'snap_manageState' and the parameters 'update' and the new persisted data
 * If the request is successful it returns void,
 * otherwise it throws an error with a message that includes the reason of the error.
 *
 * @param {string} ENSDomain - the ENS domain to remove.
 * @param {Partial<PersistedData>} persistedData - the current persisted data.
 * @returns {Promise<void>} a promise that resolves without returning any value.
 */

export const removeDomainFromPersistedData = async (
  ENSDomain: string,
  persistedData: Partial<PersistedData>,
): Promise<void> => {
  try {
    delete persistedData[ENSDomain];
    await wallet.request({
      method: 'snap_manageState',
      params: ['update', persistedData],
    });
  } catch (error: any) {
    throw new Error(
      `Error removing domain from the persisted data. Reason: ${error.message}`,
    );
  }
};
