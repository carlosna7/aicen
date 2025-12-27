export async function fetchDatabase() {
    
    const response = await fetch(`http://127.0.0.1:8000/api/getdata`)

    if (!response.ok) throw new Error('Erro na requisição: ' + response.status)

    const data = await response.json()
    
    return data
}
