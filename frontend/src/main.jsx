import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import{ BrowserRouter} from 'react-router-dom'
import { Authprovider } from './context/Authprovider.jsx'
import { SocketProvider } from './context/socketContext.jsx'
import { UserInfoprovider } from './context/UserInfoProvider.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
 <BrowserRouter>
 <Authprovider>
    <UserInfoprovider>
    <SocketProvider>
    <App />
    </SocketProvider>
    </UserInfoprovider>
    </Authprovider>
    </BrowserRouter>
)
