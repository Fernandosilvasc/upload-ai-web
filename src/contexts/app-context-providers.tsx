import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from "@/contexts/theme-provider";
import { PromptContextProvider } from '@/contexts/prompt-context'

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
        <PromptContextProvider>
          {children}
        </PromptContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default AppContextProvider;
