import { PromptMessage } from '../types';

export const getMessage = (
  ENSDomain: string,
  isStored: boolean,
): PromptMessage => {
  if (isStored) {
    return {
      prompt: `Remove Notification`,
      description: `ENS Domain ${ENSDomain}.eth`,
      textAreaContent: `Are you sure you want to remove the notification for ${ENSDomain}.eth?`,
    };
  }
  return {
    prompt: `Add Notification`,
    description: `ENS Domain ${ENSDomain}.eth`,
    textAreaContent: `Are you sure you want to add a notification for ${ENSDomain}.eth?`,
  };
};
