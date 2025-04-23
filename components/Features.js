// components/Features.js
export default function Features() {
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
    <section id="features" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300">
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
