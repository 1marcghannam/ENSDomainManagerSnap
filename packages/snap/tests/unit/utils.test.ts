import {
  getExpiringDomains,
  getMessageExpiringDomainNotification,
  getTokenId,
} from '../../src/utils';

import {
  ONE_DAY_IN_MILLISECONDS,
  ONE_WEEK_IN_MILLISECONDS,
} from '../../src/const';

describe('getExpiringDomains', () => {
  it('should return an array of expiring domains', async () => {
    const now = Date.now();
    const persistedData = {
      'vitalik.eth': { expirationDate: now + ONE_DAY_IN_MILLISECONDS },
      'marc.eth': { expirationDate: now + ONE_WEEK_IN_MILLISECONDS * 2 },
      'metamask.eth': { expirationDate: now + ONE_WEEK_IN_MILLISECONDS },
      'sbf.eth': { expirationDate: now - ONE_WEEK_IN_MILLISECONDS },
    };

    const expiringDomains = await getExpiringDomains(persistedData);

    expect(expiringDomains).toStrictEqual(['vitalik.eth', 'metamask.eth']);
  });
});

describe('getMessageExpiringDomainNotification', () => {
  it('should return the correct expiration message', () => {
    const ENSDomain = 'vitalik';
    const expirationDate = 1694508487000; // Sat Jun 03 2034.
    const expectedMessage =
      'The ENS Domain vitalik.eth will expire on Tue Sep 12 2023.';

    expect(
      getMessageExpiringDomainNotification(ENSDomain, expirationDate),
    ).toStrictEqual(expectedMessage);
  });
});

describe('getTokenId', () => {
  it('should return the correct token ID for a given domain', () => {
    const domain = 'vitalik';
    const expectedTokenId =
      79233663829379634837589865448569342784712482819484549289560981379859480642508n;
    expect(getTokenId(domain)).toStrictEqual(expectedTokenId);
  });
});
