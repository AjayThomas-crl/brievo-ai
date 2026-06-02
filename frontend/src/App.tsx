import { useState } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import TranscriptInput from './components/TranscriptInput'
import SummaryCard from './components/SummaryCard'
import TaskCard from './components/TaskCard'
function App() {
  

  return (
    <>
     <Navbar />
     <TranscriptInput />
     <SummaryCard />
     <TaskCard />
    </>
  )
}

export default App
