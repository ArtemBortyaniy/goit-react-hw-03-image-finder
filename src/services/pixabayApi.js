export function pixabayApi(BASE_URL, API_KEY, nextProps, page) {
  return fetch(
    `${BASE_URL}?key=${API_KEY}&q=${nextProps}&page=${page}&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error('Error contact support'));
  });
}
