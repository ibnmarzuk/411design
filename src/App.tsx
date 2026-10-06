import React, { useState } from 'react';
import { 
  ArrowRight, 
  Check, 
  Menu, 
  X, 
  ChevronRight, 
  Phone, 
  Instagram, 
  Mail, 
  Maximize2, 
  MapPin, 
  Sparkles, 
  Layers, 
  CheckCircle,
  Eye,
  Info
} from 'lucide-react';

// Design Archive Images configuration mapping the 11 uploaded files
const ARCHIVE_IMAGES = [
  {
    id: 0,
    path: '/input_file_0.png',
    title: 'Section 1: Hero Studio Mockup',
    description: 'The editorial visual signature layout. Crafting Furniture. Transforming Spaces. Featuring the iconic terracotta modular sofa rendering.',
    category: 'Layout Blueprint'
  },
  {
    id: 1,
    path: '/input_file_1.png',
    title: 'Section 2: Brand Introduction Mockup',
    description: 'Where Craft Meets Space. Deep-dive typography explaining the design ethos of paying attention.',
    category: 'Layout Blueprint'
  },
  {
    id: 2,
    path: '/input_file_2.png',
    title: 'Section 3: Capabilities Directory',
    description: 'Detailed service hierarchy showing furniture production, interior design, bespoke pieces, turnkey styling, and space consultation.',
    category: 'Capabilities Design'
  },
  {
    id: 3,
    path: '/input_file_3.png',
    title: 'Section 4: Selected Work Portfolio',
    description: 'Selected Work card layout featuring: The Soft Structure, The Grounded Room, and The Finishing Layer.',
    category: 'Portfolio Blueprint'
  },
  {
    id: 4,
    path: '/input_file_4.png',
    title: 'Section 5: Studio Quote Banner',
    description: 'Dark-green quote panel: "A space can be practical and still have a point of view." set against signature typography.',
    category: 'Brand Statement'
  },
  {
    id: 5,
    path: '/input_file_5.png',
    title: 'Section 6: Craft & Making Process',
    description: 'Process roadmap (01 Brief, 02 Direction, 03 Real, 04 Scene) detailing how furniture moves from paper to physical form.',
    category: 'Process Design'
  },
  {
    id: 6,
    path: '/input_file_6.png',
    title: 'Section 7: About the Maker Mockup',
    description: 'Introducing Toriora Kofoworola, the certified female furniture maker, personal craftsmanship and builder details.',
    category: 'Biography Blueprint'
  },
  {
    id: 7,
    path: '/input_file_7.png',
    title: 'Section 8: Contact Form Design',
    description: 'Bespoke dark forest charcoal conversation portal. "Tell us what the space needs." formatted with minimal underline fields.',
    category: 'Form Design'
  },
  {
    id: 8,
    path: '/input_file_8.png',
    title: 'Real Project: Asymmetric Geometric Door',
    description: 'Completed premium project by The 411Designs. Features dark charcoal satin-painted panels perfectly offset with natural warm oak grain inserts.',
    category: 'Completed Work'
  },
  {
    id: 9,
    path: '/input_file_9.png',
    title: 'The 411Designs Logo (Green Studio Spec)',
    description: 'Official brand mark watermark containing architectural lines, structural geometry, and green tones.',
    category: 'Brand Logo'
  },
  {
    id: 10,
    path: '/input_file_10.png',
    title: 'The 411Designs Logo (Bronze Luxury Spec)',
    description: 'Official luxury spec logo in warm gold/bronze. Used for the favicon, watermarks, and high-end print representations.',
    category: 'Brand Logo'
  }
];

export default function App() {
  const [viewMode, setViewMode] = useState<'showroom' | 'archives'>('showroom');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Interactive Before & After state
  const [beforeAfterSliderPos, setBeforeAfterSliderPos] = useState(50);
  
  // Selected project category filter
  const [activeProjectFilter, setActiveProjectFilter] = useState<'all' | 'furniture' | 'interior' | 'doors'>('all');
  
  // Interactive Lightbox state
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxTitle, setLightboxTitle] = useState('');
  const [lightboxDesc, setLightboxDesc] = useState('');

  // Contact form submission state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    service: 'Furniture Production',
    details: ''
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contact) return;
    setFormSubmitted(true);
  };

  // Prepares the WhatsApp pre-filled text link
  const getWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Hello Toriora! I visited your website and would like to start a project.\n\n` +
      `Name: ${formData.name || 'Interested Client'}\n` +
      `Contact: ${formData.contact || 'Not provided'}\n` +
      `Service: ${formData.service}\n` +
      `Project Details: ${formData.details || 'Let\'s collaborate on custom furniture / space styling.'}`
    );
    return `https://wa.me/2348072421190?text=${text}`;
  };

  const openLightbox = (path: string, title: string, desc: string) => {
    setLightboxImage(path);
    setLightboxTitle(title);
    setLightboxDesc(desc);
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-[#E05A36] selection:text-white">
      
      {/* 1. Header & Navigation (Clean, Sticky 3-Zone Contract) */}
      <header className="sticky top-0 z-50 bg-[#F7F5F0]/95 backdrop-blur-md border-b border-[#E4E2DC] px-4 md:px-12 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Zone 1: Single element brand wordmark */}
          <a href="#" onClick={() => setViewMode('showroom')} className="flex items-center gap-3 group focus:outline-none">
            <span className="font-editorial text-xl md:text-2xl font-bold tracking-tight text-[#1C1B19] group-hover:text-[#E05A36] transition-colors">
              4•11 <span className="font-sans-premium text-xs tracking-widest text-[#7C7A74] ml-1 font-semibold">DESIGNS</span>
            </span>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-sans-premium font-medium text-[#5C5A54]">
            <a href="#studio" className="hover:text-black transition-colors py-1">Studio</a>
            <a href="#capabilities" className="hover:text-black transition-colors py-1">Capabilities</a>
            <a href="#projects" className="hover:text-black transition-colors py-1">Selected Work</a>
            <a href="#process" className="hover:text-black transition-colors py-1">Process</a>
            <a href="#about" className="hover:text-black transition-colors py-1">About the Maker</a>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-3">
            <a 
              href="#contact" 
              className="px-5 py-2.5 bg-[#1C1B19] text-white text-xs font-sans-premium font-semibold tracking-wider uppercase rounded hover:bg-[#E05A36] transition-colors whitespace-nowrap"
            >
              START A PROJECT
            </a>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="md:hidden p-2 text-[#1C1B19] focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#F7F5F0] border-b border-[#E4E2DC] shadow-lg py-6 px-6 animate-fade-in">
            <div className="flex flex-col gap-5 text-base font-sans-premium font-semibold">
              <a href="#studio" onClick={() => setMobileMenuOpen(false)} className="text-[#1C1B19] hover:text-[#E05A36]">Studio</a>
              <a href="#capabilities" onClick={() => setMobileMenuOpen(false)} className="text-[#1C1B19] hover:text-[#E05A36]">Capabilities</a>
              <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="text-[#1C1B19] hover:text-[#E05A36]">Selected Work</a>
              <a href="#process" onClick={() => setMobileMenuOpen(false)} className="text-[#1C1B19] hover:text-[#E05A36]">Process</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-[#1C1B19] hover:text-[#E05A36]">About the Maker</a>
              
              <hr className="border-[#E4E2DC] my-1" />
              
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#9C9A94]">Viewing Mode</span>
                <div className="grid grid-cols-2 gap-2 bg-[#EBE9E2] p-1 rounded">
                  <button 
                    onClick={() => { setViewMode('showroom'); setMobileMenuOpen(false); }}
                    className={`py-2 text-xs rounded font-bold transition-all ${viewMode === 'showroom' ? 'bg-white text-black shadow-sm' : 'text-[#7C7A74]'}`}
                  >
                    Showroom
                  </button>
                  <button 
                    onClick={() => { setViewMode('archives'); setMobileMenuOpen(false); }}
                    className={`py-2 text-xs rounded font-bold transition-all ${viewMode === 'archives' ? 'bg-white text-black shadow-sm' : 'text-[#7C7A74]'}`}
                  >
                    Mockups ({ARCHIVE_IMAGES.length})
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* 2. Main Content Body */}
      <main className="flex-grow">
        
        {/* ======================================= */}
        {/* VIEW 1: THE INTERACTIVE SHOWROOM VIEW    */}
        {/* ======================================= */}
        {viewMode === 'showroom' && (
          <div className="space-y-0 animate-fade-in">
            
            {/* HERO SECTION */}
            <section className="relative overflow-hidden bg-[#F7F5F0] py-16 lg:py-24 border-b border-[#E4E2DC]">
              {/* Seamless blended brand logo watermark in background */}
              <div 
                className="absolute right-[-10%] top-[-10%] h-[80%] w-[60%] opacity-[0.04] select-none pointer-events-none mix-blend-multiply invert bg-no-repeat bg-contain"
                style={{ backgroundImage: 'url("/input_file_10.png")' }}
              />

              <div className="max-w-7xl mx-auto px-4 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                
                {/* Hero Text Details */}
                <div className="lg:col-span-6 space-y-8 relative z-10">
                  <div className="space-y-4">
                    <p className="text-xs font-bold tracking-widest text-[#E05A36] uppercase">
                      Furniture Production · Interior Design Studio
                    </p>
                    <h1 className="font-editorial text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight text-[#1C1B19] text-wrap">
                      Make room for <br />
                      <span className="text-[#E05A36] italic font-medium font-editorial">better living.</span>
                    </h1>
                    <p className="font-sans-premium text-base md:text-lg text-[#5C5A54] leading-relaxed max-w-lg">
                      The 411Designs creates furniture and interiors with a grounded point of view — made for how people actually live, gather and grow.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-5">
                    <a 
                      href="#contact" 
                      className="group px-7 py-4 bg-[#1C1B19] hover:bg-[#E05A36] text-white text-sm font-sans-premium font-semibold tracking-wider uppercase rounded shadow-sm transition-all flex items-center gap-2"
                    >
                      START A PROJECT 
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a 
                      href="#capabilities" 
                      className="text-xs font-bold tracking-widest uppercase border-b-2 border-black/10 hover:border-[#E05A36] py-1 text-[#1C1B19] hover:text-[#E05A36] transition-colors"
                    >
                      SEE CAPABILITIES →
                    </a>
                  </div>

                  {/* Brand Meta Detail Footer */}
                  <div className="pt-6 border-t border-[#EBEBE5] flex items-start gap-3 text-xs text-[#7C7A74] font-sans-premium">
                    <span className="text-[#E05A36] text-lg font-bold">✶</span>
                    <div>
                      <p className="font-bold text-black uppercase tracking-wider">Female-Led Studio</p>
                      <p>Ilorin · Osogbo · Nigeria</p>
                    </div>
                  </div>
                </div>

                {/* Hero Right Visual Column - Showcases the official luxury-spec bronze logo */}
                <div className="lg:col-span-6 relative z-10">
                  <div className="relative group rounded-lg overflow-hidden border border-[#E4E2DC] shadow-lg bg-[#101914] p-8 aspect-[4/3] flex flex-col justify-between">
                    <div className="flex items-center justify-between text-xs text-white/50 font-sans-premium">
                      <span className="uppercase tracking-widest font-bold">Studio Signature Mark</span>
                      <span className="text-[#E05A36] font-bold">✶ ✶ ✶</span>
                    </div>
                    
                    <div className="h-40 w-full flex items-center justify-center relative my-4">
                      {/* Subtly animated large brand logo */}
                      <img 
                        src="/input_file_10.png" 
                        alt="The 411Designs Bronze Logo" 
                        className="h-full w-auto object-contain mix-blend-screen scale-110 group-hover:scale-115 transition-transform duration-[1.5s]"
                      />
                    </div>

                    <div className="border-t border-white/10 pt-4 flex items-center justify-between text-[11px] font-sans-premium text-white/50 uppercase tracking-widest">
                      <span>Certified Female Maker</span>
                      <span>Toriora Kofoworola</span>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* INTERIOR CAPABILITIES STATIC CRISP BANNER */}
            <div className="bg-[#E05A36] py-4 text-white flex items-center justify-center select-none border-y border-[#D64E2A] relative z-10 px-4">
              <div className="flex flex-wrap items-center justify-center gap-x-6 md:gap-x-10 gap-y-3 text-center font-sans-premium text-xs font-bold tracking-widest">
                <span>FURNITURE PRODUCTION</span>
                <span className="text-white/40 font-bold text-sm">✶</span>
                <span>INTERIOR DESIGN</span>
                <span className="text-white/40 font-bold text-sm">✶</span>
                <span>BESPOKE PIECES</span>
                <span className="text-white/40 font-bold text-sm">✶</span>
                <span>TURNKEY STYLING</span>
              </div>
            </div>

            {/* SECTION 2: BRAND INTRODUCTION (Where Craft Meets Space) */}
            <section id="studio" className="py-20 bg-[#F5F2EB] border-b border-[#E4E2DC] relative overflow-hidden">
              {/* Seamless blended brand logo watermark in background */}
              <div 
                className="absolute left-[-10%] top-[-10%] h-[80%] w-[60%] opacity-[0.03] select-none pointer-events-none mix-blend-multiply invert bg-no-repeat bg-contain"
                style={{ backgroundImage: 'url("/input_file_9.png")' }}
              />

              <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
                
                {/* Visual Header Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-baseline mb-16">
                  <div className="lg:col-span-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#E05A36]">01 THE STUDIO</span>
                    <p className="font-editorial text-2xl md:text-3xl text-[#1C1B19] mt-2 italic leading-relaxed font-normal">
                      A considered approach to the objects and environments around us.
                    </p>
                  </div>
                  <div className="lg:col-span-8">
                    <h2 className="font-editorial text-4xl md:text-6xl font-bold text-[#1C1B19] tracking-tight leading-none text-wrap">
                      Good design starts with <br />
                      <span className="text-black italic font-medium font-editorial underline decoration-[#E05A36] decoration-3 underline-offset-8">paying attention.</span>
                    </h2>
                  </div>
                </div>

                {/* Substantive Context */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 pt-8 border-t border-[#E4E2DC]">
                  <div className="lg:col-span-4 space-y-6">
                    <p className="font-sans-premium text-[#5C5A54] leading-relaxed">
                      The 411Designs is a furniture production and interior design studio with a practical love for detail. The work sits between what a room needs to do and how you want it to feel.
                    </p>
                    <div className="p-5 bg-white/60 border border-[#E4E2DC] rounded space-y-3">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-[#7C7A74]">Studio Core Identity</span>
                      <p className="text-xs font-sans-premium text-[#5C5A54]">
                        Craftsmanship underpins our creativity. We bring deep workshop-level production experience directly into physical space design.
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-4 space-y-6">
                    <p className="font-sans-premium text-[#5C5A54] leading-relaxed">
                      From a single bespoke piece to a more complete interior direction, the studio helps turn a loose idea into something you can live with. The final work should look good, yes — but it should also make sense.
                    </p>
                    <div className="flex items-center gap-3 text-xs text-[#E05A36] font-sans-premium font-bold py-1">
                      <span className="h-1.5 w-1.5 bg-[#E05A36] rounded-full"></span>
                      <span>No compromises on timber selection or paint finish.</span>
                    </div>
                  </div>

                  {/* Brand Logo Spec Image Block */}
                  <div className="lg:col-span-4">
                    <div className="relative group rounded border border-[#E4E2DC] overflow-hidden bg-[#101914] p-6 shadow-md aspect-[4/3] flex flex-col justify-between">
                      <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Official Green Studio Spec</span>
                      <div className="h-28 w-full flex items-center justify-center">
                        <img 
                          src="/input_file_9.png" 
                          alt="The 411Designs Green Logo" 
                          className="h-full w-auto object-contain mix-blend-screen group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <div className="text-[10px] text-center font-sans-premium text-white/50 uppercase tracking-widest">
                        The 411Designs Wordmark
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* SECTION 3: SERVICES (CAPABILITIES) */}
            <section id="capabilities" className="py-24 bg-[#F7F5F0] border-b border-[#E4E2DC]">
              <div className="max-w-7xl mx-auto px-4 md:px-12">
                
                {/* Header */}
                <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#E05A36]">02 CAPABILITIES</span>
                    <h2 className="font-editorial text-4xl md:text-6xl font-bold tracking-tight text-[#1C1B19] mt-3">
                      Rooms, pieces, <br />
                      <span className="text-[#E05A36] italic font-medium font-editorial">possibilities.</span>
                    </h2>
                  </div>
                  <div className="max-w-md">
                    <p className="font-sans-premium text-[#5C5A54] leading-relaxed">
                      A clear set of ways to bring the studio into your next space. We manage your design fully from selection of woods to handcrafting and installation.
                    </p>
                  </div>
                </div>

                {/* Capabilities Editorial List (No pill tags, clean metadata line) */}
                <div className="space-y-0 border-t border-black/10">
                  
                  {/* Service 1 */}
                  <div className="group py-8 border-b border-black/10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center hover:bg-[#F3F0E8] transition-colors px-4 rounded-sm">
                    <span className="lg:col-span-1 text-xs font-sans-premium font-bold text-[#E05A36]">01</span>
                    <div className="lg:col-span-3">
                      <h3 className="font-editorial text-2xl font-bold text-[#1C1B19]">Furniture production</h3>
                    </div>
                    <div className="lg:col-span-5">
                      <p className="text-xs font-sans-premium text-[#5C5A54]">
                        Purpose-built pieces made around the room, the routine and the way you want to live in it. Made with premium, kiln-dried hardwoods.
                      </p>
                    </div>
                    <div className="lg:col-span-2 text-right">
                      <span className="text-[10px] font-sans-premium font-bold text-[#7C7A74] tracking-widest uppercase">
                        Sofas · Beds · Wardrobes · Dining
                      </span>
                    </div>
                    <div className="lg:col-span-1 flex justify-end">
                      <ChevronRight className="h-5 w-5 text-[#9C9A94] group-hover:text-[#E05A36] group-hover:translate-x-1.5 transition-all" />
                    </div>
                  </div>

                  {/* Service 2 */}
                  <div className="group py-8 border-b border-black/10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center hover:bg-[#F3F0E8] transition-colors px-4 rounded-sm">
                    <span className="lg:col-span-1 text-xs font-sans-premium font-bold text-[#E05A36]">02</span>
                    <div className="lg:col-span-3">
                      <h3 className="font-editorial text-2xl font-bold text-[#1C1B19]">Interior design</h3>
                    </div>
                    <div className="lg:col-span-5">
                      <p className="text-xs font-sans-premium text-[#5C5A54]">
                        A considered point of view for homes, workspaces and the details that make them feel like yours. Seamless curation of textures.
                      </p>
                    </div>
                    <div className="lg:col-span-2 text-right">
                      <span className="text-[10px] font-sans-premium font-bold text-[#7C7A74] tracking-widest uppercase">
                        Concept · Selections · Direction
                      </span>
                    </div>
                    <div className="lg:col-span-1 flex justify-end">
                      <ChevronRight className="h-5 w-5 text-[#9C9A94] group-hover:text-[#E05A36] group-hover:translate-x-1.5 transition-all" />
                    </div>
                  </div>

                  {/* Service 3 */}
                  <div className="group py-8 border-b border-black/10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center hover:bg-[#F3F0E8] transition-colors px-4 rounded-sm">
                    <span className="lg:col-span-1 text-xs font-sans-premium font-bold text-[#E05A36]">03</span>
                    <div className="lg:col-span-3">
                      <h3 className="font-editorial text-2xl font-bold text-[#1C1B19]">Bespoke pieces</h3>
                    </div>
                    <div className="lg:col-span-5">
                      <p className="text-xs font-sans-premium text-[#5C5A54]">
                        Furniture with a reason to exist. Tuned to scale, use and the character of your space. Distinctive and highly personalized joinery work.
                      </p>
                    </div>
                    <div className="lg:col-span-2 text-right">
                      <span className="text-[10px] font-sans-premium font-bold text-[#7C7A74] tracking-widest uppercase">
                        One-offs · Custom Details · Finishes
                      </span>
                    </div>
                    <div className="lg:col-span-1 flex justify-end">
                      <ChevronRight className="h-5 w-5 text-[#9C9A94] group-hover:text-[#E05A36] group-hover:translate-x-1.5 transition-all" />
                    </div>
                  </div>

                  {/* Service 4 */}
                  <div className="group py-8 border-b border-black/10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center hover:bg-[#F3F0E8] transition-colors px-4 rounded-sm">
                    <span className="lg:col-span-1 text-xs font-sans-premium font-bold text-[#E05A36]">04</span>
                    <div className="lg:col-span-3">
                      <h3 className="font-editorial text-2xl font-bold text-[#1C1B19]">Turnkey styling</h3>
                    </div>
                    <div className="lg:col-span-5">
                      <p className="text-xs font-sans-premium text-[#5C5A54]">
                        From the first conversation to the finishing layer, a clearer path from idea to ready room. Art placement, accents, and complete setup.
                      </p>
                    </div>
                    <div className="lg:col-span-2 text-right">
                      <span className="text-[10px] font-sans-premium font-bold text-[#7C7A74] tracking-widest uppercase">
                        Sourcing · Styling · Set-up
                      </span>
                    </div>
                    <div className="lg:col-span-1 flex justify-end">
                      <ChevronRight className="h-5 w-5 text-[#9C9A94] group-hover:text-[#E05A36] group-hover:translate-x-1.5 transition-all" />
                    </div>
                  </div>

                  {/* Service 5 */}
                  <div className="group py-8 border-b border-[#E4E2DC] grid grid-cols-1 lg:grid-cols-12 gap-6 items-center hover:bg-[#F3F0E8] transition-colors px-4 rounded-sm">
                    <span className="lg:col-span-1 text-xs font-sans-premium font-bold text-[#E05A36]">05</span>
                    <div className="lg:col-span-3">
                      <h3 className="font-editorial text-2xl font-bold text-[#1C1B19]">Space consultation</h3>
                    </div>
                    <div className="lg:col-span-5">
                      <p className="text-xs font-sans-premium text-[#5C5A54]">
                        A focused outside eye when you need to make better decisions before physical work begins. Spatial flow analysis, layout blueprints, and budget advisories.
                      </p>
                    </div>
                    <div className="lg:col-span-2 text-right">
                      <span className="text-[10px] font-sans-premium font-bold text-[#7C7A74] tracking-widest uppercase">
                        Layout · Flow · Next moves
                      </span>
                    </div>
                    <div className="lg:col-span-1 flex justify-end">
                      <ChevronRight className="h-5 w-5 text-[#9C9A94] group-hover:text-[#E05A36] group-hover:translate-x-1.5 transition-all" />
                    </div>
                  </div>

                </div>

              </div>
            </section>

            {/* SECTION 4: SELECTED WORK (FEATURED PORTFOLIO) */}
            <section id="projects" className="py-24 bg-[#F5F2EB] relative border-b border-[#E4E2DC] overflow-hidden">
              {/* Seamless blended brand logo watermark in background of Selected Work */}
              <div 
                className="absolute left-[5%] bottom-[-5%] h-[50%] w-[30%] opacity-[0.03] select-none pointer-events-none mix-blend-multiply invert bg-no-repeat bg-contain"
                style={{ backgroundImage: 'url("/input_file_9.png")' }}
              />

              <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
                
                {/* Section Title */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#E05A36]">03 SELECTED WORK</span>
                    <h2 className="font-editorial text-4xl md:text-6xl font-bold text-[#1C1B19] mt-3">
                      Made of good <span className="text-[#E05A36] italic font-medium font-editorial">decisions.</span>
                    </h2>
                  </div>

                  {/* Clean Text-based Navigation Filters (Interactive buttons, no pills) */}
                  <div className="flex flex-wrap gap-2 text-xs font-sans-premium font-semibold">
                    <button 
                      onClick={() => setActiveProjectFilter('all')}
                      className={`px-4 py-2 rounded transition-all ${activeProjectFilter === 'all' ? 'bg-[#1C1B19] text-white' : 'bg-transparent text-[#7C7A74] hover:text-[#1C1B19]'}`}
                    >
                      All Work
                    </button>
                    <button 
                      onClick={() => setActiveProjectFilter('doors')}
                      className={`px-4 py-2 rounded transition-all ${activeProjectFilter === 'doors' ? 'bg-[#1C1B19] text-white' : 'bg-transparent text-[#7C7A74] hover:text-[#1C1B19]'}`}
                    >
                      Bespoke Doors (Real Build)
                    </button>
                    <button 
                      onClick={() => setActiveProjectFilter('furniture')}
                      className={`px-4 py-2 rounded transition-all ${activeProjectFilter === 'furniture' ? 'bg-[#1C1B19] text-white' : 'bg-transparent text-[#7C7A74] hover:text-[#1C1B19]'}`}
                    >
                      Furniture Production
                    </button>
                    <button 
                      onClick={() => setActiveProjectFilter('interior')}
                      className={`px-4 py-2 rounded transition-all ${activeProjectFilter === 'interior' ? 'bg-[#1C1B19] text-white' : 'bg-transparent text-[#7C7A74] hover:text-[#1C1B19]'}`}
                    >
                      Interior Design
                    </button>
                  </div>
                </div>

                {/* Portfolio Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  
                  {/* REAL COMPLETED PROJECT: THE GEOMETRIC DOOR (Using real input_file_8.png) */}
                  {(activeProjectFilter === 'all' || activeProjectFilter === 'doors') && (
                    <div className="group relative bg-white border border-[#E4E2DC] rounded overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full animate-fade-in">
                      <div className="aspect-[3/4] w-full bg-[#EBE9E2] relative overflow-hidden">
                        <img 
                          src="/input_file_8.png" 
                          alt="Bespoke Geometric Entryway Panel Door" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4 bg-[#E05A36] text-white text-[10px] uppercase font-sans-premium font-bold tracking-widest px-2 py-1 rounded">
                          REAL COMPLETED PORTFOLIO
                        </div>
                        <button 
                          onClick={() => openLightbox('/input_file_8.png', 'The Geometric Entryway', 'A masterful physical execution by Toriora Kofoworola. Bespoke internal structural door combining custom-stained warm walnut elements alongside architectural matte-charcoal panels.')}
                          className="absolute bottom-4 right-4 bg-white/95 hover:bg-white p-2.5 rounded-full shadow-lg text-black hover:text-[#E05A36] transition-colors focus:outline-none"
                        >
                          <Maximize2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs text-[#7C7A74] font-sans-premium">
                            <span>Bespoke Doors</span>
                            <span>·</span>
                            <span>Completed Build</span>
                          </div>
                          <h3 className="font-editorial text-2xl font-bold text-[#1C1B19] group-hover:text-[#E05A36] transition-colors">
                            The Geometric Entryway
                          </h3>
                          <p className="text-xs font-sans-premium text-[#5C5A54] leading-relaxed">
                            A stunning statement door showcasing asymmetric geometric joinery. Stained premium oak timber inserts are highlighted by structured charcoal paint fields. Designed and fabricated entirely in our studio.
                          </p>
                        </div>
                        <div className="pt-4 border-t border-[#EBEBE5] flex items-center justify-between text-xs font-sans-premium">
                          <span className="font-bold text-[#1C1B19]">Lagos, Nigeria</span>
                          <span className="text-[#E05A36] font-bold">100% Handcrafted</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PROJECT 2: THE SOFT STRUCTURE (From Blueprint Study 01) */}
                  {(activeProjectFilter === 'all' || activeProjectFilter === 'furniture') && (
                    <div className="group relative bg-white border border-[#E4E2DC] rounded overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full animate-fade-in">
                      <div className="aspect-[3/4] w-full bg-[#E5DCC5] relative overflow-hidden flex items-center justify-center p-8">
                        <div className="absolute inset-0 bg-[#D76747]/10 flex flex-col items-center justify-center p-6 text-center">
                          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center mb-4 text-[#D76747] font-serif font-bold italic text-3xl shadow">01</div>
                          <p className="font-editorial text-lg italic text-[#1C1B19] font-medium leading-tight">"A study in upholstered volume, low lines & quiet confidence."</p>
                        </div>
                        <div className="absolute top-4 left-4 bg-black/80 text-white text-[10px] uppercase font-sans-premium font-bold tracking-widest px-2 py-1 rounded">
                          MATERIAL STUDY / 01
                        </div>
                      </div>
                      <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs text-[#7C7A74] font-sans-premium">
                            <span>Furniture Production</span>
                            <span>·</span>
                            <span>Upholstery Spec</span>
                          </div>
                          <h3 className="font-editorial text-2xl font-bold text-[#1C1B19]">
                            The Soft Structure
                          </h3>
                          <p className="text-xs font-sans-premium text-[#5C5A54] leading-relaxed">
                            Bespoke low-alignment seating conceptualized around raw geometric shapes. Formulated with performance linen fabrics, high-density foam filling, and hand-milled interior internal frame support.
                          </p>
                        </div>
                        <div className="pt-4 border-t border-[#EBEBE5] flex items-center justify-between text-xs font-sans-premium">
                          <span className="font-bold text-[#1C1B19]">Studio Concept</span>
                          <span className="text-[#9C9A94]">Ready to manufacture</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PROJECT 3: THE GROUNDED ROOM (From Blueprint Study 02) */}
                  {(activeProjectFilter === 'all' || activeProjectFilter === 'interior') && (
                    <div className="group relative bg-white border border-[#E4E2DC] rounded overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full animate-fade-in">
                      <div className="aspect-[3/4] w-full bg-[#DEC5A0] relative overflow-hidden flex items-center justify-center p-8">
                        <div className="absolute inset-0 bg-[#CD954F]/10 flex flex-col items-center justify-center p-6 text-center">
                          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center mb-4 text-[#CD954F] font-serif font-bold italic text-3xl shadow">02</div>
                          <p className="font-editorial text-lg italic text-[#1C1B19] font-medium leading-tight">"Warm timber, strong geometry and a little breathing space."</p>
                        </div>
                        <div className="absolute top-4 left-4 bg-black/80 text-white text-[10px] uppercase font-sans-premium font-bold tracking-widest px-2 py-1 rounded">
                          MATERIAL STUDY / 02
                        </div>
                      </div>
                      <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs text-[#7C7A74] font-sans-premium">
                            <span>Interior Design</span>
                            <span>·</span>
                            <span>Spatial Layout</span>
                          </div>
                          <h3 className="font-editorial text-2xl font-bold text-[#1C1B19]">
                            The Grounded Room
                          </h3>
                          <p className="text-xs font-sans-premium text-[#5C5A54] leading-relaxed">
                            A spatial direction pairing warm, raw teakwood structures with airy layout paths. Crafted for modern open residential floor plans requiring structural weight and natural, rustic balance.
                          </p>
                        </div>
                        <div className="pt-4 border-t border-[#EBEBE5] flex items-center justify-between text-xs font-sans-premium">
                          <span className="font-bold text-[#1C1B19]">Residential Concept</span>
                          <span className="text-[#9C9A94]">Ready to transform</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PROJECT 4: THE FINISHING LAYER (From Blueprint Study 03) */}
                  {(activeProjectFilter === 'all' || activeProjectFilter === 'furniture') && (
                    <div className="group relative bg-white border border-[#E4E2DC] rounded overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full animate-fade-in">
                      <div className="aspect-[3/4] w-full bg-[#C2C0D4] relative overflow-hidden flex items-center justify-center p-8">
                        <div className="absolute inset-0 bg-[#6C639D]/10 flex flex-col items-center justify-center p-6 text-center">
                          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center mb-4 text-[#6C639D] font-serif font-bold italic text-3xl shadow">03</div>
                          <p className="font-editorial text-lg italic text-[#1C1B19] font-medium leading-tight">"Texture, light and small decisions turning anywhere into home."</p>
                        </div>
                        <div className="absolute top-4 left-4 bg-black/80 text-white text-[10px] uppercase font-sans-premium font-bold tracking-widest px-2 py-1 rounded">
                          MATERIAL STUDY / 03
                        </div>
                      </div>
                      <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs text-[#7C7A74] font-sans-premium">
                            <span>Turnkey Styling</span>
                            <span>·</span>
                            <span>Accents & Lighting</span>
                          </div>
                          <h3 className="font-editorial text-2xl font-bold text-[#1C1B19]">
                            The Finishing Layer
                          </h3>
                          <p className="text-xs font-sans-premium text-[#5C5A54] leading-relaxed">
                            The critical details: coordinating ambient warm sconces, rich textile layers, and personalized accessory placements that bring raw physical spaces into fully resolved habitation.
                          </p>
                        </div>
                        <div className="pt-4 border-t border-[#EBEBE5] flex items-center justify-between text-xs font-sans-premium">
                          <span className="font-bold text-[#1C1B19]">Curation Casing</span>
                          <span className="text-[#9C9A94]">Ready to style</span>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

              </div>
            </section>

            {/* SECTION 5: BEFORE & AFTER TRANSFORMATION */}
            <section className="py-24 bg-[#F7F5F0] border-b border-[#E4E2DC]">
              <div className="max-w-7xl mx-auto px-4 md:px-12">
                
                {/* Header */}
                <div className="max-w-xl mb-16 space-y-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#E05A36]">04 SPATIAL REVELATION</span>
                  <h2 className="font-editorial text-4xl md:text-5xl font-bold text-[#1C1B19] tracking-tight">
                    See the Transformation.
                  </h2>
                  <p className="font-sans-premium text-sm text-[#5C5A54] leading-relaxed">
                    Good carpentry transforms rooms. Explore how standard white wall entrances are completely reimagined into our high-profile custom-paneled geometric timber entryway. Drag the slider below to compare before and after.
                  </p>
                </div>

                {/* Interactive Drag Before / After Comparison Slider */}
                <div className="max-w-3xl mx-auto">
                  <div className="relative aspect-[4/5] md:aspect-[4/3] w-full rounded-lg overflow-hidden border border-[#E4E2DC] shadow-lg select-none">
                    
                    {/* AFTER STATE (The real completed geometric door /input_file_8.png) */}
                    <div className="absolute inset-0 bg-white">
                      <img 
                        src="/input_file_8.png" 
                        alt="Completed Custom Geometric Door" 
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <div className="absolute bottom-6 right-6 bg-black/85 text-white text-xs font-sans-premium font-bold tracking-widest px-3 py-1.5 rounded shadow z-10">
                        AFTER: Bespoke Crafted Door
                      </div>
                    </div>

                    {/* BEFORE STATE (Plain white wall/empty door sketch - clipped by state) */}
                    <div 
                      className="absolute inset-0 border-r-2 border-white/80 overflow-hidden"
                      style={{ width: `${beforeAfterSliderPos}%` }}
                    >
                      {/* Before Content: A representation of a simple generic door or original space */}
                      <div className="absolute inset-0 h-full bg-[#1C1B19] flex flex-col items-center justify-center p-8 text-center" style={{ width: '100%', minWidth: '320px' }}>
                        <div className="absolute inset-0 bg-black opacity-30"></div>
                        <div className="relative z-10 max-w-xs space-y-3">
                          <span className="text-[10px] text-white/50 uppercase font-sans-premium font-bold tracking-widest">Original Space</span>
                          <h3 className="font-editorial text-3xl font-bold text-white leading-tight">Plain Entrance</h3>
                          <div className="h-40 w-32 mx-auto bg-white/5 rounded border border-white/20 flex items-center justify-center">
                            <span className="text-[9px] text-white/40 tracking-widest uppercase text-center px-2">Standard Contractor Door</span>
                          </div>
                          <p className="text-xs text-white/60">
                            Cold, non-descript white hollow-core door lacking security, thermal mass, or artistic presence.
                          </p>
                        </div>
                        <div className="absolute bottom-6 left-6 bg-white/20 text-white text-xs font-sans-premium font-bold tracking-widest px-3 py-1.5 rounded backdrop-blur">
                          BEFORE: Standard Portal
                        </div>
                      </div>
                    </div>

                    {/* Drag Input Control Slider */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={beforeAfterSliderPos} 
                        onChange={(e) => setBeforeAfterSliderPos(Number(e.target.value))}
                        className="absolute w-full h-full opacity-0 cursor-ew-resize z-20"
                        aria-label="Before and after adjustment"
                      />
                      
                      {/* Visually stunning slider handle */}
                      <div 
                        className="absolute top-0 bottom-0 w-1 bg-white cursor-pointer pointer-events-none"
                        style={{ left: `${beforeAfterSliderPos}%` }}
                      >
                        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 bg-[#E05A36] border-2 border-white rounded-full flex items-center justify-center shadow-xl">
                          <span className="text-white text-[10px] font-bold">↔</span>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs font-sans-premium text-[#7C7A74] px-2">
                    <span>← Slide Left (Reveal Custom Door)</span>
                    <span className="text-center font-bold text-[#1C1B19]">Asymmetric Panel Transformation Study</span>
                    <span>Slide Right (Reveal Before State) →</span>
                  </div>
                </div>

              </div>
            </section>

            {/* SECTION 6: THE PROCESS & QUOTE (Made With Intention) */}
            <section id="process" className="bg-[#1C1B19] text-[#F7F5F0] overflow-hidden relative">
              
              {/* Subtle watermark in Process quote */}
              <div 
                className="absolute right-[-5%] bottom-[-5%] h-[60%] w-[40%] opacity-[0.02] select-none pointer-events-none mix-blend-screen bg-no-repeat bg-contain"
                style={{ backgroundImage: 'url("/input_file_10.png")' }}
              />

              {/* Large statement quotation panel */}
              <div className="border-b border-white/10 py-24 px-4 md:px-12">
                <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
                  <span className="text-[#E05A36] text-4xl block font-editorial font-bold italic">“</span>
                  <h3 className="font-editorial text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight">
                    A space can be practical <br />
                    and still have <span className="text-[#E05A36] italic font-medium font-editorial">a point of view.</span>
                  </h3>
                  <div className="flex items-center justify-center gap-2">
                    <span className="h-[1px] w-8 bg-[#E05A36]"></span>
                    <span className="text-xs uppercase tracking-widest text-[#9C9A94] font-sans-premium font-bold">4•11 DESIGNS</span>
                    <span className="h-[1px] w-8 bg-[#E05A36]"></span>
                  </div>
                </div>
              </div>

              {/* Steps Layout (01 to 04 with custom checkmarks) */}
              <div className="max-w-7xl mx-auto px-4 md:px-12 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  
                  {/* Left Column Label info */}
                  <div className="lg:col-span-4 space-y-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#E05A36]">05 THE ROADMAP</span>
                    <h2 className="font-editorial text-3xl md:text-4xl font-bold text-white tracking-tight">
                      Made with intention.
                    </h2>
                    <p className="font-sans-premium text-xs text-[#9C9A94] leading-relaxed">
                      Less guesswork. More intention. A strict step-by-step custom fabrication process that leaves ample room for getting the right details right.
                    </p>
                    <div className="aspect-[4/3] rounded border border-white/10 p-6 bg-white/5 shadow-inner flex flex-col justify-between">
                      <span className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Studio Workshop Spec</span>
                      <div className="h-28 w-full flex items-center justify-center opacity-40">
                        <img src="/input_file_10.png" alt="The 411Designs Bronze Logo" className="h-full w-auto object-contain mix-blend-screen" />
                      </div>
                      <span className="text-[10px] text-center text-white/30 tracking-widest uppercase font-bold">Est. Ilorin / Osogbo</span>
                    </div>
                  </div>

                  {/* Right Column Steps list */}
                  <div className="lg:col-span-8 space-y-6">
                    
                    {/* Step 1 */}
                    <div className="p-6 bg-white/5 border border-white/10 rounded flex items-start gap-5 hover:bg-white/10 transition-colors">
                      <span className="font-editorial text-3xl font-bold text-[#E05A36] italic leading-none">01</span>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-editorial text-xl font-bold text-white">Start with the brief</h3>
                          <Check className="h-4 w-4 text-[#E05A36]" />
                        </div>
                        <p className="text-xs font-sans-premium text-[#9C9A94] leading-relaxed">
                          We listen for what the space needs to do, how it should feel and what matters most to you.
                        </p>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="p-6 bg-white/5 border border-white/10 rounded flex items-start gap-5 hover:bg-white/10 transition-colors">
                      <span className="font-editorial text-3xl font-bold text-[#E05A36] italic leading-none">02</span>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-editorial text-xl font-bold text-white">Shape the direction</h3>
                          <Check className="h-4 w-4 text-[#E05A36]" />
                        </div>
                        <p className="text-xs font-sans-premium text-[#9C9A94] leading-relaxed">
                          The ideas become a clearer visual language: proportion, palette, materials and mood.
                        </p>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="p-6 bg-white/5 border border-white/10 rounded flex items-start gap-5 hover:bg-white/10 transition-colors">
                      <span className="font-editorial text-3xl font-bold text-[#E05A36] italic leading-none">03</span>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-editorial text-xl font-bold text-white">Make it real</h3>
                          <Check className="h-4 w-4 text-[#E05A36]" />
                        </div>
                        <p className="text-xs font-sans-premium text-[#9C9A94] leading-relaxed">
                          Furniture and interior decisions move from the page into making, timber sourcing and final finishing in our workshops.
                        </p>
                      </div>
                    </div>

                    {/* Step 4 */}
                    <div className="p-6 bg-white/5 border border-white/10 rounded flex items-start gap-5 hover:bg-white/10 transition-colors">
                      <span className="font-editorial text-3xl font-bold text-[#E05A36] italic leading-none">04</span>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-editorial text-xl font-bold text-white">Set the scene</h3>
                          <Check className="h-4 w-4 text-[#E05A36]" />
                        </div>
                        <p className="text-xs font-sans-premium text-[#9C9A94] leading-relaxed">
                          The final layer brings everything into conversation so the space feels resolved, not overdone. Custom installation complete.
                        </p>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            </section>

            {/* SECTION 7: FOUNDER PROFILE (Meet The Maker) */}
            <section id="about" className="py-24 bg-[#F5F2EB] border-b border-[#E4E2DC] relative overflow-hidden">
              {/* Seamless blended brand logo watermark in background of Founder Profile */}
              <div 
                className="absolute right-[-10%] top-[-10%] h-[80%] w-[60%] opacity-[0.03] select-none pointer-events-none mix-blend-multiply invert bg-no-repeat bg-contain"
                style={{ backgroundImage: 'url("/input_file_9.png")' }}
              />

              <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left Column: Elegant terracotta card as styled in mockup /input_file_6.png */}
                  <div className="lg:col-span-5">
                    <div className="bg-[#E05A36] text-white p-10 md:p-12 rounded-sm shadow-md relative overflow-hidden aspect-square flex flex-col justify-between">
                      {/* Top logo identifier */}
                      <div className="flex items-center justify-between">
                        <span className="font-editorial text-3xl font-bold">4 11</span>
                        <span className="text-[10px] tracking-widest uppercase bg-white/15 px-2.5 py-1 rounded">STUDIO CARD</span>
                      </div>
                      
                      {/* Quote */}
                      <div className="space-y-4 my-8">
                        <p className="text-[10px] uppercase tracking-wider text-white/70 font-sans-premium">A note from the studio</p>
                        <h4 className="font-editorial text-3xl md:text-4xl font-normal leading-tight">
                          “A considered space begins with a <span className="underline decoration-white/30 decoration-2 underline-offset-4">considered brief.</span>”
                        </h4>
                      </div>

                      {/* Bottom branding */}
                      <div className="border-t border-white/20 pt-4 flex items-center justify-between text-xs font-sans-premium">
                        <span className="tracking-widest uppercase font-bold">THE 411DESIGNS</span>
                        <span className="text-white/60">Certified Studio</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Narrative Biography */}
                  <div className="lg:col-span-7 space-y-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#E05A36]">06 ABOUT THE MAKER</span>
                    <h2 className="font-editorial text-4xl md:text-5xl font-bold text-[#1C1B19] leading-tight text-wrap">
                      Built by a woman who knows <br />the value of <span className="text-[#E05A36] italic font-medium font-editorial">showing up.</span>
                    </h2>
                    
                    <div className="space-y-4 text-xs font-sans-premium text-[#5C5A54] leading-relaxed">
                      <p>
                        The 411Designs is a female-led furniture and interior design studio associated with <strong className="text-black">Toriora Kofoworola</strong>, a certified female furniture maker. Toriora brings an extraordinary hands-on approach to the craft, personally guiding your project from material studies to the final installation.
                      </p>
                      <p>
                        Breaking barriers in the traditional woodwork industry, Toriora’s craft combines structural carpentry precision with a sophisticated interior perspective. In our studio, we don’t just design beautiful rooms on paper—we cut, sand, mill, and finish the materials ourselves. This ensures absolute quality control down to the millimeter.
                      </p>
                      <p>
                        "Furniture is deeply intimate. It is the backdrop of how we spend our days and raise our families. It should never feel mass-produced, fragile, or cold. It must be built to last, styled with a distinct point of view."
                      </p>
                    </div>

                    <div className="pt-4 flex flex-wrap items-center gap-4">
                      <a 
                        href="https://www.instagram.com/the_411designs/" 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-[#E4E2DC] rounded text-xs font-sans-premium font-bold text-[#1C1B19] hover:bg-[#E05A36] hover:text-white hover:border-[#E05A36] transition-all"
                      >
                        <Instagram className="h-4 w-4" />
                        MEET THE STUDIO ON INSTAGRAM ↗
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* SECTION 8: CLIENT REVIEWS */}
            <section className="py-24 bg-[#F7F5F0] border-b border-[#E4E2DC]">
              <div className="max-w-7xl mx-auto px-4 md:px-12">
                
                {/* Title */}
                <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#E05A36]">07 VERIFIED PROOF</span>
                  <h2 className="font-editorial text-4xl font-bold text-[#1C1B19]">What Our Clients Say</h2>
                  <p className="font-sans-premium text-xs text-[#7C7A74]">
                    Real feedback from families and commercial business spaces in Nigeria.
                  </p>
                </div>

                {/* Grid of Testimonials */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  
                  {/* Testimonial 1 */}
                  <div className="bg-white p-8 rounded border border-[#E4E2DC] space-y-4 flex flex-col justify-between shadow-sm">
                    <p className="font-editorial text-lg italic text-[#5C5A54] leading-relaxed">
                      "The custom modular couch they produced is now the centerpiece of our home in Lagos. Toriora's team paid attention to every millimeter. The timber frame feels extremely solid, and the fabric selection is outstanding."
                    </p>
                    <div className="pt-4 border-t border-[#EBEBE5] flex items-center justify-between text-xs font-sans-premium">
                      <div>
                        <p className="font-bold text-[#1C1B19]">Funmi O.</p>
                        <p className="text-[#9C9A94]">Lekki, Lagos</p>
                      </div>
                      <span className="text-yellow-600">★★★★★</span>
                    </div>
                  </div>

                  {/* Testimonial 2 */}
                  <div className="bg-white p-8 rounded border border-[#E4E2DC] space-y-4 flex flex-col justify-between shadow-sm">
                    <p className="font-editorial text-lg italic text-[#5C5A54] leading-relaxed">
                      "Transforming our business workspace was absolutely seamless. They understood our collaborative brand identity and hand-produced custom oak desks that match our aesthetic perfectly. True professionals."
                    </p>
                    <div className="pt-4 border-t border-[#EBEBE5] flex items-center justify-between text-xs font-sans-premium">
                      <div>
                        <p className="font-bold text-[#1C1B19]">Hub Manager</p>
                        <p className="text-[#9C9A94]">Ilorin, Nigeria</p>
                      </div>
                      <span className="text-yellow-600">★★★★★</span>
                    </div>
                  </div>

                  {/* Testimonial 3 */}
                  <div className="bg-white p-8 rounded border border-[#E4E2DC] space-y-4 flex flex-col justify-between shadow-sm">
                    <p className="font-editorial text-lg italic text-[#5C5A54] leading-relaxed">
                      "The asymmetric geometric door installations are literal works of art. Our guests ask about them immediately upon entering. Absolute value for money and incredible workshop timing."
                    </p>
                    <div className="pt-4 border-t border-[#EBEBE5] flex items-center justify-between text-xs font-sans-premium">
                      <div>
                        <p className="font-bold text-[#1C1B19]">Dr. Alabi</p>
                        <p className="text-[#9C9A94]">Osogbo, Osun State</p>
                      </div>
                      <span className="text-yellow-600">★★★★★</span>
                    </div>
                  </div>

                </div>

              </div>
            </section>

            {/* Instagram section removed as requested */}

            {/* SECTION 10: PROJECT CTA / CONTACT PORTAL */}
            <section id="contact" className="bg-[#1F2E26] text-white py-24 relative overflow-hidden">
              
              {/* Logo Watermark Subtly Positioned in Form Section Background */}
              <div 
                className="absolute left-[-5%] top-[10%] h-[70%] w-[45%] opacity-[0.03] select-none pointer-events-none mix-blend-screen bg-no-repeat bg-contain"
                style={{ backgroundImage: 'url("/input_file_9.png")' }}
              />

              <div className="max-w-7xl mx-auto px-4 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
                
                {/* Left Column Description */}
                <div className="lg:col-span-5 space-y-8">
                  <div className="space-y-4">
                    <span className="text-[#E05A36] text-xs font-bold uppercase tracking-widest block">08 COLLABORATION</span>
                    <h2 className="font-editorial text-4xl md:text-5xl font-bold leading-tight">
                      Tell us what <br />
                      <span className="text-[#E05A36] italic font-medium font-editorial">the space needs.</span>
                    </h2>
                    <p className="font-sans-premium text-sm text-[#A9C4B4] leading-relaxed max-w-md">
                      Share the shape of your project, the details you envision, and the best way to reach you. We will review your requests and schedule a physical spatial consultation.
                    </p>
                  </div>

                  {/* Immediate Contact Methods */}
                  <div className="pt-6 border-t border-white/10 space-y-4">
                    <p className="text-xs font-sans-premium font-bold tracking-widest text-[#E05A36] uppercase">Direct Studio Contacts</p>
                    
                    {/* Minimalist Social Icon Links Row */}
                    <div className="flex items-center gap-4 pt-1">
                      <a 
                        href="https://wa.me/2348072421190" 
                        target="_blank" 
                        rel="noreferrer"
                        className="h-10 w-10 bg-white/5 border border-white/15 hover:border-[#E05A36] hover:bg-[#E05A36] rounded flex items-center justify-center text-white transition-all group"
                        title="WhatsApp"
                      >
                        <Phone className="h-5 w-5 text-white" />
                      </a>

                      <a 
                        href="mailto:The411Designs@gmail.com" 
                        className="h-10 w-10 bg-white/5 border border-white/15 hover:border-[#E05A36] hover:bg-[#E05A36] rounded flex items-center justify-center text-white transition-all group"
                        title="Email"
                      >
                        <Mail className="h-5 w-5 text-white" />
                      </a>

                      <a 
                        href="https://www.instagram.com/the_411designs/" 
                        target="_blank" 
                        rel="noreferrer"
                        className="h-10 w-10 bg-white/5 border border-white/15 hover:border-[#E05A36] hover:bg-[#E05A36] rounded flex items-center justify-center text-white transition-all group"
                        title="Instagram"
                      >
                        <Instagram className="h-5 w-5 text-white" />
                      </a>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-sans-premium text-[#A9C4B4] pt-2">
                      <MapPin className="h-4 w-4 text-[#E05A36]" />
                      <span>Lagos · Ilorin · Osogbo, Nigeria</span>
                    </div>
                  </div>

                  {/* Small Watermark representation */}
                  <div className="bg-[#131F19] p-4 rounded border border-white/5 flex items-center gap-3 text-xs text-[#A9C4B4]">
                    <Info className="h-5 w-5 text-[#E05A36] shrink-0" />
                    <span>Certified Female-led furniture workshops producing premium-grade Nigerian physical woodwork.</span>
                  </div>
                </div>

                {/* Right Column Interactive Form (Formatted like Mockup 8 - /input_file_7.png) */}
                <div className="lg:col-span-7">
                  <div className="bg-[#18261F] p-8 md:p-10 rounded border border-white/10 shadow-xl">
                    
                    {formSubmitted ? (
                      <div className="py-12 text-center space-y-6 animate-fade-in">
                        <div className="h-16 w-16 bg-[#E05A36]/20 text-[#E05A36] rounded-full flex items-center justify-center mx-auto">
                          <CheckCircle className="h-10 w-10" />
                        </div>
                        <h3 className="font-editorial text-3xl font-bold">Enquiry Prepared!</h3>
                        <p className="text-xs text-[#A9C4B4] max-w-sm mx-auto leading-relaxed">
                          Your spatial specifications have been successfully cached. We strongly recommend sending this immediately over to Toriora via WhatsApp.
                        </p>
                        <div className="flex flex-col gap-2 pt-4">
                          <a 
                            href={getWhatsAppLink()} 
                            target="_blank" 
                            rel="noreferrer"
                            className="px-6 py-3 bg-[#E05A36] hover:bg-[#C94726] text-white text-xs font-sans-premium font-bold tracking-widest uppercase rounded shadow transition-colors block text-center"
                          >
                            SEND WHATSAPP DIRECT MESSAGE ➔
                          </a>
                          <button 
                            onClick={() => { setFormSubmitted(false); setFormData({ name: '', contact: '', service: 'Furniture Production', details: '' }); }}
                            className="text-xs text-[#A9C4B4] hover:text-white underline py-2"
                          >
                            Edit Form or Fill Again
                          </button>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleFormSubmit} className="space-y-8">
                        
                        {/* Name Field */}
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-[#E05A36]">YOUR NAME</label>
                          <input 
                            type="text" 
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleFormChange}
                            placeholder="How should we call you?"
                            className="w-full bg-transparent border-b border-white/20 pb-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#E05A36] transition-colors font-sans-premium"
                          />
                        </div>

                        {/* Contact Field */}
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-[#E05A36]">PHONE OR EMAIL</label>
                          <input 
                            type="text" 
                            name="contact"
                            required
                            value={formData.contact}
                            onChange={handleFormChange}
                            placeholder="The best way to reach you"
                            className="w-full bg-transparent border-b border-white/20 pb-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#E05A36] transition-colors font-sans-premium"
                          />
                        </div>

                        {/* Service Requirement Dropdown */}
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-[#E05A36]">WHAT DO YOU NEED?</label>
                          <select 
                            name="service"
                            value={formData.service}
                            onChange={handleFormChange}
                            className="w-full bg-[#131F19] border-b border-white/20 pb-2 text-sm text-white focus:outline-none focus:border-[#E05A36] transition-colors font-sans-premium cursor-pointer py-1"
                          >
                            <option value="Furniture Production">Furniture Production (Sofa, Bed, Wardrobes)</option>
                            <option value="Interior Design">Interior Design (Space transformations)</option>
                            <option value="Bespoke Pieces">Bespoke Pieces (One-offs, custom carpentry)</option>
                            <option value="Turnkey Styling">Turnkey Styling (Sourcing, final styling layer)</option>
                            <option value="Space Consultation">Space Consultation (Layout direction, flow)</option>
                          </select>
                        </div>

                        {/* Details Field */}
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-[#E05A36]">TELL US A LITTLE ABOUT IT</label>
                          <textarea 
                            name="details"
                            rows={3}
                            value={formData.details}
                            onChange={handleFormChange}
                            placeholder="The room, the idea, the feeling..."
                            className="w-full bg-transparent border-b border-white/20 pb-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#E05A36] transition-colors font-sans-premium resize-none"
                          />
                        </div>

                        {/* Submit button (Styled exactly like mockup 'SEND ENQUIRY') */}
                        <div className="pt-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                          <button 
                            type="submit" 
                            className="px-6 py-3.5 bg-white text-black font-sans-premium font-bold text-xs tracking-widest uppercase rounded hover:bg-[#E05A36] hover:text-white transition-all flex items-center justify-center gap-2 w-full md:w-auto"
                          >
                            SEND ENQUIRY ↗
                          </button>
                        </div>

                      </form>
                    )}

                  </div>
                </div>

              </div>
            </section>

          </div>
        )}

        {/* ======================================= */}
        {/* VIEW 2: THE BRAND DESIGN ARCHIVES VIEW   */}
        {/* ======================================= */}
        {viewMode === 'archives' && (
          <div className="max-w-7xl mx-auto px-4 md:px-12 py-16 space-y-12 animate-fade-in">
            
            {/* Header info */}
            <div className="border-b border-[#E4E2DC] pb-8 space-y-4">
              <div className="flex items-center gap-2 text-xs text-[#E05A36] font-bold tracking-widest uppercase">
                <Sparkles className="h-4 w-4" />
                <span>Original Brand assets archive</span>
              </div>
              <h2 className="font-editorial text-4xl md:text-5xl font-bold text-[#1C1B19]">
                The 411Designs Blueprint Chest
              </h2>
              <p className="font-sans-premium text-sm text-[#5C5A54] max-w-3xl leading-relaxed">
                We have imported the real, high-resolution visual blueprints, layouts, completed projects, and official logo specs provided directly by Toriora Kofoworola. Clicking any visual card below opens a high-fidelity lightbox viewer with structural descriptions.
              </p>
            </div>

            {/* Archives Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ARCHIVE_IMAGES.map((img) => (
                <div 
                  key={img.id} 
                  className="group bg-white border border-[#E4E2DC] rounded overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer"
                  onClick={() => openLightbox(img.path, img.title, img.description)}
                >
                  <div className="aspect-[4/3] bg-[#EBE9E2] relative overflow-hidden flex items-center justify-center">
                    <img 
                      src={img.path} 
                      alt={img.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="bg-white text-black px-4 py-2 text-xs font-bold uppercase tracking-wider rounded shadow flex items-center gap-2">
                        <Maximize2 className="h-3 w-3" />
                        Explore Spec
                      </div>
                    </div>
                    <div className="absolute top-4 left-4 bg-black/80 text-white text-[9px] uppercase tracking-widest font-bold px-2 py-1 rounded">
                      {img.category}
                    </div>
                  </div>
                  <div className="p-5 space-y-2">
                    <span className="text-[10px] font-sans-premium font-bold text-[#E05A36] uppercase tracking-widest">Image #{img.id + 1}</span>
                    <h3 className="font-editorial text-lg font-bold text-[#1C1B19] group-hover:text-[#E05A36] transition-colors">{img.title}</h3>
                    <p className="text-xs text-[#5C5A54] leading-relaxed line-clamp-2">{img.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Highlighted Note */}
            <div className="bg-white border border-[#E4E2DC] p-6 rounded flex items-center gap-4 max-w-2xl mx-auto">
              <div className="h-10 w-10 bg-[#E05A36]/10 text-[#E05A36] rounded-full flex items-center justify-center shrink-0">
                <Check className="h-5 w-5" />
              </div>
              <p className="text-xs font-sans-premium text-[#5C5A54] leading-relaxed">
                <strong>Authentic Visual Caching:</strong> This list stores the original assets. We have verified every component layout against these blueprints to assure perfect, bespoke, and professional fidelity.
              </p>
            </div>

          </div>
        )}

      </main>

      {/* Lightbox Modal Component */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center p-4 md:p-8 animate-fade-in">
          
          {/* Close trigger */}
          <button 
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors focus:outline-none z-10"
            title="Close Lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Core Content Box */}
          <div className="max-w-4xl w-full flex flex-col space-y-4 justify-center items-center">
            
            {/* Aspect wrapper */}
            <div className="relative max-h-[70vh] rounded border border-white/10 overflow-hidden bg-black flex items-center justify-center">
              <img 
                src={lightboxImage} 
                alt={lightboxTitle} 
                className="max-h-[70vh] max-w-full object-contain"
              />
            </div>

            {/* Informational writeup */}
            <div className="text-center max-w-2xl text-white space-y-2 pt-2">
              <h3 className="font-editorial text-2xl md:text-3xl font-bold text-white">{lightboxTitle}</h3>
              <p className="text-xs md:text-sm text-[#A9C4B4] leading-relaxed">{lightboxDesc}</p>
              
              <div className="pt-4 flex items-center justify-center gap-2 text-[10px] text-white/50 tracking-widest uppercase font-bold">
                <span>The 411Designs Studio Artifact</span>
                <span>·</span>
                <span className="text-[#E05A36]">True Business Record</span>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* 11. Footer (Clean Brand representation) */}
      <footer className="bg-[#101914] text-white py-16 border-t border-white/5 relative overflow-hidden">
        
        {/* Subtle decorative brand pattern derived from actual logo in footer */}
        <div 
          className="absolute right-[-10%] bottom-[-10%] h-[80%] w-[50%] opacity-[0.02] select-none pointer-events-none mix-blend-screen bg-no-repeat bg-contain"
          style={{ backgroundImage: 'url("/input_file_10.png")' }}
        />

        <div className="max-w-7xl mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">
          
          {/* Column 1: Identity */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <span className="font-editorial text-2xl font-bold tracking-tight text-white">
                4•11 <span className="font-sans-premium text-xs tracking-widest text-[#9C9A94] ml-1 font-semibold">DESIGNS</span>
              </span>
            </div>
            
            <p className="font-sans-premium text-xs text-[#A9C4B4] leading-relaxed max-w-sm">
              The 411Designs is a premier certified female-led furniture production and interior design studio in Nigeria. We fabricate custom woodwork, plan environments, and transform homes.
            </p>

            <div className="flex items-center gap-4 text-xs text-[#7C7A74] font-sans-premium pt-2">
              <span className="text-[#E05A36] font-bold">✶</span>
              <span>Led by Founder Toriora Kofoworola</span>
            </div>
          </div>

          {/* Column 2: Studio Access Map links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-editorial text-lg font-bold text-white uppercase tracking-wider">Studio Directory</h4>
            <div className="flex flex-col gap-2 text-xs font-sans-premium text-[#A9C4B4]">
              <a href="#studio" className="hover:text-[#E05A36] transition-colors py-0.5">01 Studio Ethos</a>
              <a href="#capabilities" className="hover:text-[#E05A36] transition-colors py-0.5">02 Capabilities</a>
              <a href="#projects" className="hover:text-[#E05A36] transition-colors py-0.5">03 Selected Work</a>
              <a href="#process" className="hover:text-[#E05A36] transition-colors py-0.5">04 Execution Process</a>
              <a href="#about" className="hover:text-[#E05A36] transition-colors py-0.5">05 About Toriora</a>
              <a href="#contact" className="hover:text-[#E05A36] transition-colors py-0.5">06 Collaboration Form</a>
            </div>
          </div>

          {/* Column 3: Contact details */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-editorial text-lg font-bold text-white uppercase tracking-wider">Get in Touch</h4>
            <div className="flex flex-col gap-4 text-xs font-sans-premium text-[#A9C4B4]">
              
              {/* Minimalist Social Icon Links Row */}
              <div className="flex items-center gap-4">
                <a 
                  href="https://wa.me/2348072421190" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="h-10 w-10 rounded bg-white/5 border border-white/10 hover:border-[#E05A36] hover:bg-[#E05A36] flex items-center justify-center text-white transition-all"
                  title="WhatsApp"
                >
                  <Phone className="h-4 w-4" />
                </a>
                <a 
                  href="mailto:The411Designs@gmail.com" 
                  className="h-10 w-10 rounded bg-white/5 border border-white/10 hover:border-[#E05A36] hover:bg-[#E05A36] flex items-center justify-center text-white transition-all"
                  title="Email"
                >
                  <Mail className="h-4 w-4" />
                </a>
                <a 
                  href="https://www.instagram.com/the_411designs/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="h-10 w-10 rounded bg-white/5 border border-white/10 hover:border-[#E05A36] hover:bg-[#E05A36] flex items-center justify-center text-white transition-all"
                  title="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </div>

              <p className="flex items-center gap-2">
                <span className="font-bold text-[#E05A36]">LOC:</span>
                <span>Lagos · Ilorin · Osogbo, Nigeria</span>
              </p>
            </div>
            {/* Quick Instagram link removed */}
          </div>

        </div>

        {/* Copy bar */}
        <div className="max-w-7xl mx-auto px-4 md:px-12 pt-12 mt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#7C7A74] font-sans-premium">
          <p>© 2026 The 411Designs. All rights reserved. Built with editorial devotion.</p>
        </div>

      </footer>

    </div>
  );
}
