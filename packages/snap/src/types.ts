export type PersistedData = {
  [key: string]: ENSDomain;
};

export type ENSDomain = {
  expirationDate: number;
  notificationPeriod: number;
};

export type RequestENSDomainRecord =
  | {
      owner?: string;
      expirationDate?: number;
      ensDomain?: string;
    }
  | any;

export type PromptMessage = {
  prompt: string;
  description: string;
  textAreaContent: string;
};
