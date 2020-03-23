import { ADD_FLASH_MESSAGE } from '../constants';

export const addFlashMessage = (message) => {
  return {
    type: ADD_FLASH_MESSAGE,
    message
  }
};