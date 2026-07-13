import React, { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BriefcaseMedical, 
  CheckCircle, 
  Mic, 
  ArrowRight, 
  Menu, 
  X, 
  Mail, 
  ExternalLink,
  ChevronRight,
  BookOpen,
  Send,
  Loader2,
  Bookmark,
  Linkedin
} from 'lucide-react';

// Structuring mock essay, poetry, and journey details for rich interactive experiences
const MODAL_CONTENT = {
  essay: {
    title: "The Intersection of Faith and Pharmacology",
    category: "ESSAY",
    author: "Lydia Ugochi",
    date: "July 2026",
    content: [
      "In the quiet corners of Lagos pharmacies, healing is often a dual choreography of prayer and science. A patient receives their prescription of beta-blockers, folds it carefully alongside a silent petition, and whispers a word of faith. As a PharmD student at the University of Lagos, I have watched these parallel channels flow and sometimes conflict, but more often, harmonize.",
      "Pharmacology explains the precise affinity of a drug for its receptor—the exact locking mechanism that restores systemic homeostasis. It is a world of chemical kinetics, half-lives, and biochemical pathways. Yet, faith addresses the human condition behind the diagnosis. It deals with the hope, fears, and community networks that sustain a person through illness.",
      "Bridging these domains doesn't dilute scientific rigour; instead, it honors the whole patient. To truly heal, we must understand both the molecular structure and the human heart holding it. By appreciating cultural belief systems, healthcare providers in Nigeria can foster greater trust, improve patient adherence, and deliver clinical care that is as compassionate as it is scientifically sound."
    ]
  },
  poetry: {
    title: "Lagos Pulse: A Clinical Observation",
    category: "POETRY",
    author: "Lydia Ugochi",
    date: "June 2026",
    content: [
      "A city's heartbeat is not a steady sinus rhythm,",
      "but a chaotic, passionate ventricular cascade.",
      "It throbs in the yellow rush of Danfo buses,",
      "the high-frequency chatter of Balogun Market,",
      "the quiet diastolic pause of sunset over the Lagoon.",
      "",
      "We measure systemic pressure in the tension of the streets,",
      "the high resistance of afternoon traffic,",
      "the sudden surge of diesel generator hums.",
      "Our capillaries are the narrow alleys of Yaba and Mainland,",
      "carrying dreams like vital red blood cells,",
      "perfusing every dusty curb with persistent ambition.",
      "",
      "Yet under the clinical stethoscope of dusk,",
      "Lagos is beautifully alive, pump, push, persist—",
      "a collective heart beating against all clinical odds,",
      "refusing to miss a single glorious beat."
    ]
  },
  journey: {
    title: "Debating, Pitching & Healthcare Innovation",
    category: "ACADEMIC JOURNEY",
    author: "Lydia Ugochi",
    date: "Recent Milestone",
    content: [
      "My experience in campus debating has taught me that clinical accuracy is only as powerful as our ability to advocate for it. In healthcare, communication is not merely a soft skill; it is a vital clinical intervention.",
      "Recently, I co-created 'VigilantAfrica'—a digital health solution designed to make pharmacovigilance accessible across Sub-Saharan Africa. A critical issue in public health is that adverse drug reactions and counterfeit medications often go completely unreported because traditional reporting mechanisms are overly complex and academic.",
      "We pitched VigilantAfrica at the University of Lagos Health Week Pharm-a-thon, where we received the 2nd Runner-Up award. Our concept uses a lightweight, conversational interface accessible via USSD and WhatsApp, allowing everyday patients to report medication side effects in real-time.",
      "By transforming dry, intimidating forms into friendly dialogues, we seek to bridge the gap between clinical data collection and community advocacy. This project represents the core of my professional vision: utilizing technology, persuasive communication, and clinical knowledge to humanize healthcare and safeguard public health."
    ]
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [modalKey, setModalKey] = useState<keyof typeof MODAL_CONTENT | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Monitor scroll state for styling navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Update active tab based on scroll position
      const sections = ['home', 'about', 'pillars', 'footer'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            if (section === 'footer') {
              setActiveTab('contact');
            } else if (section === 'pillars') {
              setActiveTab('writing');
            } else {
              setActiveTab(section);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      setNewsletterStatus('error');
      return;
    }
    setNewsletterStatus('loading');
    setTimeout(() => {
      setNewsletterStatus('success');
      setEmailInput('');
    }, 1200);
  };

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-background selection:bg-secondary-container selection:text-on-secondary-container font-sans antialiased">
      
      {/* Top Navigation Bar */}
      <nav 
        id="navbar" 
        className={`fixed top-0 left-0 right-0 z-40 h-20 transition-all duration-300 border-b ${
          scrolled 
            ? 'bg-white/90 backdrop-blur-md shadow-sm border-outline-variant/20' 
            : 'bg-background border-transparent'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-5 md:px-6 flex justify-between items-center h-full">
          <a 
            onClick={() => handleScrollTo('home')} 
            className="font-serif text-2xl md:text-3xl font-semibold text-primary tracking-tight cursor-pointer"
          >
            LYDIA UGOCHI
          </a>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: 'Home', id: 'home' },
              { label: 'About', id: 'about' },
              { label: 'Writing', id: 'pillars' },
              { label: 'Speaking', id: 'pillars' },
              { label: 'Contact', id: 'footer' }
            ].map((link, idx) => {
              const normalizedActive = 
                activeTab === 'home' && link.id === 'home' ||
                activeTab === 'about' && link.id === 'about' ||
                activeTab === 'writing' && link.id === 'pillars' ||
                activeTab === 'speaking' && link.id === 'pillars' ||
                activeTab === 'contact' && link.id === 'footer';

              return (
                <button
                  key={idx}
                  onClick={() => handleScrollTo(link.id)}
                  className={`font-sans text-xs font-semibold uppercase tracking-widest pb-1 border-b transition-all duration-300 ${
                    normalizedActive 
                      ? 'text-secondary border-secondary' 
                      : 'text-on-background/70 border-transparent hover:text-secondary'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-primary p-2 focus:outline-none" 
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-50 md:hidden"
            />
            
            {/* Side Drawer */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-4/5 max-w-[320px] bg-white z-50 p-6 flex flex-col shadow-2xl md:hidden"
            >
              <div className="flex justify-between items-center mb-10">
                <span className="font-serif text-lg font-bold text-primary">NAVIGATION</span>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-primary p-1 rounded-full hover:bg-neutral-100"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {[
                  { label: 'Home', id: 'home' },
                  { label: 'About', id: 'about' },
                  { label: 'Writing', id: 'pillars' },
                  { label: 'Speaking', id: 'pillars' },
                  { label: 'Contact', id: 'footer' }
                ].map((link, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleScrollTo(link.id)}
                    className="font-sans text-left text-sm font-medium uppercase tracking-widest text-on-background py-2 border-b border-neutral-100 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              <div className="mt-auto pt-6 border-t border-neutral-100 text-center">
                <p className="font-serif text-xs text-on-surface-variant opacity-80">© 2026 Lydia Ugochi</p>
                <p className="font-sans text-[10px] text-secondary tracking-widest mt-1">LAGOS, NIGERIA</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="pt-20">
        
        {/* Hero Section */}
        <section id="home" className="relative overflow-hidden min-h-[90vh] flex items-center">
          {/* Background image on desktop (right-aligned, grayscale, high contrast) */}
          <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block">
            <div 
              className="w-full h-full bg-cover bg-center grayscale contrast-125 brightness-[0.9] transition-all duration-700 hover:scale-[1.02]" 
              style={{ 
                backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCvSST8x5iGtGZfYZUkOUcDIpT6Ox5yaqEcql1_NAQBnXuj-TAXVWYX70KsB8Dm4rsp7Hzvc3bMqQLYryFtHuQa-_-YYRr_YZrSYgMadkR-VCF48KoPQvVi0lGPe_6A9vDzq0IAVsmMB2LTtpNBix7Iz29utiIMC7itOx7l58WPMt_114j0YyLw6Voi6R4Nj8bf6i0GYA-Uj8JI0zooWISRiuzKkhA4lIwP3Dbp9DUolgiIfLq0cyfviS1Ce-W0EtWG4DQU1b08oFAQ")' 
              }}
            />
            {/* Elegant vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="max-w-[1200px] mx-auto px-5 md:px-6 w-full relative z-10">
            <div className="lg:w-7/12">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-3 py-1 bg-secondary-container text-on-secondary-container font-sans text-xs font-semibold uppercase tracking-widest mb-6 rounded-sm shadow-sm">
                  Academic Portfolio
                </span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-serif text-[42px] leading-[1.1] md:text-6xl font-bold text-primary mb-6 tracking-tight text-balance"
              >
                Lydia <span className="text-secondary italic font-normal">Ugochi</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="font-sans text-lg text-on-surface-variant max-w-lg mb-10 leading-relaxed text-balance"
              >
                PharmD Student | Aspiring Healthcare Professional | Creative Writer. Bridging the gap between pharmaceutical excellence and public health advocacy through academic rigour and creative storytelling.
              </motion.p>
              
              {/* Mobile Hero Image */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="w-full aspect-[4/3] rounded-sm bg-cover bg-center grayscale contrast-125 mb-8 lg:hidden shadow-lg"
                style={{ 
                  backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCvSST8x5iGtGZfYZUkOUcDIpT6Ox5yaqEcql1_NAQBnXuj-TAXVWYX70KsB8Dm4rsp7Hzvc3bMqQLYryFtHuQa-_-YYRr_YZrSYgMadkR-VCF48KoPQvVi0lGPe_6A9vDzq0IAVsmMB2LTtpNBix7Iz29utiIMC7itOx7l58WPMt_114j0YyLw6Voi6R4Nj8bf6i0GYA-Uj8JI0zooWISRiuzKkhA4lIwP3Dbp9DUolgiIfLq0cyfviS1Ce-W0EtWG4DQU1b08oFAQ")' 
                }}
              />

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <button 
                  onClick={() => handleScrollTo('pillars')}
                  className="inline-flex items-center justify-center px-8 py-4 bg-primary text-on-primary font-sans text-xs font-semibold uppercase tracking-widest transition-all duration-300 hover:bg-primary/95 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer rounded-sm"
                >
                  View My Journey
                </button>
                <button 
                  onClick={() => handleScrollTo('about')}
                  className="inline-flex items-center justify-center px-8 py-4 border border-primary text-primary font-sans text-xs font-semibold uppercase tracking-widest bg-transparent transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-sm active:scale-[0.98] cursor-pointer rounded-sm"
                >
                  My Background
                </button>
              </motion.div>
            </div>
          </div>
          
          {/* Subtle background gradient accent */}
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-surface-container-lowest">
          <div className="max-w-[1200px] mx-auto px-5 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Photo on the Left */}
              <div className="lg:col-span-5 relative">
                <div className="aspect-[4/5] bg-surface-container overflow-hidden shadow-md rounded-sm group">
                  <img 
                    alt="Lydia studying in library" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    src="https://media.licdn.com/dms/image/v2/D4E22AQEo9hPHsZ5xag/feedshare-shrink_480/B4EZ8iH5pAJEAg-/0/1782983927011?e=1785369600&v=beta&t=-qLtPkrqVnSUX6BGSQfIzXvmAl2D55VzC6TDQWDsX2w"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* Overlapping gold badge */}
                <div className="absolute -bottom-4 -right-4 p-6 bg-secondary text-on-secondary shadow-lg hidden md:block rounded-sm transform transition-all duration-300 hover:scale-105">
                  <p className="font-serif text-2xl font-bold tracking-tight">
                    L.U. 
                    <span className="block text-xs font-sans font-semibold tracking-widest opacity-80 mt-1">PHARMD</span>
                  </p>
                </div>
              </div>

              {/* Text on the Right */}
              <div className="lg:col-span-7">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-8 border-l-4 border-secondary pl-6 leading-tight">
                  Approachable Expertise
                </h2>
                
                <div className="space-y-6">
                  <p className="font-sans text-lg text-on-surface-variant leading-relaxed">
                    Currently pursuing a PharmD at the <span className="font-semibold text-on-background">University of Lagos</span>, Lydia Ugochi's academic journey is defined by the fusion of scientific rigour and community-focused advocacy. She is dedicated to mastering the complexities of pharmacology while fostering a passion for student-led health initiatives.
                  </p>
                  
                  <p className="font-sans text-lg text-on-surface-variant leading-relaxed">
                    Beyond the lecture halls, Lydia is a student leader committed to learning and growth. Whether she's participating in healthcare seminars or documenting her clinical observations, her goal remains to humanize medicine and empower her community through informed, accessible dialogue.
                  </p>

                  <div className="grid grid-cols-2 gap-8 pt-6 border-t border-outline-variant/30">
                    <div>
                      <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-secondary mb-2">Location</h4>
                      <p className="font-sans text-base font-medium text-on-background">Lagos, Nigeria</p>
                    </div>
                    <div>
                      <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-secondary mb-2">Education</h4>
                      <p className="font-sans text-base font-medium text-on-background">Doctor of Pharmacy Candidate</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Core Pillars Section (Bento Grid) */}
        <section id="pillars" className="py-24 bg-background">
          <div className="max-w-[1200px] mx-auto px-5 md:px-6 mb-16 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">Core Pillars</h2>
            <p className="font-sans text-base text-on-surface-variant max-w-2xl mx-auto">
              Exploring the intersections of science, communication, and art.
            </p>
          </div>

          <div className="max-w-[1200px] mx-auto px-5 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6">
              
              {/* Pharmacy & Health Card */}
              <div className="md:col-span-3 lg:col-span-4 bg-surface-container-low p-8 border-t-2 border-secondary flex flex-col justify-between group transition-all duration-300 hover:bg-white hover:shadow-xl rounded-sm">
                <div>
                  <div className="w-12 h-12 rounded-sm bg-primary/5 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                    <BriefcaseMedical className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-primary mb-4">Pharmacy &amp; Health</h3>
                  <p className="font-sans text-sm md:text-base text-on-surface-variant mb-6 leading-relaxed">
                    Deeply committed to pharmaceutical innovation and public health education at the University of Lagos.
                  </p>
                </div>
                
                <ul className="space-y-3 font-sans text-xs font-semibold uppercase tracking-wider text-on-surface-variant pt-4 border-t border-outline-variant/20">
                  {[
                    "Clinical Advocacy",
                    "Drug Information",
                    "Patient Education"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-secondary fill-secondary/10 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Debating & Pitching Excellence Card */}
              <div className="md:col-span-3 lg:col-span-8 bg-primary-container text-on-primary flex flex-col lg:flex-row overflow-hidden group rounded-sm shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="w-full lg:w-1/2 h-64 lg:h-auto overflow-hidden">
                  <img 
                    alt="Lydia pitching healthcare ideas" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    src="https://media.licdn.com/dms/image/v2/D4E22AQHntutxCXvmtw/feedshare-shrink_480/B4EZ8iTj2fJkAg-/0/1782986981191?e=1785369600&v=beta&t=AnXJXP1PNNcPtu-f14cDZoukEdd_-207tiDmKMfp0YY"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="w-full lg:w-1/2 p-8 md:p-10 flex flex-col justify-center">
                  <div className="w-10 h-10 bg-white/10 flex items-center justify-center rounded-sm mb-6 text-secondary-container">
                    <Mic className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-on-primary mb-4">
                    Debating &amp; Pitching Excellence
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-on-primary-container mb-8">
                    A consistent winner in campus debates, Lydia brings the power of storytelling to healthcare innovation. Recently, she pitched 'VigilantAfrica'—a digital health solution for pharmacovigilance—at the Health Week Pharm-a-thon, securing 2nd Runner-Up. She bridges the gap between clinical data and human impact through persuasive communication.
                  </p>
                  <button 
                    onClick={() => setModalKey('journey')}
                    className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-widest text-secondary-container hover:text-white transition-colors uppercase cursor-pointer text-left w-fit group/btn"
                  >
                    Read My Journey 
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1.5" />
                  </button>
                </div>
              </div>

              {/* Creative Writing Card */}
              <div className="md:col-span-6 lg:col-span-12 bg-surface-container-highest p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center rounded-sm">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Bookmark className="w-5 h-5 text-secondary" />
                    <span className="font-sans text-xs font-bold uppercase tracking-widest text-secondary">Literary Expression</span>
                  </div>
                  <h3 className="font-serif text-3xl font-semibold text-primary mb-4">Creative Writing</h3>
                  <p className="font-sans text-base text-on-surface-variant mb-8 leading-relaxed">
                    Words have the power to heal. Through my writing, I explore the nuances of the human experience, medicine, and identity.
                  </p>
                  
                  <div className="space-y-5">
                    {[
                      { type: "ESSAY", title: "The Intersection of Faith and Pharmacology", key: "essay" },
                      { type: "POETRY", title: "Lagos Pulse: A Clinical Observation", key: "poetry" }
                    ].map((item, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => setModalKey(item.key as any)}
                        className="border-b border-outline-variant pb-4 group cursor-pointer"
                      >
                        <span className="font-sans text-[10px] font-bold tracking-widest text-secondary block mb-1">
                          {item.type}
                        </span>
                        <h4 className="font-sans text-base font-bold text-on-background group-hover:text-primary transition-colors flex items-center justify-between">
                          {item.title}
                          <ChevronRight className="w-4 h-4 text-on-surface-variant/40 group-hover:translate-x-1 transition-transform" />
                        </h4>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hand-written notebook frame */}
                <div className="h-full min-h-[300px] bg-white p-2.5 shadow-md rotate-2 hover:rotate-0 transition-all duration-500 rounded-sm overflow-hidden group">
                  <img 
                    alt="Crisp notebook handwriting with pen" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102" 
                    src="https://media.licdn.com/dms/image/v2/D4E22AQHMALVCE5jVKw/feedshare-shrink_800/B4EZ2iXvXAIwAc-/0/1776545625783?e=1785369600&v=beta&t=u4tCRfsstARs1f6x1ciR_nRA7TjYYFNXDQRiqGtIHrc"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Connection Section */}
        <section className="py-16 bg-secondary-fixed text-on-secondary-fixed relative overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-5 md:px-6 text-center relative z-10">
            <h2 className="font-serif text-3xl font-bold mb-4">Let's Connect in Lagos</h2>
            <p className="font-sans text-base mb-8 max-w-xl mx-auto opacity-90 leading-relaxed">
              Join my journey through pharmacy school and beyond. Let's start a conversation, explore collaborations, or share creative insights.
            </p>
            
            <div className="flex justify-center">
              <a 
                href="https://www.linkedin.com/in/lydia-ugochi-14a3a1404/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-on-primary font-sans text-xs font-semibold uppercase tracking-widest hover:bg-primary/95 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 rounded-sm shadow-md cursor-pointer"
              >
                <Linkedin className="w-5 h-5 fill-current" />
                <span>Connect on LinkedIn</span>
              </a>
            </div>
          </div>
          
          {/* Faint subtle shapes */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        </section>

      </main>

      {/* Footer */}
      <footer id="footer" className="w-full mt-24 bg-surface-container-low border-t border-outline-variant/30">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6 py-16 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-3">
            <h2 className="font-serif text-2xl font-bold text-primary tracking-tight">LYDIA UGOCHI</h2>
            <p className="font-sans text-sm text-on-surface-variant opacity-80">
              © 2026 Lydia Ugochi. All rights reserved.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 font-sans text-sm">
            <a 
              href="https://www.linkedin.com/in/lydia-ugochi-14a3a1404/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-secondary transition-colors flex items-center gap-1.5 font-medium"
            >
              LinkedIn <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); alert("Academic research portfolio coming soon!"); }}
              className="text-on-surface-variant hover:text-secondary transition-colors flex items-center gap-1.5 font-medium"
            >
              Academic Research <BookOpen className="w-3.5 h-3.5 opacity-60" />
            </a>
            <a 
              href="mailto:contact@lydiaugochi.com" 
              className="text-on-surface-variant hover:text-secondary transition-colors flex items-center gap-1.5 font-medium"
            >
              Email Me <Mail className="w-3.5 h-3.5 opacity-60" />
            </a>
          </div>
        </div>
      </footer>

      {/* Interactive Modal to Read Essays / Poems / Journey */}
      <AnimatePresence>
        {modalKey && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalKey(null)}
              className="absolute inset-0 bg-neutral-900/85 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-white rounded-sm shadow-2xl p-6 md:p-10 overflow-hidden max-h-[85vh] flex flex-col"
            >
              <button 
                onClick={() => setModalKey(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 text-on-surface-variant/70 hover:text-primary transition-colors p-2 hover:bg-neutral-100 rounded-full"
                aria-label="Close reading panel"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="overflow-y-auto pr-2 flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-sans text-[10px] font-bold tracking-widest text-secondary border border-secondary/30 px-2 py-0.5 rounded-sm">
                    {MODAL_CONTENT[modalKey].category}
                  </span>
                  <span className="text-xs text-on-surface-variant/60 font-sans font-medium">•</span>
                  <span className="text-xs text-on-surface-variant/60 font-sans font-medium">
                    {MODAL_CONTENT[modalKey].date}
                  </span>
                </div>

                <h3 className="font-serif text-2xl md:text-3xl font-semibold text-primary mb-6 leading-tight">
                  {MODAL_CONTENT[modalKey].title}
                </h3>

                <div className="font-sans text-base text-on-surface-variant leading-relaxed space-y-5">
                  {modalKey === 'poetry' ? (
                    <div className="pl-4 border-l-2 border-secondary/30 italic py-2 space-y-1">
                      {MODAL_CONTENT.poetry.content.map((line, index) => (
                        <p key={index} className="min-h-[1rem]">
                          {line}
                        </p>
                      ))}
                    </div>
                  ) : (
                    MODAL_CONTENT[modalKey].content.map((paragraph, index) => (
                      <p key={index}>
                        {paragraph}
                      </p>
                    ))
                  )}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-outline-variant/20 flex justify-between items-center text-xs font-sans font-medium text-on-surface-variant/70">
                <span>By {MODAL_CONTENT[modalKey].author}</span>
                <button 
                  onClick={() => setModalKey(null)}
                  className="text-primary hover:text-secondary font-bold uppercase tracking-widest transition-colors"
                >
                  DONE READING
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
