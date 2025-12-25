import { useEffect, useState } from 'react'
import { createSection } from '@/lib/create'
import { DatabaseItem } from '@/types/tipesDatabase'

import { Button } from './ui/button'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

import LoadingGrid from './LoadingGrid'
import ImageCard from './ImageCard'

const CreateMenu = () => {

    const [images, setImages] = useState<Array<{item: DatabaseItem; score: number}>>([]);
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

    function handleCreateSection() {

        setLoading(true)

        createSection().then((res) => {
            

            console.log(res)

            // if (res instanceof Error) {
            //     console.log(res.message)
            //     setLoading(false)
            //     return
            // } else {
            //     setImages(res)
            //     setLoading(false)
            // }

        })

    }

    useEffect(() => {
        if (open) {
            handleCreateSection()
        }
    }, [open])

    return (
        <Drawer open={open} onOpenChange={setOpen}>

            <DrawerTrigger>
                <Button variant='outline'>Create</Button>
            </DrawerTrigger>

            <DrawerContent>

                <DrawerHeader>
                    <DrawerTitle>Menu de criação</DrawerTitle>
                    <DrawerDescription>Captura de tela não encontrada:</DrawerDescription>
                </DrawerHeader>

                <div className="flex-1 overflow-y-auto px-4">

                    {loading ? (
                        <LoadingGrid />
                    ) : images.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

                            {images.map((items) => (
                                <ImageCard key={items.item.ID} item={items.item} />
                            ))}

                        </div>
                    ) : (
                        <p className='flex items-center justify-center p-10 text-2xl'>Faça uma print para continuar (win + shift + S)</p>
                    )}

                </div>

                <DrawerFooter>
                    <DrawerClose><Button>Cancel</Button></DrawerClose>
                </DrawerFooter>

            </DrawerContent>

        </Drawer>
    )
}

export default CreateMenu