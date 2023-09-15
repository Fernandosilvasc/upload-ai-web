
import { 
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components";
import { usePrompt } from "@/contexts/prompt-context";

export function PromptSelect() {
  const { promptList, isLoading } = usePrompt()

  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder='Select the prompt...' />
      </SelectTrigger>
      <SelectContent>
        {!isLoading && promptList.map( item => (
          <SelectItem key={item.id} value={item.id}>{item.title}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
