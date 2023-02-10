function setDataToCookies(key: string, data: string) {
  if (data) {
    const date = new Date(Date.now() + 86400e3);
    document.cookie = `${key}=${data}; path=/; expires=${date.toUTCString()}`;
  }
}

function removeDataToCookies(key: string) {
  document.cookie = `${key}=; path=/; expires=${new Date(0).toUTCString()}`;
}

function getDataToCookies(key: string) {
  const { cookie } = document;

  const values = cookie.split(';');

  if (Array.isArray(values)) {
    const data = values.find((item) => {
      return item.includes(key);
    });

    return data?.replace(`${key}=`, '') ?? '';
  }

  return '';
}

export { setDataToCookies, getDataToCookies, removeDataToCookies };
