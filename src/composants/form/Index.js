import { useState, useRef, useEffect } from "react";
import { BiSolidCalendar } from "react-icons/bi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { fetchDatas } from "../../redux/reducers/rootReducer";
import FormEdit from "../formEdit/Index";

const Form = () => {
  const [startDate, setStartDate] = useState("");
  const [tache, setTache] = useState("");
  const datePickerRef = useRef(new Date());
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [buttonActiv, setButtonActiv] = useState(false);
  const tacheRenam = useSelector((state) => state.taches.tacheRename);

 const styleInput = {
  pointerEvents: 'none',
  cursor: 'not-allowed'
};
  useEffect(()=>{

    if(tache === "" ||  startDate === ""){
      setButtonActiv(false)
    }
    else{
      setButtonActiv(true)
    }

  }, [tache, startDate, buttonActiv])

  const handleLogoClick = () => {
    datePickerRef.current.setOpen(true);
  };

  const handleDateChange = (date) => {
    setStartDate(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
 
      dispatch(
        fetchDatas({ id: uuidv4(),  tache, date: startDate ? startDate.toString() : "" })
      );
      setTache("");
      setStartDate("");
      setError("");
    
  };

  return (
    <>
      <div className="pb-2">
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
                  placeholder="Add new..."
                  value={tache}
                  style={tacheRenam ? styleInput: {} }
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
                    className= {` ${buttonActiv ? 'btn btn-primary' : 'btn btn-secondary disabled' }`}
                    style={{ boxShadow: "4px 2px 4px rgba(0, 0, 0, 0.1)" }}
                  >
                    Add
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
      <FormEdit />
      <hr className="my-4" />
    </>
  );
};

export default Form;
