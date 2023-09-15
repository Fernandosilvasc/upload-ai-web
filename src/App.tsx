import AppContextProvider from "@/contexts/app-context-providers";
import { Home } from "@/components";

export function App() {
  return (
    <AppContextProvider>
      <Home />
    </AppContextProvider>
  )
}

export default App
