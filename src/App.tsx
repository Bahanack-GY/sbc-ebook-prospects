import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import CapturePage from './pages/CapturePage'
import ThankYouPage from './pages/ThankYouPage'

function App(){
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/capture/:id" element={<CapturePage />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
        </Routes>
    )
}
export default App
