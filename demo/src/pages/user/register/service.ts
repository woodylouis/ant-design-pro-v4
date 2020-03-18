import request from '@/utils/request';
import { UserRegisterParams } from './new';

// export async function fakeRegister(params: UserRegisterParams) {
//   return request('/api/register', {
//     method: 'POST',
//     data: params,
//   });
// }

export async function fakeRegister(params: UserRegisterParams) {
  return request('http://staging.qiuzhi99.com/api/v1/users', {
    method: 'POST',
    data: params,
  });
}
