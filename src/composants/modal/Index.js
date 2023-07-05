const Modal = ({ setConfirmDelete, tacheSupp }) => {

  const handleConfirmDelete = () => {
    setConfirmDelete(true);
  
  };

  return (
    <>

        <div
          className="modal fade"
          id="exampleModal"
          tabiIdex="-1"
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
              <div className="modal-body">
                <p>
                  Voulez vous vraiment supprimer la tache{" "}
                  <i className="fw-bold"> "{tacheSupp}" </i>{" "}
                </p>
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
