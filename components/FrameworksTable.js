// components/FrameworksTable.js
export default function FrameworksTable() {
  const frameworks = [
    {
      name: "ElizaOS",
      description: "A TypeScript-based framework by AIlive with ~60% market share. Features extensive multi-agent simulation capabilities, cross-platform social engagement, and a thriving community of 8,000+ GitHub stars. Leading framework for creating AI agents that handle trading, social interactions, and community management.",
      memory: "RAG, multi-system memory",
      focus: "Social media, character, and trading agents",
      capabilities: "Text, voice, media interactions, image gen, Coinbase webhooks, search, NFT minting, TEE, wallet gen",
      chains: "Solana, Aptos, Flow, ICP, NEAR, Base, TON, SUI, Others",
      edge: "First-mover advantage, extensive GitHub community, robust plugin system, and broad model support"
    },
    {
      name: "Zerepy",
      description: "A Python-based framework (~30% market share) known for deploying creative AI agents on X. Built from a modularized version of the Creative backend, focusing on artistic outputs and social media automation.",
      memory: "RAG, Vector stores (Pinecone)",
      focus: "Social media agents with trustless transactions",
      capabilities: "Text, image + video gen, NFT minting, contract deployment, music gen, IP licensing",
      chains: "Solana, Base, Polygon",
      edge: "Strong Python ecosystem integration, specialized for creative and social media applications"
    },
    {
      name: "rig",
      description: "A Rust-based framework (~15% market share) for building portable, modular, and high-performance Fullstack AI Agents. Specializes in enterprise-grade applications with emphasis on retrieval-augmented generation, particularly within the Solana ecosystem.",
      memory: "RAG, Vector store DBs (MongoDB, LanceDB)",
      focus: "LLM-powered apps",
      capabilities: "Swarm intelligence, data pipelines, report generators, knowledge crawlers",
      chains: "Solana, Base",
      edge: "High performance, reliability, and modular design optimized for enterprise use cases"
    }
  ]
  
  return (
    <section className="py-12">
      <div className="container">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">AI Agent Frameworks</h2>
          <div className="flex items-center gap-2">
            <span>Filter:</span>
            <select className="border rounded p-1">
              <option>All Frameworks</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Framework</th>
                <th>Memory</th>
                <th>Focus</th>
                <th>Capabilities</th>
                <th>Chains</th>
                <th>Edge</th>
              </tr>
            </thead>
            <tbody>
              {frameworks.map((framework, index) => (
                <tr key={index}>
                  <td>
                    <div className="font-semibold">{framework.name}</div>
                    <div className="text-sm text-gray-600 mt-1">{framework.description}</div>
                  </td>
                  <td>{framework.memory}</td>
                  <td>{framework.focus}</td>
                  <td>{framework.capabilities}</td>
                  <td>{framework.chains}</td>
                  <td>{framework.edge}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
