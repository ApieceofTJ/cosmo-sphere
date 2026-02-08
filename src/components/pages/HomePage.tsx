// HPI 1.7-V
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { ArrowDown, Zap, Activity, Globe, Cpu, Network, MoveRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { MindmapElements } from '@/entities';

// --- Custom CSS for specific non-Tailwind effects ---
const customStyles = `
  .text-stroke-1 {
    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
  }
  .clip-diagonal {
    clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
  }
  .grain-overlay {
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
  }
`;

export default function HomePage() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // --- Data Fidelity Protocol: Canonical Data Sources ---
  const [elements, setElements] = useState<MindmapElements[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadElements = async () => {
      try {
        const result = await BaseCrudService.getAll<MindmapElements>('mindmapelements');
        setElements(result.items);
      } catch (error) {
        console.error('Failed to load mindmap elements:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadElements();
  }, []);

  // --- Scroll Hooks ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);

  return (
    <div ref={containerRef} className="min-h-screen bg-background selection:bg-secondary selection:text-secondary-foreground overflow-clip">
      <style>{customStyles}</style>
      <Header />

      {/* --- SECTION 1: HERO (The Neural Space) --- */}
      {/* Fulfills: "Cool space like background", "Spherical bulb like thing floating" */}
      <section className="relative h-screen w-full bg-primary overflow-hidden flex flex-col justify-center items-center">
        {/* Dynamic Background Layers */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-primary to-primary opacity-80" />
        <div className="absolute inset-0 grain-overlay opacity-20 pointer-events-none" />
        
        {/* Grid Overlay for Tech Feel */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

        {/* Floating Canonical Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {!isLoading && elements.map((element, index) => {
            // Deterministic random positioning based on index
            const initialX = (index % 4) * 25 + 10; 
            const initialY = (index % 3) * 30 + 20;
            const size = index % 2 === 0 ? 120 : 180;
            const duration = element.animationSpeed || 20;

            return (
              <motion.div
                key={element._id}
                className="absolute pointer-events-auto"
                style={{
                  left: `${initialX}%`,
                  top: `${initialY}%`,
                  width: size,
                  height: size,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: [0, -40, 0],
                  x: [0, 20, 0],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  opacity: { duration: 1 },
                  scale: { duration: 1, type: "spring" },
                  y: { duration: duration, repeat: Infinity, ease: "easeInOut" },
                  x: { duration: duration * 1.2, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: duration * 1.5, repeat: Infinity, ease: "linear" }
                }}
              >
                <div 
                  className="relative w-full h-full group cursor-pointer"
                  onClick={() => element.linkUrl && window.open(element.linkUrl, '_blank')}
                >
                  {/* Sphere Visual */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-secondary/20 to-transparent border border-secondary/30 backdrop-blur-sm transition-all duration-500 group-hover:border-secondary group-hover:shadow-[0_0_30px_rgba(82,255,0,0.3)]" />
                  
                  {/* Inner Core */}
                  <div className="absolute inset-4 rounded-full bg-black/80 flex items-center justify-center overflow-hidden">
                    {element.sphereImage ? (
                      <Image 
                        src={element.sphereImage} 
                        alt={element.label || "Mindmap Node"} 
                        className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700"
                        width={200}
                      />
                    ) : (
                      <Activity className="text-secondary w-8 h-8 opacity-50" />
                    )}
                  </div>

                  {/* Orbiting Ring */}
                  <motion.div 
                    className="absolute -inset-2 border border-dashed border-secondary/20 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />

                  {/* Label Tooltip */}
                  {element.label && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-heading uppercase tracking-wider whitespace-nowrap">
                        {element.label}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Hero Content */}
        <motion.div 
          className="relative z-10 text-center px-6 max-w-[100rem] mx-auto"
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-heading text-7xl md:text-9xl lg:text-[10rem] leading-[0.9] text-primary-foreground tracking-tighter mb-8">
              NEURAL <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-secondary/60">MINDMAP</span>
            </h1>
          </motion.div>

          <motion.p 
            className="font-paragraph text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Navigate the constellation of your ideas. A spatial interface for the modern thinker.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex justify-center"
          >
            <div className="w-px h-24 bg-gradient-to-b from-secondary to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* --- SECTION 2: INTRO (Bento Grid Layout) --- */}
      {/* Fulfills: "Scroll down... short intro", Inspiration Image Layout Structure */}
      <section className="relative w-full py-32 px-6 bg-background z-20 rounded-t-[3rem] -mt-20 shadow-2xl">
        <div className="max-w-[100rem] mx-auto">
          <div className="mb-20">
            <h2 className="font-heading text-5xl md:text-7xl text-primary mb-6 max-w-4xl">
              Architects of <br />
              <span className="text-stroke-1 text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50" style={{ WebkitTextStroke: '1px black' }}>Digital Cognition</span>
            </h2>
          </div>

          {/* Bento Grid - Replicating Inspiration Image Structure */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(300px,auto)]">
            
            {/* Large Green Block (Left) */}
            <motion.div 
              className="md:col-span-5 bg-secondary rounded-[2rem] p-10 flex flex-col justify-between relative overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative z-10">
                <h3 className="font-heading text-4xl text-secondary-foreground mb-4">Synthesize</h3>
                <p className="font-paragraph text-lg text-secondary-foreground/80 max-w-sm">
                  Merge disparate data points into a cohesive narrative. Our engine processes complexity into clarity.
                </p>
              </div>
              <div className="relative z-10 mt-8">
                <button className="border border-secondary-foreground/30 rounded-full px-6 py-3 text-secondary-foreground font-paragraph hover:bg-secondary-foreground hover:text-secondary transition-colors duration-300">
                  Explore Logic
                </button>
              </div>
              {/* Decorative Abstract Shape */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
            </motion.div>

            {/* Small Grey Block (Center) */}
            <motion.div 
              className="md:col-span-3 bg-surfacealt rounded-[2rem] flex items-center justify-center group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <ArrowDown className="w-16 h-16 text-primary group-hover:translate-y-2 transition-transform duration-300" />
            </motion.div>

            {/* Black Block (Right) */}
            <motion.div 
              className="md:col-span-4 bg-primary rounded-[2rem] p-10 flex flex-col justify-between text-primary-foreground relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div>
                <h3 className="font-heading text-3xl mb-4">Revitalize</h3>
                <p className="font-paragraph text-gray-400">
                  Breathe life into static archives. Transform storage into stories.
                </p>
              </div>
              <div className="mt-8 flex justify-end">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                  <MoveRight className="w-5 h-5" />
                </div>
              </div>
            </motion.div>

            {/* Row 2: Image (Left) */}
            <motion.div 
              className="md:col-span-4 bg-gray-200 rounded-[2rem] overflow-hidden relative min-h-[300px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Image 
                src="https://static.wixstatic.com/media/df2403_4f041491b825441388d251dda77d2b56~mv2.png?originWidth=576&originHeight=384" 
                alt="Abstract Data Visualization" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent p-8 flex items-end">
                <span className="text-white font-heading text-xl">Data Fidelity</span>
              </div>
            </motion.div>

            {/* Row 2: Black Block (Center) */}
            <motion.div 
              className="md:col-span-5 bg-primary rounded-[2rem] p-10 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="absolute top-0 right-0 p-10 opacity-20">
                <Cpu className="w-32 h-32 text-secondary" />
              </div>
              <h3 className="font-heading text-4xl text-secondary mb-6 relative z-10">Relaunch</h3>
              <p className="font-paragraph text-lg text-gray-300 relative z-10 max-w-md">
                Deploy your neural architecture to the cloud. Seamless integration with existing cognitive frameworks.
              </p>
              <button className="mt-8 text-secondary border-b border-secondary pb-1 font-heading text-sm uppercase tracking-widest hover:text-white hover:border-white transition-colors">
                Check Solutions
              </button>
            </motion.div>

            {/* Row 2: Green Starburst (Right) */}
            <motion.div 
              className="md:col-span-3 bg-secondary rounded-[2rem] flex items-center justify-center relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-32 h-32 text-primary fill-primary" />
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- SECTION 3: STICKY SCROLL NARRATIVE --- */}
      {/* Fulfills: "Dynamic Motion", "Sticky Elements" */}
      <section className="relative w-full bg-surfacealt py-32">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20">
            
            {/* Sticky Left Column */}
            <div className="lg:w-1/3">
              <div className="sticky top-32">
                <h2 className="font-heading text-6xl text-primary mb-8">
                  Core <br /> Dynamics
                </h2>
                <p className="font-paragraph text-xl text-gray-600 mb-12">
                  Our platform is built on three fundamental pillars of cognitive processing. Scroll to explore the architecture.
                </p>
                <div className="hidden lg:block w-full h-px bg-gray-300 mb-8" />
                <div className="hidden lg:flex gap-4">
                  <div className="w-3 h-3 rounded-full bg-secondary animate-pulse" />
                  <span className="font-heading text-xs uppercase tracking-widest text-gray-500">System Active</span>
                </div>
              </div>
            </div>

            {/* Scrolling Right Column */}
            <div className="lg:w-2/3 flex flex-col gap-32">
              {[
                {
                  title: "Spatial Reasoning",
                  desc: "Move beyond linear lists. Organize thoughts in 3D space to reveal hidden connections and structural hierarchies.",
                  icon: <Globe className="w-12 h-12 text-secondary" />,
                  img: "https://static.wixstatic.com/media/df2403_659e972f642c46458cbe65bcc13cf4ab~mv2.png?originWidth=576&originHeight=384"
                },
                {
                  title: "Neural Sync",
                  desc: "Real-time collaboration that feels like telepathy. Watch ideas propagate across your team's network instantly.",
                  icon: <Network className="w-12 h-12 text-secondary" />,
                  img: "https://static.wixstatic.com/media/df2403_d4c2426a2ef74a25ae9f7de0b10da628~mv2.png?originWidth=576&originHeight=384"
                },
                {
                  title: "Quantum Search",
                  desc: "Retrieve any concept, note, or connection instantly with our semantic search engine powered by advanced AI.",
                  icon: <Zap className="w-12 h-12 text-secondary" />,
                  img: "https://static.wixstatic.com/media/df2403_79e33cce89944a10a8d7b8bea0441195~mv2.png?originWidth=576&originHeight=384"
                }
              ].map((item, i) => (
                <StickyCard key={i} item={item} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: START YOUR JOURNEY (CTA) --- */}
      {/* Fulfills: "Start your journey section... turn into sign in" */}
      <section className="relative w-full py-40 px-6 bg-primary overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-secondary/5 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-[100rem] mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-6xl md:text-8xl lg:text-9xl text-primary-foreground mb-12 tracking-tight">
              BEGIN YOUR <br />
              <span className="text-secondary">JOURNEY</span>
            </h2>
            
            <p className="font-paragraph text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-16">
              The future of thought is waiting. Initialize your neural workspace today.
            </p>

            <motion.button
              onClick={() => navigate('/auth')}
              className="group relative inline-flex items-center justify-center px-12 py-6 bg-secondary text-primary font-heading text-xl uppercase tracking-widest rounded-full overflow-hidden transition-transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-4">
                Initialize Protocol
                <MoveRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </motion.button>
          </motion.div>

          {/* Footer Links Integration */}
          <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 text-left border-t border-white/10 pt-16">
            {['Platform', 'Solutions', 'Resources', 'Company'].map((col) => (
              <div key={col} className="flex flex-col gap-4">
                <h4 className="font-heading text-white text-lg mb-2">{col}</h4>
                {[1, 2, 3].map((i) => (
                  <span key={i} className="font-paragraph text-gray-500 hover:text-secondary cursor-pointer transition-colors">
                    {col} Link {i}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// --- Sub-component for Sticky Cards to ensure clean ref usage ---
function StickyCard({ item, index }: { item: any, index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, scale }}
      className="group relative bg-background rounded-[2.5rem] overflow-hidden shadow-xl"
    >
      <div className="grid md:grid-cols-2 gap-0">
        <div className="p-12 flex flex-col justify-center">
          <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mb-8 group-hover:bg-secondary transition-colors duration-500">
            <div className="text-secondary group-hover:text-primary transition-colors duration-500">
              {item.icon}
            </div>
          </div>
          <h3 className="font-heading text-4xl text-primary mb-6">{item.title}</h3>
          <p className="font-paragraph text-lg text-gray-600 leading-relaxed">
            {item.desc}
          </p>
        </div>
        <div className="relative h-[400px] md:h-auto overflow-hidden">
          <Image
            src={item.img}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
        </div>
      </div>
    </motion.div>
  );
}