import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "./components/ui/button"

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <>
        <header className='w-full'>
          <ModeToggle />
        </header>

        <div>
          <Button> Click Here</Button>
        </div>
      </>
    </ThemeProvider>
  )
}

export default App
