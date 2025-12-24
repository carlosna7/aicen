import { useEffect, useState } from 'react'
import { DatabaseItem } from '../types/tipesDatabase'
import { fetchDatabase } from '@/lib/fetchDatabase'

export const getData = () => {
    const [data, setData] = useState<DatabaseItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchDatabase()
                setData(data)
            } catch (error) {
                console.error('Erro ao buscar dados:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    return { data, loading }
}