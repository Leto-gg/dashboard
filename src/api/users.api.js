import { httpClient } from "../libs/axios";

export async function getUser() {
  return await httpClient.get("/users/me").then((res) => res.data);
}
