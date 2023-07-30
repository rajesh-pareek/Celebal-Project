import DialogBox from "./components/CustomDialog";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Side";
import ContextProvide from "./contextapi/ContextProvide";
import "./scss/index.scss";

export default function App() {
  return (
    <ContextProvide>
      <div className="app-container">
        <Sidebar />
        <div className="app-container-content-container">
          <DialogBox/>
          <Navbar />
          <Main />
        </div>
      </div>
    </ContextProvide>
  );
}