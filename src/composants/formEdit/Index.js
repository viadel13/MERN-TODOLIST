import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { BiSolidCalendar } from "react-icons/bi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RenameDatas } from "../../redux/reducers/rootReducer";

const FormEdit = () => {
  const [startDate, setStartDate] = useState("");
  const [tache, setTache] = useState("");
  const datePickerRef = useRef(new Date());
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const tacheRename = useSelector((state) => state.taches.tacheRename);
  const idReducer = useSelector((state) => state.taches.idRename);
  
  const handleLogoClick = () => {
    datePickerRef.current.setOpen(true);
  };

  useEffect(()=>{
    setTache(tacheRename)
  }, [tacheRename])

  const handleDateChange = (date) => {
    setStartDate(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tache === "" || startDate === "") {
      setError("Veuillez entrer une tache");
      setTache("");
    } else {
      dispatch(RenameDatas(tache, idReducer))
      setTache("");
      setStartDate("");
      setError("");
    }
  };

  return (
    <>
      {tacheRename && (
        <div className="pb-2 animate__animated  animate__zoomIn">
          <div className="card">
            <div
              className="card-body"
              style={{ boxShadow: "4px 2px 4px rgba(0, 0, 0, 0.1)" }}
            >
              <form onSubmit={handleSubmit}>
                <div className="d-flex flex-row align-items-center">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="exampleFormControlInput1"
                    value={tache}
                    onChange={(e) => setTache(e.target.value)}
                  />
                  <a
                    href="#"
                    data-mdb-toggle="tooltip"
                    title="Set due date"
                    onClick={handleLogoClick}
                  >
                    <BiSolidCalendar size={28} className="me-3" />
                  </a>

                  <DatePicker
                    ref={datePickerRef}
                    selected={startDate}
                    onChange={handleDateChange}
                    className="d-none"
                  />

                  <div>
                    <button
                      className="btn btn-primary"
                      style={{ boxShadow: "4px 2px 4px rgba(0, 0, 0, 0.1)" }}
                    >
                      Modifier
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {error && (
            <div style={{ color: "red" }}>Entrer une tache et une date</div>
          )}
        </div>
      )}
    </>
  );
};

export default FormEdit;
