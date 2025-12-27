import { DatabaseItem } from "@/types/tipesDatabase";
import { getClipboardImage } from "./clipboard";
import { fetchDatabase } from "./fetchDatabase";
import { imageUrlToBase64 } from "./imageUrlToBase64";

export async function createSection(selectedOption: string | null) {

    // pega do clipboard
    const blob = await getClipboardImage();
    if (!blob) return new Error("Sem imagem no clipboard");
    
    const databaseImages = await fetchDatabase()

    // console.log(databaseImages)

    const databaseImagesToBase64 = await Promise.all(
        databaseImages.map(async (el: DatabaseItem ) => {

            return await imageUrlToBase64(el.image_path);

        })
    );
    
    // console.log(databaseImagesToBase64)

    // clipboard to base64
    const clippedBase64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
    });

    const payload = {
        clipboard: clippedBase64,
        images: databaseImagesToBase64,
        type: selectedOption
    };
    
    const response = await fetch(`http://127.0.0.1:8000/api/compareImages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    
    if (!response.ok) throw new Error('Erro na requisição: ' + response.status)

    const apiResponse = await response.json()
    
    return apiResponse

}
