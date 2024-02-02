import { analyzeFile } from "../api/malware-analyzer.api";
import { useMutation } from "react-query";

export function useSubmitFILEForAnalysis(userId) {
  return useMutation(
    (file) => {
      if (!userId) {
        // Instead of throwing an error, returning a rejected promise.
        return Promise.reject(new Error("No user ID provided"));
      }
      return analyzeFile(file, userId);
    },
    {
      // Optional: Define onSuccess and onError handlers
      onSuccess: (data) => {
        // Handle a successful file submission
        console.log("File submitted successfully:", data);
      },
      onError: (error) => {
        // Handle any errors in file submission
        console.error("Error submitting file:", error);
      },
    }
  );
}
