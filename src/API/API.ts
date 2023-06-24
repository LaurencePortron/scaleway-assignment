const API = {
  get: apiGet,
  post: apiPost,
};

async function apiGet(path: string) {
  const response = await fetch(path, {});
  const data = await response.json();
  if (response.ok) {
    return { data: data.rows };
  }
}

async function apiPost(path: string, body: any) {
  const url = path;
  const res = await fetch(url, {
    mode: 'no-cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return { data };
}

export default API;
