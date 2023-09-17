import { FileVideo, Upload } from 'lucide-react'
import { 
  Button, 
  Separator, 
  Textarea,
  Label,
} from "@/components";
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from 'react';
import { getFFmpeg } from '@/lib/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import { api } from '@/lib/axios';
import { useSelectedVideo } from '@/contexts/video-context';

enum Status {
  WAITING = 'waiting',
  CONVERTING = 'converting',
  UPLOADING = "uploading",
  GENERATING = 'generating',
  SUCCESSFUL = "successful",
}

const statusMessage = {
  [Status.CONVERTING]: `Converting...`,
  [Status.UPLOADING]: `Uploading...`,
  [Status.GENERATING]: `Generating...`,
  [Status.SUCCESSFUL]: `Successful!`,
}

export function VideoInputForm() {
  const { setSelectedVideo } = useSelectedVideo();
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>(Status.WAITING);

  const promptInputRef = useRef<HTMLTextAreaElement>(null);

  function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget

    if (!files) { return }
    const selectedFile = files[0]
    setVideoFile(selectedFile)
  }

  async function convertVideoToAudio(video: File) {
    console.log('Conversion has started!')

    const ffmpeg = await getFFmpeg()

    await ffmpeg.writeFile('input.mp4', await fetchFile(video))
    // ffmpeg.on('log', log => {
    //   console.log(log)
    // })

    ffmpeg.on('progress', conversion => {
      console.log(`Convert progress: ${Math.round(conversion.progress * 100)}`) // multiple * 100 to have the result in percentage 
    })

    /**
     * -ffmpeg params-
     * @param {-i} // is an FFmpeg option that indicates the input file.
     * @param {input.mp4} // is the name of the input video file.
     * @param {-map} // option to specify which streams (audio or video) from the input file should be included in the output.
     * @param {0:a} // refers to the audio stream of the first input file (index 0). This means you want to extract and process the audio from the input video file.
     * @param {-b:a} // is the FFmpeg option for setting the audio bitrate.
     * @param {28k} // specifies that you want to encode the audio with a bitrate of 28 kilobits per second (28kbit/s). Lower bitrates generally result in smaller file sizes but may sacrifice audio quality.
     * @param {-acodec} // is the FFmpeg option for selecting the audio codec.
     * @param {libmp3lame} // indicates that you want to use the LAME MP3 codec to encode the audio. MP3 is a commonly used audio format.
     * @param {output.mp3} // you specify the name of the output file as 'output.mp3'.
    **/

    await ffmpeg.exec([
      '-i',
      'input.mp4',
      '-map',
      '0:a',
      '-b:a',
      '28k',
      '-acodec',
      'libmp3lame',
      'output.mp3'
    ])

    const data = await ffmpeg.readFile('output.mp3');

    const audioFileBlob = new Blob([data], { type: 'audio/mpeg' });
    const audioFile = new File([audioFileBlob], 'audio.mp3', { type: 'audio/mpeg' });

    console.log('Conversion has finished!')

    return audioFile;
  } 

  async function handleUploadVideo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const prompt = promptInputRef.current?.value;
    if (!videoFile) return

    setStatus(Status.CONVERTING)
    const audioFile = await convertVideoToAudio(videoFile)

    const data = new FormData();
    data.append('file', audioFile)

    setStatus(Status.UPLOADING)
    const response = await api.post('/videos', data)
    setSelectedVideo(response.data.video);
    const videoId = response.data.video.id;

    setStatus(Status.GENERATING)
    await api.post(`/videos/${videoId}/transcription`, {
      prompt,
    })

    setStatus(Status.SUCCESSFUL)
  }

  const previewURL = useMemo(() => {
    if (!videoFile) return null;

    return URL.createObjectURL(videoFile);
  }, [videoFile])


  return (
    <form onSubmit={handleUploadVideo} className='w-full space-y-6' >
      <label 
        htmlFor='video'
        className='
          flex flex-col justify-center items-center
          border-2 border-dashed rounded-md gap-2 
          aspect-video cursor-pointer
          font-semibold text-sm text-muted-foreground hover:text-secondary
          hover:bg-primary
          relative
        '>
        {previewURL ? (
          <video src={previewURL} controls={false} className='pointer-events-none absolute inset-0' />
        ) :  (
          <>
            <FileVideo className='w-6 h-6' />
            Select a video
          </>
        )}
      </label>

      <input type="file" id='video' accept='video/mp4' className='sr-only' onChange={handleFileSelected} />

      <Separator />

      <div className='space-y-2'>
        <Label htmlFor='transcription_prompt' className=''>Transcription prompt</Label>
        <Textarea 
          ref={promptInputRef}
          disabled={status !== Status.WAITING}
          id='transcription_prompt'
          placeholder='Insert the video keywords separated by comma (...,)'
          className='h-20 leading-relaxed italic text-sm resize-none'
        />
      </div>

      <Button
        type='submit'
        data-success={status === Status.SUCCESSFUL}
        data-progress={status !== Status.SUCCESSFUL && status !== Status.WAITING}
        disabled={status !== Status.WAITING}
        className='
        w-full gap-2 text-sm 
        data-[success=true]:bg-emerald-400
        data-[success=true]:text-secondary
        data-[progress=true]:bg-secondary
        data-[progress=true]:text-white
      '>
        {status === Status.WAITING ? (
          <>
          {'Upload the video'}
          <Upload className='w-4 h-4' />
          </>
        ) :  (
          <>
            {statusMessage[status]}
          </>
        )}
      </Button>
  </form>
  )
}
