// components/Header.js
import Link from 'next/link'

export default function Header() {
  return (
    <header className="fixed w-full bg-white bg-opacity-90 backdrop-blur-sm shadow-sm z-10">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-xl font-bold">
          AI Agent Toolkit
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="#features" className="hover:text-blue-600">Features</Link></li>
            <li><Link href="#resources" className="hover:text-blue-600">Resources</Link></li>
            <li><Link href="https://github.com/yourusername/ai-agent-toolkit-clone" target="_blank" className="hover:text-blue-600">GitHub</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
