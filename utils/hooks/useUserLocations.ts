import { useEffect, useState } from "react";

import {
  UserLocationData,
  UserLocationResponse,
} from "@/pages/api/userlocations";

export function useUserLocations(profile?: string) {
  const [data, setData] = useState<null | UserLocationData>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          profile
            ? `/api/userlocations?profile=${encodeURIComponent(profile)}`
            : `/api/userlocations`,
        );

        const result = (await response.json()) as UserLocationResponse;

        if (response.ok && result.data) {
          setData(result.data);
        } else if (result.error) {
          setError(result.error);
        } else {
          setError("Unknown error occurred");
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }
    void fetchData();
  }, [profile]);

  return { data, error, loading };
}

export default useUserLocations;
