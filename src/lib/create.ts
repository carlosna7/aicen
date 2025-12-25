import { getClipboardImage } from "./clipboard";
import { fetchDatabase } from "./fetchDatabase";
import { imageUrlToBase64 } from "./imageUrlToBase64";
// import { cosineSimilarity } from "./cosine";

export async function createSection() {

    // pega do clipboard
    const blob = await getClipboardImage();
    if (!blob) return new Error("Sem imagem no clipboard");
    
    const databaseImages = await fetchDatabase()

    const databaseImagesBase64 = await Promise.all(
        databaseImages.map(async el => {
        
            const base64 = await imageUrlToBase64(el.image_path);
            
            return base64;
        })
    );

    // clipboard to base64
    const clippedBase64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
    });

    const payload = {
        clipboard: clippedBase64,
        images: databaseImagesBase64
    };
    
    const response = await fetch(`http://127.0.0.1:8000/api/compareImages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if (!response.ok) {
        throw new Error('Erro na requisição: ' + response.status)
    }

    const apiResponse = await response.json()

    console.log(apiResponse)
    
    return apiResponse

}
