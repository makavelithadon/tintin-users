export function checkStatus(response) {
  if (response.ok) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
  }
}

export function parseJSON(response) {
  return response.json();
}

export function parseText(response) {
  return response.text();
}
