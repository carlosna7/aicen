import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { getData } from "@/hooks/useDatabase"

interface Props {
    value: string
    onChange: (value: string) => void
}

const SelectTypeFilter = ({value, onChange}: Props) => {

    const { data } = getData()    
    const unique = [...new Set(data.map(item => item.types))]

    return (

        <Select value={value ?? ""} onValueChange={onChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Types of section:</SelectLabel>
                        {unique.map((item) => (
                            <SelectItem key={item} value={item}>{item}</SelectItem>
                        ))}
                </SelectGroup>
            </SelectContent>
        </Select>

    )
}

export default SelectTypeFilter