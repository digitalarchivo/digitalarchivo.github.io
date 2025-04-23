// pages/index.js
import Head from 'next/head'
import Header from '../components/Header'
import Hero from '../components/Hero'
import ToolCategories from '../components/ToolCategories'
import AgentTools from '../components/AgentTools'
import AIAssistants from '../components/AIAssistants'
import FrameworksTable from '../components/FrameworksTable'
import FeaturesSection from '../components/FeaturesSection'
import ResourcesSection from '../components/ResourcesSection'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div>
      <Head>
        <title>AI Agent Toolkit</title>
        <meta name="description" content="A curated list of AI agent frameworks, tools, tutorials, and resources" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main>
        <Hero />
        <ToolCategories />
        <AgentTools />
        <AIAssistants />
        <FrameworksTable />
        <FeaturesSection />
        <ResourcesSection />
      </main>
      <Footer />
    </div>
  )
