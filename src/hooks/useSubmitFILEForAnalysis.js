import { analyzeFile } from "../api/malware-analyzer.api";

export function useSubmitFILEForAnalysis(userId) {
  const submitFile = (file) => {
    if (!userId) {
      throw new Error("No user ID provided");
    }
    return analyzeFile(file, userId);
  };

  return submitFile;
}
