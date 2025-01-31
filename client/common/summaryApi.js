export const baseURL = 'http://localhost:3000';

export const SummaryApi = {
  register: {
    url: '/api/user/register',
    method: 'post',
  },
  login: {
    url: '/api/user/login',
    method: 'post',
  },
  refreshToken: {
    url: '/api/user/refresh-token',
    method: 'post',
  },
  userDetails: {
    url: '/api/user/get-userDetails',
    method: 'get',
  },
};
