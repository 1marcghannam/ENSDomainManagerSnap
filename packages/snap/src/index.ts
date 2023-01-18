import { OnRpcRequestHandler } from '@metamask/snap-types';
import { RequestENSDomainRecord, PersistedData } from './types';
import {
  getPersistedData,
  addDomainToPersistedData,
  removeDomainFromPersistedData,
  getMessageAddOrRemove,
  getExpiringDomains,
  getMessageExpiringDomainNotification,
} from './utils';
import { MILLISECONDS_MULTIPLIER } from './const';

/**
 * onRpcRequest is a function that handles an incoming RPC request.
 * It checks the method of the request and performs an action based on the method.
 * If the method is "addOrRemoveENSDomain", it gets the persisted data, checks if the ENS domain is stored,
 * prompts the user for confirmation, and adds or removes the ENS domain from the persisted data accordingly.
 * If the method is not recognized, it throws an error.
 *
 * @param {object} request - an object containing the RPC request.
 * @param {string} request.method - the method of the RPC request.
 * @param {object} request.params - the parameters of the RPC request specific to the method.
 */

export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  switch (request.method) {
    case 'addOrRemoveENSDomain': {
      const requestENSDomainRecord: RequestENSDomainRecord = request.params;
      const persistedData = (await getPersistedData()) as PersistedData;
      const isStored = requestENSDomainRecord.ensDomain in persistedData;
      const message = getMessageAddOrRemove(
        requestENSDomainRecord.ensDomain,
        isStored,
      );
      const isApproved = await wallet.request({
        method: 'snap_confirm',
        params: [message],
      });
      if (isApproved) {
        if (isStored) {
          await removeDomainFromPersistedData(
            requestENSDomainRecord.ensDomain,
            persistedData,
          );
        } else {
          await addDomainToPersistedData(
            requestENSDomainRecord.ensDomain,
            requestENSDomainRecord.owner,
            requestENSDomainRecord.expirationDate * MILLISECONDS_MULTIPLIER,
            persistedData,
          );
        }
      }
      break;
    }
    default:
      throw new Error('Method not found.');
  }
};

/**
 * onCronjob is a function that handles an incoming cronjob request.
 * It checks the method of the request and performs an action based on the method.
 * If the method is "checkExpirationDate", it gets the persisted data, checks if there are any domains that are expiring,
 * and sends a notification for each expiring domain.
 * If the method is not recognized, it throws an error.
 *
 * @param {object} request - an object containing the cronjob request.
 * @param {string} request.method - the method of the cronjob request.
 */

export const onCronjob: OnRpcRequestHandler = async ({ request }) => {
  switch (request.method) {
    case 'checkExpirationDate':
      {
        const persistedData = (await getPersistedData()) as PersistedData;
        const expiringDomains: string[] = await getExpiringDomains(
          persistedData,
        );
        // Send a notification for each expiring domain
        if (expiringDomains.length) {
          const messages: string[] = expiringDomains.map((domain) =>
            getMessageExpiringDomainNotification(
              domain,
              persistedData[domain].expirationDate,
            ),
          );
          messages.forEach((message) => {
            wallet.request({
              method: 'snap_notify',
              params: [
                {
                  type: 'inApp',
                  message,
                },
              ],
            });
          });
        }
      }
      break;
    default:
      throw new Error('Method not found.');
  }
};
