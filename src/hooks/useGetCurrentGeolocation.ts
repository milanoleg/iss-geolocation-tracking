import { useQuery } from "react-query";

import httpClient from "../service/httpClient";
import { GEOLOCATION_URL } from "constants/service";
import { keysToCamel } from "utils/convert";

const REFETCH_INTERVAL = 10000;

const getCurrentGeolocation = async (): Promise<IssGeoLocation> => {
  const response = await httpClient.get(GEOLOCATION_URL);

  return keysToCamel(response.data);
};

const useGetCurrentGeolocation = (refetchInterval: number = REFETCH_INTERVAL) => {
  const query = useQuery<IssGeoLocation>(
    "issGeolocation",
    () => getCurrentGeolocation(),
    {
      refetchInterval,
    }
  );

  return {
    ...query,
    issGeolocation: query.data || ({} as IssGeoLocation),
    isGeolocationLoading: query.isLoading,
  };
};

export default useGetCurrentGeolocation;
