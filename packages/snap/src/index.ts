import { OnRpcRequestHandler } from '@metamask/snap-types';
import { RequestENSDomainRecord, PersistedData } from './types';
import {
  getPersistedData,
  addDomainToPersistedData,
  removeDomainFromPersistedData,
  getMessage,
} from './utils';

export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  switch (request.method) {
    case 'addOrRemoveENSDomain': {
      const requestENSDomainRecord: RequestENSDomainRecord = request.params;
      const persistedData = (await getPersistedData()) as PersistedData;
      const isStored = requestENSDomainRecord.ensDomain in persistedData;
      const message = getMessage(requestENSDomainRecord.ensDomain, isStored);
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
            requestENSDomainRecord.expirationDate,
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
