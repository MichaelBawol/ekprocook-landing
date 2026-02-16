import { Link } from 'react-router-dom'
import { useEffect } from 'react'

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0)

    // Set canonical URL
    const canonicalUrl = 'https://ekprocook.com/terms'
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.rel = 'canonical'
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.href = canonicalUrl

    return () => {
      if (canonicalLink && canonicalLink.parentNode) {
        canonicalLink.parentNode.removeChild(canonicalLink)
      }
    }
  }, [])

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

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-gray-500 mb-8">Last updated: February 2026</p>

        <div className="prose prose-lg max-w-none text-gray-700">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing or using EKProCook ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, you do not have permission to access the Service.
            </p>
            <p>
              These Terms apply to all visitors, users, and others who access or use the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
            <p>
              EKProCook is a digital food safety compliance software designed for UK food businesses. The Service provides tools for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Temperature monitoring and logging</li>
              <li>Daily opening and closing checklists</li>
              <li>Cleaning schedule management</li>
              <li>SFBB diary and documentation</li>
              <li>Staff management and training records</li>
              <li>Allergen tracking</li>
              <li>Report generation for EHO inspections</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.1 Registration</h3>
            <p>
              To use certain features of the Service, you must register for an account. You agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and promptly update your account information</li>
              <li>Keep your password secure and confidential</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorised access</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.2 Account Termination</h3>
            <p>
              We reserve the right to suspend or terminate your account at any time for violation of these Terms or for any other reason at our sole discretion.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Subscriptions and Payments</h2>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4.1 Subscription Plans</h3>
            <p>
              The Service offers subscription plans as described on our pricing page. Features and pricing may change with reasonable notice.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4.2 Free Trial</h3>
            <p>
              We offer a 14-day free trial for new users. At the end of the trial period, your subscription will begin and you will be charged unless you cancel before the trial ends.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4.3 Billing</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Subscriptions are billed monthly in advance</li>
              <li>All fees are in British Pounds (GBP) and include VAT where applicable</li>
              <li>Payment is processed securely through Stripe</li>
              <li>You authorise us to charge your payment method on a recurring basis</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4.4 Cancellation</h3>
            <p>
              You may cancel your subscription at any time through your account settings or by contacting us. Upon cancellation:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You will retain access until the end of your current billing period</li>
              <li>No refunds will be provided for partial months</li>
              <li>Your data will be retained for 30 days after cancellation, then deleted</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4.5 Refunds</h3>
            <p>
              Refunds are provided at our discretion. If you are unsatisfied with the Service within the first 14 days of a paid subscription, contact us to request a refund.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the Service for any unlawful purpose</li>
              <li>Attempt to gain unauthorised access to any part of the Service</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>Transmit viruses, malware, or other harmful code</li>
              <li>Collect or harvest user information without consent</li>
              <li>Use the Service to send spam or unsolicited communications</li>
              <li>Impersonate any person or entity</li>
              <li>Reverse engineer or attempt to extract source code</li>
              <li>Resell or redistribute the Service without permission</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Content and Data</h2>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6.1 Ownership</h3>
            <p>
              You retain ownership of all data and content you submit to the Service ("Your Content"). By using the Service, you grant us a limited licence to store, process, and display Your Content solely to provide the Service.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6.2 Responsibility</h3>
            <p>
              You are solely responsible for Your Content, including its accuracy and compliance with applicable laws. The Service is a tool to assist with food safety compliance, but does not guarantee regulatory compliance.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6.3 Backup</h3>
            <p>
              While we maintain regular backups, we recommend you export important data periodically. We are not liable for any loss of data.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
            <p>
              The Service, including its original content, features, and functionality, is owned by EKProCook and protected by copyright, trademark, and other intellectual property laws.
            </p>
            <p className="mt-4">
              You may not copy, modify, distribute, sell, or lease any part of the Service without our written permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Disclaimer of Warranties</h2>
            <p>
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>MERCHANTABILITY</li>
              <li>FITNESS FOR A PARTICULAR PURPOSE</li>
              <li>NON-INFRINGEMENT</li>
              <li>ACCURACY OR RELIABILITY OF CONTENT</li>
            </ul>
            <p className="mt-4">
              We do not warrant that the Service will be uninterrupted, secure, or error-free.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, EKPROCOOK SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Loss of profits, revenue, or data</li>
              <li>Business interruption</li>
              <li>Regulatory fines or penalties</li>
              <li>Failed inspections or hygiene ratings</li>
            </ul>
            <p className="mt-4">
              Our total liability shall not exceed the amount you paid us in the 12 months preceding the claim.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless EKProCook and its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your use of the Service</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any rights of another party</li>
              <li>Your Content</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Food Safety Disclaimer</h2>
            <p>
              <strong>Important:</strong> EKProCook is a tool to assist with food safety record-keeping and compliance management. However:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The Service does not replace professional food safety advice</li>
              <li>You remain solely responsible for food safety compliance in your business</li>
              <li>We do not guarantee that use of the Service will result in passing EHO inspections</li>
              <li>You should consult with food safety professionals and your local authority for specific guidance</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify you of material changes by email or through the Service. Continued use of the Service after changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of England and Wales, without regard to conflict of law provisions.
            </p>
            <p className="mt-4">
              Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Severability</h2>
            <p>
              If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Contact Us</h2>
            <p>
              If you have questions about these Terms, please contact us at:
            </p>
            <p className="mt-4">
              <strong>Email:</strong> <a href="mailto:info@ekprocook.com" className="text-primary-600 hover:text-primary-700">info@ekprocook.com</a>
            </p>
          </section>
        </div>
      </main>

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
