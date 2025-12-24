import { getClipboardImage } from "./clipboard";
import { fetchDatabase } from "./fetchDatabase";
import { imageUrlToBase64 } from "./imageUrlToBase64";
// import { cosineSimilarity } from "./cosine";

export async function createSection(searchRange: number) {

    // // pega do clipboard
    // const blob = await getClipboardImage();
    // if (!blob) return new Error("Sem imagem no clipboard");

    // // clipboard → base64
    // const clippedBase64 = await new Promise<string>((resolve) => {
    //     const reader = new FileReader();
    //     reader.onloadend = () => resolve(reader.result as string);
    //     reader.readAsDataURL(blob);
    // });

    // console.log(clippedBase64)
    
    // // pede embedding ao backend

    // // pega lista do BD
    // const data = await fetchDatabase();
    // const matches = [];

    // // ordenar
    // matches.sort((a, b) => b.score - a.score);

    // return matches.slice(0, searchRange);

    return new Error("Not implemented");
}
