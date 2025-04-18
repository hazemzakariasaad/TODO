export const setToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  console.log('getToken', localStorage.getItem('token'));
  return localStorage.getItem('token');
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const getUserId = () => {
  const token = getToken();
  if (!token) return null;
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.user_id;
};

export const getEmail = () => {
  const token = getToken();
  if (!token) return null;
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload.email;
};
