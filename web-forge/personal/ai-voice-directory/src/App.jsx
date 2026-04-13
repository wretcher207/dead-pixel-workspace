import './index.css'

const AFFILIATE_LINK = 'https://try.elevenlabs.io/e1w8vxy7iuek'

const tools = [
  {
    name: 'ElevenLabs',
    tagline: 'The gold standard in AI voice generation',
    description: 'Industry-leading voice cloning, text-to-speech with 30+ languages, and the most natural-sounding AI voices available. Used by creators, studios, and enterprises worldwide.',
    features: ['Voice Cloning', '30+ Languages', 'API Access', 'Studio-Quality Output'],
    isFeatured: true,
    link: AFFILIATE_LINK,
    cta: 'Try ElevenLabs Free',
  },
  {
    name: 'Typefully',
    tagline: 'AI-powered social media writing',
    description: 'Write, schedule, and grow on X/Twitter and LinkedIn with AI. Draft threads, repurpose content, and track analytics from one clean dashboard.',
    features: ['AI Drafting', 'Post Scheduling', 'Growth Analytics'],
    isFeatured: false,
    link: 'https://typefully.com/?via=david-russell',
    cta: 'Try Typefully Free',
  },
  {
    name: 'Merlin',
    tagline: 'AI chat assistant for any website',
    description: 'Browser-based AI assistant that works on any website. Summarize pages, write emails, generate content, and chat with AI without switching tabs.',
    features: ['Browser Extension', 'Works Anywhere', 'Multiple AI Models'],
    isFeatured: false,
    link: 'https://www.getmerlin.in/chat?ref=zji3ymj',
    cta: 'Try Merlin Free',
  },
  {
    name: 'Clipto',
    tagline: 'Free audio and video transcription',
    description: 'Transcribe audio and video to text for free. Ideal for repurposing podcasts, interviews, and video content into written articles, show notes, and social posts.',
    features: ['Free Transcription', 'Video Support', 'Fast Turnaround'],
    isFeatured: false,
    link: 'https://www.clipto.com/transcribe-audio-video-to-text-free?via=david-russell',
    cta: 'Try Clipto Free',
  },
  {
    name: 'VEED',
    tagline: 'AI-powered video editing for creators',
    description: 'All-in-one video editor with AI subtitles, voice translation, text-to-speech, and background removal. Perfect for turning scripts and voiceovers into polished video content.',
    features: ['AI Subtitles', 'Voice Translation', 'One-Click Editing'],
    isFeatured: false,
    link: 'https://veed.cello.so/bStzNfJzyoP',
    cta: 'Try VEED Free',
  },
  {
    name: 'Gojiberry',
    tagline: 'AI-powered surveys and product reviews',
    description: 'Smart survey and review tool that helps creators and businesses collect feedback with AI-generated questions. Great for validating ideas and understanding your audience.',
    features: ['AI Surveys', 'Product Reviews', 'Analytics Dashboard'],
    isFeatured: false,
    link: 'https://gojiberry.ai/?ref=david6h',
    cta: 'Try Gojiberry Free',
  },
]

const featuredTool = tools.find(t => t.isFeatured)
const otherTools = tools.filter(t => !t.isFeatured)

function ArrowRight() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  )
}

function ArrowDown() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
    </svg>
  )
}

function ToolCard({ tool }) {
  return (
    <article className="bg-white border border-[#e5e5e5] rounded-2xl p-6 flex flex-col gap-4 hover:border-[#b0b0b0] transition-colors duration-200">
      <div className="h-9 w-9 bg-[#f0f0f0] rounded-lg flex items-center justify-center flex-shrink-0">
        <span className="text-sm font-bold text-[#0a0a0a]">{tool.name[0]}</span>
      </div>
      <div>
        <h3 className="font-semibold text-[#0a0a0a] text-base mb-0.5">{tool.name}</h3>
        <p className="text-[#777] text-sm">{tool.tagline}</p>
      </div>
      <p className="text-[#555] text-sm leading-relaxed flex-1">{tool.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {tool.features.map(f => (
          <span key={f} className="text-xs px-2.5 py-1 rounded-full border border-[#e5e5e5] text-[#777] bg-[#f9f9f9]">
            {f}
          </span>
        ))}
      </div>
      <a
        href={tool.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0a0a0a] hover:gap-3 transition-all duration-200"
      >
        {tool.cta}
        <ArrowRight />
      </a>
    </article>
  )
}

function App() {
  return (
    <div style={{ width: '100%', backgroundColor: '#ffffff', color: '#0a0a0a', minHeight: '100vh' }}>

      {/* Nav */}
      <nav style={{ borderBottom: '1px solid #e5e5e5' }}>
        <div className="site-container" style={{ paddingTop: '1rem', paddingBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="flex items-center gap-2.5">
            <span className="h-5 w-5 bg-[#0a0a0a] rounded-sm flex-shrink-0" aria-hidden="true" />
            <span className="text-sm font-semibold tracking-tight">The Autonomous Toolbelt</span>
          </div>
          <a
            href={AFFILIATE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold px-4 py-2 bg-[#0a0a0a] text-white rounded-lg hover:bg-[#333] transition-colors duration-200"
          >
            Try #1 Pick Free
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="site-container text-center" style={{ paddingTop: '5rem', paddingBottom: '4rem' }}>
        <div className="inline-flex items-center gap-2 rounded-full border border-[#e5e5e5] bg-[#f5f5f5] px-4 py-1.5 mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0a0a0a]" aria-hidden="true" />
          <span className="text-xs font-medium tracking-wider uppercase text-[#666]">Updated for 2026</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.1] mb-5">
          The AI Tools Actually<br />Worth Your Time
        </h1>
        <p className="text-base md:text-lg text-[#666] leading-relaxed mb-10" style={{ maxWidth: '36rem', marginLeft: 'auto', marginRight: 'auto' }}>
          We tested the top AI tools for voice, video, and content creation. These are the ones that actually deliver.
        </p>
        <a
          href="#directory"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#0a0a0a] text-white text-sm font-semibold rounded-lg hover:bg-[#333] transition-colors duration-200"
        >
          See the Full Kit
          <ArrowDown />
        </a>
      </section>

      {/* Featured Tool */}
      {featuredTool && (
        <section className="site-container" style={{ paddingBottom: '5rem' }}>
          <article className="bg-[#0a0a0a] text-white rounded-3xl p-8 md:p-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-white pulse-dot" aria-hidden="true" />
              <span className="text-xs font-semibold tracking-widest uppercase text-white/70">Editor's Pick</span>
            </div>
            <div className="md:flex md:items-start md:justify-between md:gap-12">
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-semibold mb-2">{featuredTool.name}</h2>
                <p className="text-white/50 text-sm font-medium mb-4">{featuredTool.tagline}</p>
                <p className="text-white/75 leading-relaxed text-base md:text-lg max-w-2xl">{featuredTool.description}</p>
                <div className="flex flex-wrap gap-2 mt-5">
                  {featuredTool.features.map(f => (
                    <span key={f} className="text-xs px-2.5 py-1 rounded-full border border-white/20 text-white/50">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-8 md:mt-0 md:flex-shrink-0">
                <a
                  href={featuredTool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0a0a0a] text-sm font-semibold rounded-lg hover:bg-[#f0f0f0] transition-colors duration-200"
                >
                  {featuredTool.cta}
                  <ArrowRight />
                </a>
              </div>
            </div>
          </article>
        </section>
      )}

      {/* Divider */}
      <div className="site-container">
        <div className="h-px bg-[#e5e5e5]" />
      </div>

      {/* Tools Grid */}
      <section id="directory" className="site-container" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">The Full Kit</h2>
          <p className="text-[#666] text-base">Ranked by quality, ease of use, and value.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherTools.map(tool => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="site-container">
        <div className="h-px bg-[#e5e5e5]" />
      </div>

      {/* Bottom CTA */}
      <section className="site-container text-center" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-[#666] text-base md:text-lg mb-8" style={{ maxWidth: '32rem', marginLeft: 'auto', marginRight: 'auto' }}>
          ElevenLabs is our top pick. Their free tier lets you experience studio-quality AI voices with no credit card required.
        </p>
        <a
          href={AFFILIATE_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0a0a0a] text-white text-sm font-semibold rounded-lg hover:bg-[#333] transition-colors duration-200"
        >
          Get Started with ElevenLabs
          <ArrowRight />
        </a>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #e5e5e5' }}>
        <div className="site-container" style={{ paddingTop: '2rem', paddingBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '0.75rem' }}>
            <span className="text-xs font-semibold text-[#555]">The Autonomous Toolbelt</span>
            <span className="text-xs text-[#999]">Some links on this site are affiliate links. We may earn a commission at no extra cost to you.</span>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default App
