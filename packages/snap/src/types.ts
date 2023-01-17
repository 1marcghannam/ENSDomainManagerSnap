export type PersistedData = {
  [key: string]: ENSDomain;
};

export type ENSDomain = {
  owner: string;
  expirationDate: number;
  notificationPeriod: number;
};

export type Contract = {
  nameExpires: (tokenId: number) => Promise<number>;
};
