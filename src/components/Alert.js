import React from "react";
import "./Style.css";
import { useContext } from "react";
import extraContext from "../context/notes/ExtraContext";


function Alert() {
  const Context = useContext(extraContext);
  const { alert } = Context;
//className={`${alert.type === "success" || "Success"?"alert-container-success":"alert-container-fail"}`}
  return (
    
    <div className="alert-outer-container">
      {alert && (
        <div className={`alert-container-${alert.type === "SUCCESS"?"success":"fail"}`}>
          <p>{alert.type}: {alert.message}  </p>
        </div>
      )}
    </div>
  );
}

export default Alert;
