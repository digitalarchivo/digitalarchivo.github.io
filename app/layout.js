// app/layout.js
import './globals.css'

export const metadata = {
  title: 'AI Agent Toolkit Clone',
  description: 'A clone of aiagenttoolkit.xyz',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
