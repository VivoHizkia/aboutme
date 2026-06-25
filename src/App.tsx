import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, ArrowRight, Terminal, Moon, Sun, Code, Sparkles, Star, GitFork, Zap } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

const STACK = [
  { name: 'HTML', category: 'Language', featured: true },
  { name: 'CSS', category: 'Language', featured: true },
  { name: 'JavaScript', category: 'Language', featured: true },
  { name: 'TypeScript', category: 'Language', featured: true },
  { name: 'PHP', category: 'Language', featured: true },
  { name: 'Java', category: 'Language', featured: false },
  { name: 'C++', category: 'Language', featured: false },
  { name: 'Python', category: 'Language', featured: false },
  
  { name: 'React.js', category: 'Frontend Framework', featured: true },
  { name: 'Vue.js', category: 'Frontend Framework', featured: true },
  { name: 'Next.js', category: 'Frontend Framework', featured: true },
  { name: 'Ionic', category: 'Frontend Framework', featured: false },
  { name: 'Tailwind CSS', category: 'Styling', featured: true },
  
  { name: 'Laravel', category: 'Backend Framework', featured: true },
  { name: 'Express.js', category: 'Backend Framework', featured: true },
  
  { name: 'MySQL', category: 'Database', featured: true },
  { name: 'MongoDB', category: 'Database', featured: true },
  
  { name: 'Visual Studio Code', category: 'Dev Tool', featured: true },
  { name: 'Android Studio', category: 'Dev Tool', featured: false },
  { name: 'Unity', category: 'Dev Tool', featured: false },
  { name: 'Git', category: 'Dev Tool', featured: true },
  { name: 'GitHub', category: 'Dev Tool', featured: true },
  { name: 'Docker', category: 'Dev Tool', featured: false },
  
  { name: 'Kotlin', category: 'Mobile Development', featured: false },
  
  { name: 'React Native', category: 'Cross-Platform', featured: false },
  
  { name: 'Machine Learning', category: 'Other Skills', featured: false },
];

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
}

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
        backdropFilter: 'blur(20px)',
      }}
      className="fixed top-0 w-full z-50 border-b border-border/0"
      initial={{ borderColor: 'rgba(38, 38, 38, 0)' }}
      animate={{ borderColor: scrollY.get() > 50 ? 'var(--border)' : 'rgba(38, 38, 38, 0)' }}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <button onClick={() => scrollTo('hero')} className="text-2xl font-black tracking-tight hover:text-accent transition-all duration-300 cursor-pointer flex items-center gap-3 group">
          <div className="p-2 bg-accent/10 border border-accent/30 rounded-lg group-hover:bg-accent/20 transition-all duration-300">
            <Code className="w-6 h-6 text-accent" />
          </div>
          vivo<span className="text-accent">.dev</span>
        </button>
        <div className="flex items-center gap-8">
          {['Stack', 'Projects', 'Contact'].map((item) => (
            <button 
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className="text-base font-semibold text-muted-foreground hover:text-foreground transition-all duration-300 cursor-pointer relative group"
            >
              {item}
              <span className="absolute -bottom-2 left-0 w-0 h-1 bg-accent rounded-full group-hover:w-full transition-all duration-300" />
            </button>
          ))}
          <button
            onClick={toggleTheme}
            className="p-3 border-2 border-border hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-300 rounded-xl"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-6 h-6" />
            ) : (
              <Moon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.61, 0.35, 1] }}
    >
      {children}
    </motion.div>
  );
};

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center pt-24 pb-32 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-[0.06]" 
             style={{ 
               backgroundImage: 'linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)', 
               backgroundSize: '50px 50px'
             }} 
        />
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[28rem] h-[28rem] bg-accent/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1], 
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[24rem] h-[24rem] bg-accent/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.4, 1], 
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>
      
      {/* Floating shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={cn(
              "absolute rounded-full",
              i % 3 === 0 ? "w-4 h-4 bg-accent" :
              i % 3 === 1 ? "w-3 h-3 bg-accent/70" : "w-5 h-2 bg-accent/50"
            )}
            initial={{ 
              x: `${10 + Math.random() * 80}%`,
              y: `${10 + Math.random() * 80}%`,
              opacity: 0.4,
              rotate: 0
            }}
            animate={{ 
              y: [null, `calc(${10 + Math.random() * 80}% - 60px)`],
              opacity: [0.4, 1, 0.4],
              scale: [1, 2.5, 1],
              rotate: [0, 270, 360]
            }}
            transition={{ 
              duration: 5 + Math.random() * 8, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: i * 0.4
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <Reveal>
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 border-2 border-accent/30 bg-accent/10 rounded-xl">
              <Zap className="w-8 h-8 text-accent fill-accent/20" />
            </div>
            <p className="font-mono text-accent text-base tracking-widest">
              FULL-STACK ENGINEER • JAKARTA, INDONESIA
            </p>
          </div>
        </Reveal>
        
        <Reveal delay={0.2}>
          <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-black leading-[0.82] mb-12 tracking-tighter">
            <span className="text-accent relative inline-block">
              Vivo
              <motion.span 
                className="absolute -bottom-4 left-0 w-full h-3 bg-accent/40 rounded-full"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '100%', opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.8 }}
              />
            </span>
            <br />
            <span className="text-foreground">Hizkia</span>
          </h1>
        </Reveal>
        
        <Reveal delay={0.4}>
          <p className="text-2xl md:text-3xl text-muted-foreground max-w-4xl mb-16 leading-relaxed">
            Crafting pixel-perfect digital experiences with strong types, blazing-fast runtimes, and a little dash of perfectionism.
          </p>
        </Reveal>
        
        <Reveal delay={0.6}>
          <div className="flex flex-col sm:flex-row gap-6 mb-28">
            <button 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center justify-center gap-4 bg-accent text-accent-foreground px-12 py-6 font-black text-2xl hover:scale-[1.03] hover:shadow-[0_0_50px_rgba(74,227,160,0.3)] transition-all duration-300 rounded-2xl relative overflow-hidden"
            >
              <span className="relative z-10">Explore My Work</span>
              <ArrowRight className="w-8 h-8 group-hover:translate-x-3 transition-transform duration-300" />
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center justify-center gap-4 border-2 border-border text-foreground px-12 py-6 font-black text-2xl hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-300 rounded-2xl"
            >
              Let's Connect
              <Mail className="w-7 h-7 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
        </Reveal>
        
        <Reveal delay={0.8}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-border pt-12">
            {[
              { label: 'Years Experience', value: '3+', icon: Code },
              { label: 'Projects Completed', value: '20+', icon: Sparkles },
              { label: 'Coffee Brewed', value: '∞', icon: Terminal }
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                className="flex flex-col gap-4 p-8 border-2 border-border rounded-2xl hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 group"
                whileHover={{ y: -12, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <stat.icon className="w-12 h-12 text-accent group-hover:scale-125 transition-transform duration-300" />
                <span className="text-5xl font-black text-foreground">{stat.value}</span>
                <span className="font-mono text-muted-foreground text-sm uppercase tracking-widest">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const Stack = () => {
  return (
    <section id="stack" className="py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="mb-16">
            <h2 className="text-6xl font-black mb-4 flex items-center gap-4">
              Tech Stack
              <Sparkles className="w-10 h-10 text-accent" />
            </h2>
            <p className="text-2xl text-muted-foreground font-mono">// The tools I use daily</p>
          </div>
        </Reveal>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {STACK.map((tech, idx) => (
            <Reveal key={tech.name} delay={idx * 0.1}>
              <motion.div
                whileHover={{ y: -8, scale: 1.03 }}
                className={cn(
                  "group p-8 border-2 border-border rounded-2xl relative overflow-hidden transition-all duration-300",
                  tech.featured && "border-accent/30 bg-accent/5"
                )}
              >
                <div className="absolute top-6 right-6 w-4 h-4 rounded-full bg-muted-foreground group-hover:bg-accent transition-all duration-300 scale-75 group-hover:scale-100" />
                
                <div className="flex flex-col gap-3">
                  <span className={cn(
                    "text-3xl font-black",
                    tech.featured ? "text-accent" : "text-foreground"
                  )}>
                    {tech.name}
                  </span>
                  <span className="text-muted-foreground font-mono text-sm uppercase tracking-widest">
                    {tech.category}
                  </span>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = ({ repos, loading, error }: { repos: GitHubRepo[], loading: boolean, error: string | null }) => {
  return (
    <section id="projects" className="py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="mb-16">
            <h2 className="text-6xl font-black mb-4 flex items-center gap-4">
              GitHub Projects
              <Code className="w-10 h-10 text-accent" />
            </h2>
            <p className="text-2xl text-muted-foreground font-mono">// All my open-source projects</p>
          </div>
        </Reveal>
        
        {loading && (
          <Reveal>
            <div className="flex justify-center items-center py-24">
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-accent border-t-transparent"></div>
            </div>
          </Reveal>
        )}
        
        {error && (
          <Reveal>
            <div className="text-center py-24 text-muted-foreground">
              <p className="text-2xl">{error}</p>
            </div>
          </Reveal>
        )}
        
        {!loading && !error && repos.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {repos
              .filter(repo => repo.name.toLowerCase() !== "aboutme")
              .map((repo, idx) => (
              <Reveal key={repo.id} delay={idx * 0.08}>
                <motion.a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -12, scale: 1.02 }}
                  className="group relative border-2 border-border p-8 flex flex-col hover:border-accent/30 transition-all duration-300 rounded-2xl"
                >
                  <div className="flex justify-between items-start mb-8">
                    <span className="font-mono text-muted-foreground text-lg font-bold">{String(idx + 1).padStart(2, '0')}</span>
                    <ExternalLink className="w-7 h-7 text-muted-foreground group-hover:text-accent group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-300" />
                  </div>
                  
                  <h3 className="text-3xl font-black mb-4 group-hover:text-accent transition-colors duration-300">
                    {repo.name}
                  </h3>
                  
                  <p className="text-muted-foreground text-lg mb-8 flex-grow leading-relaxed">
                    {repo.description || 'No description available'}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 mt-auto">
                    {repo.language && (
                      <span className="flex items-center gap-2 text-sm font-mono text-muted-foreground border-2 border-border px-4 py-2 rounded-xl">
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-2 text-sm font-mono text-muted-foreground border-2 border-border px-4 py-2 rounded-xl">
                      <Star className="w-4 h-4" />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-2 text-sm font-mono text-muted-foreground border-2 border-border px-4 py-2 rounded-xl">
                      <GitFork className="w-4 h-4" />
                      {repo.forks_count}
                    </span>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 w-0 h-2 bg-accent rounded-t-xl group-hover:w-full transition-all duration-400 ease-out" />
                </motion.a>
              </Reveal>
            ))}
          </div>
        )}
        
        {!loading && !error && repos.length === 0 && (
          <Reveal>
            <div className="text-center py-24 text-muted-foreground">
              <p className="text-2xl">No repositories found</p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="bg-background border-2 border-border p-16 md:p-24 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent opacity-10 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent opacity-5 blur-3xl" />
            
            <div className="relative z-10">
              <h2 className="text-6xl md:text-7xl font-black mb-8 leading-tight">
                Let's build something <br />
                <span className="text-accent">amazing</span>.
              </h2>
              
              <p className="text-2xl text-muted-foreground max-w-3xl mb-12 leading-relaxed">
                Open to interesting engineering roles, freelance collaborations, and deep conversations about AI-assisted development.
              </p>
              
              <div className="flex flex-wrap gap-6 mb-16">
                <a 
                  href="mailto:vivoimanuel22@gmail.com" 
                  className="flex items-center gap-4 bg-accent text-accent-foreground px-10 py-5 font-black text-xl hover:scale-[1.05] hover:shadow-2xl hover:shadow-accent/30 transition-all duration-300 rounded-2xl"
                >
                  <Mail className="w-7 h-7" />
                  vivoimanuel22@gmail.com
                </a>
              </div>
              
              <div className="flex gap-8">
                <a href="https://github.com/VivoHizkia" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-accent hover:scale-110 transition-all duration-300 text-2xl font-semibold">
                  <Github className="w-8 h-8" />
                  <span className="hidden sm:inline">GitHub</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-muted-foreground hover:text-accent hover:scale-110 transition-all duration-300 text-2xl font-semibold">
                  <Linkedin className="w-8 h-8" />
                  <span className="hidden sm:inline">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-muted-foreground font-mono text-lg">
          © 2025 Vivo — Built with TypeScript & good vibes.
        </p>
        <div className="flex items-center gap-3 text-muted-foreground">
          <Terminal className="w-6 h-6" />
          <span className="font-mono text-sm">v1.0.0</span>
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
  
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
  
  useEffect(() => {
    // Fetch GitHub repos
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/VivoHizkia/repos?sort=updated&per_page=100');
        if (!response.ok) throw new Error('Failed to fetch repos');
        const data = await response.json();
        setRepos(data);
      } catch (err) {
        setError('Failed to load repositories');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRepos();
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={cn("min-h-screen bg-background text-foreground selection:bg-accent selection:text-accent-foreground transition-colors duration-500", theme === 'dark' ? 'dark' : '')}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Stack />
        <Projects repos={repos} loading={loading} error={error} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
