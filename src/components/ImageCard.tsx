import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ImageCardProps } from "../types/typeCard"

const ImageCard = ({ item }: ImageCardProps) => {

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