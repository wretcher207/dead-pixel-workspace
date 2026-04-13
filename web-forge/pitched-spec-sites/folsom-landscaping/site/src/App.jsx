import { useState } from 'react'

const testimonials = [
  {
    name: "Heather Pouliot",
    text: "Francis and his crew are simply the best around. Detailed, professional, personable, timely, and super talented at what he does. He's done amazing work for us, and I would highly recommend him to anyone and everyone."
  },
  {
    name: "Molly Daniel",
    text: "Folsom Landscape Fabrications is the business to go to for detailed and creative work. Francis is one of the most dedicated and caring individuals to work with and will go great lengths to make sure his work is satisfying. I will always recommend."
  },
  {
    name: "Laura Gallant Lewis",
    text: "Our backyard project is beautiful. Reliable, courteous, and hard working. Quite simply the best team around."
  },
  {
    name: "Ricky Pacheco",
    text: "The man has a passion for what he does, and it shows in his work."
  },
  {
    name: "Robbie Atwater",
    text: "Best work I've ever seen and would recommend to anyone I know."
  },
  {
    name: "Logan Bean",
    text: "Does amazing work and awesome to talk to. Highly recommended."
  }
]

const services = [
  {
    title: "Hardscaping",
    description: "Custom paver patios, walkways, retaining walls, and fire pits built to last through every Maine season. We work with natural stone, pavers, and block to create outdoor spaces that hold up and look right.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2 22h20M6 18V2l6 4 6-4v16" />
      </svg>
    )
  },
  {
    title: "Landscape Design",
    description: "From garden beds to full property layouts, we plan and plant with purpose. Every project starts with a conversation about what you actually want your yard to do for you.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-1.5 0-4 2.5-4 6s2.5 6 4 6c1.5 0 4-2.5 4-6s-2.5-6-4-6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v6M9 18h6" />
      </svg>
    )
  },
  {
    title: "Lawn Care",
    description: "Mowing, edging, and seasonal maintenance that keeps your property sharp all year. We handle the routine so you can enjoy the results without lifting a finger.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V7l7-4 7 4v14" />
      </svg>
    )
  },
  {
    title: "Excavation",
    description: "Site prep, grading, drainage solutions, and boulder placement. We bring the heavy equipment and the know-how for jobs that need real muscle behind them.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 3l-4 8h6l-4 8" />
      </svg>
    )
  },
  {
    title: "Mulching & Garden Beds",
    description: "Fresh mulch, clean edges, and well-defined beds that give your landscaping a finished look. We source quality materials and do the detail work that makes the difference.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM21 6.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM16.5 17a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
      </svg>
    )
  },
  {
    title: "Snow Removal",
    description: "Reliable plowing and clearing when Maine winters hit hard. We show up early, work fast, and keep your property safe and accessible all season long.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07" />
      </svg>
    )
  }
]

const galleryImages = [
  { src: "/images/fcsfsD.jpg", alt: "Custom paver patio with stone fire pit" },
  { src: "/images/work-showcase (3).jpg", alt: "Manicured lawn with striped mowing pattern" },
  { src: "/images/work-showcase (6).jpg", alt: "Excavation and land clearing work" },
  { src: "/images/work-showcase (9).jpg", alt: "Stone border garden bed with shrubs" },
  { src: "/images/work-showcase (1).jpg", alt: "Decorative garden installation with brick pathway" },
  { src: "/images/work-showcase (8).jpg", alt: "Natural stone planter along granite wall" },
  { src: "/images/work-showcase (2).jpg", alt: "Clean lawn maintenance and landscaping" },
  { src: "/images/work-showcase (10).jpg", alt: "Snow removal with John Deere skid steer" },
]

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  return (
    <div className="min-h-screen bg-warm-white">
      {/* ==================== NAVIGATION ==================== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-warm-white/90 backdrop-blur-md border-b border-forest/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a href="#" className="flex items-center gap-3">
              <img src="/images/logo.jpg" alt="Folsom Landscape Fabrications" className="h-12 md:h-14 w-auto" />
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#services" className="text-sm font-medium text-slate-dark hover:text-forest transition-colors">Services</a>
              <a href="#work" className="text-sm font-medium text-slate-dark hover:text-forest transition-colors">Our Work</a>
              <a href="#testimonials" className="text-sm font-medium text-slate-dark hover:text-forest transition-colors">Reviews</a>
              <a href="#about" className="text-sm font-medium text-slate-dark hover:text-forest transition-colors">About</a>
              <a href="#contact" className="inline-flex items-center px-5 py-2.5 rounded-full bg-forest text-white text-sm font-semibold hover:bg-forest-light transition-all hover:shadow-[0_0_20px_-5px_rgba(45,80,22,0.5)] hover:scale-105">
                Get a Free Quote
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-dark"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 border-t border-forest/10">
              <div className="flex flex-col gap-3 pt-4">
                <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-slate-dark hover:text-forest px-2 py-2">Services</a>
                <a href="#work" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-slate-dark hover:text-forest px-2 py-2">Our Work</a>
                <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-slate-dark hover:text-forest px-2 py-2">Reviews</a>
                <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium text-slate-dark hover:text-forest px-2 py-2">About</a>
                <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-forest text-white text-sm font-semibold">
                  Get a Free Quote
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* ==================== HERO ==================== */}
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-leaf-pattern" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-sage/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-golden/8 rounded-full blur-[100px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left: Copy */}
            <div className="animate-fade-in-up">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest/10 text-forest text-xs font-semibold tracking-wider uppercase mb-6">
                <span className="w-2 h-2 rounded-full bg-moss animate-pulse" />
                Serving Augusta, ME and Surrounding Areas
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-dark leading-tight mb-6">
                Your Yard Deserves{' '}
                <span className="bg-gradient-to-r from-forest to-moss bg-clip-text text-transparent">
                  Real Craftsmanship
                </span>
              </h1>
              <p className="text-lg md:text-xl text-warm-gray leading-relaxed mb-8 max-w-lg">
                Francis Folsom and his crew build patios, shape landscapes, and maintain properties across central Maine. Hands-on work, honest pricing, and results you can see from the street.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#contact" className="inline-flex items-center px-7 py-3.5 rounded-full bg-gradient-to-r from-forest to-moss text-white font-semibold text-sm tracking-wide hover:shadow-[0_0_25px_-5px_rgba(45,80,22,0.5)] hover:scale-105 transition-all duration-300">
                  Get Your Free Estimate
                </a>
                <a href="#work" className="inline-flex items-center px-7 py-3.5 rounded-full border-2 border-forest/20 text-forest font-semibold text-sm hover:border-forest hover:bg-forest/5 transition-all duration-300">
                  See Our Work
                </a>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-forest/10">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-golden/15 flex items-center justify-center">
                    <svg className="w-5 h-5 text-golden" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-dark">96% Recommended</p>
                    <p className="text-xs text-warm-gray">on Facebook</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-dark">Augusta, ME</p>
                    <p className="text-xs text-warm-gray">Central Maine</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(45,80,22,0.25)]">
                <img
                  src="/images/fcsfsD.jpg"
                  alt="Custom paver patio and fire pit by Folsom Landscape Fabrications"
                  className="w-full h-[350px] md:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-soil/40 to-transparent" />
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-4 -left-4 md:-left-8 bg-white rounded-xl shadow-lg p-4 border border-forest/10 animate-float">
                <p className="text-xs text-warm-gray mb-1">Years in Business</p>
                <p className="text-2xl font-heading font-bold text-forest">9+</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SERVICES ==================== */}
      <section id="services" className="py-20 md:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-forest/10 text-forest text-xs font-semibold tracking-wider uppercase mb-4">
              What We Do
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-slate-dark mb-4">
              Built for{' '}
              <span className="bg-gradient-to-r from-forest to-sage bg-clip-text text-transparent">
                Maine Properties
              </span>
            </h2>
            <p className="text-warm-gray text-lg max-w-2xl mx-auto">
              From the first shovel in the ground to the last pass of the mower, we handle every phase of outdoor work. Here is what we bring to your property.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, i) => (
              <div
                key={i}
                className="group relative bg-white rounded-2xl p-8 border border-forest/8 hover:border-forest/30 hover:-translate-y-1 hover:shadow-[0_15px_40px_-10px_rgba(45,80,22,0.15)] transition-all duration-300"
              >
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-forest/20 rounded-tl-2xl group-hover:border-forest/50 transition-colors" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-forest/20 rounded-br-2xl group-hover:border-forest/50 transition-colors" />

                <div className="w-14 h-14 rounded-xl bg-forest/10 border border-forest/20 flex items-center justify-center text-forest mb-5 group-hover:bg-forest group-hover:text-white group-hover:shadow-[0_0_20px_rgba(45,80,22,0.3)] transition-all duration-300">
                  {service.icon}
                </div>
                <h3 className="font-heading text-xl font-semibold text-slate-dark mb-3">
                  {service.title}
                </h3>
                <p className="text-warm-gray text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== BEFORE & AFTER ==================== */}
      <section className="py-20 md:py-28 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-golden/15 text-bark text-xs font-semibold tracking-wider uppercase mb-4">
              The Proof
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-slate-dark mb-4">
              Before &{' '}
              <span className="bg-gradient-to-r from-golden to-golden-light bg-clip-text text-transparent">
                After
              </span>
            </h2>
            <p className="text-warm-gray text-lg max-w-2xl mx-auto">
              Real transformations on real Maine properties. No filters, no staging. Just the work, shown side by side.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Pair 1 */}
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden group">
                <img src="/images/before-1.jpg" alt="Garden bed before cleanup" className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-bark/80 text-white text-xs font-semibold backdrop-blur-sm">Before</div>
              </div>
              <div className="relative rounded-2xl overflow-hidden group">
                <img src="/images/after-1.jpg" alt="Garden bed after professional mulching and edging" className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-forest/80 text-white text-xs font-semibold backdrop-blur-sm">After</div>
              </div>
              <p className="text-sm text-warm-gray text-center">Fresh mulch, clean edges, and defined garden beds bring structure to the whole front yard.</p>
            </div>

            {/* Pair 2 */}
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden group">
                <img src="/images/before-2.jpg" alt="Front walkway before renovation" className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-bark/80 text-white text-xs font-semibold backdrop-blur-sm">Before</div>
              </div>
              <div className="relative rounded-2xl overflow-hidden group">
                <img src="/images/after-2.jpg" alt="Front walkway after professional landscaping" className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-forest/80 text-white text-xs font-semibold backdrop-blur-sm">After</div>
              </div>
              <p className="text-sm text-warm-gray text-center">New walkway, tidy plantings, and professional mulching completely transformed this home's curb appeal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== WORK GALLERY ==================== */}
      <section id="work" className="py-20 md:py-28 bg-soil">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-sand text-xs font-semibold tracking-wider uppercase mb-4">
              Portfolio
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">
              Work That{' '}
              <span className="bg-gradient-to-r from-sage-light to-golden-light bg-clip-text text-transparent">
                Speaks for Itself
              </span>
            </h2>
            <p className="text-sand/80 text-lg max-w-2xl mx-auto">
              Patios, gardens, excavation, plowing. Every job gets the same level of care whether it is a backyard fire pit or a full property overhaul.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className={`relative rounded-xl overflow-hidden group cursor-pointer ${
                  i === 0 ? 'col-span-2 row-span-2' : ''
                }`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className={`w-full object-cover group-hover:scale-110 transition-all duration-500 ${
                    i === 0 ? 'h-full min-h-[300px] md:min-h-[400px]' : 'h-48 md:h-52'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-soil/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-xs font-medium">{img.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-forest/10 text-forest text-xs font-semibold tracking-wider uppercase mb-4">
              Our Process
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-slate-dark mb-4">
              How We{' '}
              <span className="bg-gradient-to-r from-forest to-sage bg-clip-text text-transparent">
                Get It Done
              </span>
            </h2>
            <p className="text-warm-gray text-lg max-w-2xl mx-auto">
              No runaround, no mystery. Here is exactly what happens when you reach out.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (desktop) */}
            <div className="hidden md:block absolute top-16 left-[16.67%] right-[16.67%] h-0.5 bg-gradient-to-r from-forest via-moss to-sage" />

            {[
              {
                step: "01",
                title: "Walk the Property",
                description: "We meet at your place, look at the space together, and talk through what you want. No pressure, no sales pitch. Just a real conversation about your property."
              },
              {
                step: "02",
                title: "Plan the Work",
                description: "You get a clear written estimate with a breakdown of materials, labor, and timeline. We answer every question before a single tool comes off the truck."
              },
              {
                step: "03",
                title: "Build It Right",
                description: "We show up on time, work clean, and finish what we start. When the job is done, you walk the site with us to make sure everything meets your expectations."
              }
            ].map((item, i) => (
              <div key={i} className="relative text-center">
                <div className="w-14 h-14 rounded-full bg-forest text-white flex items-center justify-center font-heading font-bold text-lg mx-auto mb-6 shadow-[0_0_20px_-5px_rgba(45,80,22,0.4)] relative z-10">
                  {item.step}
                </div>
                <h3 className="font-heading text-xl font-semibold text-slate-dark mb-3">{item.title}</h3>
                <p className="text-warm-gray text-sm leading-relaxed max-w-xs mx-auto">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section id="testimonials" className="py-20 md:py-28 bg-warm-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-forest/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-golden/5 rounded-full blur-[100px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-golden/15 text-bark text-xs font-semibold tracking-wider uppercase mb-4">
              What Customers Say
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-slate-dark mb-4">
              96% Recommend Us{' '}
              <span className="bg-gradient-to-r from-golden to-golden-light bg-clip-text text-transparent">
                on Facebook
              </span>
            </h2>
            <p className="text-warm-gray text-lg max-w-2xl mx-auto">
              These are real words from real customers. We did not write them, edit them, or cherry-pick them. This is just what people say after working with us.
            </p>
          </div>

          {/* Featured Testimonial */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="bg-white rounded-2xl p-8 md:p-10 border border-forest/8 shadow-[0_10px_40px_-10px_rgba(45,80,22,0.1)] relative">
              <svg className="absolute top-6 left-6 w-10 h-10 text-forest/10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
              </svg>
              <blockquote className="relative z-10">
                <p className="text-lg md:text-xl text-slate-dark leading-relaxed italic mb-6">
                  "{testimonials[activeTestimonial].text}"
                </p>
                <footer className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center">
                    <span className="text-forest font-heading font-bold text-sm">
                      {testimonials[activeTestimonial].name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-slate-dark">{testimonials[activeTestimonial].name}</p>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3.5 h-3.5 text-golden" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      ))}
                    </div>
                  </div>
                </footer>
              </blockquote>
            </div>

            {/* Testimonial Nav Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === activeTestimonial
                      ? 'bg-forest w-8'
                      : 'bg-forest/20 hover:bg-forest/40'
                  }`}
                  aria-label={`View testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ABOUT ==================== */}
      <section id="about" className="py-20 md:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-[0_20px_50px_-15px_rgba(45,80,22,0.2)]">
                <img
                  src="/images/work-showcase (4).jpg"
                  alt="Folsom Landscape Fabrications branded work truck at sunset"
                  className="w-full h-[350px] md:h-[450px] object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 md:-right-6 bg-white rounded-xl shadow-lg p-4 border border-forest/10">
                <img src="/images/work-showcase (7).jpg" alt="Folsom Landscape Fabrications branded cap" className="w-20 h-20 md:w-24 md:h-24 rounded-lg object-cover" />
              </div>
            </div>

            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-forest/10 text-forest text-xs font-semibold tracking-wider uppercase mb-4">
                About Francis
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-dark mb-6">
                One Crew, One Standard,{' '}
                <span className="bg-gradient-to-r from-forest to-moss bg-clip-text text-transparent">
                  Every Job
                </span>
              </h2>
              <div className="space-y-4 text-warm-gray leading-relaxed">
                <p>
                  Francis Folsom started this business because he cared about doing outdoor work the right way. Not the fastest way, not the cheapest way. The right way. That philosophy has not changed.
                </p>
                <p>
                  Based out of Augusta, Maine, Folsom Landscape Fabrications serves homeowners across the central part of the state. The crew handles everything from paver patios and retaining walls to full lawn maintenance and winter plowing.
                </p>
                <p>
                  What sets the team apart is simple: they treat every yard like it is their own. The details matter. The cleanup matters. Showing up when they say they will matters. That is why 96% of their customers recommend them, and most of their work comes through referrals.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-forest/10">
                <div>
                  <p className="font-heading text-2xl md:text-3xl font-bold text-forest">9+</p>
                  <p className="text-xs text-warm-gray mt-1">Years in Business</p>
                </div>
                <div>
                  <p className="font-heading text-2xl md:text-3xl font-bold text-forest">96%</p>
                  <p className="text-xs text-warm-gray mt-1">Recommended</p>
                </div>
                <div>
                  <p className="font-heading text-2xl md:text-3xl font-bold text-forest">4 Season</p>
                  <p className="text-xs text-warm-gray mt-1">Service Available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CTA / CONTACT ==================== */}
      <section id="contact" className="py-20 md:py-28 bg-forest relative overflow-hidden">
        <div className="absolute inset-0 bg-leaf-pattern opacity-20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-moss/20 rounded-full blur-[150px]" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">
            Ready to Talk About{' '}
            <span className="bg-gradient-to-r from-sage-light to-golden-light bg-clip-text text-transparent">
              Your Property?
            </span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10">
            Call or email today. Francis will come out, walk your property with you, and give you an honest estimate with no obligations. That is how it works.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-10">
            <a
              href="tel:2072158459"
              className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300 group"
            >
              <svg className="w-5 h-5 text-sage-light group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div className="text-left">
                <p className="text-xs text-white/60">Call Us</p>
                <p className="font-semibold text-sm">(207) 215-8459</p>
              </div>
            </a>
            <a
              href="mailto:francisfolsom@gmail.com"
              className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300 group"
            >
              <svg className="w-5 h-5 text-sage-light group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div className="text-left">
                <p className="text-xs text-white/60">Email Us</p>
                <p className="font-semibold text-sm">francisfolsom@gmail.com</p>
              </div>
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 text-white/50 text-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>13 Callahan Drive, Augusta, ME 04330</span>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-slate-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div>
              <img src="/images/logo.jpg" alt="Folsom Landscape Fabrications" className="h-14 w-auto brightness-0 invert opacity-80 mb-3" />
              <p className="text-white/40 text-sm">
                Professional landscaping and hardscaping in Augusta, Maine and surrounding areas.
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center gap-6">
                <a href="#services" className="text-white/50 text-sm hover:text-white transition-colors">Services</a>
                <a href="#work" className="text-white/50 text-sm hover:text-white transition-colors">Work</a>
                <a href="#testimonials" className="text-white/50 text-sm hover:text-white transition-colors">Reviews</a>
                <a href="#contact" className="text-white/50 text-sm hover:text-white transition-colors">Contact</a>
              </div>
            </div>

            <div className="md:text-right">
              <p className="text-white/40 text-sm">(207) 215-8459</p>
              <p className="text-white/40 text-sm">francisfolsom@gmail.com</p>
              <p className="text-white/40 text-sm">Augusta, ME 04330</p>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/30 text-xs">
              &copy; {new Date().getFullYear()} Folsom Landscape Fabrications. All rights reserved.
            </p>
            <p className="text-white/30 text-xs">
              Site by <a href="https://www.deadpixeldesign.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">Dead Pixel Design</a> &middot; David Russell &middot; (207) 694-8691
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
