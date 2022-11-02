export default function fetcher(
  url: string,
  data: undefined | unknown = undefined
) {
  return fetch(`${window.location.origin}/api/${url}`, {
    method: data ? "POST" : "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.status > 399 && res.status <= 499) {
        // throw new Error(`Error ${res.status}: Client side error`);
      }
      if (res.status > 499 && res.status <= 599) {
        //throw new Error(`Error ${res.status}: Server side error`);
      }
      return res.json();
    })
    .then((data) => data)
    .catch((error) => {
      console.log(error);
      return error;
    });
}
