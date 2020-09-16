import React from "react";
import Dashboard from "../components/dashboard/dashboard";
import Adminnav from "../components/adminnav/adminnav";
import "./adminPage.css";

class AdminPage extends React.Component {
  render() {
    return (
      <div className="adminPage">
        <Adminnav />
        <Dashboard />
      </div>
    );
  }
}

export default AdminPage;
