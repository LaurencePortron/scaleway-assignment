const API = {
  get: apiGet,
  post: apiPost,
};

async function apiGet(path: string) {
  const response = await fetch(path, { mode: 'no-cors' });
  const data = await response.json();
  if (response.status === 200) {
    return { data: data.rows };
  }
}

async function apiPost(path: string, body: any) {
  const res = await fetch(path, {
    credentials: 'include',
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
