import { useState } from 'react'
import Navbar from './component/Navbar'
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'
import Body from './component/Body'
import Login from './component/Login'
import Profile from './component/Profile'
import { Provider } from 'react-redux'
import Feed from './component/Feed'
import appStore from './component/utils/appStore'
import Connections from './component/Connections'
import Requests from './component/Requests'

function App() {


  return (
    <>
    <Provider store={appStore}>
       <BrowserRouter>
     <Routes>
      
      <Route path='/' element={<Body />} >
       <Route path='/' element={<Feed />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
       
        <Route path='/connections' element={<Connections />} />
        <Route path="/request" element={<Requests />} />
      </Route>
      
     </Routes>
     </BrowserRouter>
      </Provider>
    
    </>
  )
}

export default App
