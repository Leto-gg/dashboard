import { useEffect } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { useState } from "react";

export const FETCHING_STATES = {
  DONE: "done",
  FAIL: "fail",
  IDLE: "idle",
  PENDING: "pending",
};

/**
 * @template T
 */
export const useFetch = () => {
  const ctrl = useRef(null);
  const [state, setState] = useState({ type: FETCHING_STATES.IDLE });

  const abort = useCallback(() => {
    ctrl.current?.abort();
  }, [ctrl]);

  /**
   * @param {Promise<T>} promiseFn
   * @returns
   */
  const handleFetch = useCallback(async (promiseFn) => {
    abort();

    ctrl.current = new AbortController();

    setState({ type: FETCHING_STATES.PENDING });

    try {
      const { data } = await promiseFn(ctrl.current.signal);
      setState({ type: FETCHING_STATES.DONE, data });
    } catch (error) {
      if (ctrl.current.signal.aborted) {
        console.warn("Request aborted");
        return;
      }

      setState({ type: FETCHING_STATES.FAIL, error });
    }
  }, [abort]);

  useEffect(() => {
    return () => {
      abort();
    };
  }, [abort]);

  return [state, handleFetch, abort];
};
