import { API } from '../../backend';

export const createPost = (userId, token, post) => {
  return fetch(`${API}/post/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
