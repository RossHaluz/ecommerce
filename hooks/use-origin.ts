'use client'

import { useEffect, useState } from "react"

export const useOrigin = () => {
    const [isMount, setIsMount] = useState(false);
    const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : ""

    useEffect(() => {
        setIsMount(true)
    }, [])

    if(!isMount){
        return ""
    }

    return origin;
}