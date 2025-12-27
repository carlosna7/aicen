// Lê uma imagem do clipboard do usuário

export async function getClipboardImage(): Promise<Blob | null> {
    try {
        const clipboardItems = await navigator.clipboard.read()
        const item = clipboardItems[0]

        if (!item.types.includes("image/png")) {
            // console.error("Nenhuma imagem PNG no clipboard")
            return null
        }

        const blob = await item.getType("image/png")
        
        return blob

    } catch (error) {
        console.error("Erro ao ler clipboard:", error)
        return null
    }
}