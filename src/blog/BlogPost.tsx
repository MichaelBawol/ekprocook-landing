import React, { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
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

// Simple markdown-like renderer
function renderContent(content: string) {
  const lines = content.trim().split('\n')
  const elements: React.ReactElement[] = []
  let inTable = false
  let tableRows: string[][] = []

  lines.forEach((line, index) => {
    const trimmedLine = line.trim()

    // Skip empty lines
    if (!trimmedLine) {
      if (inTable) {
        elements.push(
          <div key={index} className="overflow-x-auto my-6">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  {tableRows[0]?.map((cell, i) => (
                    <th key={i} className="border border-gray-300 px-4 py-2 text-left font-semibold">{cell}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.slice(1).map((row, rowIndex) => (
                  <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="border border-gray-300 px-4 py-2">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
        inTable = false
        tableRows = []
      }
      return
    }

    // Table row
    if (trimmedLine.startsWith('|') && trimmedLine.endsWith('|')) {
      if (trimmedLine.includes('---')) return // Skip separator
      inTable = true
      const cells = trimmedLine.split('|').filter(c => c.trim()).map(c => c.trim())
      tableRows.push(cells)
      return
    }

    // Headings
    if (trimmedLine.startsWith('## ')) {
      elements.push(
        <h2 key={index} className="text-2xl font-bold text-gray-900 mt-10 mb-4">
          {trimmedLine.replace('## ', '')}
        </h2>
      )
      return
    }

    if (trimmedLine.startsWith('### ')) {
      elements.push(
        <h3 key={index} className="text-xl font-bold text-gray-900 mt-8 mb-3">
          {trimmedLine.replace('### ', '')}
        </h3>
      )
      return
    }

    // Checkbox list items
    if (trimmedLine.startsWith('- [ ]')) {
      elements.push(
        <div key={index} className="flex items-start gap-2 ml-4 my-1">
          <span className="w-5 h-5 border-2 border-gray-300 rounded mt-0.5 flex-shrink-0"></span>
          <span className="text-gray-700">{trimmedLine.replace('- [ ]', '').trim()}</span>
        </div>
      )
      return
    }

    // List items
    if (trimmedLine.startsWith('- **')) {
      const match = trimmedLine.match(/- \*\*(.+?)\*\*(.*)/)
      if (match) {
        elements.push(
          <li key={index} className="ml-6 my-2 text-gray-700">
            <strong className="text-gray-900">{match[1]}</strong>{match[2]}
          </li>
        )
        return
      }
    }

    if (trimmedLine.startsWith('- ')) {
      elements.push(
        <li key={index} className="ml-6 my-2 text-gray-700 list-disc">
          {trimmedLine.replace('- ', '')}
        </li>
      )
      return
    }

    // Numbered list
    if (/^\d+\./.test(trimmedLine)) {
      elements.push(
        <li key={index} className="ml-6 my-2 text-gray-700 list-decimal">
          {trimmedLine.replace(/^\d+\.\s*/, '')}
        </li>
      )
      return
    }

    // Blockquote
    if (trimmedLine.startsWith('>')) {
      elements.push(
        <blockquote key={index} className="border-l-4 border-primary-500 pl-4 my-4 italic text-gray-600">
          {trimmedLine.replace('> ', '').replace(/^"/, '').replace(/"$/, '')}
        </blockquote>
      )
      return
    }

    // Link
    if (trimmedLine.startsWith('[')) {
      const match = trimmedLine.match(/\[(.+?)\]\((.+?)\)/)
      if (match) {
        elements.push(
          <p key={index} className="my-4">
            <Link to={match[2]} className="text-primary-600 hover:text-primary-700 font-semibold">
              {match[1]}
            </Link>
          </p>
        )
        return
      }
    }

    // Paragraph with bold/italic
    let text = trimmedLine
    // Replace **text** with <strong>
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Replace links
    text = text.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-primary-600 hover:text-primary-700">$1</a>')

    elements.push(
      <p
        key={index}
        className="my-4 text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    )
  })

  return elements
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = blogPosts.find(p => p.slug === slug)

  useEffect(() => {
    window.scrollTo(0, 0)

    if (post) {
      // Set page title
      document.title = `${post.title} | EKProCook Blog`

      // Set meta description
      let metaDesc = document.querySelector('meta[name="description"]')
      if (metaDesc) {
        metaDesc.setAttribute('content', post.description)
      } else {
        metaDesc = document.createElement('meta')
        metaDesc.setAttribute('name', 'description')
        metaDesc.setAttribute('content', post.description)
        document.head.appendChild(metaDesc)
      }

      // Set canonical URL
      let canonical = document.querySelector('link[rel="canonical"]')
      const canonicalUrl = `https://ekprocook.com/blog/${post.slug}`
      if (canonical) {
        canonical.setAttribute('href', canonicalUrl)
      } else {
        canonical = document.createElement('link')
        canonical.setAttribute('rel', 'canonical')
        canonical.setAttribute('href', canonicalUrl)
        document.head.appendChild(canonical)
      }

      // Set Open Graph tags
      let ogTitle = document.querySelector('meta[property="og:title"]')
      if (ogTitle) ogTitle.setAttribute('content', post.title)

      let ogDesc = document.querySelector('meta[property="og:description"]')
      if (ogDesc) ogDesc.setAttribute('content', post.description)

      let ogUrl = document.querySelector('meta[property="og:url"]')
      if (ogUrl) ogUrl.setAttribute('content', canonicalUrl)
    }

    // Cleanup on unmount
    return () => {
      document.title = 'EKProCook - Digital Food Safety & SFBB Compliance Software'
    }
  }, [slug, post])

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">EK</span>
            </div>
            <span className="font-bold text-xl text-gray-900">EKProCook</span>
          </Link>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="text-sm text-gray-500">
            <Link to="/" className="hover:text-primary-600">Home</Link>
            <span className="mx-2">→</span>
            <Link to="/blog" className="hover:text-primary-600">Blog</Link>
            <span className="mx-2">→</span>
            <span className="text-gray-900">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            {post.description}
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500 pb-8 border-b border-gray-200">
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
        </header>

        <div className="prose prose-lg max-w-none">
          {renderContent(post.content)}
        </div>

        {/* Author/CTA Box */}
        <div className="mt-12 p-8 bg-primary-50 rounded-2xl">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Make Food Safety Compliance Easy
          </h3>
          <p className="text-gray-600 mb-6">
            EKProCook helps UK restaurants, cafes, and takeaways manage SFBB compliance digitally. Temperature logging, checklists, cleaning schedules, and EHO-ready reports - all in one app.
          </p>
          <Link
            to="/#pricing"
            className="inline-block bg-primary-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-600 transition-colors"
          >
            Start Your 14-Day Free Trial
          </Link>
        </div>
      </article>

      {/* Related Posts */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">More Articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {blogPosts
              .filter(p => p.slug !== slug)
              .slice(0, 2)
              .map(relatedPost => (
                <Link
                  key={relatedPost.slug}
                  to={`/blog/${relatedPost.slug}`}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-gray-900 mb-2 hover:text-primary-600">
                    {relatedPost.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {relatedPost.description}
                  </p>
                </Link>
              ))}
          </div>
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
