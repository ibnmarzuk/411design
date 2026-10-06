import React, { useEffect, useRef, useState } from 'react';
import { 
  ArrowRight, 
  Check, 
  Menu, 
  X, 
  ChevronLeft,
  ChevronRight, 
  Phone, 
  Instagram, 
  Mail, 
  Maximize2, 
  MapPin, 
  CheckCircle,
  Info
} from 'lucide-react';

type ProjectCategory = 'doors' | 'furniture' | 'interior';

type PortfolioProject = {
  title: string;
  image: string;
  category: ProjectCategory;
  categoryLabel: string;
  description: string;
  orientation: 'portrait' | 'landscape';
};

const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    title: 'The Geometric Entryway',
    image: '/projects/geometric-entryway.png',
    category: 'doors',
    categoryLabel: 'Bespoke doors',
    description: 'A charcoal entry door detailed with warm timber inlays and crisp geometric lines.',
    orientation: 'portrait'
  },
  {
    title: 'A Softer Living Room',
    image: '/projects/living-room-seating.png',
    category: 'furniture',
    categoryLabel: 'Furniture',
    description: 'Deep, tailored seating paired with warm wood accents and a statement centre table.',
    orientation: 'portrait'
  },
  {
    title: 'The Colour-Led Bedroom',
    image: '/projects/statement-bedroom.png',
    category: 'interior',
    categoryLabel: 'Interiors',
    description: 'A dramatic bedroom composition with layered upholstery, wall panels and expressive lighting.',
    orientation: 'portrait'
  },
  {
    title: 'The Brightline Kitchen',
    image: '/projects/white-kitchen.png',
    category: 'interior',
    categoryLabel: 'Interiors',
    description: 'Clean white cabinetry, integrated appliances and a light, easy-to-work-in layout.',
    orientation: 'portrait'
  },
  {
    title: 'The Sculptural Side Table',
    image: '/projects/sculptural-accent-table.png',
    category: 'furniture',
    categoryLabel: 'Furniture',
    description: 'A dark, curved support gives this two-tier occasional table its distinctive silhouette.',
    orientation: 'portrait'
  },
  {
    title: 'Wardrobe and Dressing Vanity',
    image: '/projects/wardrobe-vanity.png',
    category: 'furniture',
    categoryLabel: 'Furniture',
    description: 'Full-height wardrobe storage joined to a streamlined dressing area and mirror.',
    orientation: 'portrait'
  },
  {
    title: 'A Media Wall Made to Gather Around',
    image: '/projects/media-wall-display.png',
    category: 'interior',
    categoryLabel: 'Interiors',
    description: 'A full-width entertainment wall with display niches, textured panels and integrated lighting.',
    orientation: 'landscape'
  },
  {
    title: 'The Warm Neutral Kitchen',
    image: '/projects/warm-kitchen.png',
    category: 'interior',
    categoryLabel: 'Interiors',
    description: 'A practical L-shaped kitchen softened with warm neutral finishes and generous work surfaces.',
    orientation: 'portrait'
  },
  {
    title: 'The Textured Media Wall',
    image: '/projects/textured-media-wall.png',
    category: 'interior',
    categoryLabel: 'Interiors',
    description: 'Fluted detailing, a marble-look centre panel and concealed warm lighting frame the screen.',
    orientation: 'portrait'
  },
  {
    title: 'The Backlit Feature Wall',
    image: '/projects/backlit-feature-wall.png',
    category: 'interior',
    categoryLabel: 'Interiors',
    description: 'Marble-look panels and vertical slats are brought together with a measured line of light.',
    orientation: 'landscape'
  },
  {
    title: 'The Layered Timber Coffee Table',
    image: '/projects/timber-coffee-table.png',
    category: 'furniture',
    categoryLabel: 'Furniture',
    description: 'A timber storage base sits beneath an offset top for a strong, functional centrepiece.',
    orientation: 'portrait'
  },
  {
    title: 'A Light-Filled Family Lounge',
    image: '/projects/light-filled-lounge.png',
    category: 'interior',
    categoryLabel: 'Interiors',
    description: 'A calm living space anchored by a made-to-measure media wall and considered finishes.',
    orientation: 'portrait'
  }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Selected project category filter
  const [activeProjectFilter, setActiveProjectFilter] = useState<'all' | ProjectCategory>('all');
  const [spatialProjectIndex, setSpatialProjectIndex] = useState(0);
  
  // Interactive Lightbox state
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxTitle, setLightboxTitle] = useState('');
  const [lightboxDesc, setLightboxDesc] = useState('');
  const lightboxCloseButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!lightboxImage) return;

    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxImage(null);
    };

    window.addEventListener('keydown', closeOnEscape);
    lightboxCloseButtonRef.current?.focus();

    return () => {
      window.removeEventListener('keydown', closeOnEscape);
      previouslyFocused?.focus();
    };
  }, [lightboxImage]);

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
          <a href="#" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 group focus:outline-none">
            <img src="/411designs-logo.svg" alt="The 411Designs" className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]" />
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
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div id="mobile-navigation" className="md:hidden absolute top-full left-0 w-full bg-[#F7F5F0] border-b border-[#E4E2DC] shadow-lg py-6 px-6 animate-fade-in">
            <div className="flex flex-col gap-5 text-base font-sans-premium font-semibold">
              <a href="#studio" onClick={() => setMobileMenuOpen(false)} className="text-[#1C1B19] hover:text-[#E05A36]">Studio</a>
              <a href="#capabilities" onClick={() => setMobileMenuOpen(false)} className="text-[#1C1B19] hover:text-[#E05A36]">Capabilities</a>
              <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="text-[#1C1B19] hover:text-[#E05A36]">Selected Work</a>
              <a href="#process" onClick={() => setMobileMenuOpen(false)} className="text-[#1C1B19] hover:text-[#E05A36]">Process</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-[#1C1B19] hover:text-[#E05A36]">About the Maker</a>
              
            </div>
          </div>
        )}
      </header>

      {/* 2. Main Content Body */}
      <main className="flex-grow">
        
        <div className="space-y-0 animate-fade-in">
            
            {/* HERO SECTION */}
            <section className="relative overflow-hidden bg-[#F7F5F0] py-16 lg:py-24 border-b border-[#E4E2DC]">
              {/* Seamless blended brand logo watermark in background */}
              <div 
                className="absolute right-[-5%] top-0 h-[95%] w-[58%] opacity-[0.07] select-none pointer-events-none mix-blend-multiply bg-no-repeat bg-contain"
                style={{ backgroundImage: 'url("/411designs-logo.svg")' }}
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
                        src="/411designs-logo.svg"
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
                className="absolute left-[-10%] top-[-10%] h-[80%] w-[60%] opacity-[0.03] select-none pointer-events-none mix-blend-multiply bg-no-repeat bg-contain"
                style={{ backgroundImage: 'url("/411designs-logo.svg")' }}
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
                      <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Bronze Studio Signature</span>
                      <div className="h-28 w-full flex items-center justify-center">
                        <img 
                          src="/411designs-logo.svg"
                          alt="The 411Designs Bronze Logo"
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
                className="absolute left-[5%] bottom-[-5%] h-[50%] w-[30%] opacity-[0.03] select-none pointer-events-none mix-blend-multiply bg-no-repeat bg-contain"
                style={{ backgroundImage: 'url("/411designs-logo.svg")' }}
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
                      aria-pressed={activeProjectFilter === 'all'}
                      className={`px-4 py-2 rounded transition-all ${activeProjectFilter === 'all' ? 'bg-[#1C1B19] text-white' : 'bg-transparent text-[#7C7A74] hover:text-[#1C1B19]'}`}
                    >
                      All Work
                    </button>
                    <button 
                      onClick={() => setActiveProjectFilter('doors')}
                      aria-pressed={activeProjectFilter === 'doors'}
                      className={`px-4 py-2 rounded transition-all ${activeProjectFilter === 'doors' ? 'bg-[#1C1B19] text-white' : 'bg-transparent text-[#7C7A74] hover:text-[#1C1B19]'}`}
                    >
                      Bespoke Doors (Real Build)
                    </button>
                    <button 
                      onClick={() => setActiveProjectFilter('furniture')}
                      aria-pressed={activeProjectFilter === 'furniture'}
                      className={`px-4 py-2 rounded transition-all ${activeProjectFilter === 'furniture' ? 'bg-[#1C1B19] text-white' : 'bg-transparent text-[#7C7A74] hover:text-[#1C1B19]'}`}
                    >
                      Furniture Production
                    </button>
                    <button 
                      onClick={() => setActiveProjectFilter('interior')}
                      aria-pressed={activeProjectFilter === 'interior'}
                      className={`px-4 py-2 rounded transition-all ${activeProjectFilter === 'interior' ? 'bg-[#1C1B19] text-white' : 'bg-transparent text-[#7C7A74] hover:text-[#1C1B19]'}`}
                    >
                      Interior Design
                    </button>
                  </div>
                </div>

                {/* Portfolio Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-9 md:gap-x-7 md:gap-y-12">
                  {PORTFOLIO_PROJECTS
                    .filter((project) => activeProjectFilter === 'all' || project.category === activeProjectFilter)
                    .map((project) => (
                      <article key={project.image} className="group min-w-0 animate-fade-in">
                        <div className={`relative overflow-hidden bg-[#EBE9E2] ${project.orientation === 'landscape' ? 'aspect-[4/3]' : 'aspect-[3/4]'}`}>
                          <img
                            src={project.image}
                            alt={project.title}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          />
                          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/65 to-transparent p-4 pt-12">
                            <span className="text-[10px] font-sans-premium font-bold uppercase tracking-widest text-white">
                              {project.categoryLabel}
                            </span>
                            <button
                              type="button"
                              onClick={() => openLightbox(project.image, project.title, project.description)}
                              aria-label={`View ${project.title} image`}
                              title={`View ${project.title}`}
                              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-[#1C1B19] shadow transition-colors hover:bg-[#E05A36] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                              <Maximize2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="space-y-2 pt-4">
                          <p className="text-[10px] font-sans-premium font-bold uppercase tracking-widest text-[#E05A36]">
                            {project.categoryLabel}
                          </p>
                          <h3 className="font-editorial text-xl font-bold text-[#1C1B19] transition-colors group-hover:text-[#E05A36] md:text-2xl">
                            {project.title}
                          </h3>
                          <p className="max-w-prose text-sm leading-relaxed text-[#5C5A54]">
                            {project.description}
                          </p>
                        </div>
                      </article>
                    ))}
                </div>

              </div>
            </section>

            {/* SECTION 5: SPATIAL REVELATION PROJECT CAROUSEL */}
            <section className="py-24 bg-[#F7F5F0] border-b border-[#E4E2DC]">
              <div className="max-w-7xl mx-auto px-4 md:px-12">
                <div className="max-w-2xl mb-10 space-y-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#E05A36]">04 SPATIAL REVELATION</span>
                  <h2 id="spatial-revelation-title" className="font-editorial text-4xl md:text-5xl font-bold text-[#1C1B19] tracking-tight">
                    See the Transformation.
                  </h2>
                  <p className="font-sans-premium text-sm text-[#5C5A54] leading-relaxed">
                    Explore completed furniture and interiors, from bespoke timber details to considered rooms made for everyday living.
                  </p>
                </div>

                <div
                  className="grid overflow-hidden border border-[#E4E2DC] bg-white lg:grid-cols-[minmax(0,1.5fr)_minmax(18rem,0.8fr)]"
                  role="region"
                  aria-roledescription="carousel"
                  aria-labelledby="spatial-revelation-title"
                >
                  <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#101914] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[520px]">
                    <img
                      key={PORTFOLIO_PROJECTS[spatialProjectIndex].image}
                      src={PORTFOLIO_PROJECTS[spatialProjectIndex].image}
                      alt={PORTFOLIO_PROJECTS[spatialProjectIndex].title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-contain animate-fade-in"
                    />
                    <div className="absolute inset-x-3 top-1/2 flex -translate-y-1/2 justify-between sm:inset-x-5">
                      <button
                        type="button"
                        onClick={() => setSpatialProjectIndex((spatialProjectIndex - 1 + PORTFOLIO_PROJECTS.length) % PORTFOLIO_PROJECTS.length)}
                        aria-label="Previous project"
                        title="Previous project"
                        className="grid h-11 w-11 place-items-center rounded-full bg-white text-[#1C1B19] shadow-lg transition-colors hover:bg-[#E05A36] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setSpatialProjectIndex((spatialProjectIndex + 1) % PORTFOLIO_PROJECTS.length)}
                        aria-label="Next project"
                        title="Next project"
                        className="grid h-11 w-11 place-items-center rounded-full bg-white text-[#1C1B19] shadow-lg transition-colors hover:bg-[#E05A36] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between gap-8 p-6 sm:p-8 lg:p-10">
                    <div className="space-y-5" aria-live="polite" aria-atomic="true">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-[10px] font-sans-premium font-bold uppercase tracking-widest text-[#E05A36]">
                          {PORTFOLIO_PROJECTS[spatialProjectIndex].categoryLabel}
                        </span>
                        <span className="shrink-0 text-xs font-sans-premium font-semibold tabular-nums text-[#7C7A74]">
                          {String(spatialProjectIndex + 1).padStart(2, '0')} / {String(PORTFOLIO_PROJECTS.length).padStart(2, '0')}
                        </span>
                      </div>
                      <h3 className="font-editorial text-3xl font-bold leading-tight text-[#1C1B19] sm:text-4xl">
                        {PORTFOLIO_PROJECTS[spatialProjectIndex].title}
                      </h3>
                      <p className="max-w-prose text-sm leading-relaxed text-[#5C5A54]">
                        {PORTFOLIO_PROJECTS[spatialProjectIndex].description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2" aria-label="Choose a project">
                      {PORTFOLIO_PROJECTS.map((project, index) => (
                        <button
                          key={project.image}
                          type="button"
                          onClick={() => setSpatialProjectIndex(index)}
                          aria-label={`Show project ${index + 1}: ${project.title}`}
                          aria-current={spatialProjectIndex === index ? 'true' : undefined}
                          className={`h-2.5 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E05A36] ${spatialProjectIndex === index ? 'w-8 bg-[#E05A36]' : 'w-2.5 bg-[#D5D3CC] hover:bg-[#7C7A74]'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* SECTION 6: THE PROCESS & QUOTE (Made With Intention) */}
            <section id="process" className="bg-[#1C1B19] text-[#F7F5F0] overflow-hidden relative">
              
              {/* Subtle watermark in Process quote */}
              <div 
                className="absolute right-[-5%] bottom-[-5%] h-[60%] w-[40%] opacity-[0.02] select-none pointer-events-none mix-blend-screen bg-no-repeat bg-contain"
                style={{ backgroundImage: 'url("/411designs-logo.svg")' }}
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
                        <img src="/411designs-logo.svg" alt="The 411Designs" className="h-full w-auto object-contain mix-blend-screen" />
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
                className="absolute right-[-10%] top-[-10%] h-[80%] w-[60%] opacity-[0.03] select-none pointer-events-none mix-blend-multiply bg-no-repeat bg-contain"
                style={{ backgroundImage: 'url("/411designs-logo.svg")' }}
              />

              <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left Column: Studio introduction */}
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
                style={{ backgroundImage: 'url("/411designs-logo.svg")' }}
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

                  {/* Right Column: Project enquiry form */}
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
                          <label htmlFor="contact-name" className="text-[10px] uppercase tracking-widest font-bold text-[#E05A36]">YOUR NAME</label>
                          <input 
                            id="contact-name"
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
                          <label htmlFor="contact-method" className="text-[10px] uppercase tracking-widest font-bold text-[#E05A36]">PHONE OR EMAIL</label>
                          <input 
                            id="contact-method"
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
                          <label htmlFor="contact-service" className="text-[10px] uppercase tracking-widest font-bold text-[#E05A36]">WHAT DO YOU NEED?</label>
                          <select 
                            id="contact-service"
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
                          <label htmlFor="contact-details" className="text-[10px] uppercase tracking-widest font-bold text-[#E05A36]">TELL US A LITTLE ABOUT IT</label>
                          <textarea 
                            id="contact-details"
                            name="details"
                            rows={3}
                            value={formData.details}
                            onChange={handleFormChange}
                            placeholder="The room, the idea, the feeling..."
                            className="w-full bg-transparent border-b border-white/20 pb-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#E05A36] transition-colors font-sans-premium resize-none"
                          />
                        </div>

                        {/* Submit button */}
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

      </main>

      {/* Lightbox Modal Component */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center p-4 md:p-8 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          tabIndex={-1}
        >
          
          {/* Close trigger */}
          <button 
            ref={lightboxCloseButtonRef}
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors focus:outline-none z-10"
            aria-label="Close image preview"
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
              <h3 id="lightbox-title" className="font-editorial text-2xl md:text-3xl font-bold text-white">{lightboxTitle}</h3>
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
          style={{ backgroundImage: 'url("/411designs-logo.svg")' }}
        />

        <div className="max-w-7xl mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">
          
          {/* Column 1: Identity */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <img src="/411designs-logo.svg" alt="The 411Designs" className="h-16 w-auto object-contain" />
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
              <a href="#process" className="hover:text-[#E05A36] transition-colors py-0.5">05 Execution Process</a>
              <a href="#about" className="hover:text-[#E05A36] transition-colors py-0.5">06 About Toriora</a>
              <a href="#contact" className="hover:text-[#E05A36] transition-colors py-0.5">08 Collaboration Form</a>
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
                  aria-label="WhatsApp"
                >
                  <Phone className="h-4 w-4" />
                </a>
                <a 
                  href="mailto:The411Designs@gmail.com" 
                  className="h-10 w-10 rounded bg-white/5 border border-white/10 hover:border-[#E05A36] hover:bg-[#E05A36] flex items-center justify-center text-white transition-all"
                  title="Email"
                  aria-label="Email"
                >
                  <Mail className="h-4 w-4" />
                </a>
                <a 
                  href="https://www.instagram.com/the_411designs/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="h-10 w-10 rounded bg-white/5 border border-white/10 hover:border-[#E05A36] hover:bg-[#E05A36] flex items-center justify-center text-white transition-all"
                  title="Instagram"
                  aria-label="Instagram"
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
