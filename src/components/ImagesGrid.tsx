import React, { useEffect, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Image as ImageIcon } from "lucide-react"
import ImageCard from "./ImageCard"
import LoadingGrid from "./LoadingGrid"
import { getData } from "../hooks/useDatabase"

type Filters = {
    searchValue: {
        searchText: string
        type: string
    }
}

const ImagesGrid = ({ searchValue }: Filters) => {
    const { data, loading } = getData()
    const { searchText, type } = searchValue

    const filteredData = useMemo(() => {
        let result = [...data]

        // filtro por input select
        if (type !== "") {
            result = result.filter(item =>
                item.types?.toLowerCase() === type.toLowerCase()
            )
        }

        // filtro por inpuit de texto
        if (searchText !== "") {
            const search = searchText.toLowerCase()
            result = result.filter(item =>
                item.types?.toLowerCase().includes(search) ||
                item.site_link?.toLowerCase().includes(search) ||
                item.description?.toLowerCase().includes(search)
            )
        }

        return result
    }, [data, type, searchText])

    return (
        <section className="min-h-[70vh] py-8 flex justify-center px-10">
            <div className="container">

                <div className="mb-6">
                    <h2 className="text-2xl font-bold tracking-tight">Suas Imagens</h2>
                    <p className="text-muted-foreground">
                        {filteredData.length} {filteredData.length === 1 ? 'imagem salva' : 'imagens salvas'}
                    </p>
                </div>

                {loading ? (
                    <LoadingGrid />
                ) : filteredData.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredData.map((item) => (
                            <ImageCard key={item.ID} item={item} />
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-16">
                            <ImageIcon className="h-16 w-16 text-muted-foreground opacity-20 mb-4" />
                            <p className="text-muted-foreground">Nenhuma imagem encontrada</p>
                            <p className="text-sm text-muted-foreground mt-1">
                                Comece salvando suas primeiras capturas
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </section>
    )
}

export default ImagesGrid