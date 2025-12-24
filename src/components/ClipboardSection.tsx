import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getClipboardImage } from '@/lib/clipboard'

import { Clipboard } from "lucide-react"
import CreateMenu from './CreateMenu'

const ClipboardSection = () => {

    const [imageUrl, setImageUrl] = useState<string | null>(null)

    useEffect(() => {
        async function fetchClipboardImage() {
            const blob = await getClipboardImage()
            if (blob) {
                const url = URL.createObjectURL(blob)
                setImageUrl(url)
            }
        }

        fetchClipboardImage()
    }, [])

    return (
        <>
            <section className="h-[50vh] border-b bg-muted/30 flex justify-center px-10">
                <div className="container h-full py-6">
                    <Card className="h-full flex items-center">

                        <CardHeader className='w-full flex justify-between'>
                            <div>
                                <div className="flex items-center gap-2">
                                    <Clipboard className="h-5 w-5" />
                                    <CardTitle>Clipboard Atual</CardTitle>
                                </div>
                                <CardDescription>
                                    Imagem capturada do seu clipboard
                                </CardDescription>
                            </div>
                            <div>
                                <CreateMenu />
                            </div>
                        </CardHeader>

                        <CardContent className="flex items-center justify-center h-[calc(100%-80px)]">
                            {imageUrl ? (
                                <div className="relative w-full h-full flex items-center justify-center">
                                    <img
                                        src={imageUrl}
                                        alt="Clipboard"
                                        className="max-h-full max-w-full object-contain rounded-md border"
                                    />
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-3 text-muted-foreground">
                                    <Clipboard className="h-12 w-12 opacity-20" />
                                    <p className="text-sm">Você não tem nenhuma print no clipboard</p>
                                </div>
                            )}
                        </CardContent>

                    </Card>
                </div>
            </section>

        </>
    )
}

export default ClipboardSection