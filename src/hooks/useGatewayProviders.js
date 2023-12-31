import { useQuery } from "react-query";
import { httpClient } from "../libs/axios";
import { QUERY_KEY } from "../libs/constants/query";

function useGatewayProviders() {
  const query = useQuery(QUERY_KEY.GATEWAY_PROVIDERS, () =>
    httpClient.get(`/gateways/providers`).then((res) => res.data)
  );

  return query;
}

export default useGatewayProviders;
