import { useEffect } from 'react'
import About from './components/About'
import AdvisoryNote from './components/AdvisoryNote'
import Contact from './components/Contact'
import FeatureTiers from './components/FeatureTiers'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Services from './components/Services'
import Stats from './components/Stats'
import { siteConfig, syncSiteDocument, applySiteTheme } from './data/site'

function App() {
  useEffect(() => {
    applySiteTheme(siteConfig.theme)
    syncSiteDocument(siteConfig.meta)
  }, [])

  return (
    <div className="bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <About />
        {siteConfig.featureSection.enabled ? <FeatureTiers /> : null}
        {siteConfig.advisoryNote.enabled ? <AdvisoryNote /> : null}
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
