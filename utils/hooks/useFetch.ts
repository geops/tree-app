import { useCallback, useState } from "react";

interface FetchState<T> {
  data: null | T;
  error: null | string;
  isLoading: boolean;
}

const globalCache: Record<string, unknown> = {};

type UseFetchOptions = {
  useCache?: boolean; // Enable or disable caching
} & RequestInit;

export const useFetch = <T>(
  initialUrl?: string,
  initialOptions?: UseFetchOptions,
) => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    error: null,
    isLoading: false,
  });

  const fetchData = useCallback(
    async (url?: string, options?: UseFetchOptions): Promise<T> => {
      const fetchUrl = url ?? initialUrl;
      const fetchOptions = { ...initialOptions, ...options };
      const useCache = options?.useCache ?? initialOptions?.useCache ?? true;
      const method = fetchOptions.method?.toUpperCase() ?? "GET";

      if (!fetchUrl) {
        return Promise.reject(new Error("No URL provided"));
      }

      setState((prev) => ({ ...prev, error: null, isLoading: true }));

      // Cache only for GET requests
      if (useCache && method === "GET" && globalCache[fetchUrl]) {
        setState({
          data: globalCache[fetchUrl] as T,
          error: null,
          isLoading: false,
        });
        return Promise.resolve(globalCache[fetchUrl] as T);
      }

      try {
        const response = await fetch(fetchUrl, fetchOptions);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = (await response.json()) as T;

        // Store in cache if conditions are met
        if (useCache && method === "GET") {
          globalCache[fetchUrl] = data;
        }

        setState({ data, error: null, isLoading: false });
        return data;
      } catch (error) {
        setState({
          data: null,
          error: (error as Error).message,
          isLoading: false,
        });
        return Promise.reject(error);
      }
    },
    [initialUrl, initialOptions],
  );

  return { ...state, fetchData };
};

export default useFetch;
