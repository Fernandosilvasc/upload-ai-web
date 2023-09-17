
import { 
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components";
import { usePrompt } from "@/contexts/prompt-context";

interface IPromptSelect {
  handlePromptSelectedChange: (value: string) => void;
}

export function PromptSelect({ handlePromptSelectedChange }: IPromptSelect) {
  const { promptList, isLoading } = usePrompt()

  function handlePromptSelected(promptId: string) {
    const selectedPrompt = promptList.find(prompt => prompt.id === promptId)

    if (!selectedPrompt) return;
    handlePromptSelectedChange(selectedPrompt.template)
  }

  return (
    <Select onValueChange={handlePromptSelected}>
      <SelectTrigger>
        <SelectValue placeholder='Select the prompt...' />
      </SelectTrigger>
      <SelectContent>
        {!isLoading && promptList.map( prompt => (
          <SelectItem key={prompt.id} value={prompt.id}>{prompt.title}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
