import {getToken} from "@/lib/auth";


export const fetcher = async (url) => {
  const token = await getToken()

  const res = await fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json', 'Authorization': token }),
    credentials: 'same-origin'
  });
    return res.json();
  };