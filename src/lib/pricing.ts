// Founding Member pricing: $29/mo for anyone who subscribes before the deadline.
// Stripe keeps existing subscriptions on the price they signed up with, so
// founding members stay at $29 for life after the switch.
// Keep FOUNDING_DEADLINE in sync with api/create-checkout.ts.

export const FOUNDING_DEADLINE = new Date('2026-10-23T05:00:00Z') // Thu Oct 22, 11:59 pm Central
export const FOUNDING_PRICE = 29
export const STANDARD_PRICE = 39

export function isFoundingWindow(now = new Date()): boolean {
  return now < FOUNDING_DEADLINE
}

export function currentPrice(now = new Date()): number {
  return isFoundingWindow(now) ? FOUNDING_PRICE : STANDARD_PRICE
}

export function foundingDaysLeft(now = new Date()): number {
  return Math.max(0, Math.ceil((FOUNDING_DEADLINE.getTime() - now.getTime()) / 86_400_000))
}
