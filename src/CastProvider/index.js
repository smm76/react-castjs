import React from "react"
import { createContext, useContext, useEffect, useState } from 'react'
import Cast from "../Cast"



const useProvideCast = () => {
    const [chromecast, setChromecast] = useState(new Cast())

    return {
        chromecast,
    }
}

const CastContext = createContext(useProvideCast)

const CastProvider = ({ children }) => {
    const context = useProvideCast()
    return (
        <CastContext.Provider value={context}>
            {children}
        </CastContext.Provider>
    )
}

export const useCast = () => useContext(CastContext)

export default CastProvider