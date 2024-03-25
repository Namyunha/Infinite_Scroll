import { useState } from "react";
import { getPostsPage } from "../api/axios";

interface postsProps {
    pageNum: number
}

interface Post {
    
}

const usePosts = ({pageNum}:postsProps) => {
    const [results, setResults] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState<any>({})
    const [hasNextPage, setHasNextPage] = useState(false)
    const controller = new AbortController()
    const { signal } = controller

    getPostsPage(pageNum, {signal})
    .then(data => {
        setResults(prev => [...prev, ...data])
        setHasNextPage(Boolean(data.length))
        setIsLoading(false)
    })
    .catch(e => {
        setIsLoading(false)
        if(signal.aborted) return
        setIsError(true)
        setError({message: e.message})
    })

    return {isLoading, isError, error, hasNextPage, results}
}

export default usePosts