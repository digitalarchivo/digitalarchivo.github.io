// components/ResourcesSection.js
export default function ResourcesSection() {
  return (
    <section id="resources" className="section">
      <div className="container">
        <h2 className="text-2xl font-bold mb-8">Resources</h2>
        <p className="mb-6">Check out our documentation, guides, and examples to help you build amazing AI agents.</p>
        
        <div className="resources-grid">
          <div className="card">
            <h3 className="text-lg font-semibold mb-2">Documentation</h3>
            <p className="text-gray-600 mb-4">Comprehensive API references and guides</p>
            <a href="#" className="text-primary hover:underline">Read docs →</a>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold mb-2">Tutorials</h3>
            <p className="text-gray-600 mb-4">Step-by-step guides to build your first agent</p>
            <a href="#" className="text-primary hover:underline">Start learning →</a>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold mb-2">Examples</h3>
            <p className="text-gray-600 mb-4">Sample projects and use cases</p>
            <a href="#" className="text-primary hover:underline">Explore examples →</a>
          </div>
        </div>
      </div>
    </section>
  )
}
