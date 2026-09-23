import { ShoppingBag, Pill, Shirt, Star, ArrowUpRight } from 'lucide-react'

type Product = {
  name: string
  description: string
  price?: string
  href?: string
  badge?: string
  image?: string
}

const supplements: Product[] = [
  {
    name: 'Level-1 Protein',
    description: 'Sustained assimilation protein for lean muscle and recovery.',
    price: '$49.99',
    badge: 'Best Seller',
    href: 'https://1stphorm.com/products/level-1?a_aid=CTC',
  },
  {
    name: 'Phormula-1 Post-Workout',
    description: 'Rapid absorption protein — take within 30 min of training.',
    price: '$49.99',
    badge: 'Post-Workout',
    href: 'https://1stphorm.com/products/phormula-1?a_aid=CTC',
  },
  {
    name: 'Opti-Greens 50',
    description: 'Superfood greens blend for gut health and immune support.',
    price: '$49.99',
    href: 'https://1stphorm.com/products/opti-greens-50?a_aid=CTC',
  },
  {
    name: 'Ignition',
    description: 'Glycogen replenishment — pair with Phormula-1 post-workout.',
    price: '$39.99',
    href: 'https://1stphorm.com/products/ignition?a_aid=CTC',
  },
  {
    name: 'Mega Watt V2',
    description: 'High-performance pre-workout for focus and energy.',
    price: '$49.99',
    badge: 'Pre-Workout',
    href: 'https://1stphorm.com/products/megawatt-v2?a_aid=CTC',
  },
  {
    name: 'Full Mega',
    description: 'Omega-3 fish oil for joint health and recovery.',
    price: '$29.99',
    href: 'https://1stphorm.com/products/full-mega?a_aid=CTC',
  },
  {
    name: 'Micro Factor',
    description: 'Complete daily vitamin pack — everything your body needs.',
    price: '$74.99',
    badge: 'Coach Pick',
    href: 'https://1stphorm.com/products/micro-factor?a_aid=CTC',
  },
  {
    name: 'Bliss Go Pack',
    description: 'Fat burner stack for energy, focus, and thermogenesis.',
    price: '$49.99',
    href: 'https://1stphorm.com/products/bliss-go-pack?a_aid=CTC',
  },
]

const merch: Product[] = [
  {
    name: 'Discomfort = Growth Tee',
    description: 'CTC signature tee — Purpose · Strength · Mindset. EST. 2026.',
    badge: 'Coming Soon',
    image: '/merch-tee.webp',
  },
  {
    name: 'CTC Hat',
    description: 'Called to Compete performance hat — EST. 2026.',
    badge: 'Coming Soon',
    image: '/merch-hat.webp',
  },
  {
    name: '"Called." Hat',
    description: 'Script logo performance hat with cross detail — EST. 2026.',
    badge: 'Coming Soon',
    image: '/merch-hat2.webp',
  },
  {
    name: 'CTC Hoodie',
    description: 'Called to Compete heavyweight hoodie.',
    badge: 'Coming Soon',
  },
]

function ProductCard({ product, icon: Icon }: { product: Product; icon: typeof Pill }) {
  const hasLink = !!product.href
  const Tag = hasLink ? 'a' : 'div'
  const props = hasLink
    ? { href: product.href, target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <Tag
      {...(props as Record<string, string>)}
      className={`card-shine rounded-2xl bg-bg-card/80 border border-border block transition-all relative overflow-hidden ${
        hasLink ? 'hover:border-white/[0.06] active:scale-[0.98]' : ''
      }`}
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
      {product.image && (
        <div className="w-full aspect-[16/9] overflow-hidden rounded-t-2xl">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
      )}
      <div className={`flex items-start gap-3.5 p-4`}>
        <div className="w-11 h-11 rounded-xl bg-white/[0.04] flex items-center justify-center shrink-0">
          <Icon size={18} className="text-lime" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-display font-bold text-[15px] tracking-tight truncate">{product.name}</p>
            {product.badge && (
              <span className={`text-[8px] uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 font-bold ${
                product.badge === 'Coming Soon'
                  ? 'bg-white/[0.04] text-text-muted'
                  : product.badge === 'Coach Pick'
                    ? 'bg-cyan-400/10 text-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.1)]'
                    : 'bg-lime/10 text-lime'
              }`}>
                {product.badge}
              </span>
            )}
          </div>
          <p className="text-text-muted text-xs leading-relaxed">{product.description}</p>
          {product.price && (
            <div className="flex items-center justify-between mt-3">
              <p className="text-lime font-display font-bold text-[15px]">{product.price}</p>
              {hasLink && (
                <span className="text-[9px] uppercase tracking-wider text-text-muted flex items-center gap-1 bg-white/[0.04] px-2 py-1 rounded-lg">
                  Shop <ArrowUpRight size={10} />
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Tag>
  )
}

export default function Shop() {
  return (
    <div className="min-h-screen pb-28">
      <div className="sticky top-0 glass-heavy z-40 border-b border-border">
        <div className="px-5 pt-14 pb-3">
          <h1 className="font-display text-[26px] font-bold tracking-tight">Shop</h1>
          <p className="text-text-muted text-[9px] uppercase tracking-[0.25em]">CTC Recommended</p>
        </div>
      </div>

      <div className="px-5 pt-5">
        {/* Coach note */}
        <div className="animate-fade-in rounded-2xl bg-lime/[0.04] border border-lime/15 p-5 mb-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-lime/30 via-lime/10 to-transparent" />
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-lime/[0.04] rounded-full blur-[60px] pointer-events-none" />
          <div className="flex items-start gap-3 relative">
            <div className="w-10 h-10 rounded-xl bg-lime/10 flex items-center justify-center shrink-0">
              <Star size={17} className="text-lime drop-shadow-[0_0_8px_rgba(189,255,58,0.3)]" />
            </div>
            <div>
              <p className="text-lime font-display font-bold text-[15px] mb-1">Coach Tyler's Picks</p>
              <p className="text-text-muted text-xs leading-relaxed">
                These are the supplements I personally use and recommend. Quality matters — fuel right, perform right.
              </p>
            </div>
          </div>
        </div>

        {/* Merch */}
        <div className="animate-slide-up mb-7">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-7 h-7 rounded-lg bg-cyan-400/[0.08] flex items-center justify-center">
              <Shirt size={14} className="text-cyan-400" />
            </div>
            <p className="text-text-muted text-[9px] uppercase tracking-[0.25em] font-bold">CTC Merch</p>
          </div>
          <div className="space-y-2.5">
            {merch.map((product) => (
              <ProductCard key={product.name} product={product} icon={ShoppingBag} />
            ))}
          </div>
        </div>

        {/* Supplements */}
        <div className="animate-slide-up [animation-delay:100ms] opacity-0">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-7 h-7 rounded-lg bg-lime/[0.08] flex items-center justify-center">
              <Pill size={14} className="text-lime" />
            </div>
            <p className="text-text-muted text-[9px] uppercase tracking-[0.25em] font-bold">Supplements</p>
            <span className="text-text-muted text-[9px] ml-auto bg-white/[0.04] px-2 py-0.5 rounded-lg font-bold tracking-wider uppercase">1st Phorm</span>
          </div>
          <div className="space-y-2.5">
            {supplements.map((product) => (
              <ProductCard key={product.name} product={product} icon={Pill} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
