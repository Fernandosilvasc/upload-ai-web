import { FileVideo, Upload } from 'lucide-react'
import { 
  Button, 
  Separator, 
  Textarea,
  Label,
} from "@/components";

export function VideoInputForm() {
  return (
    <form className='w-full space-y-6'>
    <label 
      htmlFor='video'
      className='
        flex flex-col justify-center items-center
        border-2 border-dashed rounded-md gap-2 
        aspect-video cursor-pointer
        font-semibold text-sm text-muted-foreground hover:text-secondary
        hover:bg-primary
      '>
      <FileVideo className='w-6 h-6' />
      Upload video
    </label>

    <input type="file" id='video' accept='video/mp4' className='sr-only' />

    <Separator />

    <div className='space-y-2'>
      <Label htmlFor='transcription_prompt' className=''>Transcription prompt</Label>
      <Textarea 
        id='transcription_prompt'
        placeholder='Insert the video keywords separated by comma (...,)'
        className='h-20 leading-relaxed italic text-sm resize-none'
      />
    </div>

    <Button
      type='submit'
      className='w-full gap-2 text-sm
    '>
      {'Load the video'}
      <Upload className='w-4 h-4' />
    </Button>
  </form>
  )
}
