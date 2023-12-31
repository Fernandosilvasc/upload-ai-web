import { Wand2 } from "lucide-react";
import { 
  Button, 
  Separator, 
  Label,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Slider,
  PromptSelect,
} from "@/components";

interface IPromptInputForm {
  temperature: number;
  onTemperatureChange: (temperature: number) => void;
  handleSetPrompt: React.Dispatch<React.SetStateAction<string>>
  handleOnSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isPromptLoading: boolean
}

export function PromptInputForm({ 
  temperature, 
  onTemperatureChange,
  handleSetPrompt,
  handleOnSubmit,
  isPromptLoading
}: IPromptInputForm) {

  return (
    <form 
      onSubmit={handleOnSubmit}    
      className='w-full space-y-6'
    >
      <div className='space-y-2'>
        <Label>Prompt</Label>
        <PromptSelect handlePromptSelectedChange={handleSetPrompt} />
      </div>

      <Separator />

      <div className='space-y-2'>
        <Label>Model</Label>
        <Select disabled defaultValue='gpt-3.5'>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='gpt-3.5'>GPT 3.5-turbo 16k</SelectItem>
          </SelectContent>
        </Select>
        <span className='flex text-xs text-muted-foreground italic leading-relaxed'>We will be providing more AI core options as soon as possible.</span>
      </div>

      <Separator />

      <div className='space-y-4'>
        <Label>Temperature</Label>
        <Slider 
          min={0}
          max={1}
          step={0.1}
          value={[temperature]}
          onValueChange={value => onTemperatureChange(value[0])}
        />
        <span className='flex text-xs text-muted-foreground italic leading-relaxed'>Higher values tend to make the result more creative, but there may be inconsistency in the response.</span>
      </div>

      <Separator />

      <Button
        disabled={isPromptLoading}
        type='submit'
        className='w-full gap-2 text-sm
      '>
        {'Execute'}
        <Wand2 className='w-4 h-4' />
      </Button>
    </form>
  )
}
