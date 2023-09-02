import { httpClient } from "../libs/axios";

export async function logoutAPI() {
  return httpClient.post("/auth/logout");
}
