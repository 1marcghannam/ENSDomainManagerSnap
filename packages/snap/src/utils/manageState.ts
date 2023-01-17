import { PersistedData } from '../types';

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
