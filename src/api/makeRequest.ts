function getOptionsPost(data: any) {
  return {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  };
}

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

export { makeRequest, getOptionsPost };
