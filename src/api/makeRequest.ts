function makeRequest(url: string, options = {}, baseUrl = process.env.URL_API) {
  return fetch(baseUrl + url, options).then((response) => {
    if (response.status !== 200) {
      return response.text().then((text) => {
        throw new Error(text);
      });
    }
    return response.json();
  });
}

export default makeRequest;
