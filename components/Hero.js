// components/Hero.js
export default function Hero() {
  return (
    <section className="pt-24 pb-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Build AI Agents with <span className="gradient-text">Powerful Tools</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          An open-source toolkit for building, testing, and deploying AI agents quickly and efficiently.
        </p>
        <div className="flex justify-center space-x-4">
          <a 
            href="https://github.com/yourusername/ai-agent-toolkit-clone" 
            target="_blank" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-300"
          >
            Get Started
          </a>
          <a 
            href="#features" 
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-6 rounded-md transition duration-300"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  )
}
