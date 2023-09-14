import { 
  Separator, 
  Header,
  Footer,
  VideoInputForm,
  PromptInputForm,
  PromptContainer,
} from "@/components";

export function Home() {
  return (
    <div className='flex flex-col max-h-screen'>
      <Header />
      <main className='flex flex-1 p-6 gap-6'>
        <PromptContainer />
        <aside className='w-80 space-y-6'>
          <VideoInputForm />
          <Separator />
          <PromptInputForm />
        </aside>
      </main>
      <Footer />
    </div>
  )
}
