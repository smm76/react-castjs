import React, { useEffect, useRef, useState } from 'react'
import { ExampleComponent, CastProvider, useCast, CastButton } from 'react-castjs'



function CastExample(){

    const { chromecast } = useCast()
    const [castAvailable, setCastAvailable] = useState(chromecast.available)
    const [castConnected, setCastConnected] = useState(chromecast.connected)
    const [source, setSource] = useState('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4')
    const [poster, setPoster] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Sintel_poster.jpg/800px-Sintel_poster.jpg')
    const [title, setTitle] = useState('Example Title')
    const inputRef = useRef()
    const inputImgRef = useRef()

    const _log = useRef([])

    const [log, setLog] = useState([])

    useEffect(() => {


        function onAvailable(){
            pushMessage(["cast available: "+chromecast.available])
            setCastAvailable(chromecast.available)
        }

        chromecast.on('available', onAvailable)

        chromecast.on('connect', () => {
            pushMessage(["cast connected", "connected to: "+chromecast.device])
            setCastConnected(chromecast.connected)
        })
        
        chromecast.on('disconnect', () => {
            pushMessage(["cast disconnected"])
            setCastConnected(chromecast.connected)
        })
        
        chromecast.on('error', () => {
            pushMessage(["error occured"])
        })


        return function cleanup(){
            chromecast.off('connect')
            chromecast.off('disconnect')
            chromecast.off('available', onAvailable)
        }
    }, [])

    function pushMessage(msg = []){
        msg.forEach((m) => {
            _log.current.push({
                date: new Date().toLocaleTimeString(),
                msg: m
            })
        })
        setLog([..._log.current])
    }

    async function cast(){
        if(chromecast.available){
            try {
                await chromecast.cast(source, {
                    poster     : poster,
                    title      : title,
                })
                pushMessage(["now casting "+source])
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div>
            <h1>react-castjs demo</h1>
            <div className="links">
                <a href="https://github.com/smm76/react-castjs" target="_blank" rel="noopener">view on github</a>
                <a href="https://www.npmjs.com/package/react-castjs" target="_blank" rel="noopener">view on npm</a>
            </div>
            <code>
                npm i react-castjs -S
            </code>

            <h3>Test casting</h3>
            <div>
                <label>paste source url (video, audio, image)</label>
                <input ref={ref => inputRef.current = ref} type="text" value={source} style={{width: "80%"}} onFocus={() => inputRef.current.select()} onChange={e => setSource(e.target.value)}/> 
                <br/>
            </div>
            <div>
                <label>set poster image</label>
                <input ref={ref => inputImgRef.current = ref} type="text" value={poster} style={{width: "80%"}} onFocus={() => inputImgRef.current.select()} onChange={e => setPoster(e.target.value)}/> 
                <br/>
            </div>
            <div>
                <label>set title</label>
                <input type="text" value={title} style={{width: "80%"}} onChange={e => setTitle(e.target.value)}/> 
            </div>
            <br/>

            <CastButton onClick={cast} size={30} style={{ fontWeight: "bold", background: "#23f17e", padding: ".5rem" }} title={castConnected? "cast" : "start casting"} disabled={!castAvailable || source === ""} />

            <div className="status">
                {log.length > 0 && <button className="clear" onClick={() => {
                    _log.current = []
                    setLog([..._log.current])
                }}>clear</button>}
                {log.map((l,i) => (
                    <div key={i.toString()}>
                        <small style={{fontSize: ".7rem"}}>[{l.date}]</small> {l.msg}
                    </div>
                ))}
            </div>
            {castConnected
            &&
            <button onClick={() => chromecast.disconnect()}>
                disconnect
            </button>}
            
        </div>
    )
}

export default CastExample