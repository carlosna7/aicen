import { Input } from "@/components/ui/input"

interface Props {
    value: string
    onChange: (value: string) => void
}


const SearchBarFilter = ({ value, onChange }: Props) => {

    return (

        <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Digite o tipo de seção ou o nome do site"
        />

    )
}

export default SearchBarFilter
