import { useState } from "react";

const mockResponse = {
  redactedKey: "sk-068******************************YDd4",
  key: "sk-068885193265b763a7510377a61176192YDd4",
  userId: "7428f488-8071-7036-9600-2359784e1cd7",
};

export function useCreateSecretKey() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  return {
    mutateAsync: () => {
      setTimeout(() => {
        setLoading(false);
        setData(mockResponse);
      }, 2000);
    },
    data: data,
    isLoading: loading,
    isError: false,
    error: null,
  };
}
