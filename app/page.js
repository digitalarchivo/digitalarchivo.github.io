// app/page.js
import Header from '../components/Header'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Features />
      <section id="resources" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Resources</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Check out our documentation, guides, and examples to help you build amazing AI agents.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Documentation</h3>
              <p className="text-gray-600 mb-4">Comprehensive API references and guides</p>
              <a href="#" className="text-blue-600 hover:text-blue-800">Read docs →</a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Tutorials</h3>
              <p className="text-gray-600 mb-4">Step-by-step guides to build your first agent</p>
              <a href="#" className="text-blue-600 hover:text-blue-800">Start learning →</a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Examples</h3>
              <p className="text-gray-600 mb-4">Sample projects and use cases</p>
              <a href="#" className="text-blue-600 hover:text-blue-800">Explore examples →</a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
