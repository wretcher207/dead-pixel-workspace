import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Services from './components/Services'
import About from './components/About'
import DueDiligence from './components/DueDiligence'
import TimberNote from './components/TimberNote'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <About />
        <DueDiligence />
        <TimberNote />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
