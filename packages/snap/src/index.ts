import { OnRpcRequestHandler } from '@metamask/snap-types';
import ContractABI from './abi/ContractABI.json';
import { ENSDomainName, PersistedData } from './types';
import {
  getPersistedData,
  addDomainToPersistedData,
  removeDomainFromPersistedData,
  getMessageAddOrRemove,
  getExpiringDomains,
  getMessageExpiringDomainNotification,
  getContract,
  getTokenId,
  getOwner,
} from './utils';
import { MILLISECONDS_MULTIPLIER, ENS_CONTRACT_ADDRESS } from './const';

/**
 * onRpcRequest is a function that handles the requests made to the Snap.
 * It checks the request method and if it's 'addOrRemoveENSDomain', it gets the ENS domain name and check if it's stored in the persisted data,
 * if it is stored, it will ask the user to confirm the removal, if it is not stored, it will ask the user to confirm the addition.
 *
 * @param {object} request - an object containing the RPC request.
 * @param {string} request.method - the method of the RPC request.
 * @param {object} request.params - the parameter of the RPC request specific to the method.
 */

export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  switch (request.method) {
    case 'addOrRemoveENSDomain': {
      const { ensDomain } = request.params as ENSDomainName;
      const persistedData = (await getPersistedData()) as PersistedData;
      const isStored = ensDomain in persistedData;
      const message = getMessageAddOrRemove(ensDomain, isStored);
      const isApproved = await wallet.request({
        method: 'snap_confirm',
        params: [message],
      });
      if (isApproved) {
        if (isStored) {
          await removeDomainFromPersistedData(ensDomain, persistedData);
        } else {
          const contract = await getContract(ENS_CONTRACT_ADDRESS, ContractABI);
          const tokenId = getTokenId(ensDomain);
          const expiration = await contract.nameExpires(tokenId);
          const owner = await getOwner(tokenId, contract);
          await addDomainToPersistedData(
            ensDomain,
            owner,
            expiration * MILLISECONDS_MULTIPLIER,
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
 * onCronjob is an RPC request handler that is triggered by a cronjob. It is responsible for checking the expiration date of the ENS domains stored in the persisted data and sending notifications if a domain is expiring soon.
 * Additionally, it also updates the expiration date of the stored domains if it has been updated.
 *
 * @param {object} request - The RPC request object.
 * @param {string} request.method - The method to be executed by the cronjob. Can be either 'checkExpirationDate' or 'updateExpirationDates'.
 */

export const onCronjob: OnRpcRequestHandler = async ({ request }) => {
  const contract = await getContract(ENS_CONTRACT_ADDRESS, ContractABI);
  switch (request.method) {
    case 'checkExpirationDate':
      {
        // Get the domains that are expiring
        const persistedData = (await getPersistedData()) as PersistedData;
        if (Object.keys(persistedData).length === 0) {
          break;
        }
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
    case 'updateExpirationDates':
      {
        // Get the persisted data
        const persistedData = (await getPersistedData()) as PersistedData;
        if (Object.keys(persistedData).length === 0) {
          break;
        }

        // Check if expiration is still valid for each domain and update the persisted data if needed
        for (const [domain, { expirationDate }] of Object.entries(
          persistedData,
        )) {
          const tokenId = getTokenId(domain);
          const expiration = await contract.nameExpires(tokenId);
          if (expiration * MILLISECONDS_MULTIPLIER !== expirationDate) {
            const owner = await getOwner(tokenId, contract);
            await addDomainToPersistedData(
              domain,
              owner,
              expiration * MILLISECONDS_MULTIPLIER,
              persistedData,
            );
          }
        }
      }
      break;
    default:
      throw new Error('Method not found.');
  }
};
