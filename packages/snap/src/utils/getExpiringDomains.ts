import { PersistedData } from '../types';

import { ONE_WEEK_IN_MILLISECONDS } from '../const';

/**
 * getExpiringDomains is a utility function that receives the persisted data of the domains and returns an array of expiring domains.
 * It will filter the domains that are going to expire within the next week and the expiration date is greater than the current date.
 *
 * @param persistedData - The data that holds the ENS domains and their expiration dates
 * @returns {string[]} An array of expiring domains
 */

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
