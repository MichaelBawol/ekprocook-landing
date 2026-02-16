import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { blogPosts } from './posts'

const CalendarIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

const ClockIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

export default function BlogList() {
  useEffect(() => {
    window.scrollTo(0, 0)

    // Set page title
    document.title = 'Food Safety Blog | EKProCook - SFBB Guides & Tips'

    // Set meta description
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Expert guides on SFBB compliance, EHO inspections, and food safety best practices for UK restaurants, cafes, and takeaways.')
    }

    // Set canonical URL
    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) {
      canonical.setAttribute('href', 'https://ekprocook.com/blog')
    }

    // Set Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', 'Food Safety Blog | EKProCook')

    const ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) ogUrl.setAttribute('content', 'https://ekprocook.com/blog')

    return () => {
      document.title = 'EKProCook - Digital Food Safety & SFBB Compliance Software'
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">EK</span>
            </div>
            <span className="font-bold text-xl text-gray-900">EKProCook</span>
          </Link>
        </div>
      </header>

      {/* Blog Header */}
      <section className="bg-gradient-to-b from-primary-50 to-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Food Safety Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Expert guides on SFBB compliance, EHO inspections, and food safety best practices for UK restaurants, cafes, and takeaways.
          </p>
        </div>
      </section>

      {/* Featured Video */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-900 rounded-2xl p-2 shadow-xl">
            <video
              className="w-full rounded-xl"
              autoPlay
              loop
              muted
              playsInline
              controls
            >
              <source src="/blog-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <p className="text-center text-gray-500 mt-4 text-sm">
            See how EKProCook simplifies food safety compliance
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {blogPosts.map((post) => (
              <article key={post.slug} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
                <Link to={`/blog/${post.slug}`}>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 hover:text-primary-600 transition-colors">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-gray-600 mb-4 text-lg">
                  {post.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <CalendarIcon />
                    {new Date(post.date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <ClockIcon />
                    {post.readTime}
                  </span>
                </div>
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-block mt-4 text-primary-600 font-semibold hover:text-primary-700"
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-primary-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Simplify Your Food Safety?
          </h2>
          <p className="text-primary-100 mb-8 text-lg">
            Join hundreds of UK food businesses using EKProCook for SFBB compliance.
          </p>
          <Link to="/#pricing" className="inline-block bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors">
            Start Your Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4 text-center">
        <Link to="/" className="text-white hover:text-primary-400">
          ← Back to EKProCook
        </Link>
        <p className="mt-4 text-sm">
          © {new Date().getFullYear()} EKProCook. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
