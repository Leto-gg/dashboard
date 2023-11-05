import { useMutation, useQueryClient } from "react-query";
import { QUERY_KEY } from "../libs/constants/query";
import { httpClient } from "../libs/axios";

function useDeleteProxyGateway(gatewayId) {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    () => {
      return httpClient.delete(`/gateways/${gatewayId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEY.PROXY_GATEWAY);
      },
    }
  );

  return mutation;
}

export default useDeleteProxyGateway;
