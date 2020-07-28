import React from 'react'
import ReactDOM from 'react-dom'
import App from './AppWithoutHooks.js'
import AppMongo from './AppWithoutHooksMongoAPI.js'
import Hooks from './AppWithHooks.js'
import './index.css'



ReactDOM.render(
<AppMongo />,
document.getElementById('root')
)
