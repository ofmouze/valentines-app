import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import reportWebVitals from './reportWebVitals.js'

import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<BrowserRouter basename='/valentine-app'>
		<App />
	</BrowserRouter>
)

reportWebVitals()
