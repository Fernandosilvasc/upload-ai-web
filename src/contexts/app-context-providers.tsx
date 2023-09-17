import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from "@/contexts/theme-provider";
import { PromptContextProvider } from '@/contexts/prompt-context';
import {SelectedVideoContextProvider} from '@/contexts/video-context';
interface CombinedContextProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

const AppContextProvider = ({
  children,
}: CombinedContextProviderProps): JSX.Element => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <SelectedVideoContextProvider>
          <PromptContextProvider>
            {children}
          </PromptContextProvider>
        </SelectedVideoContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default AppContextProvider;
