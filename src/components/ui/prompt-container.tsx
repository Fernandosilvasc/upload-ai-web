import { Textarea } from "@/components";

export function PromptContainer() {
  return (
    <section className='grid grid-rows-2 flex-1 gap-4'>
      <Textarea 
        placeholder={`Insert the AI's prompt...`} 
        className='italic resize-none p-4 leading-relaxed' 
      />
      <Textarea 
        placeholder={`Result generated by the IA...`} 
        className='italic resize-none p-4 leading-relaxed'
      />
    </section>
  )
}