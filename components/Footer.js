// components/Footer.js
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">AI Agent Toolkit</h3>
            <p className="text-gray-400">Building the future of AI agents</p>
          </div>
          <div className="flex space-x-6">
            <a href="https://github.com/yourusername/ai-agent-toolkit-clone" target="_blank" className="text-gray-400 hover:text-white">GitHub</a>
            <a href="#" className="text-gray-400 hover:text-white">Documentation</a>
            <a href="#" className="text-gray-400 hover:text-white">Resources</a>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-400">
          <p>© {new Date().getFullYear()} AI Agent Toolkit Clone. This is a demo project.</p>
        </div>
      </div>
    </footer>
  )
}
