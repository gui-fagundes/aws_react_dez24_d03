import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import ScrollToTheTop from './components/ScrollToTheTop'
import { Routers } from './Routes'

function App() {

  return (
    <div className='flex flex-col min-h-screen justify-between max-w-screen'>
      <Header />
      <Routers />
      <ScrollToTheTop />
      <Footer />
    </div>
  )
}

export default App
