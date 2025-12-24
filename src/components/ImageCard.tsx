import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ImageCardProps } from "../types/typeCard"

const ImageCard = ({ item }: ImageCardProps) => {
    
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.style.display = 'none'
        e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center')
        if (e.currentTarget.parentElement) {
            const icon = document.createElement('div')
            icon.innerHTML = '<svg class="h-12 w-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>'
            e.currentTarget.parentElement.appendChild(icon)
        }
    }

    return (
        <Card className="group overflow-hidden hover:shadow-lg transition-shadow cursor-pointer p-4">

            <CardContent className="p-0 flex flex-wrap gap-2">
                <Badge className="" variant="secondary">
                    {item.types}
                </Badge>
            </CardContent>

            <figure className="aspect-video bg-muted relative overflow-hidden  rounded-lg">
                <img
                    src={item.image_path}
                    alt={`Image ${item.ID}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={handleImageError}
                />
                <Badge className="absolute top-2 right-2" variant="secondary">
                    #{item.ID}
                </Badge>
            </figure>

            <CardTitle className="text-base line-clamp-1">
                Imagem #{item.ID}
            </CardTitle>
            
            <CardDescription className="line-clamp-2 text-xs">
                {item.description || 'Sem descrição disponível'}
            </CardDescription>

        </Card>
    )
}

export default ImageCard