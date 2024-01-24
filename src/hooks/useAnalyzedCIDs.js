import { useQuery } from "react-query";
import { QUERY_KEY } from "../libs/constants/query";
import { fetchAnalyzedCIDs } from "../api/malware-analyzer.api";

export function useAnalyzedCIDs(userId) {
  const query = useQuery(
    QUERY_KEY.ANALYZED_CIDS,
    () => {
      if (userId) return fetchAnalyzedCIDs(userId);
    },
    {
      refetchInterval: 5000,
      retry: 3,
    }
  );

  return query;
}
