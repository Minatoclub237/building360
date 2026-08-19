import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = ['Solutions', 'Secteurs', 'Ressources', 'Carrières'];

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="relative min-h-screen w-full bg-gold font-inter overflow-hidden">
      <div
        className="absolute inset-2 sm:inset-3 border border-gold-dark rounded-sm pointer-events-none animate-border-draw"
        style={{ animationDelay: '100ms' }}
      />

      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-1 h-1 bg-dark animate-fade-in" style={{ animationDelay: '600ms' }} />
      <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-1 h-1 bg-dark animate-fade-in" style={{ animationDelay: '700ms' }} />
      <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 w-1 h-1 bg-dark animate-fade-in" style={{ animationDelay: '800ms' }} />
      <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-1 h-1 bg-dark animate-fade-in" style={{ animationDelay: '900ms' }} />

      <div
        className="absolute inset-3 sm:inset-4 border border-dashed border-gold-dark rounded-sm flex flex-col overflow-hidden min-h-0 animate-border-draw"
        style={{ animationDelay: '250ms' }}
      >
        <nav className="relative z-30 flex items-center justify-between px-5 sm:px-8 lg:px-12 border-b border-dashed border-gold-dark min-h-[4rem] sm:min-h-[5.5rem]">
          <div className="flex items-center gap-2 sm:gap-3 animate-fade-up" style={{ animationDelay: '400ms' }}>
            <LogoMark />
            <span className="font-octosquares font-medium text-lg sm:text-[22px] text-black tracking-tight">
              Building360
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link}
                href="#"
                className="px-5 py-2.5 bg-black/5 rounded-sm text-[13px] font-medium uppercase tracking-[0.07em] text-black hover:bg-black/10 transition-colors animate-fade-up"
                style={{ animationDelay: `${500 + i * 80}ms` }}
              >
                {link}
              </a>
            ))}
          </div>

          <button
            className="hidden md:inline-flex px-6 py-3.5 bg-dark rounded-sm text-gold text-[13px] font-medium uppercase tracking-[0.07em] hover:bg-black transition-colors animate-fade-up"
            style={{ animationDelay: '820ms' }}
          >
            Demander un devis
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Ouvrir le menu"
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-sm bg-black/5 hover:bg-black/10 transition-colors animate-fade-in"
            style={{ animationDelay: '500ms' }}
          >
            <div className="relative w-5 h-5">
              <Menu
                size={20}
                className={`absolute inset-0 transition-all duration-300 ${
                  menuOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
                }`}
              />
              <X
                size={20}
                className={`absolute inset-0 transition-all duration-300 ${
                  menuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'
                }`}
              />
            </div>
          </button>
        </nav>

        <div
          className={`md:hidden absolute inset-0 top-[4rem] sm:top-[5.5rem] z-20 bg-gold flex flex-col transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            menuOpen
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <div className="flex flex-col px-5 sm:px-8 pt-8 gap-2">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link}
                href="#"
                className={`px-5 py-4 bg-black/5 rounded-sm text-[14px] font-medium uppercase tracking-[0.07em] text-black hover:bg-black/10 transition-all duration-400 ${
                  menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                }`}
                style={{ transitionDelay: menuOpen ? `${80 + i * 50}ms` : '0ms' }}
              >
                {link}
              </a>
            ))}
          </div>
          <div className="px-5 sm:px-8 mt-6">
            <button
              className={`inline-flex px-6 py-4 bg-dark rounded-sm text-gold text-[13px] font-medium uppercase tracking-[0.07em] hover:bg-black transition-all duration-400 ${
                menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
              style={{ transitionDelay: menuOpen ? `${80 + NAV_LINKS.length * 50}ms` : '0ms' }}
            >
              Demander un devis
            </button>
          </div>
        </div>

        <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-2 min-h-0">
          <div className="flex flex-col justify-between px-5 sm:px-8 lg:px-12 pt-6 sm:pt-10 lg:pt-14 pb-6 sm:pb-12">
            <h1 className="font-octosquares font-bold text-black uppercase leading-[0.9] select-none">
              <span
                className="block text-[clamp(1.8rem,7vw,5.5rem)] animate-fade-up"
                style={{ animationDelay: '500ms' }}
              >
                Éliminer
              </span>
              <span
                className="block text-[clamp(1.8rem,7vw,5.5rem)] mt-2 sm:mt-3 animate-fade-up"
                style={{ animationDelay: '620ms' }}
              >
                les frictions
              </span>
              <span
                className="block text-[clamp(1.8rem,7vw,5.5rem)] mt-2 sm:mt-3 animate-fade-up"
                style={{ animationDelay: '740ms' }}
              >
                du risque
              </span>
            </h1>

            <div className="mt-6 lg:mt-0">
              <p
                className="max-w-[26rem] text-black text-[14px] sm:text-[15px] font-medium uppercase leading-[1.4] tracking-[0.04em] animate-fade-up"
                style={{ animationDelay: '900ms' }}
              >
                L&apos;assurance nouvelle génération pour les bâtisseurs et les entreprises qui construisent les infrastructures de demain.
              </p>
              <button
                className="inline-flex mt-5 sm:mt-6 px-6 py-3.5 bg-dark rounded-sm text-gold text-[13px] font-medium uppercase tracking-[0.07em] hover:bg-black transition-colors animate-fade-up"
                style={{ animationDelay: '1050ms' }}
              >
                Demander un devis
              </button>
            </div>
          </div>

          <div
            className="flex border-t lg:border-t-0 lg:border-l border-dashed border-gold-dark p-2 animate-scale-in"
            style={{ animationDelay: '600ms' }}
          >
            <video autoPlay muted loop playsInline className="w-full h-full object-cover rounded-sm">
              <source
                src="/hero.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}

function LogoMark() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      <rect x="16" y="2" width="18" height="15" rx="1" transform="rotate(45 16 2)" fill="#080808" />
      <rect x="10" y="8" width="12" height="15" rx="1" transform="rotate(45 10 8)" fill="#080808" />
    </svg>
  );
}
