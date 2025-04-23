// components/FeaturesSection.js
export default function FeaturesSection() {
  const features = [
    {
      title: "Agent Building",
      description: "Create custom AI agents with our intuitive framework and pre-built components."
    },
    {
      title: "Tool Integration",
      description: "Connect your agents to various tools and APIs with minimal configuration."
    },
    {
      title: "Testing Framework",
      description: "Comprehensive testing tools to ensure your agents perform reliably."
    },
    {
      title: "Deployment Options",
      description: "Deploy your agents as APIs, web services, or embedded applications."
    },
    {
      title: "Open Source",
      description: "Built by the community, for the community, with extensibility in mind."
    },
    {
      title: "Documentation",
      description: "Extensive guides, tutorials, and API references to get you started quickly."
    }
  ]
  
  return (
    <section id="features" className="section bg-white">
      <div className="container">
        <h2 className="text-2xl font-bold mb-8">Features</h2>
        <div className="feature-grid">
          {features.map((feature, index) => (
            <div key={index} className="card">
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
