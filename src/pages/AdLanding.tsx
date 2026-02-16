import { useState, useCallback } from 'react'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://qseqzrgtrrtlnpstlhwa.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzZXF6cmd0cnJ0bG5wc3RsaHdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwNjA2OTksImV4cCI6MjA4NTYzNjY5OX0.xSDtp3tDwInM39vDAoD1dSVdx2rZ8Ok-zIKqjjm0OGI'
const STRIPE_STARTER_PRICE_ID = import.meta.env.VITE_STRIPE_STARTER_PRICE_ID || 'price_1SS3H2BqWf8SabvTPbEUHfLN'
const APP_URL = import.meta.env.VITE_APP_URL || 'https://app.ekprocook.com'

const CheckIcon = () => (
  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const StarIcon = () => (
  <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

export default function AdLanding() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleStartTrial = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/create-checkout-session`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            priceId: STRIPE_STARTER_PRICE_ID,
            successUrl: `${APP_URL}/settings?welcome=true`,
            cancelUrl: `${window.location.origin}/try`,
          }),
        }
      )

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      if (data.url) {
        window.location.href = data.url
      }
    } catch (err: any) {
      setError('Something went wrong. Please try again.')
      setIsLoading(false)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">EK</span>
              </div>
              <span className="font-bold text-xl text-gray-900">EKProCook</span>
            </div>
            <a
              href="https://app.ekprocook.com"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Already have an account? Log in
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
                <CheckIcon />
                <span>UK Food Safety Compliant</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                Digital SFBB Software for UK Food Businesses
              </h1>

              <p className="text-xl text-gray-600 mb-8">
                Replace paper records with EKProCook. Temperature logs, daily checklists,
                cleaning schedules & EHO-ready reports — all in one app.
              </p>

              {/* Benefits */}
              <ul className="space-y-3 mb-8">
                {[
                  'Set up in 2 minutes — no training needed',
                  'Works offline — perfect for busy kitchens',
                  'PDF exports ready for EHO inspections',
                  'Automatic reminders — never miss a check',
                ].map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckIcon />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="space-y-4">
                <button
                  onClick={handleStartTrial}
                  disabled={isLoading}
                  className="w-full md:w-auto bg-primary-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="inline-flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Loading...
                    </span>
                  ) : (
                    'Start Your 14-Day Free Trial'
                  )}
                </button>

                {error && (
                  <p className="text-red-600 text-sm">{error}</p>
                )}

                <p className="text-sm text-gray-500">
                  14-day free trial • Cancel anytime • From £15/month after trial
                </p>
              </div>
            </div>

            {/* Right - Video */}
            <div className="relative">
              <div className="bg-gray-900 rounded-2xl p-2 shadow-2xl">
                <video
                  className="w-full rounded-xl"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/hero-video.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 px-4 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-gray-600 font-medium">Trusted by UK restaurants, cafes & takeaways</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "Finally ditched the paper SFBB folder. Our EHO was impressed with how organised our records are now.",
                author: "Restaurant Owner",
                location: "Manchester"
              },
              {
                quote: "The automatic reminders mean we never forget temperature checks. Got 5 stars on our last inspection!",
                author: "Cafe Manager",
                location: "London"
              },
              {
                quote: "So easy to use. Even my staff who aren't tech-savvy picked it up in minutes.",
                author: "Takeaway Owner",
                location: "Birmingham"
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.quote}"</p>
                <p className="text-sm text-gray-500">
                  — {testimonial.author}, {testimonial.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Everything You Need for SFBB Compliance
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Temperature Logging', desc: 'Fridge, freezer & hot hold with automatic compliance alerts' },
              { title: 'Daily Checklists', desc: 'Opening & closing checks customised for your business' },
              { title: 'Cleaning Schedules', desc: 'Track daily, weekly & monthly cleaning tasks' },
              { title: 'SFBB Diary', desc: 'Digital diary for recording issues and corrective actions' },
              { title: 'Staff Management', desc: 'Training records and certificates in one place' },
              { title: 'PDF Reports', desc: 'Professional exports ready for EHO inspections' },
            ].map((feature, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-4 bg-primary-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Simple, Affordable Pricing
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start with a 14-day free trial. Cancel anytime.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">£15</span>
                <span className="text-gray-600">/month</span>
              </div>
              <p className="text-gray-600 mb-6">Perfect for single-location businesses</p>
              <button
                onClick={handleStartTrial}
                disabled={isLoading}
                className="w-full bg-primary-500 text-white py-3 rounded-xl font-semibold hover:bg-primary-600 transition-colors disabled:opacity-50"
              >
                Start Free Trial
              </button>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm ring-2 ring-primary-500">
              <div className="inline-block bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Professional</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">£30</span>
                <span className="text-gray-600">/month</span>
              </div>
              <p className="text-gray-600 mb-6">Multi-location + PDF exports + priority support</p>
              <button
                onClick={handleStartTrial}
                disabled={isLoading}
                className="w-full bg-primary-500 text-white py-3 rounded-xl font-semibold hover:bg-primary-600 transition-colors disabled:opacity-50"
              >
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-primary-500">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Go Digital?
          </h2>
          <p className="text-primary-100 mb-8 text-lg">
            Join hundreds of UK food businesses simplifying their SFBB compliance.
          </p>
          <button
            onClick={handleStartTrial}
            disabled={isLoading}
            className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Loading...' : 'Start Your 14-Day Free Trial'}
          </button>
          <p className="text-primary-200 mt-4 text-sm">
            No commitment. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-gray-400 text-center text-sm">
        <p>© {new Date().getFullYear()} EKProCook. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <a href="/privacy" className="hover:text-white">Privacy Policy</a>
          <a href="/terms" className="hover:text-white">Terms of Service</a>
        </div>
      </footer>
    </div>
  )
}
