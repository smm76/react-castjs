# react-castjs 📺 

> Cast sender library for React, originally forked from [Cast.js](https://github.com/castjs/castjs)


[![NPM](https://img.shields.io/npm/v/react-castjs.svg)](https://www.npmjs.com/package/react-castjs) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


[Demo](https://smm76.github.io/react-castjs/)
## Install

```bash
npm install --save react-castjs
```

## Usage

### Wrap your React-App 🌯

```jsx
import { CastProvider } from 'react-castjs'

import MyButton from './MyButton.js'

const App = () => {

  return (
    <CastProvider>
      <div>
        <h1>My App</h1>
        <MyButton />
      </div>
    </CastProvider>
  )
}
```

### Use with Hook ⚓

```jsx
import { useCast, CastButton } from 'react-castjs'



function MyButton(){

    const { chromecast } = useCast()

    async function cast(){
        if(chromecast.available){
            try {
                await chromecast.cast("https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4", {})
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
      <CastButton onClick={cast}/>
    )
}
```

### Handle Events 📆

```jsx
import { useEffect, useRef, useState } from 'react'
import { useCast, CastButton } from 'react-castjs'



function MyButton(){

    const { chromecast } = useCast()
    const [castAvailable, setCastAvailable] = useState(chromecast.available)
    const [castConnected, setCastConnected] = useState(chromecast.connected)

    useEffect(() => {

        chromecast.on('available', () => {
            console.log('change', chromecast.available)
            setCastAvailable(chromecast.available)
        })

        chromecast.on('connect', () => {
            setCastConnected(chromecast.connected)
        })

        // remove event-listeners when component is unmounted
        return function cleanup(){
            chromecast.off()
        }
    }, [])

    return (
      {castAvailable
      ?
      <div>
        <CastButton onClick={cast}/>
        {castConnected
        ?
          <button onClick={() => chromecast.disconnect()}>disconnect</button>
        :
          null
        }
      </div>
      :
      null
      }
    )
}
```

## Docs 📃

// TODO

mostly shared with [Cast.js](https://github.com/castjs/castjs)

## License ⚖️

MIT © [smm76](https://github.com/smm76)
