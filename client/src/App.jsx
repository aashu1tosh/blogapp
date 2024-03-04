import { Header } from './components/header'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/home'
import { AddNewBlog } from './pages/add-blog'
function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route exact path='/' element={<Home />}/>
        <Route exact path='/add-blog' element={<AddNewBlog />}/>
      </Routes>
    </>
  )
}

export default App
