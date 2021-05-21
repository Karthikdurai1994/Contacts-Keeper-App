import React, { useContext } from "react";
import { GlobalContext } from "../../context/Provider";
const Alerts = () => {
  const { alertState } = useContext(GlobalContext);
  return (
    alertState.length > 0 &&
    alertState.map((a) => (
      <div key={a.id} className={`alert alert-${a.type}`}>
        <i className="fas fa-info-circle" /> {a.msg}
      </div>
    ))
  );
};

export default Alerts;
