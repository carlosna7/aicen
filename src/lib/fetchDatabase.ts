export async function fetchDatabase() {

    const url = 'http://127.0.0.1:8000'
    
    const response = await fetch(`${url}/api/getdata`)
    if (!response.ok) {
        throw new Error('Erro na requisição: ' + response.status)
    }
    const data = await response.json()
    
    return data
}
