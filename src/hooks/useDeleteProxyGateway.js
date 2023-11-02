import { useMutation, useQueryClient } from "react-query";
import { QUERY_KEY } from "../libs/constants/query";

function useDeleteProxyGateway(gatewayId) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(
    () => {
      return fetch(`/api/proxy-gateway/${gatewayId}`, {
        method: "DELETE",
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEY.PROXY_GATEWAY);
      },
    }
  );

  return deleteMutation;
}

export default useDeleteProxyGateway;
