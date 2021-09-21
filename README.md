# react-castjs

> Cast sender library for React, originally forked from Cast.js

[![NPM](https://img.shields.io/npm/v/react-castjs.svg)](https://www.npmjs.com/package/react-castjs) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-castjs
```

## Usage

### Wrap your React-App

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

### Use with Hook

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

## License

MIT © [smm76](https://github.com/smm76)
