import { useInView } from '@/components/scroll/Reveal';

const CARDS = [
  {
    title: 'Devis\néclair',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=200&h=200&fit=crop',
    description:
      'Des processus digitaux fluides, pensés pour délivrer une tarification instantanée et supprimer les blocages administratifs.',
  },
  {
    title: 'Contrats\nsur mesure',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=200&h=200&fit=crop',
    description:
      'Des garanties façonnées avec précision autour des complexités propres aux chantiers d’aujourd’hui.',
  },
  {
    title: 'Prévention\nactive des risques',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=200&h=200&fit=crop',
    description:
      'Un accompagnement dédié pour identifier les dangers et éviter les sinistres coûteux avant qu’ils ne surviennent.',
  },
];

const NAV_LINKS = ['Solutions', 'Secteurs', 'Ressources', 'Carrières'];

export default function Features() {
  const { ref, inView } = useInView<HTMLElement>();
  const anim = (cls: string) => (inView ? cls : 'opacity-0');

  return (
    <section ref={ref} className="relative min-h-screen w-full bg-white font-inter p-2 sm:p-3">
      <div
        className={`relative border border-neutral-200 rounded-sm p-1 sm:p-1 min-h-[calc(100vh-1rem)] sm:min-h-[calc(100vh-1.5rem)] ${anim(
          'animate-border-draw'
        )}`}
        style={{ animationDelay: '100ms' }}
      >
        <div className={`absolute -top-0.5 -left-0.5 w-1 h-1 bg-dark ${anim('animate-fade-in')}`} style={{ animationDelay: '500ms' }} />
        <div className={`absolute -top-0.5 -right-0.5 w-1 h-1 bg-dark ${anim('animate-fade-in')}`} style={{ animationDelay: '600ms' }} />
        <div className={`absolute -bottom-0.5 -left-0.5 w-1 h-1 bg-dark ${anim('animate-fade-in')}`} style={{ animationDelay: '700ms' }} />
        <div className={`absolute -bottom-0.5 -right-0.5 w-1 h-1 bg-dark ${anim('animate-fade-in')}`} style={{ animationDelay: '800ms' }} />

        <div
          className={`border border-dashed border-neutral-200 rounded-sm flex flex-col min-h-[calc(100vh-2rem)] sm:min-h-[calc(100vh-2.5rem)] ${anim(
            'animate-border-draw'
          )}`}
          style={{ animationDelay: '200ms' }}
        >
          <nav className="relative z-30 flex items-center justify-between px-5 sm:px-8 lg:px-12 border-b border-dashed border-neutral-200 min-h-[4rem] sm:min-h-[5.5rem]">
            <div className={`flex items-center gap-2 sm:gap-3 ${anim('animate-fade-up')}`} style={{ animationDelay: '350ms' }}>
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
                  className={`px-5 py-2.5 bg-black/5 rounded-sm text-[13px] font-medium uppercase tracking-[0.07em] text-black hover:bg-black/10 transition-colors ${anim(
                    'animate-fade-up'
                  )}`}
                  style={{ animationDelay: `${450 + i * 70}ms` }}
                >
                  {link}
                </a>
              ))}
            </div>

            <button
              className={`hidden md:inline-flex px-6 py-3.5 bg-dark rounded-sm text-white text-[13px] font-medium uppercase tracking-[0.07em] hover:bg-black transition-colors ${anim(
                'animate-fade-up'
              )}`}
              style={{ animationDelay: '750ms' }}
            >
              Demander un devis
            </button>
          </nav>

          <div className="flex-1 flex flex-col px-5 sm:px-8 lg:px-12 py-8 sm:py-10 lg:py-14">
            <h2
              className={`font-octosquares font-bold text-black uppercase leading-[1.05] text-center text-[clamp(1.4rem,4.5vw,3.2rem)] max-w-[48rem] mx-auto ${anim(
                'animate-fade-up'
              )}`}
              style={{ animationDelay: '500ms' }}
            >
              Une couverture évolutive conçue pour un secteur en mouvement
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mt-8 sm:mt-12 lg:mt-14 md:flex-1 md:min-h-0">
              {CARDS.map((card, i) => (
                <div
                  key={card.title}
                  className={`flex flex-col justify-between items-center rounded-sm p-5 sm:p-6 lg:p-7 min-h-[240px] sm:min-h-[280px] md:min-h-0 md:h-full ${anim(
                    'animate-scale-in'
                  )}`}
                  style={{ backgroundColor: '#F7F7F7', animationDelay: `${700 + i * 120}ms` }}
                >
                  <div className="flex items-start justify-between w-full">
                    <h3 className="font-octosquares font-bold text-black text-[13px] sm:text-[14px] uppercase leading-[1.3] tracking-[0.02em] whitespace-pre-line">
                      {card.title}
                    </h3>
                    <CardLogo />
                  </div>

                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-sm overflow-hidden flex-shrink-0">
                    <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                  </div>

                  <p className="text-black/70 text-[10px] sm:text-[11px] uppercase leading-[1.5] tracking-[0.03em] text-center max-w-[80%]">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>

            <p
              className={`mt-8 sm:mt-10 lg:mt-12 text-center text-black text-[10px] sm:text-[11px] font-semibold uppercase leading-[1.6] tracking-[0.05em] max-w-[26rem] mx-auto pb-4 ${anim(
                'animate-fade-up'
              )}`}
              style={{ animationDelay: '1100ms' }}
            >
              Nous offrons une assurance fiable qui permet aux professionnels de décider en confiance et de se développer sans hésiter.
            </p>
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

function CardLogo() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0 mt-0.5"
    >
      <rect x="16" y="2" width="18" height="15" rx="1" transform="rotate(45 16 2)" fill="#f59e0b" />
      <rect x="10" y="8" width="12" height="15" rx="1" transform="rotate(45 10 8)" fill="#f59e0b" />
    </svg>
  );
}
