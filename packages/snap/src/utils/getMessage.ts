import { PromptMessage } from '../types';

/**
 * getMessageAddOrRemove is a function that returns the message to be displayed when adding or removing an ENS domain.
 * It takes the ENS domain and a boolean value indicating if the domain is already stored,
 * and returns an object with a prompt, a description, and the text area content of the message.
 *
 * @param {string} ENSDomain - the ENS domain.
 * @param {boolean} isStored - a boolean indicating if the domain is already stored.
 * @returns {PromptMessage} an object with the prompt, description, and text area content of the message.
 */

export const getMessageAddOrRemove = (
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

/**
 * getMessageExpiringDomainNotification is a function that returns the message to be displayed when an ENS domain is expiring.
 * It takes the ENS domain and the expiration date, and returns a string containing the message.
 * The message includes the ENS domain and the expiration date in a human-readable format.
 *
 * @param {string} ENSDomain - the ENS domain.
 * @param {number} expirationDate - the expiration date of the ENS domain.
 * @returns {string} the message to be displayed when the ENS domain is expiring.
 */

export const getMessageExpiringDomainNotification = (
  ENSDomain: string,
  expirationDate: number,
): string => {
  return `The ENS Domain ${ENSDomain}.eth will expire on ${new Date(
    expirationDate,
  ).toDateString()}.`;
};
