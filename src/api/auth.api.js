import { authHttpClient } from "../libs/axios";

export async function logoutAPI() {
  return authHttpClient.post("/logout");
}
