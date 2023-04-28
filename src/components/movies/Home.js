import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {

    // Home page not yet implemneted for redirecting 
    navigate("/collection")

    return () => {

    }
  }, [])

  return (
    <center>
      <div>Home

        <center>
          <p>Working Modules : </p>
          <br />
          <button onClick={() => navigate("/discover/tmdb/")}>Discover</button>
        </center>
      </div>
    </center>
  )
}

export default Home