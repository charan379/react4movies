import React from 'react'
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <center>
        <div>Home

          <center>
            <p>Working Modules : </p>
            <br/>
            <button onClick={()=> navigate("/discover/tmdb/")}>Discover</button>
          </center>
        </div>
    </center>
  )
}

export default Home