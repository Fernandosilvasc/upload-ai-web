
export function Footer() {
  return (
    <footer className='w-full flex justify-start items-center text-sm text-muted-foreground p-3 border-t gap-2'>
      <span className='text-primary'>{`Note: `}</span>
      {`You can use the variable `}
      <code className='text-primary'>{`{transcription}`}</code>
      {` inside your prompt to insert the transcript's content in the selected video!`}
    </footer>
  )
}
