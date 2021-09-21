import React, { useEffect, useRef, useState } from 'react'
import { ExampleComponent, CastProvider, useCast, CastButton } from 'react-castjs'



function Test(){

    const { chromecast } = useCast()
    const [castAvailable, setCastAvailable] = useState(chromecast.available)
    const [castConnected, setCastConnected] = useState(chromecast.connected)
    const [source, setSource] = useState('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4')
    const inputRef = useRef()

    useEffect(() => {

        chromecast.on('available', () => {
            console.log('change', chromecast.available)
            setCastAvailable(chromecast.available)
        })

        chromecast.on('connect', () => {
            setCastConnected(chromecast.connected)
        })


        return function cleanup(){
            chromecast.off()
        }
    }, [])

    async function cast(){
        if(chromecast.available){
            try {
                await chromecast.cast(source, {
                poster     : 'https://castjs.io/media/poster.jpg',
                title      : 'Sintel',
                description: 'Third Open Movie by Blender Foundation',
                subtitles: [{
                    active: true,
                    label : 'English',
                    src   : 'https://castjs.io/media/english.vtt'
                }, {
                    label : 'Spanish',
                    src   : 'https://castjs.io/media/spanish.vtt'
                }],
              })
              console.log("casting")
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div>
            cast available: {castAvailable? "true" : "false"}
            <br/>
            cast connected: {castConnected? "true" : "false"}
            <br/>
            {castConnected
            &&
            <div>
                connected to: {chromecast.device}
            </div>}
            <div>
                <label>paste source url (video or audio)</label>
                <input ref={ref => inputRef.current = ref} type="text" value={source} style={{width: "80%"}} onFocus={() => inputRef.current.select()} onChange={e => setSource(e.target.value)}/> 
            </div>
            <br/>
            <CastButton onClick={cast}/>
        </div>
    )
}

export default Test