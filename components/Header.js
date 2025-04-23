// components/Header.js
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="font-bold text-xl">AIAgentToolkit.xyz</Link>
          <nav>
            <ul className="flex space-x-6" style={{ listStyle: 'none', paddingLeft: 0 }}>
              <li><Link href="#courses">Courses</Link></li>
              <li><Link href="#blogs">Blogs</Link></li>
              <li><Link href="#submit">Submit</Link></li>
              <li>🌙</li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
