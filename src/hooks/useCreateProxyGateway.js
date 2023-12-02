import { useMutation, useQueryClient } from "react-query";
import { httpClient } from "../libs/axios";
import { QUERY_KEY } from "../libs/constants/query";

function useCreateProxyGateway() {
  const queryClient = useQueryClient();

  const mutation = useMutation(async (payload) => {
    const result = await httpClient.post(`/gateways`, payload);

    queryClient.setQueryData(QUERY_KEY.PROXY_GATEWAY, result);

    return result;
  });

  return mutation;
}

export default useCreateProxyGateway;
