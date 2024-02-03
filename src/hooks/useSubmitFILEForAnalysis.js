import { useMutation } from "react-query";
import { analyzeFile } from "../api/malware-analyzer.api";

export function useSubmitFILEForAnalysis(userId) {
  const mutation = useMutation((file) => {
    if (userId)
      return analyzeFile({
        file,
        userId,
      });
    else
      return Promise.reject(new Error("No user ID provided"));
  });

  return mutation;
}
