import { ArrowLeft, ExternalLink, ShoppingBag, Pill, Shirt, Tag } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

type Product = {
  name: string
  description: string
  image?: string
  href?: string
  price?: string
  badge?: string
}

const supplements: Product[] = [
  {
    name: 'Level-1 Protein',
    description: 'Sustained assimilation protein for lean muscle and recovery.',
    badge: 'Best Seller',
  },
  {
    name: 'Phormula-1 Post-Workout',
    description: 'Rapid absorption protein — take within 30 min of training.',
    badge: 'Post-Workout',
  },
  {
    name: 'Opti-Greens 50',
    description: 'Superfood greens blend for gut health and immune support.',
  },
  {
    name: 'Ignition',
    description: 'Glycogen replenishment — pair with Phormula-1 post-workout.',
  },
  {
    name: 'Mega Watt V2',
    description: 'High-performance pre-workout for focus and energy.',
    badge: 'Pre-Workout',
  },
  {
    name: 'Full Mega',
    description: 'Omega-3 fish oil for joint health and recovery.',
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
      className={`rounded-2xl bg-bg-card border border-border p-4 block ${
        hasLink ? 'hover:border-lime/30 transition-colors' : 'opacity-80'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl bg-bg-elevated flex items-center justify-center shrink-0">
          <Icon size={22} className="text-lime" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-display font-semibold text-sm truncate">{product.name}</p>
            {product.badge && (
              <span className={`text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-full shrink-0 ${
                product.badge === 'Coming Soon'
                  ? 'bg-bg-elevated text-text-muted'
                  : 'bg-lime/10 text-lime'
              }`}>
                {product.badge}
              </span>
            )}
          </div>
          <p className="text-text-muted text-xs leading-relaxed">{product.description}</p>
          {product.price && (
            <p className="text-lime font-display font-bold text-sm mt-2">{product.price}</p>
          )}
        </div>
        {hasLink && (
          <ExternalLink size={14} className="text-text-muted shrink-0 mt-1" />
        )}
      </div>
    </Tag>
  )
}

export default function Shop() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen pb-24 px-5 pt-14">
      <div className="animate-fade-in mb-6">
        <div className="flex items-center gap-3 mb-1">
          <button onClick={() => navigate(-1)} className="text-text-secondary hover:text-text transition-colors">
            <ArrowLeft size={22} />
          </button>
          <div>
            <p className="text-text-secondary text-xs uppercase tracking-wider">CTC</p>
            <h1 className="font-display text-2xl font-bold">Shop</h1>
          </div>
        </div>
      </div>

      {/* Coach note */}
      <div className="animate-slide-up rounded-2xl bg-lime/5 border border-lime/20 p-4 mb-6">
        <p className="text-sm leading-relaxed">
          <span className="text-lime font-display font-semibold">Coach Tyler's picks.</span>{' '}
          <span className="text-text-secondary">These are the supplements I use and recommend to every CTC athlete. Quality matters — fuel right, perform right.</span>
        </p>
      </div>

      {/* Supplements */}
      <div className="animate-slide-up [animation-delay:100ms] opacity-0 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Pill size={18} className="text-lime" />
          <p className="font-display font-semibold">Supplements</p>
          <span className="text-text-muted text-xs ml-auto">1st Phorm</span>
        </div>
        <div className="space-y-3">
          {supplements.map((product) => (
            <ProductCard key={product.name} product={product} icon={Pill} />
          ))}
        </div>
      </div>

      {/* Merch */}
      <div className="animate-slide-up [animation-delay:200ms] opacity-0">
        <div className="flex items-center gap-2 mb-3">
          <Shirt size={18} className="text-sky-400" />
          <p className="font-display font-semibold">CTC Merch</p>
        </div>
        <div className="space-y-3">
          {merch.map((product) => (
            <ProductCard key={product.name} product={product} icon={ShoppingBag} />
          ))}
        </div>
      </div>
    </div>
  )
}
