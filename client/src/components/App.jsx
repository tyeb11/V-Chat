import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home.routes";
import About from "./routes/About.routes";
import Chat from "./routes/Chat.routes";
import Header from "./Header.component";
import SignInModal from "./modals/SignIn.modal";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/about" index element={<About />} />
          <Route path="/chat" index element={<Chat />} />
        </Routes>
        {/* <SignInModal /> */}
        {/* {user modal} */}
        {/* {adduser modal} */}
      </BrowserRouter>
    </>
  );
}

export default App;

// THEME 51 Grecian Holiday

// #2988BC - Grecian Blue ---  chat and selected chat
// #2F496E - Sea          ---  header
// #F4EADE - Plaster      ---  chat pannel,header font color
// #ED8C72 - Coral        ---  profileBorder,signInButton,buttons

// #128277 - Deep Aqua    ---  accept buttons
//  or
// #506D2F - Leaves       ---  accept buttons
//  or
// #ACBD78 - Olive        ---  accept buttons [high priority]

// #B2473E - Tuscan Red   ---  cancel buttons
