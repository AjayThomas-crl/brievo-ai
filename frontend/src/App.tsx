import { useState } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import TranscriptInput from './components/TranscriptInput'
import SummaryCard from './components/SummaryCard'
import TaskCard from './components/TaskCard'
import type { Analysis } from './types/analysis'

function App() {
  

  const [analysis,setAnalysis]=useState<Analysis | null>(null)
  return (
    <div className="bg-[#eaeef3] min-h-screen" >
     <Navbar  />
     <div className='mx-50'>
      <TranscriptInput 
      setAnalysis={setAnalysis}
      />
     <SummaryCard
      analysis={analysis}
     />
     <TaskCard 
     analysis={analysis}
     />
     </div>
     
    </div>
  )
}

export default App
