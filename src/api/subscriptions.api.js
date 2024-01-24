import { httpClient } from "../libs/axios";

export async function createCheckoutSession({ priceLookupKey, email, name }) {
  return httpClient.post("/subscriptions/create-checkout-session/", {
    priceLookupKey,
    email,
    name,
  });
}

export async function getSubscription() {
  return httpClient.get("/subscriptions/");
}

export async function cancelSubscription() {
  return httpClient.post("/subscriptions/cancel");
}
