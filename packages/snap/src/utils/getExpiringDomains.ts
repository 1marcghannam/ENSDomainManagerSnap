import { PersistedData } from '../types';

import { ONE_WEEK_IN_MILLISECONDS } from '../const';

export const getExpiringDomains = async (
  persistedData: PersistedData,
): Promise<string[]> => {
  const expiringDomains: string[] = [];
  const now = Date.now();
  const timeToNotify = now + ONE_WEEK_IN_MILLISECONDS;
  for (const [domain, { expirationDate }] of Object.entries(persistedData)) {
    if (expirationDate <= timeToNotify && expirationDate > now) {
      expiringDomains.push(domain);
    }
  }
  return expiringDomains;
};
