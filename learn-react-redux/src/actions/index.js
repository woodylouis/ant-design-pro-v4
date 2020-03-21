import { INCREMENT, DECREMENT } from '../constants';

export const increment = () => {
  return dispatch => {
    setTimeout(() => {
      dispatch({
        type: INCREMENT
      });
    }, 2000);
  };
};

export const decrement = () => {
  return {
    type: DECREMENT
  }
}