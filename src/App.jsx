import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, CheckCircle, Clock, Mail, MapPin, Phone, X, ArrowLeft } from 'lucide-react';

// Core UI Background Assets
import blueBg from './Blue.jpg';
import backgrnd from './backgrnd.png';
import webimg from './webimg.png'; // Imported the requested blue tint background layout image

// Explicit Local Workshop Inventory Image Asset Injections
import img1 from './assets/img1.jpeg';
import img2 from './assets/img2.jpeg';
import img3 from './assets/img3.jpeg';
import img4 from './assets/img4.jpeg';
import img5 from './assets/img5.jpeg';
import img6 from './assets/img6.jpeg';
import img7 from './assets/img7.jpeg';
import img8 from './assets/img8.jpeg';
import img9 from './assets/img9.jpeg';
import img10 from './assets/img10.jpeg';

const HERO_SLIDES = [
  { id: "M-01", title: "Advanced Water Treatment", tagline: "MUNICIPAL & DOMESTIC PURIFICATION", description: "We construct commercial Reverse Osmosis plants, automatic water softening units, and de-mineralizer systems engineered for pure, calcification-free water in homes, farms, and industries.", image: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?q=80&w=1600&auto=format&fit=crop" },
  { id: "M-02", title: "Integrated Borehole Solarisation", tagline: "OFF-GRID CLEAN ENERGETIC PUMPING", description: "Convert standard electric submersibles to sustainable, high-efficiency solar pumps powered by solar-tracker arrays with dry-run sensor protection.", image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1600&auto=format&fit=crop" },
  { id: "M-03", title: "High-Yield Precision Irrigation Systems", tagline: "DURABLE CROP ALLOCATION NETWORKS", description: "Precision HDPE distribution layouts, chemical dosing manifolds, and drip lines designed to maximize agricultural crop yield with minimal water wastage.", image: "https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?q=80&w=1600&auto=format&fit=crop" }
];

const TURNKEY_SYSTEMS = [
  { name: "Reverse Osmosis Plant (Industrial & Commercial)", category: "Water Treatment", image: img7, shortDesc: "Multi-stage, membrane-based high-rejection filtration plants custom designed for homes, farms, and industrial boilers. Effectively removes 99% of total dissolved solids (TDS), fluoride, heavy metals, and high salinity.", detailedDesc: "Our commercial and industrial Reverse Osmosis (RO) plants are engineered specifically to tackle high fluoride, calcium scaling, and extreme mineral salinity typical of East African aquifers. Designed as a modular skid pre-assembled in our workshop, the system includes sand filtration beds, dynamic activated carbon absorption, dual water-softening heads, and high-pressure RO membrane hulls. Perfect for housing estates, hospitals, farms, beverage industries, and commercial water bottling setups.", specifications: ["Capacity range: 500 L/h, 1,000 L/h, up to 100,000 L/h systems", "98.7% rejection rate on TDS, fluoride, heavy metals & sodiums", "Automated PLC computerized controllers with feed pressure meters", "Constructed in food-grade SS304/SS316 stainless steel frame skids"] },
  { name: "Industrial & Home Water Softening Unit", category: "Water Treatment", image: img3, shortDesc: "Premium ion-exchange softener units targeting calcium and magnesium calcification in hard-water areas. Prevents scaling in appliances, residential piping, cooling towers, and agricultural irrigation pipes.", detailedDesc: "Hard water causes severe limescale accumulation that ruins industrial boiler heating rods, home water heaters, and farm drip emitters. Our premium Water Softeners run on food-grade cation ion exchange resins that chemically swap calcium and magnesium hardness ions with safe sodium ions. Controlled by automatic volumetric or time-based heads, the system performs intelligent salt brine draw-and-backwash rinse cycles automatically to ensure zero maintenance stress.", specifications: ["Super-capacity food-grade cation exchange resin media", "Runxin digital automated control valves with volumetric meters", "Corrosion-proof, seamless FRP composite holding vessels", "Designed for family homes, hospitality, farms, and boiler-feeds"] },
  { name: "High-Efficiency Borehole Solarisation System", category: "Equipping & Solarisation", image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=800&auto=format&fit=crop", shortDesc: "Converting deep wells to 100% off-grid solar-pumping operations. We pair specialized brushless DC solar submersibles with dynamic protective inverters and automatic sun-tracker steel arrays.", detailedDesc: "Ditch the recurring fuel bills and unreliable power grids. Our borehole solarisation packages convert existing or newly drilled wells into fully autonomous solar water stations. We specify high-efficiency brushless DC helical-rotor submersibles, high-discharge solar panels mounted on durable wind-resistant hot-dip galvanized steel frames, and smart controllers with built-in speed variation and dry-run protection sensors.", specifications: ["Configured for head lifts from 30m up to 350 meters deep", "High-discharge delivery rate from 2,000L to 120,000L daily yield", "Intelligent controller with automatic MPPT tracking & grid crossover", "Double-casing dry-run safety sensors to avoid borehole damage"] }
];

const HARDWARE_COMPONENTS = [
  { name: "Premium Spun Sediment & Carbon Filter Cartridges", category: "Filtration Spares", image: img1, shortDesc: "Replacement filter elements spanning melt-blown spun polypropylene, string-wound sediment, and high-density block activated carbon (GAC-10BB) designed for robust particulate extraction.", specifications: ["Nominal particle retention ratings available from 20 down to 1 micron", "Multi-layer structural design prevents pressure drop compromises", "100% food-grade material bounds safe for pure drinking water supply lines", "Effectively removes chlorine, bad odors, and organic chemical taints"] },
  { name: "Digital Automated PLC Water System Inverter Controllers", category: "Industrial Automation", image: img2, shortDesc: "Infinity electronic plant control command systems engineered to safely automate deep-well submersible running times, booster pump variations, and backwash routing loops.", specifications: ["Intelligent integrated logic protects against single-phase motor stalls", "Built-in dry-run sensor response cutoff preventing pump block cracking", "Thick protective shrink wrap ensures dust and localized moisture sealing", "Easy-to-use toggle configuration keys mapping real-time operational states"] },
  { name: "High-Strength Fiberglass Reinforced Plastic (FRP) Tanks", category: "Media Pressure Vessels", image: img3, shortDesc: "Heavy-duty commercial composite structural vessels paired with top-mount automated digital multi-port valving assemblies for multi-media filtration layouts.", specifications: ["Seamless structural PE inner shell wrapped in continuous fiber filaments", "Guaranteed 100% rustproof and corrosion resistant configuration parameters", "Sized specifically for high-capacity Activated Carbon, Sand, or Resin media", "Tested to operate reliably under extreme pressure margins up to 10 Bar"] },
  { name: "Heavy-Duty Opaque & Transparent Filter Housings", category: "Filtration Systems", image: img4, shortDesc: "High-impact reinforced poly-propylene cartridge housings tailored for pre-treatment lines, available in clear acrylic and structural blue variants.", specifications: ["Dual-metric sizing lines available in standard Slim and Big Blue capacities", "Thick double O-ring structural seal bounds eliminate fluid context bypass", "Equipped with manual top-mount pressure relief pressure valve buttons", "Reinforced threaded input ports protect against torque piping cracks"] },
  { name: "Polished Stainless Steel Multi-Element Vessels", category: "Filtration Systems", image: img5, shortDesc: "Commercial grade high-capacity SS304/SS316 housing chambers designed to anchor multiple sediment cartridges or absolute micro-filters concurrently.", specifications: ["Polished sanitary mirror finish with anti-corrosion properties", "Heavy-duty perimeter ring-bolt closures for rapid manual elements replacement", "Equipped with integrated fluid pressure gauges monitoring flow drop metrics", "Ideal for commercial factories, milk bottling hubs, and municipal grids"] },
  { name: "Precision Panel-Mount Variable Area Flowmeters", category: "Industrial Automation", image: img6, shortDesc: "High-accuracy inline variable flow rotameters engineered by ZYIA to provide clear visual volume readings across discharge lines.", specifications: ["Dual calibrated metering scale panels tracking Gallons and Liters Per Minute", "Precision-machined internal metallic floats avoid fluid sticking limits", "Thick transparent acrylic casing engineered for continuous panel integration", "Essential for assessing precise Reverse Osmosis permeate and reject parameters"] },
  { name: "Industrial Spiral Brackish Membrane Elements", category: "Filtration Systems", image: img7, shortDesc: "Spiral-wound composite Reverse Osmosis elements (BW-4040) designed to extract 99% of minerals, high fluoride levels, and aquifer salinity.", specifications: ["High active surface canvas optimizes mineral extraction from hard water", "Durable woven outer fiberglass structural shell resists compaction limits", "Delivers crisp potable taste profiles while removing scale-forming ions", "Engineered to fit seamlessly inside standard stainless high-pressure vessels"] },
  { name: "CNP Vertical Multistage Centrifugal Booster Pumps", category: "Pumping & Boosters", image: img8, shortDesc: "Engineered vertical inline booster pumps crafted in robust stainless materials by leading global brands like CNP and Grundfos.", specifications: ["Delivers high-pressure lift outputs to conquer deep elevation metrics", "All fluid touch components machined in food-safe SS304/SS316 steels", "Continuous continuous-duty Class F insulation high-temp motor rating indexes", "Laser-welded internal impellers guarantee smooth hydraulic output loops"] },
  { name: "Seko Micro-Processor Controlled Chemical Dosing Pumps", category: "Chemical Treatment", image: img9, shortDesc: "Seko precision electronic liquid dosing pumps designed for accurate chlorine, anti-scalant, and active pH fluid stabilization adjustments.", specifications: ["Fully adjustable stroke rate frequency via digital front-facing dials", "Chemically inert PVDF pump head assemblies with pure PTFE diaphragms", "Wall-mount configurations protected by a robust IP65 ingress chassis", "Ensures precise chemical injection prevents scaling on downstream membranes"] }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [productName, setProductName] = useState("");
  const [messageDetails, setMessageDetails] = useState("");
  
  const [formStatus, setFormStatus] = useState({ loading: false, success: false, error: false });
  const formRef = useRef(null);
  const contactInfoRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() !== "" && currentPage !== "catalog") {
      setCurrentPage("catalog");
    }
  }, [searchQuery]);

  const scrollToContactDesk = () => {
    setCurrentPage("home");
    setTimeout(() => {
      if (contactInfoRef.current) {
        contactInfoRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleQuoteRouting = (itemName) => {
    setCurrentPage("home");
    setProductName(itemName);
    setMessageDetails(`Request for Quote: ${itemName}. Please provide pricing, implementation timeline, and site assessment requirements.`);
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, success: false, error: false });

    const formData = new FormData(e.target);
    try {
      const response = await fetch("https://formsubmit.co/ajax/info@matrixwater.co.ke", {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        setFormStatus({ loading: false, success: true, error: false });
        setFullName("");
        setEmail("");
        setPhone("");
        setLocation("");
        setProductName("");
        setMessageDetails("");
      } else {
        throw new Error();
      }
    } catch {
      setFormStatus({ loading: false, success: false, error: true });
    }
  };

  const filteredHardware = HARDWARE_COMPONENTS.filter(item => {
    const textQuery = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(textQuery) ||
      item.category.toLowerCase().includes(textQuery) ||
      item.shortDesc.toLowerCase().includes(textQuery) ||
      item.specifications.some(spec => spec.toLowerCase().includes(textQuery))
    );
  });

  return (
    <div className="min-h-screen bg-slate-50/10 text-ink selection:bg-[#38BDF8] selection:text-white">
      
      <header className="sticky top-0 z-40 bg-white border-b border-[#BFE3FA] shadow-xs" itemscope="itemscope" itemtype="http://www.schema.org/SiteNavigationElement">
        <div className="bg-slate-50 border-b border-slate-200/40 py-1.5 px-6">
          <div className="max-w-7xl mx-auto flex justify-end items-center gap-2.5 text-xs font-mono font-bold text-[#4e7796]">
            <AnimatePresence mode="wait">
              {isSearchOpen && (
                <motion.div 
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "240px", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="overflow-hidden flex items-center shrink-0"
                >
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search components..." 
                    className="w-full bg-white border border-slate-200 px-3 py-1 rounded-md text-xs font-sans font-medium text-ink focus:outline-none focus:border-[#38BDF8]"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                if (!isSearchOpen) setCurrentPage("catalog");
              }}
              className="hover:text-[#0EA5E9] flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5" aria-hidden="true">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
              <span>{isSearchOpen ? "Close Search" : "Search Component Catalog"}</span>
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto w-full px-6 py-4 flex items-center justify-between">
          <button onClick={() => { setCurrentPage("home"); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="flex items-center gap-2.5 group cursor-pointer text-left focus:outline-none bg-transparent border-none">
            <div className="relative flex items-center justify-center shrink-0 w-11 h-11 select-none">
              <svg width="44" height="44" viewBox="0 0 100 100" className="w-11 h-11 select-none">
                <ellipse cx="50" cy="74" rx="32" ry="10" fill="none" stroke="#38BDF8" strokeWidth="3.5" opacity="0.85"></ellipse>
                <ellipse cx="50" cy="79" rx="20" ry="6.5" fill="none" stroke="#38BDF8" strokeWidth="2.5" opacity="0.6"></ellipse>
                <path d="M50 16 C32 46 32 68 50 68 C68 68 68 46 50 16 Z" fill="#0C3D5C"></path>
              </svg>
            </div>
            <div className="flex flex-col select-none leading-none">
              <span className="font-display font-black text-xl tracking-tight text-[#0C3D5C]">Matrix</span>
              <span className="font-display font-bold text-xs tracking-wide text-[#38BDF8] mt-0.5">Water Ltd</span>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-ink">
            <div className="relative group/mega py-2">
              <div className="hover:text-[#0EA5E9] flex items-center gap-1 transition-colors bg-transparent border-none cursor-default select-none">
                <span>Products & Solutions</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 group-hover/mega:rotate-180 transition-transform duration-200" aria-hidden="true">
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </div>

              <div className="absolute top-full -left-48 w-[760px] bg-white border border-slate-200 shadow-2xl rounded-2xl p-6 opacity-0 translate-y-2 pointer-events-none group-hover/mega:opacity-100 group-hover/mega:translate-y-0 group-hover/mega:pointer-events-auto transition-all duration-250 grid grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold tracking-wider text-[#0EA5E9] uppercase border-b border-slate-100 pb-1.5 select-none">Turnkey Plants</h4>
                  <div className="flex flex-col gap-2 text-xs font-medium text-slate-600">
                    <button onClick={() => { setCurrentPage("home"); setTimeout(() => document.getElementById("engineered-systems")?.scrollIntoView({behavior: 'smooth'}), 50); }} className="text-left hover:text-ink transition-colors bg-transparent border-none cursor-pointer">Reverse Osmosis Plants</button>
                    <button onClick={() => { setCurrentPage("home"); setTimeout(() => document.getElementById("engineered-systems")?.scrollIntoView({behavior: 'smooth'}), 50); }} className="text-left hover:text-ink transition-colors bg-transparent border-none cursor-pointer">Water Softening Units</button>
                    <button onClick={() => { setCurrentPage("home"); setTimeout(() => document.getElementById("engineered-systems")?.scrollIntoView({behavior: 'smooth'}), 50); }} className="text-left hover:text-ink transition-colors bg-transparent border-none cursor-pointer">Borehole Solarisation</button>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold tracking-wider text-[#0EA5E9] uppercase border-b border-slate-100 pb-1.5 select-none">Pumping & Filtration</h4>
                  <div className="flex flex-col gap-2 text-xs font-medium text-slate-600">
                    <button onClick={() => { setCurrentPage("catalog"); setSearchQuery("Pump"); }} className="text-left hover:text-ink transition-colors bg-transparent border-none cursor-pointer">Vertical Multistage Pumps</button>
                    <button onClick={() => { setCurrentPage("catalog"); setSearchQuery("Housing"); }} className="text-left hover:text-ink transition-colors bg-transparent border-none cursor-pointer">Filter Cartridge Housings</button>
                    <button onClick={() => { setCurrentPage("catalog"); setSearchQuery("Cartridge"); }} className="text-left hover:text-ink transition-colors bg-transparent border-none cursor-pointer">Clean Dosing Spares</button>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold tracking-wider text-[#0EA5E9] uppercase border-b border-slate-100 pb-1.5 select-none">Vessels & Automation</h4>
                  <div className="flex flex-col gap-2 text-xs font-medium text-slate-600">
                    <button onClick={() => { setCurrentPage("catalog"); setSearchQuery("Vessel"); }} className="text-left hover:text-ink transition-colors bg-transparent border-none cursor-pointer">FRP Media Pressure Tanks</button>
                    <button onClick={() => { setCurrentPage("catalog"); setSearchQuery("Flowmeter"); }} className="text-left hover:text-ink transition-colors bg-transparent border-none cursor-pointer">Panel Flowmeters</button>
                    <button onClick={() => { setCurrentPage("catalog"); setSearchQuery("Inverter"); }} className="text-left hover:text-ink transition-colors bg-transparent border-none cursor-pointer">Digital Inverter Panels</button>
                  </div>
                </div>
              </div>
            </div>

            <button onClick={() => { setCurrentPage("catalog"); setSearchQuery(""); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="hover:text-[#0EA5E9] transition-colors bg-transparent border-none font-semibold cursor-pointer">Hardware Catalog</button>
            <button onClick={() => { setCurrentPage("home"); setTimeout(() => document.getElementById("partners")?.scrollIntoView({behavior: 'smooth'}), 50); }} className="hover:text-[#0EA5E9] transition-colors bg-transparent border-none font-semibold cursor-pointer">Our Partners</button>
            <button onClick={scrollToContactDesk} className="hover:text-[#0EA5E9] transition-colors bg-transparent border-none font-semibold cursor-pointer">Contact Desk</button>
          </nav>

          <div className="flex items-center gap-6">
            <a href="mailto:info@matrixwater.co.ke" className="font-mono text-xs font-bold text-[#0EA5E9] hover:text-[#0C3D5C] transition-colors flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail w-4 h-4 text-[#38BDF8]" aria-hidden="true">
                <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
              </svg>
              <span className="hidden sm:inline">info@matrixwater.co.ke</span>
            </a>
            <span className="text-[#BFE3FA] hidden sm:block" aria-hidden="true">|</span>
            <button onClick={scrollToContactDesk} className="inline-flex items-center gap-2 bg-[#38BDF8] hover:bg-[#BAE6FD] text-[#0C3D5C] font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-full transition-all tracking-wide shadow-sm font-display cursor-pointer border-none">
              Get Professional Quote
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-4 h-4" aria-hidden="true">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {currentPage === "home" ? (
        <>
          <section className="relative w-full min-h-screen overflow-hidden">
            <AnimatePresence mode="wait">
              {HERO_SLIDES.map((slide, idx) => (
                idx === activeSlide && (
                  <motion.div
                    key={slide.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.65 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                  </motion.div>
                )
              ))}
            </AnimatePresence>

            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-6 flex flex-col justify-center items-start text-white">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`text-content-${activeSlide}`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      className="flex flex-col items-start"
                    >
                      <span className="font-mono text-xs font-bold text-[#38BDF8] py-1.5 px-3 bg-black/40 rounded-full tracking-wider uppercase mb-5">
                        {HERO_SLIDES[activeSlide].tagline}
                      </span>
                      <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white mb-5 leading-tight">
                        {HERO_SLIDES[activeSlide].title}
                      </h1>
                      <p className="text-white/90 text-sm sm:text-base mb-6 leading-relaxed max-w-xl">
                        {HERO_SLIDES[activeSlide].description}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                  
                  <div className="flex flex-wrap gap-4 w-full sm:w-auto">
                    <button onClick={() => { setCurrentPage("catalog"); setSearchQuery(""); window.scrollTo({top: 0}); }} className="bg-[#38BDF8] hover:bg-[#0EA5E9] text-ink font-bold text-sm px-6 py-3 rounded-full transition-all shadow-md text-center flex-1 sm:flex-none border-none cursor-pointer">
                      Hardware Catalog
                    </button>
                    <button onClick={scrollToContactDesk} className="border border-white/40 hover:border-[#38BDF8] hover:bg-white/10 text-white font-bold text-sm px-6 py-3 rounded-full transition-colors text-center flex-1 sm:flex-none bg-transparent cursor-pointer">
                      Send Inquiry
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-3">
              <button onClick={() => setActiveSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)} className="p-2 rounded-full bg-white/80 hover:bg-white text-ink transition-colors shadow-lg cursor-pointer">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2.5 items-center px-4">
                {HERO_SLIDES.map((_, idx) => (
                  <button key={idx} onClick={() => setActiveSlide(idx)} className={`h-2 rounded-full transition-all cursor-pointer ${idx === activeSlide ? "w-10 bg-[#38BDF8]" : "w-2 bg-white/40 hover:bg-white/70"}`} />
                ))}
              </div>
              <button onClick={() => setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length)} className="p-2 rounded-full bg-white/80 hover:bg-white text-ink transition-colors shadow-lg cursor-pointer">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </section>

          {/* TURNKEY ENGINEERED SYSTEMS SECTION */}
          <section className="py-24 bg-white relative overflow-hidden" id="engineered-systems"
            style={{ backgroundImage: `url(${backgrnd})`, backgroundRepeat: 'no-repeat', backgroundSize: '500px', backgroundPosition: 'right 10% top 12%' }}
          > 
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="max-w-2xl text-left mb-16 pt-4">
                <span className="font-mono text-xs font-black text-[#0EA5E9] tracking-[0.25em] uppercase block mb-3.5">
                  CUSTOM ENGINEERING & COMMISSIONING
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-ink font-display leading-tight">
                  Matrix Engineered Systems
                </h2>
                <p className="text-[#4e7796] text-sm sm:text-base mt-4 leading-relaxed font-medium max-w-xl">
                  Based on advanced water treatment, alongside solarization, pumping, and irrigation. We design and install high-performance turnkey plants customized to withstand local mineral profiles for homes, industries, and farms.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                {TURNKEY_SYSTEMS.map((item, index) => {
                  return (
                    <motion.div 
                      key={`turnkey-plant-${index}`} 
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                      className="group flex flex-col p-6 rounded-3xl border border-slate-100 bg-slate-50/50 shadow-xs hover:bg-white hover:shadow-xl hover:border-[#BFE3FA]/70 transition-all duration-300 overflow-hidden"
                    >
                      <div className="w-full overflow-hidden rounded-2xl border border-slate-200/40 shadow-2xs aspect-[4/3] mb-4 shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 ease-out" />
                      </div>

                      <div className="shrink-0">
                        <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#0EA5E9] mb-1 block">
                          {item.category}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-ink font-display leading-snug min-h-[50px]">
                          {item.name}
                        </h3>
                      </div>

                      <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] opacity-0 group-hover:opacity-100 transition-all duration-350 ease-in-out">
                        <div className="overflow-hidden">
                          <p className="text-[#475569] text-xs sm:text-sm mt-3 leading-relaxed pt-3 border-t border-slate-100">
                            {item.shortDesc}
                          </p>
                          
                          <div className="space-y-2 mt-4 mb-5">
                            {item.specifications.slice(0, 3).map((spec, sIdx) => (
                              <div key={`spec-${index}-${sIdx}`} className="flex gap-2 items-start text-xs font-mono text-ink/90 font-medium">
                                <CheckCircle className="w-3.5 h-3.5 text-[#38BDF8] shrink-0 mt-0.5" strokeWidth={3} />
                                <span>{spec}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex gap-3 pt-2">
                            <button onClick={() => setSelectedProduct(item)} className="flex-1 bg-ink hover:bg-[#0EA5E9] text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-colors cursor-pointer border-none shadow-xs">
                              Specs & Details
                            </button>
                            <button onClick={() => handleQuoteRouting(item.name)} className="flex-1 border border-slate-200 hover:border-[#38BDF8] hover:bg-[#F0F9FF] text-ink text-xs font-bold py-2.5 px-3 rounded-xl transition-colors cursor-pointer bg-white">
                              Request Quote
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        </>
      ) : (
        /* DEDICATED HARDWARE COMPONENT CATALOG PAGE WITH YOUR CUSTOM WEBIMG.PNG AS BACKGROUND INTERFACE */
        <motion.main 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0 }}
          className="py-16 bg-cover bg-center bg-no-repeat relative min-h-[75vh]"
          style={{ backgroundImage: `url(${webimg})` }} // Assigned the requested local background asset cleanly here
        >
          {/* Subtle multi-pass gradient mask over the webimg layout asset guarantees perfect contrast fields */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#F0F9FF]/90 via-[#F0F9FF]/85 to-[#F0F9FF]/95 z-0 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <button 
                onClick={() => { setCurrentPage("home"); setSearchQuery(""); }}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#0EA5E9] hover:text-ink transition-colors bg-white border border-slate-200 px-4 py-2 rounded-full cursor-pointer shadow-xs"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Engineering Hub
              </button>
              
              {searchQuery && (
                <div className="text-xs font-mono font-semibold text-slate-600 bg-white/80 border border-slate-200 px-4 py-2 rounded-full">
                  Filtering by: <span className="text-[#0EA5E9] font-bold">"{searchQuery}"</span>
                  <button onClick={() => setSearchQuery("")} className="ml-2 text-red-500 hover:text-red-700 font-bold bg-transparent border-none cursor-pointer">×</button>
                </div>
              )}
            </div>

            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="font-mono text-xs font-black text-[#0EA5E9] tracking-[0.25em] uppercase block mb-3.5">
                PREMIUM SPARES & CERTIFIED COMPONENTS
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ink font-display">
                Hardware Product Catalog
              </h2>
              <p className="text-[#4e7796] text-sm sm:text-base mt-3 leading-relaxed">
                Explore individual equipment parameters, filtration membranes, and vertical multi-stage configurations stocked across our regional processing hubs.
              </p>
            </div>

            {filteredHardware.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredHardware.map((item, index) => (
                  <motion.div 
                    key={`hardware-item-${index}`} 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: (index % 3) * 0.05 }}
                    whileHover={{ y: -8, scale: 1.01, boxShadow: "0 25px 35px -12px rgba(12, 61, 92, 0.12)" }}
                    className="group border border-slate-200/60 rounded-3xl bg-white p-5 hover:border-[#38BDF8]/40 transition-all duration-350 flex flex-col justify-between cursor-pointer"
                  >
                    <div>
                      <div className="w-full h-52 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center overflow-hidden mb-4.5 p-2 bg-radial from-white to-slate-50/30">
                        <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-[#0EA5E9] bg-[#F0F9FF] border border-[#BFE3FA] px-2 py-0.5 rounded-md mb-2 inline-block">
                        {item.category}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-ink font-display mb-2 min-h-[44px] leading-snug line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-slate-600 text-xs leading-relaxed mb-4 min-h-[50px] line-clamp-3">
                        {item.shortDesc}
                      </p>
                    </div>

                    <div className="flex gap-2 pt-3 border-t border-slate-200/50 mt-auto">
                      <button onClick={() => setSelectedProduct(item)} className="flex-1 bg-ink hover:bg-[#0EA5E9] text-white text-xs font-bold py-2 px-3 rounded-full text-center cursor-pointer transition-colors border-none">
                        Technical Specs
                      </button>
                      <button onClick={() => handleQuoteRouting(item.name)} className="flex-1 border border-slate-200 hover:border-[#38BDF8] text-ink text-xs font-bold py-2 px-3 rounded-full text-center cursor-pointer transition-colors bg-white">
                        Request Quote
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 max-w-xl mx-auto p-8">
                <p className="text-slate-600 font-medium mb-4">No specific water engineering components match your current query profile.</p>
                <button onClick={() => setSearchQuery("")} className="bg-[#38BDF8] text-[#0C3D5C] font-bold text-xs px-6 py-2 rounded-full cursor-pointer border-none">
                  Reset Catalog Search Filter
                </button>
              </div>
            )}
          </div>
        </motion.main>
      )}

      {/* FORM REQUEST FOR QUOTE DESK WITH CUSTOM BLUE GRAPHIC BACKDROP */}
      <section 
        className="py-20 bg-cover bg-center text-ink border-t border-[#BFE3FA]/30 relative" 
        id="contact-rfq" 
        ref={formRef}
        style={{ backgroundImage: `url(${blueBg})` }}
      >
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <div className="text-center mb-10">
            <span className="font-mono text-xs font-bold text-sky-300 tracking-widest uppercase block mb-2">
              SUBMIT ARCHITECTURAL PARAMETERS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-display text-white mb-2">
              Request a Water System Quote
            </h2>
            <p className="text-white/80 text-sm sm:text-base">
              Share your location coordinates and operational profile. Our design engineers respond within 24 hours.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-lg border border-slate-200">
            {formStatus.success && (
              <div className="mb-6 p-4 bg-sky-50 text-sky-900 border border-sky-300 rounded-xl text-sm font-semibold flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-sky-600" />
                <span>Quote requested successfully! Our engineering desk will contact you via email and phone shortly.</span>
              </div>
            )}
            {formStatus.error && (
              <div className="mb-6 p-4 bg-red-50 text-red-900 border border-red-300 rounded-xl text-sm font-semibold">
                Submission failed. Please email coordinates directly to info@matrixwater.co.ke
              </div>
            )}

            <form onSubmit={handleFormSubmission} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">Full Name *</label>
                  <input type="text" name="Full Name" required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Kamau" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#38BDF8] focus:bg-white font-semibold transition-all" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">Email Address *</label>
                  <input type="email" name="_replyto" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="client@domain.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#38BDF8] focus:bg-white font-semibold transition-all" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">Phone Number *</label>
                  <input type="tel" name="Phone" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+254 712 345 678" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#38BDF8] focus:bg-white font-mono font-semibold transition-all" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">Site Location / County *</label>
                  <input type="text" name="Location" required value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Naivasha, Nakuru County" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#38BDF8] focus:bg-white font-semibold transition-all" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">Target Hardware / Facility Segment</label>
                <input type="text" name="Product / System" value={productName} onChange={e => setProductName(e.target.value)} placeholder="E.g., 1000 L/h Reverse Osmosis Plant" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#38BDF8] focus:bg-white font-semibold transition-all" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">Project Requirements / Consumption Profile *</label>
                <textarea name="Message details" rows={4} required value={messageDetails} onChange={(e) => setMessageDetails(e.target.value)} placeholder="Please detail household size, raw water salinity challenges, borehole depth or estimated yield properties..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#38BDF8] focus:bg-white font-medium transition-all" />
              </div>

              <input type="hidden" name="_subject" value="Matrix Water Solutions - New System Layout Proposal Request" />
              <input type="text" name="_honey" className="hidden" />

              <button type="submit" disabled={formStatus.loading} className="w-full bg-ink text-white hover:bg-[#0EA5E9] font-display font-black tracking-wide py-4 rounded-xl shadow-lg transition-colors uppercase text-sm cursor-pointer disabled:opacity-50 border-none">
                {formStatus.loading ? "Transmitting Parameters..." : "Submit System Proposal Request"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* INDUSTRY PARTNERS & BRANDS CAROUSEL */}
      <section className="py-16 bg-slate-50/70 border-y border-slate-200/50 overflow-hidden select-none" id="partners">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="font-mono text-[10px] md:text-xs font-bold text-[#0EA5E9] tracking-[0.25em] uppercase block">
              INDUSTRY-LEADING BRANDS
            </span>
          </div>
          <div className="relative w-full overflow-hidden py-4">
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-slate-50/90 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-slate-50/90 to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex gap-6 animate-marquee w-max hover:[animation-play-state:paused]">
              {[...Array(2)].map((_, set) => (
                <div key={`marquee-group-${set}`} className="flex gap-6 shrink-0">
                  <div className="bg-white border border-slate-200/50 p-4 rounded-xl flex items-center justify-center h-20 w-44 shrink-0 shadow-sm hover:shadow-md transition-shadow">
                    <svg className="h-7 w-full max-w-[140px]" viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="20" cy="20" r="14" fill="#F05A24"></circle>
                      <path d="M12 17 C16 14, 24 14, 28 17" stroke="white" strokeWidth="1.2" strokeLinecap="round" fill="none"></path>
                      <path d="M12 23 C16 26, 24 26, 28 23" stroke="white" strokeWidth="1.2" strokeLinecap="round" fill="none"></path>
                      <text x="20" y="22" fill="white" fontSize="9" fontWeight="900" fontFamily="sans-serif" textAnchor="middle" letterSpacing="-0.2">LEO</text>
                      <text x="42" y="24" fill="#1C1B1F" fontSize="16" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.4">LEO PUMP</text>
                      <text x="42" y="32" fill="#F05A24" fontSize="5.5" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.8">GLOBAL SYSTEM</text>
                    </svg>
                  </div>
                  <div className="bg-white border border-slate-200/50 p-4 rounded-xl flex items-center justify-center h-20 w-44 shrink-0 shadow-sm hover:shadow-md transition-shadow">
                    <svg className="h-6 w-full max-w-[140px]" viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <polygon points="12,8 30,20 12,32" fill="#002444"></polygon>
                      <polygon points="12,12 18,16 12,20" fill="#FFFFFF"></polygon>
                      <polygon points="12,20 18,24 12,28" fill="#FFFFFF"></polygon>
                      <polygon points="5,8 11,12 5,16" fill="#4C8C2B"></polygon>
                      <polygon points="5,16 11,20 5,24" fill="#4C8C2B"></polygon>
                      <polygon points="5,24 11,28 5,32" fill="#4C8C2B"></polygon>
                      <text x="38" y="27" fill="#002444" fontSize="19" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.4">PENTAIR</text>
                    </svg>
                  </div>
                  <div className="bg-white border border-slate-200/50 p-4 rounded-xl flex items-center justify-center h-20 w-44 shrink-0 shadow-sm hover:shadow-md transition-shadow">
                    <svg className="h-7 w-full max-w-[140px]" viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <ellipse cx="70" cy="20" rx="42" ry="14" stroke="#38BDF8" strokeWidth="2.2" fill="none"></ellipse>
                      <text x="44" y="28" fill="#0284C7" fontSize="26" fontWeight="bold" fontStyle="italic" fontFamily="sans-serif">seko</text>
                    </svg>
                  </div>
                  <div className="bg-white border border-slate-200/50 p-4 rounded-xl flex items-center justify-center h-20 w-44 shrink-0 shadow-sm hover:shadow-md transition-shadow">
                    <svg className="h-7 w-full max-w-[140px]" viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <text x="8" y="26" fill="#008CA7" fontSize="27" fontWeight="700" fontFamily="sans-serif" letterSpacing="-0.8">xylem</text>
                      <text x="10" y="34" fill="#002F43" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.4">Let's Solve Water</text>
                      <g transform="translate(100, 10)">
                        <path d="M12 0 C18 6, 24 12, 24 18 C24 23, 19 28, 12 28 C5 28, 0 23, 0 18 C0 12, 6 6, 12 0 Z" fill="#008CA7" opacity="0.15"></path>
                        <path d="M12 4 C16 8, 20 13, 20 18 C20 22, 16 25, 12 25 C8 25, 4 22, 4 18 C4 13, 8 8, 12 4 Z" fill="#008CA7" opacity="0.3"></path>
                        <circle cx="12" cy="18" r="4" fill="#008CA7"></circle>
                      </g>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER SPEC LAYERS PRESERVING THE COVER WATER BACKGROUND --- */}
      <footer 
        ref={contactInfoRef}
        className="text-white py-14 border-t border-[#38BDF8]/30 relative overflow-hidden bg-cover bg-center shadow-md"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=1600&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C3D5C]/85 to-[#0C3D5C]/95 z-0 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-white/20 text-sm relative z-10">
          <div>
            <h3 className="font-display font-black text-2xl text-[#38BDF8] mb-2.5 tracking-wide">Matrix Water Ltd</h3>
            <p className="text-xs text-white/90 leading-relaxed max-w-xs font-medium">
              Registered contractor specializing in custom municipal, commercial, industrial, and agricultural water loop engineering architectures.
            </p>
          </div>
          <div>
            <h4 className="font-mono text-xs font-bold text-[#38BDF8] uppercase tracking-[0.15em] mb-4">Engineering Head Office</h4>
            <div className="space-y-2.5 text-xs font-semibold text-white">
              <p className="flex gap-2 items-center"><MapPin className="w-4 h-4 text-[#38BDF8] shrink-0" /> Baricho Road, Nairobi, Kenya</p>
              <p className="flex gap-2 items-start"><Clock className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" /> <span>Mon - Fri: 8:00 AM - 5:00 PM <br /> Sat: 9:00 AM - 1:00 PM</span></p>
            </div>
          </div>
          <div>
            <h4 className="font-mono text-xs font-bold text-[#38BDF8] uppercase tracking-[0.15em] mb-4">Direct Lines</h4>
            <div className="space-y-2 text-xs font-medium text-white">
              <p className="flex gap-2 items-center text-white/80 font-semibold"><Phone className="w-3.5 h-3.5 text-[#38BDF8]" /> Engineering Desk:</p>
              <p className="pl-5 font-mono text-sm font-black text-white">+254 793 030465</p>
              <p className="flex gap-2 items-center pt-1.5 text-white/80 font-semibold"><Mail className="w-3.5 h-3.5 text-[#38BDF8]" /> Support Email:</p>
              <p className="pl-5 font-mono"><a href="mailto:info@matrixwater.co.ke" className="hover:underline text-[#38BDF8] font-black">info@matrixwater.co.ke</a></p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-white/80 font-semibold relative z-10">
          <span>&copy; {new Date().getFullYear()} Matrix Water Ltd. All rights reserved. Registered Water Contractor.</span>
          <span className="font-mono text-[10px] text-[#38BDF8] uppercase tracking-wider">Engineered for long-term water security.</span>
        </div>
      </footer>

      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedProduct(null)}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white text-ink max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col"
            >
              <div className="relative h-56 bg-slate-50 border-b border-slate-100 p-6 flex items-center justify-center">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 bg-black/60 hover:bg-black/90 text-white rounded-full p-1.5 cursor-pointer transition-colors border-none">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-6 sm:p-8 space-y-4 max-h-[60vh] overflow-y-auto">
                <div>
                  <span className="font-mono text-[10px] text-[#0EA5E9] font-bold uppercase tracking-widest">{selectedProduct.category}</span>
                  <h3 className="text-lg sm:text-xl font-bold font-display text-ink leading-snug">{selectedProduct.name}</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{selectedProduct.detailedDesc || selectedProduct.shortDesc}</p>
                <div>
                  <h4 className="text-xs font-bold font-mono text-slate-500 uppercase tracking-widest mb-2.5">System Parameters & Specs</h4>
                  <ul className="grid grid-cols-1 gap-2 text-xs font-mono font-semibold">
                    {selectedProduct.specifications.map((spec, sIdx) => (
                      <li key={`modal-spec-${sIdx}`} className="flex gap-2 items-center bg-slate-50 border border-slate-200/60 p-2.5 rounded-xl">
                        <CheckCircle className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" strokeWidth={3} />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-3 justify-end shrink-0">
                <button onClick={() => setSelectedProduct(null)} className="border border-slate-200 hover:bg-slate-200/50 font-bold rounded-full text-xs px-4 py-2 cursor-pointer transition-colors bg-white">
                  Close Specs
                </button>
                <button onClick={() => { setSelectedProduct(null); handleQuoteRouting(selectedProduct.name); }} className="bg-ink text-white hover:bg-[#0EA5E9] font-black rounded-full text-xs px-5 py-2 cursor-pointer transition-colors border-none">
                  Request RFQ
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}