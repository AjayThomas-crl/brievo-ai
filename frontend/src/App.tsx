import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NewMeeting from "./pages/NewMeeting";
// import History from "./pages/History";
import LandingPage from "./pages/LandingPage";
import { Toaster } from "sonner";

function App() {
  return (
    <>
    <Toaster />
    <BrowserRouter>
      <Routes>
        
        {/* <Route path="/history" element={<History />} /> */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/new-meeting" element={<NewMeeting />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
    </>
    
  );
}

export default App;
