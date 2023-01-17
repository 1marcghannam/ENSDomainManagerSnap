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

export const setPersistedData = async (
  ENSDomain: string,
  owner: string,
  notificationPeriod: number,
  expirationDate: number,
): Promise<void> => {
  try {
    const persistedData = await getPersistedData();
    const newPersistedData = {
      ...persistedData,
      [ENSDomain]: {
        owner,
        notificationPeriod,
        expirationDate,
      },
    };
    await wallet.request({
      method: 'snap_manageState',
      params: ['update', newPersistedData],
    });
  } catch (error: any) {
    throw new Error(
      `Error setting the persisted data. Reason: ${error.message}`,
    );
  }
};
