import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, ArrowRight, Terminal, Moon, Sun, Code, Sparkles } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

const STACK = [
  { name: 'TypeScript', category: 'Language', featured: true },
  { name: 'Bun', category: 'Runtime', featured: true },
  { name: 'Prisma ORM', category: 'Database', featured: true },
  { name: 'React', category: 'Frontend', featured: true },
  { name: 'Vite', category: 'Bundler', featured: true },
  { name: 'Tailwind CSS', category: 'Styling', featured: true },
  { name: 'shadcn/ui', category: 'Components', featured: false },
  { name: 'Claude / Copilot', category: 'AI Workflow', featured: false },
  { name: 'Cursor', category: 'Editor', featured: false },
];

const PROJECTS = [
  {
    id: 1,
    number: '01',
    name: 'invosync',
    description: 'Internal invoice management system for MobileData Indonesia. Full-stack with TypeScript, Bun, Prisma, React + Vite.',
    tags: ['TypeScript', 'Bun', 'Prisma', 'React'],
    link: 'https://github.com/MobileDataIndonesia/invoice-internal-be',
  },
  {
    id: 2,
    number: '02',
    name: 'Project TBA',
    description: 'Coming soon. Something cool with AI agents.',
    tags: ['Work in Progress'],
    link: '#',
  },
  {
    id: 3,
    number: '03',
    name: 'Project TBA',
    description: 'Coming soon. Something with distributed systems.',
    tags: ['Design Phase'],
    link: '#',
  },
];

const Navbar = ({ theme, toggleTheme }: { theme: 'dark' | 'light'; toggleTheme: () => void }) => {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 50], [0, 1]);
  
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav 
      style={{ 
        backgroundColor: bgOpacity, 
        backdropFilter: 'blur(12px)',
      }}
      className="fixed top-0 w-full z-50 border-b border-border/0"
      initial={{ borderColor: 'rgba(38, 38, 38, 0)' }}
      animate={{ borderColor: scrollY.get() > 50 ? 'var(--border)' : 'rgba(38, 38, 38, 0)' }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={() => scrollTo('hero')} className="text-xl font-bold tracking-tight hover:text-accent transition-colors cursor-pointer flex items-center gap-2">
          <Code className="w-5 h-5 text-accent" />
          vivo<span className="text-accent">.dev</span>
        </button>
        <div className="flex items-center gap-6">
          {['Stack', 'Projects', 'Contact'].map((item) => (
            <button 
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
            </button>
          ))}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-[3px] border border-border hover:border-accent hover:text-accent transition-all duration-300"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center pt-16 pb-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.03]" 
           style={{ 
             backgroundImage: 'linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)', 
             backgroundSize: '100px 100px'
           }} 
      />
      
      {/* Creative floating elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-accent rounded-full"
            initial={{ 
              x: `${Math.random() * 100}%`, 
              y: `${Math.random() * 100}%`,
              opacity: 0.3
            }}
            animate={{ 
              y: [null, `calc(${Math.random() * 100}% - 20px)`],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{ 
              duration: 3 + Math.random() * 4, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-accent" />
            <p className="font-mono text-accent text-sm tracking-widest">
              FULL-STACK ENGINEER // JAKARTA, ID
            </p>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] mb-8 tracking-tighter">
            <span className="text-accent relative inline-block">
              Vivo
              <motion.span 
                className="absolute -bottom-2 left-0 w-full h-1 bg-accent"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </span>
            <br />
            <span className="text-foreground">Hizkia</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12 leading-relaxed">
            Building digital infrastructure with strong types, fast runtimes, and a bit of obsessive-compulsive organization.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-20">
            <button 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center justify-center gap-2 bg-accent text-accent-foreground px-8 py-4 font-semibold text-lg hover:scale-105 transition-all rounded-[3px] shadow-lg hover:shadow-accent/20"
            >
              View Projects
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center justify-center gap-2 border border-border text-foreground px-8 py-4 font-semibold text-lg hover:border-accent hover:text-accent transition-colors rounded-[3px]"
            >
              Get In Touch
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-border pt-8">
            {[
              { label: 'Years Experience', value: '2+' },
              { label: 'Projects Shipped', value: '15+' },
              { label: 'Coffee Consumed', value: '∞' }
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                className="flex flex-col gap-1 p-4 border border-border rounded-[3px] hover:border-accent/50 hover:bg-accent/5 transition-all"
                whileHover={{ y: -4 }}
              >
                <span className="font-mono text-muted-foreground text-xs uppercase tracking-wider">{stat.label}</span>
                <span className="text-3xl font-bold text-foreground">{stat.value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Stack = () => {
  return (
    <section id="stack" className="py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-2 flex items-center gap-3">
            Tech Stack
            <Sparkles className="w-6 h-6 text-accent" />
          </h2>
          <p className="text-muted-foreground font-mono text-sm">// The tools I use daily</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {STACK.map((tech, idx) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className={cn(
                "group p-6 border border-border rounded-[3px] relative overflow-hidden transition-all",
                tech.featured && "border-accent/30 bg-accent/5"
              )}
            >
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-muted-foreground group-hover:bg-accent transition-colors duration-300" />
              
              <div className="flex flex-col gap-1">
                <span className={cn(
                  "text-xl font-bold",
                  tech.featured ? "text-accent" : "text-foreground"
                )}>
                  {tech.name}
                </span>
                <span className="text-muted-foreground font-mono text-xs uppercase">
                  {tech.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-2 flex items-center gap-3">
            Selected Work
            <Code className="w-6 h-6 text-accent" />
          </h2>
          <p className="text-muted-foreground font-mono text-sm">// A curated list of things I've built</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, idx) => (
            <motion.a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative border border-border p-6 flex flex-col hover:border-accent/50 transition-all rounded-[3px]"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="font-mono text-muted-foreground text-sm">{project.number}</span>
                <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
              
              <h3 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                {project.name}
              </h3>
              
              <p className="text-muted-foreground mb-6 flex-grow">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs font-mono text-muted-foreground border border-border px-2 py-1 rounded-[2px]">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-accent group-hover:w-full transition-all duration-300 ease-out" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-background border border-border p-12 md:p-20 rounded-[3px] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-10 blur-3xl" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Let's build something <br />
              <span className="text-accent">together</span>.
            </h2>
            
            <p className="text-muted-foreground text-lg max-w-2xl mb-10">
              Open to interesting engineering roles, freelance collaborations, and conversations about AI-assisted development.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-12">
              <a 
                href="mailto:vivoimanuel22@gmail.com" 
                className="flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 font-bold hover:scale-105 transition-all rounded-[3px] shadow-lg"
              >
                <Mail className="w-4 h-4" />
                vivoimanuel22@gmail.com
              </a>
            </div>
            
            <div className="flex gap-6">
              <a href="https://github.com/VivoHizkia" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-accent transition-colors flex items-center gap-2 text-lg">
                <Github className="w-5 h-5" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors flex items-center gap-2 text-lg">
                <Linkedin className="w-5 h-5" />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-muted-foreground font-mono text-sm">
          © 2025 Vivo — Built with TypeScript & good vibes.
        </p>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Terminal className="w-4 h-4" />
          <span className="font-mono text-xs">v1.0.0</span>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light';
    if (savedTheme) return savedTheme;
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    // Apply theme to document
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    // Save to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={cn("min-h-screen bg-background text-foreground selection:bg-accent selection:text-accent-foreground", theme === 'dark' ? 'dark' : '')}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Stack />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
