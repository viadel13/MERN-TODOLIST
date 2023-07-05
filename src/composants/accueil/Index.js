import React from "react";
import Header from "../header/Index";
import Form from "../form/Index";
import Filter from "../filter/Index";
import Taches from "../taches/Index";

const Accueil = () => {
  return (
    <section>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div
              className="card"
              id="list1"
              style={{borderRadius: ".75rem", backgroundColor: "#eff1f2"}}
            >
              <div className="card-body py-4 px-4 px-md-5">
                <Header /> 
                <Form />
                <Filter />
                <Taches />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Accueil;
