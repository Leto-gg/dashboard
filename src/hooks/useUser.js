import { useQuery, useQueryClient } from "react-query";

import { getUser } from "../api/users.api";
import { QUERY_KEY } from "../libs/constants/query";

// 2 minutes
const CACHE_TIME_MS = 1000 * 60 * 5;

export function useUser() {
  const queryClient = useQueryClient();

  const query = useQuery(QUERY_KEY.USER, getUser, {
    staleTime: CACHE_TIME_MS,
    // retry: false,
    // refetchInterval: false,
    onError: () => {
      queryClient.setQueryData(QUERY_KEY.USER, null);
      queryClient.cancelQueries(QUERY_KEY.USER);
    },
  });

  return query;
}
