import { Routes, Route} from "react-router-dom"
import { Container } from "react-bootstrap"
import { Home } from "./pages/Home"
import { About } from "./pages/About"
import PokePage from "./pages/Pokemons"
import Nav from "./components/Nav"
import Card from "./components/Card"
import Footer from "./components/Footer"
import Pag from "./components/Pagination"
import DetailPage from "./components/CardDetail"
function App() {
  return (
    <>
  <Nav />
  <Routes>
      <Route path="/" element = {<Home />} />
      <Route path="/about" element = {<About />} />
      <Route path="/pokes" element = {<PokePage />} />
      <Route path="/pokes/:id" element={<DetailPage/>} />
    </Routes>
  <Footer/>
  </>)
}

export default App