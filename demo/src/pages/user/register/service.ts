import request from '@/utils/request';
import { UserRegisterParams } from './index';

// export async function fakeRegister(params: UserRegisterParams) {
//   return request('/api/register', {
//     method: 'POST',
//     data: params,
//   });
// }

export async function fakeRegister(params: UserRegisterParams) {
  return request('https://redux-login.rails365.net/api/users', {
    method: 'POST',
    data: params,
  });
}
