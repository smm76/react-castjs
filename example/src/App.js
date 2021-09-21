import React, { useEffect } from 'react'

import { CastProvider } from 'react-castjs'
import 'react-castjs/dist/index.css'
import CastExample from './CastExample'



const App = () => {

  return (
    <CastProvider>
      <div className="app">
        <CastExample />
      </div>
    </CastProvider>
  )
}

export default App
