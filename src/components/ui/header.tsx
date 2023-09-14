import { Separator, Button, ModeToggle } from '@/components'
import { Github } from 'lucide-react'

export function Header() {
  return (
    <header className='flex w-full justify-between px-6 py-3 border-b'>
    <div className='flex justify-center items-center space-x-2 text-xl font-bold'>
      <h1>Upload.ai</h1>
      <span>✨</span>
    </div>

    <div className='flex justify-center items-center space-x-3'>
      <div className='flex justify-center items-center space-x-2 text-sm text-muted-foreground'>
        <span className='italic'>Developed by</span>
        <a 
          href="https://www.linkedin.com/in/fernando-csilva/"
          target="_blank"
          className="font-semibold italic hover:text-gray-300 ease-in-out duration-200"
        >
          @Fernando Silva
        </a>
        <span>🤖</span>
      </div>

      <Separator orientation='vertical' className='h-6' />

      <div className='flex justify-center items-center space-x-4'>
        <a 
          href="https://github.com/Fernandosilvasc/upload-ai-web"
          target="_blank"
        >
          <Button variant='outline' className="flex w-full space-x-2">
            <Github className='w-4 h-4' />
            <span>GitHub</span>
          </Button>
        </a>
        <ModeToggle />
      </div>
    </div>
  </header>
  )
}
