import { useState, useCallback } from 'react'

// Stripe integration configuration
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://qseqzrgtrrtlnpstlhwa.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzZXF6cmd0cnJ0bG5wc3RsaHdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwNjA2OTksImV4cCI6MjA4NTYzNjY5OX0.xSDtp3tDwInM39vDAoD1dSVdx2rZ8Ok-zIKqjjm0OGI'
const STRIPE_STARTER_PRICE_ID = import.meta.env.VITE_STRIPE_STARTER_PRICE_ID || 'price_1SS3H2BqWf8SabvTPbEUHfLN'
const STRIPE_PROFESSIONAL_PRICE_ID = import.meta.env.VITE_STRIPE_PROFESSIONAL_PRICE_ID || 'price_1SS3HFBqWf8SabvT28O1x6Ay'
const APP_URL = import.meta.env.VITE_APP_URL || 'https://app.ekprocook.com'

// Icons as simple SVG components
const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

const XIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const ChevronDownIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

// Feature icons
const ThermometerIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9V3m0 0L9 6m3-3l3 3m-3 12a4 4 0 100-8 4 4 0 000 8z" />
  </svg>
)

const ClipboardIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
)

const ShieldIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
)

const UsersIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
)

const DocumentIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
)

const PhoneIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
)

const FEATURES = [
  {
    icon: ThermometerIcon,
    title: 'Temperature Monitoring',
    description: 'Log fridge, freezer, hot hold and delivery temperatures with automatic compliance checking.',
  },
  {
    icon: ClipboardIcon,
    title: 'Daily Checklists',
    description: 'Customizable opening and closing checklists to ensure nothing is missed.',
  },
  {
    icon: ShieldIcon,
    title: 'SFBB Compliant',
    description: 'Fully aligned with UK Food Standards Agency Safer Food Better Business requirements.',
  },
  {
    icon: UsersIcon,
    title: 'Staff Management',
    description: 'Manage team members with roles, training records and certificate tracking.',
  },
  {
    icon: DocumentIcon,
    title: 'Digital Records',
    description: 'All your food safety records in one place, ready for EHO inspections.',
  },
  {
    icon: PhoneIcon,
    title: 'Works Everywhere',
    description: 'Mobile-first PWA that works on any device, even offline.',
  },
]

const PRICING = [
  {
    name: 'Starter',
    price: '15',
    description: 'Perfect for single-location businesses',
    features: [
      'Temperature logging',
      'Daily checklists',
      'Cleaning schedules',
      'SFBB Diary',
      'Staff management',
      'Allergen tracking',
      '1 location',
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Professional',
    price: '30',
    description: 'For growing businesses with multiple sites',
    features: [
      'Everything in Starter',
      'PDF export for EHO',
      'Email reminders',
      'Multi-location support',
      'Priority support',
      'Advanced reporting',
      'Unlimited locations',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
]

const FAQS = [
  {
    question: 'What is SFBB?',
    answer: 'Safer Food Better Business (SFBB) is a food safety management system developed by the UK Food Standards Agency. It helps food businesses put in place food safety management procedures and comply with food hygiene regulations.',
  },
  {
    question: 'Is EKProCook compliant with UK food safety regulations?',
    answer: 'Yes! EKProCook is fully aligned with the Food Standards Agency\'s SFBB requirements. Your digital records are accepted by Environmental Health Officers during inspections.',
  },
  {
    question: 'Can I try before I buy?',
    answer: 'Absolutely! We offer a 14-day free trial with full access to all features. No credit card required to start.',
  },
  {
    question: 'Does it work offline?',
    answer: 'Yes, EKProCook is a Progressive Web App (PWA) that works offline. Your data syncs automatically when you\'re back online.',
  },
  {
    question: 'Can I export records for my EHO inspection?',
    answer: 'Professional plan users can export all records as PDF documents, perfect for showing to Environmental Health Officers during inspections.',
  },
  {
    question: 'How do I cancel my subscription?',
    answer: 'You can cancel anytime from your account settings. There are no long-term contracts or cancellation fees.',
  },
]

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">EK</span>
            </div>
            <span className="font-bold text-xl text-gray-900">EKProCook</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
            <a href="#faq" className="text-gray-600 hover:text-gray-900 transition-colors">FAQ</a>
            <a href="https://app.ekprocook.com" className="text-gray-600 hover:text-gray-900 transition-colors">Login</a>
            <a href="https://app.ekprocook.com" className="btn-primary">
              Start Free Trial
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100">
          <div className="px-4 py-4 space-y-4">
            <a href="#features" className="block text-gray-600 hover:text-gray-900" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="#pricing" className="block text-gray-600 hover:text-gray-900" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
            <a href="#faq" className="block text-gray-600 hover:text-gray-900" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
            <a href="https://app.ekprocook.com" className="block text-gray-600 hover:text-gray-900">Login</a>
            <a href="https://app.ekprocook.com" className="btn-primary block text-center">
              Start Free Trial
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 md:px-8 bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <ShieldIcon />
            <span>UK Food Safety Compliant</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Food Safety Management
            <span className="text-primary-500"> Made Simple</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Digital SFBB compliance for restaurants, cafes, and food businesses.
            Track temperatures, complete checklists, and stay inspection-ready.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://app.ekprocook.com" className="btn-primary text-lg px-8 py-4">
              Start 14-Day Free Trial
            </a>
            <a href="#features" className="btn-secondary text-lg px-8 py-4">
              See Features
            </a>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            No credit card required • Cancel anytime
          </p>
        </div>

        {/* App Preview */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 pointer-events-none" />
          <div className="bg-gray-900 rounded-2xl p-2 md:p-4 shadow-2xl max-w-4xl mx-auto animate-float">
            <div className="bg-white rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold">EK</span>
                    </div>
                    <span className="text-white font-semibold hidden sm:block">Your Restaurant</span>
                  </div>
                  <div className="text-white/80 text-sm">Rating: 5/5</div>
                </div>
              </div>
              <div className="p-4 md:p-6 space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['Temps', 'Checks', 'Clean', 'Diary'].map((item) => (
                    <div key={item} className="bg-gray-50 rounded-xl p-4 text-center">
                      <div className="w-10 h-10 bg-primary-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <div className="w-5 h-5 bg-primary-500 rounded-full" />
                      </div>
                      <p className="text-sm font-medium text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-green-50 rounded-xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <CheckIcon />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">All checks complete</p>
                    <p className="text-sm text-gray-500">Ready for inspection</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need for Food Safety
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Replace paper records with a digital system that keeps you compliant and inspection-ready.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 mb-4">
                <feature.icon />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCheckout = useCallback(async (tier: 'starter' | 'professional') => {
    // If Stripe isn't configured, fall back to app link
    if (!SUPABASE_URL || !STRIPE_STARTER_PRICE_ID) {
      console.log('Missing config, redirecting to app')
      window.location.href = APP_URL
      return
    }

    setIsLoading(tier)
    setError(null)

    try {
      const priceId = tier === 'starter' ? STRIPE_STARTER_PRICE_ID : STRIPE_PROFESSIONAL_PRICE_ID
      console.log('Creating checkout session with priceId:', priceId)

      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/create-checkout-session`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            priceId,
            successUrl: `${APP_URL}/settings?welcome=true`,
            cancelUrl: `${window.location.origin}/`,
          }),
        }
      )

      console.log('Response status:', response.status)
      const data = await response.json()
      console.log('Response data:', data)

      if (data.error) {
        throw new Error(data.error)
      }

      if (data.url) {
        console.log('Redirecting to:', data.url)
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL returned')
      }
    } catch (err: any) {
      console.error('Checkout error:', err)
      setError(`Checkout failed: ${err.message || 'Unknown error'}`)
      // Fall back to app after 3 seconds
      setTimeout(() => {
        window.location.href = APP_URL
      }, 3000)
    } finally {
      setIsLoading(null)
    }
  }, [])

  return (
    <section id="pricing" className="section bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start with a 14-day free trial. No credit card required.
          </p>
        </div>

        {error && (
          <div className="max-w-md mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm text-center">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {PRICING.map((plan, index) => {
            const tier = plan.name.toLowerCase() as 'starter' | 'professional'
            const loading = isLoading === tier

            return (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 ${
                  plan.popular
                    ? 'ring-2 ring-primary-500 shadow-xl relative'
                    : 'border border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}

                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">£{plan.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600 flex-shrink-0">
                        <CheckIcon />
                      </div>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleCheckout(tier)}
                  disabled={loading || isLoading !== null}
                  className={`w-full text-center py-4 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    plan.popular
                      ? 'bg-primary-500 text-white hover:bg-primary-600'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Loading...
                    </span>
                  ) : (
                    plan.cta
                  )}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Got questions? We've got answers.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {FAQS.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                <span className={`transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
                  <ChevronDownIcon />
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="section bg-primary-500">
      <div className="container-custom text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Go Digital?
        </h2>
        <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
          Join hundreds of food businesses using EKProCook to stay compliant and save time.
        </p>
        <a href="https://app.ekprocook.com" className="inline-block bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg">
          Start Your Free Trial
        </a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">EK</span>
              </div>
              <span className="font-bold text-xl text-white">EKProCook</span>
            </div>
            <p className="text-sm">
              Digital food safety compliance for UK businesses.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="mailto:hello@ekprocook.com" className="hover:text-white transition-colors">hello@ekprocook.com</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-sm text-center">
          <p>© {new Date().getFullYear()} EKProCook. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  )
}

export default App
