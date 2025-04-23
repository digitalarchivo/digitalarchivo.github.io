// components/ToolCategories.js
import { FaCode, FaRocket, FaUsers, FaCubes, FaBook, FaFlask, FaUsers } from 'react-icons/fa'

export default function ToolCategories() {
  const categories = [
    { icon: <FaCode />, name: "Frameworks" },
    { icon: <FaRocket />, name: "Web3 Agent Launchpads" },
    { icon: <FaUsers />, name: "Web3 Agents" },
    { icon: <FaCubes />, name: "Web3 AI Infrastructure" },
    { icon: <FaBook />, name: "Tutorials" },
    { icon: <FaFlask />, name: "Research" },
    { icon: <FaUsers />, name: "People" }
  ]

  return (
    <div className="tool-categories">
      {categories.map((category, index) => (
        <div key={index} className="tool-category">
          {category.icon}
          <span>{category.name}</span>
        </div>
      ))}
    </div>
  )
}
