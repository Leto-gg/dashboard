import { useQuery } from "react-query";
import { httpClient } from "../libs/axios";
import { QUERY_KEY } from "../libs/constants/query";

function useProxyGateway() {
  const query = useQuery(QUERY_KEY.PROXY_GATEWAY, ({ proxyName, gatewayURL }) =>
    httpClient
      .get(`/gateways`, {
        proxyName,
        gatewayURL,
      })
      .then((res) => res.data)
  );

  return query;
}

export default useProxyGateway;
