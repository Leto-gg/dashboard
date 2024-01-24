import { useMutation } from "react-query";
import { analyzeCID } from "../api/malware-analyzer.api";

export function useSubmitCIDForAnalysis(userId) {
  const mutation = useMutation((cid) => {
    if (userId)
      return analyzeCID({
        userId,
        cid,
      });
  });

  return mutation;
}
