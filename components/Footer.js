// components/Footer.js
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div>
            <h3 className="text-xl font-bold">AI Agent Toolkit</h3>
            <p className="text-gray-400">Building the future of AI agents</p>
          </div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#">GitHub</a>
            <a href="#">Documentation</a>
            <a href="#">Resources</a>
          </div>
        </div>
        <div className="text-center text-gray-400 mt-8 pt-4 border-t border-gray-700">
          <p>© {new Date().getFullYear()} AI Agent Toolkit Clone. This is a demo project.</p>
        </div>
      </div>
    </footer>
  )
}
