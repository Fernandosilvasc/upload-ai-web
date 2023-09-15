import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { UseQueryResult, useQuery } from 'react-query';

export function usePromptQuery(
  config: AxiosRequestConfig,
): UseQueryResult<AxiosResponse> {
  const axiosInstance = axios.create(config);

  return useQuery({
    queryKey: ['prompts'],
    queryFn: async () => {
      const result = await axiosInstance.get(config.url!);
      return result;
    },
  });
}
