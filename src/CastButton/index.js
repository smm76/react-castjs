import React, { useEffect, useState } from "react"
import { useCast } from "../CastProvider"

import { default as ico } from 'chromecast.svg'

import _styles from './styles.module.css'

function CastButton(props){

    const { chromecast } = useCast()

    const [castAvailable, setCastAvailable] = useState(chromecast.available)

    const { size = 20, style = {}, title = null, onClick = () => { console.error("No handler available.") } } = props

    useEffect(() => {
        chromecast.on('available', () => {
            setCastAvailable(chromecast.available)
        })

        return function cleanup(){
            chromecast.off()
        }
    }, [])

    return (
        <button onClick={onClick} style={style} className={_styles.cast_button} disabled={!castAvailable} {...props}>
            <img src={ico} style={{ width: size, height: size }} />
            {title
            &&
            <span style={{ marginLeft: "5px", fontSize: `${size*.55}px` }}>
               {title}    
            </span>}
        </button>
    )
}

export default CastButton