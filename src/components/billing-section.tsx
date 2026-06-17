'use client'

import { Check } from 'lucide-react'

interface BillingSectionProps {
  currentPlan?: 'free' | 'professional' | 'enterprise'
  billingCycleEnd?: Date
}

export function BillingSection({
  currentPlan = 'free',
  billingCycleEnd,
}: BillingSectionProps) {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      features: [
        'Up to 100 leads',
        '1 team member',
        'Basic analytics',
        'Email support',
      ],
      current: currentPlan === 'free',
    },
    {
      name: 'Professional',
      price: '$99',
      period: '/month',
      features: [
        'Up to 5,000 leads',
        '5 team members',
        'Advanced analytics',
        'Priority support',
        'Custom integrations',
      ],
      current: currentPlan === 'professional',
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      features: [
        'Unlimited leads',
        'Unlimited team members',
        'Custom analytics',
        '24/7 support',
        'Dedicated account manager',
      ],
      current: currentPlan === 'enterprise',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Current plan info */}
      <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
        <p className="text-[12px] font-semibold text-blue-900">Current Plan</p>
        <p className="text-[13px] text-blue-800 mt-1 capitalize">{currentPlan} Plan</p>
        {billingCycleEnd && (
          <p className="text-[11px] text-blue-700 mt-1">
            Next billing date:{' '}
            {new Intl.DateTimeFormat('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }).format(billingCycleEnd)}
          </p>
        )}
      </div>

      {/* Plans grid */}
      <div className="grid grid-cols-3 gap-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-lg border p-6 transition-all ${
              plan.current
                ? 'border-[#635bff] bg-blue-50'
                : 'border-[#e3e8ee] hover:border-[#635bff]'
            }`}
          >
            <h3 className="text-[14px] font-semibold text-[#0a2540]">{plan.name}</h3>
            <div className="mt-2">
              <span className="text-2xl font-bold text-[#0a2540]">{plan.price}</span>
              {plan.period && <span className="text-[12px] text-[#8898aa]">{plan.period}</span>}
            </div>

            <ul className="mt-4 space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-[12px] text-[#425466]">{feature}</span>
                </li>
              ))}
            </ul>

            {!plan.current && (
              <button
                className="w-full mt-4 px-4 py-2.5 rounded-lg border border-[#635bff] text-[#635bff] text-[13px] font-semibold hover:bg-blue-50 transition-colors"
                disabled
              >
                {plan.name === 'Enterprise' ? 'Contact Sales' : 'Upgrade'}
              </button>
            )}
            {plan.current && (
              <div className="w-full mt-4 px-4 py-2.5 rounded-lg bg-[#635bff] text-white text-[13px] font-semibold text-center">
                Current Plan
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Payment methods */}
      <div className="p-4 rounded-lg bg-[#f6f9fc] border border-[#e3e8ee]">
        <p className="text-[13px] font-semibold text-[#0a2540] mb-3">Payment Method</p>
        <p className="text-[12px] text-[#8898aa]">
          No payment method on file. Add one to upgrade your plan.
        </p>
      </div>
    </div>
  )
}
