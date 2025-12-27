import { useEffect, useState } from 'react'
import { createSection } from '@/lib/create'
import { DatabaseItem } from '@/types/tipesDatabase'

import { Button } from './ui/button'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"

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
import { getData } from '@/hooks/useDatabase'

const CreateMenu = () => {

    const [images, setImages] = useState<Array<{item: DatabaseItem; score: number}>>([]);
    const [loading, setLoading] = useState(false)
    const [openDrawer, setOpenDrawer] = useState(false)
    const [openMiniModal, setOpenMiniModal] = useState(false)
    const [selectedOption, setSelectedOption] = useState<string | null>(null)

    const { data } = getData()    
    const unique = [...new Set(data.map(item => item.types))]

    function handleCreateSection() {

        setLoading(true)

        createSection(selectedOption).then((res) => {
            

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
        if (openDrawer) {
            handleCreateSection()
        }
    }, [openDrawer])

    return (
        <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>

            <Button variant='outline' onClick={() => setOpenMiniModal(true)}>Create</Button>

            <Dialog open={openMiniModal} onOpenChange={setOpenMiniModal}>
                <DialogContent>

                    <DialogHeader>
                        <DialogTitle>Escolha uma opção</DialogTitle>
                    </DialogHeader>

                    <RadioGroup
                        value={selectedOption ?? ""}
                        onValueChange={setSelectedOption}
                        className="space-y-2"
                    >
                        
                        {unique.map((item) => (
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value={item} id={item} />
                                <label htmlFor={item} key={item}>{item}</label>
                            </div>
                        ))}

                    </RadioGroup>

                    <DialogFooter>
                        <Button
                            disabled={!selectedOption}
                            onClick={() => {
                            setOpenMiniModal(false)
                            setOpenDrawer(true)
                            }}
                        >
                            Confirmar
                        </Button>
                    </DialogFooter>

                </DialogContent>
            </Dialog>

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