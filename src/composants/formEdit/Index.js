import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { BiSolidCalendar } from "react-icons/bi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RenameDatas } from "../../redux/reducers/rootReducer";

const FormEdit = () => {
  const [startDateEdit, setStartDateEdit] = useState("");
  const [tacheEdit, setTacheEdit] = useState("");
  const datePickerRefEdit = useRef(new Date());
  const dispatch = useDispatch();
  const [errorEdit, setErrorEdit] = useState('');
  const [buttonAc, setButtonAc] = useState(false);
  const tacheRename = useSelector((state) => state.taches.tacheRename);

  const idReducer = useSelector((state) => state.taches.idRename);
  
  const handleLogoClick = () => {
    datePickerRefEdit.current.setOpen(true);
  };

  useEffect(()=>{
    setTacheEdit(tacheRename)
  }, [tacheRename])

  const handleDateChange = (date) => {
    setStartDateEdit(date);
  };

  useEffect(()=>{

    if(tacheEdit === "" ||  startDateEdit === ""){
      setButtonAc(false)
    }
    else{
      setButtonAc(true)
    }

  }, [tacheEdit, startDateEdit, buttonAc])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(RenameDatas(tacheEdit, idReducer, startDateEdit.toString() ))
    setTacheEdit("");
    setStartDateEdit("");
    setErrorEdit("");
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
                    value={tacheEdit}
                    onChange={(e) => setTacheEdit(e.target.value)}
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
                    ref={datePickerRefEdit}
                    selected={startDateEdit}
                    onChange={handleDateChange}
                    className="d-none"
                  />

                  <div>
                    <button
                      className= {` ${buttonAc ? 'btn btn-primary' : 'btn btn-secondary disabled' }`}
                      style={{ boxShadow: "4px 2px 4px rgba(0, 0, 0, 0.1)" }}

                    >
                      Modifier
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {errorEdit && (
            <div style={{ color: "red" }}>Entrer une tache et une date</div>
          )}
        </div>
      )}
    </>
  );
};

export default FormEdit;
