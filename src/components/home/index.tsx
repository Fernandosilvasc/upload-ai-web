import {useSelectedVideo} from "@/contexts/video-context";
import { useCompletion } from "ai/react";
import { useState } from "react";
import { 
  Separator, 
  Header,
  Footer,
  VideoInputForm,
  PromptInputForm,
  PromptTextAreaContainer,
} from "@/components";

export function Home() {
  const { selectedVideo } = useSelectedVideo();
  const [temperature, setTemperature] = useState(0.5)

  function handleSetTemperature(temperature: number) {
    setTemperature(temperature)
  }

  const { 
      input, 
      setInput, 
      handleInputChange, 
      handleSubmit, 
      completion,
      isLoading
    } = useCompletion({
    api: 'http://localhost:3333/ai/complete',
    body: {
      videoId: selectedVideo?.id,
      temperature
    },
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return (
    <div className='flex flex-col max-h-screen'>
      <Header />
      <main className='flex flex-1 p-6 gap-6'>
        <PromptTextAreaContainer 
          promptInputValue={input}
          promptOutputValue={completion}
          handleOnChangeValue={handleInputChange}
        />
        <aside className='w-80 space-y-6'>
          <VideoInputForm />
          <Separator />
          <PromptInputForm 
            temperature={temperature} 
            onTemperatureChange={handleSetTemperature}
            handleSetPrompt={setInput}
            handleOnSubmit={handleSubmit}
            isPromptLoading={isLoading}
          />
        </aside>
      </main>
      <Footer />
    </div>
  )
}
