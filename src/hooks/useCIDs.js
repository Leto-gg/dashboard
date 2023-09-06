import { useCallback, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";

import { createCID, getCIDs, removeCID } from "../api/cids.api";
import { QUERY_KEY } from "../libs/constants/query";

const CACHE_TIME_MS = 1000 * 60 * 10;

function useCIDs() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);

  const query = useQuery({
    queryKey: [QUERY_KEY.CIDS, page],
    queryFn: () => getCIDs(page),
    staleTime: CACHE_TIME_MS,
    keepPreviousData: true,
  });

  const deleteMutation = useMutation(QUERY_KEY.CIDS, (cid) => removeCID(cid), {
    onSuccess: () => {
      setPage(1);
      queryClient.invalidateQueries(QUERY_KEY.CIDS);
    },
  });

  const createMutation = useMutation(QUERY_KEY.CIDS, (cid) => createCID(cid), {
    onSuccess: () => {
      setPage(1);
      queryClient.invalidateQueries(QUERY_KEY.CIDS);
    },
  });

  const handlePageChange = useCallback((_page) => {
    if (_page > 0) setPage(_page);
  }, []);

  return {
    query,
    createMutation,
    deleteMutation,
    handlePageChange,
  };
}

export default useCIDs;
