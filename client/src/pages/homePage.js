import React from "react";
import PlatesList from "../components/plates/plates-list";
import Usernav from "../components/usernav/usernav";
import "../components/auth/login/login.css";

function HomePage() {
  return (
    <div className="homePage">
      <Usernav />
      <PlatesList />
    </div>
  );
}

export default HomePage;
