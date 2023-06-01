const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34616553-8cb9dbb490290e4b0963e806d';

export function pixabayApi(nextProps, page) {
  return fetch(
    `${BASE_URL}?key=${API_KEY}&q=${nextProps}&page=${page}&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error('Error contact support'));
  });
}
