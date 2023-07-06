import { useEffect, useState } from "react";

const Modal = ({ setConfirmDelete, tacheSupp }) => {
  const[delVald, setDelVald] = useState(false);
  const[load, setLoad] = useState(false);
  const[msg, setMsg] = useState(true);

console.log(load)
  const handleConfirmDelete = () => {
    setMsg(false)
    setLoad(true)
    setDelVald(true)
  
  };

  useEffect(()=>{
    if(delVald){
      const timeOut = setTimeout(() => {
        setLoad(false)
        setDelVald(false)
        setConfirmDelete(true);
        location.reload();
      }, 2000);
      return () => clearTimeout(timeOut);
    }
  }, [delVald])

  return (
    <>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Supprimer la Tache</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body d-flex justify-content-center">
                {msg && <p> Voulez vous vraiment supprimer la tache <i className="fw-bold"> "{tacheSupp}" </i></p>}

                {load ?(
                <div className="spinner-border text-success " role="status">
                  <span className="visually-hidden ">Loading...</span>
                </div>
                ): !msg && <strong>Supprimer &#128077;</strong> }
            
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Non
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleConfirmDelete}
                >
                  Oui
                </button>
              </div>
            </div>
          </div>
        </div>
      
    </>
  );
};

export default Modal;
