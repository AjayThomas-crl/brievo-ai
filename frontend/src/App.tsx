import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewMeeting from "./pages/NewMeeting";

import SignupPage from "./pages/SignUp";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NewMeeting />} />
        <Route path="/signup" element={<SignupPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
