import { ExternalLink, ShoppingBag, Pill, Shirt, Star } from 'lucide-react'

type Product = {
  name: string
  description: string
  price?: string
  href?: string
  badge?: string
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
    name: 'CTC Performance Tee',
    description: 'Compete Harder · Train Smarter · Feel Better',
    badge: 'Coming Soon',
  },
  {
    name: 'CTC Hoodie',
    description: 'Called to Compete heavyweight hoodie.',
    badge: 'Coming Soon',
  },
  {
    name: 'CTC Shaker Bottle',
    description: 'Branded 28oz shaker for your daily shake.',
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
      className={`rounded-2xl bg-bg-card border border-border p-4 block transition-all ${
        hasLink ? 'hover:border-lime/20 active:scale-[0.98]' : 'opacity-70'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-xl bg-bg-elevated flex items-center justify-center shrink-0">
          <Icon size={20} className="text-lime" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-display font-bold text-sm tracking-tight truncate">{product.name}</p>
            {product.badge && (
              <span className={`text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-full shrink-0 font-bold ${
                product.badge === 'Coming Soon'
                  ? 'bg-bg-elevated text-text-muted'
                  : product.badge === 'Coach Pick'
                    ? 'bg-cyan-400/10 text-cyan-400'
                    : 'bg-lime/10 text-lime'
              }`}>
                {product.badge}
              </span>
            )}
          </div>
          <p className="text-text-muted text-xs leading-relaxed">{product.description}</p>
          {product.price && (
            <div className="flex items-center justify-between mt-2">
              <p className="text-lime font-display font-bold text-sm">{product.price}</p>
              {hasLink && (
                <span className="text-[9px] uppercase tracking-wider text-text-muted flex items-center gap-1">
                  Shop <ExternalLink size={10} />
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
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-bg/90 backdrop-blur-xl z-40 border-b border-border">
        <div className="px-5 pt-12 pb-3">
          <h1 className="font-display text-2xl font-bold tracking-tight">Shop</h1>
          <p className="text-text-muted text-[10px] uppercase tracking-[0.2em]">CTC Recommended</p>
        </div>
      </div>

      <div className="px-5 pt-4">
        {/* Coach note */}
        <div className="animate-fade-in rounded-2xl bg-lime/5 border border-lime/20 p-4 mb-5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-lime/5 to-transparent pointer-events-none" />
          <div className="flex items-start gap-3 relative">
            <div className="w-10 h-10 rounded-xl bg-lime/10 flex items-center justify-center shrink-0">
              <Star size={18} className="text-lime" />
            </div>
            <div>
              <p className="text-lime font-display font-bold text-sm mb-0.5">Coach Tyler's Picks</p>
              <p className="text-text-secondary text-xs leading-relaxed">
                These are the supplements I personally use and recommend. Quality matters — fuel right, perform right.
              </p>
            </div>
          </div>
        </div>

        {/* Merch */}
        <div className="animate-slide-up mb-6">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-400/10 flex items-center justify-center">
              <Shirt size={16} className="text-cyan-400" />
            </div>
            <p className="text-text-muted text-[10px] uppercase tracking-[0.2em] font-bold">CTC Merch</p>
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
            <div className="w-8 h-8 rounded-lg bg-lime/10 flex items-center justify-center">
              <Pill size={16} className="text-lime" />
            </div>
            <p className="text-text-muted text-[10px] uppercase tracking-[0.2em] font-bold">Supplements</p>
            <span className="text-text-muted text-[10px] ml-auto bg-bg-elevated px-2 py-0.5 rounded-md font-medium">1st Phorm</span>
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
