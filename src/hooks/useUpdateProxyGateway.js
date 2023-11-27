import { useMutation, useQueryClient } from "react-query";
import { httpClient } from "../libs/axios";
import { QUERY_KEY } from "../libs/constants/query";

function useUpdateProxyGateway() {
  const queryClient = useQueryClient();

  const mutation = useMutation(async (formData) => {
    await httpClient.patch(`/gateways/${formData.id}`, formData);
    await queryClient.invalidateQueries(QUERY_KEY.PROXY_GATEWAY);
  });

  return mutation;
}

export default useUpdateProxyGateway;
