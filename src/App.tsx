import { ThemeProvider } from "@/contexts/theme-provider";
import { Home } from "@/components";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Home />
    </ThemeProvider>
  )
}

export default App
