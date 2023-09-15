import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { usePromptQuery } from '@/hooks/usePromptQuery';

interface IPrompt {
  id: string;
  title: string;
  template: string;
}

export interface IPromptState {
  promptList: IPrompt[];
  isLoading: boolean;
}

const PromptContext = createContext({} as IPromptState);

interface PromptContextProviderProps {
  children: ReactNode;
}

export function PromptContextProvider({
  children,
}: PromptContextProviderProps): JSX.Element {
  const config = {
    baseURL: import.meta.env.VITE_UPLOAD_AI_BASE_URL,
    url: '/prompts',
  };

  const { data, isLoading } = usePromptQuery(config);
  const retrievedPrompts: IPrompt[] = data?.data
  const [promptList, setPromptList] = useState<IPrompt[]>([]);

  useEffect(() => {
    if (retrievedPrompts?.length > 0) {
      setPromptList(retrievedPrompts)
    }
  }, [retrievedPrompts])


  const memoizedValue = useMemo(
    () => ({
      promptList,
      isLoading,
    }),
    [promptList, isLoading],
  );

  return (
    <PromptContext.Provider value={memoizedValue}>
      {children}
    </PromptContext.Provider>
  );
}

export function usePrompt(): IPromptState {
  return useContext(PromptContext);
}
