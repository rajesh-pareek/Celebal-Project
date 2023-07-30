import { useContext, useEffect, useState } from "react";
import { ContentContext } from "../contextapi/ContextProvide";
import { FaBars } from "react-icons/fa";
export default function Navbar() {
  const [time, setTime] = useState('');


  const handleDrawer=()=>{
    setDrawer((prev)=>!prev);
    console.log(drawer);
  }

  const { setAddTodoDialog,setSearch,search,drawer,setDrawer } = useContext(ContentContext);
  return (
    <div className="navbar-container">
      <div className="navbar-container-hamburger">
        <FaBars onClick={()=>handleDrawer()}/>
      </div>
      <div className="navbar-container-input">
        <input type="text" placeholder="search"  value={search} onChange={(e)=>setSearch(e.target.value)}/>
      </div>
      <div className="navbar-container-time">
        {time}

      </div>
      <div className="navbar-container-button">
        {" "}
        <button onClick={() => setAddTodoDialog(true)}>ADD TASK</button>
      </div>
    </div>
  );
}