import { useState } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import TranscriptInput from './components/TranscriptInput'
import SummaryCard from './components/SummaryCard'
import TaskCard from './components/TaskCard'
function App() {
  

  return (
    <div className="bg-[#eaeef3] min-h-screen" >
     <Navbar  />
     <TranscriptInput />
     <SummaryCard />
     <TaskCard />
    </div>
  )
}

export default App
