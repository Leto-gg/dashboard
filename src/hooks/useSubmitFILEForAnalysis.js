import { useMutation } from "react-query";
import { analyzeFile } from "../api/malware-analyzer.api";

export function useSubmitFILEForAnalysis(userId) {
  const mutation = useMutation((file) => {
    // Ensure that userId is not undefined or null
    if (!userId) {
      throw new Error("No user ID provided");
    }
    // Call analyzeFile with file and userId as separate arguments
    return analyzeFile(file, userId);
  });

  return mutation;
}