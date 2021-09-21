import React, { useEffect } from 'react'

import { ExampleComponent, CastProvider } from 'react-castjs'
import 'react-castjs/dist/index.css'
import Test from './Test'



const App = () => {

  return (
    <CastProvider>
      <h1>react-castjs demo</h1>
      <a href="">view on github</a>
      <a href="">npm</a>
      <code>
        npm i react-castjs -S
      </code>
      <h2>Getting started</h2>
      <h3>Wrap your React-App</h3>
      <code>
        
      </code>
      <div>
        <Test />
      </div>
    </CastProvider>
  )
}

export default App
