export type PersistedData = {
  [key: string]: ENSDomain;
};

export type ENSDomain = {
  expirationDate: number;
};

export type ENSDomainName = string | any;

export type PromptMessage = {
  prompt: string;
  description: string;
  textAreaContent: string;
};
