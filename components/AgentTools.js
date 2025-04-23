// components/AgentTools.js
export default function AgentTools() {
  const toolCategories = [
    "RAG", "Data Processing", "Compute Resources", "Memory", 
    "Web Scraping", "Observability", "Hosting & Serving", "Sandboxes",
    "Browser Automation", "Local Inference", "Prompt Engineering",
    "Function Calling", "Authentication", "ETL", "Payment", "Persistence",
    "Blockchain Tools", "Training & Deployment", "Reasoning & Planning", "Chat UI Development"
  ]
  
  return (
    <section className="py-8 bg-white">
      <div className="container">
        <h2 className="text-2xl font-bold text-center mb-6">
          AI Agent Development Tools & Libraries
        </h2>
        <div className="flex flex-wrap gap-2 justify-center">
          {toolCategories.map((tool, index) => (
            <div key={index} className="bg-gray-100 rounded-full px-4 py-2 text-sm flex items-center gap-2">
              <span>{tool}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
