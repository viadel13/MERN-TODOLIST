import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoPencil } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import { showList } from "../../redux/reducers/rootReducer";
import { deleteData, tacheRenom } from "../../redux/reducers/rootReducer";
import Modal from "../modal/Index";

const Taches = () => {
  const tache = useSelector((state) => state.taches.taches);
  const [show, setShow] = useState(true);
  const [mouseId, setMouseId] = useState("");
  const[confirmDelete, setConfirmDelete] = useState(false)
  const[id, setId] = useState('');
  const[tacheSupp, setTacheSupp] = useState('');
  const[msg, setMsg] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    tacheShow();
  }, [])

  const handleMouseOver = (id) => {
    setMouseId(id);
  };

  const infoModal = (idModal, tacheModal) =>{
    setId(idModal)
    setTacheSupp(tacheModal)
    setMsg(true)
  }

  const editer = (nameTache, id)=>{
    dispatch(tacheRenom({nameTache, id}))
  }

  useEffect(()=>{
    if(confirmDelete){
      dispatch(deleteData(id))
    }
  }, [confirmDelete])


  const tacheShow = async () => {
    try {
      const response = await axios.get("https://api-todolist-a3aa7e82be36.herokuapp.com/showTaches");
      // const response = await axios.get("/showTaches");
      console.log(response.status);
      dispatch(showList(response.data));
    } catch (error) {
      console.log("message: ", error);
    }
  };

  useEffect(() => {
    if (tache.length > 0) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [tache]);

  const parsetDate = (param) => {
    const parse = new Date(param);
    const mois = parse.getMonth() + 1;
    const moisTexte = parse.toLocaleString("fr-FR", { month: "long" });

    return ` ${parse.getDate()}th ${moisTexte}  ${parse.getFullYear()}`;
  };

  const listeTaches = show ? (
    <p>Aucune Taches ...</p>
  ) : (
    tache.map((i, index) => {
      return (
        <ul
          className="list-group list-group-horizontal rounded-0 bg-transparent"
          key={index}
        >
          <li className="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
            <div className="form-check">
              <input
                className="form-check-input me-0"
                type="checkbox"
                value=""
                id="flexCheckChecked1"
                aria-label="..."
              />
            </div>
          </li>
          <li
            id="tache"
            onMouseOver={() => handleMouseOver(i.id)}
            className="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent"
          >
            <p className="lead fw-normal me-auto mb-0">{i.tache}</p>
            <li className="list-group-item px-3 py-1 d-flex align-items-center border-0 bg-transparent">
              {mouseId === i.id ? (
                <div className="py-2 px-3 me-2 border border-warning rounded-3 d-flex align-items-center bg-light">
                  <p className="small mb-0">
                    <a href="#!" data-mdb-toggle="tooltip" title="Due on date">
                      <i className="fas fa-hourglass-half me-2 text-warning"></i>
                    </a>
                    {parsetDate(i.date)}
                  </p>
                </div>
              ) : (
                ""
              )}
            </li>
          </li>

          <li className="list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
            <div className="d-flex flex-row justify-content-end mb-1">
              <a
                href="#!"
                className="text-info"
                data-mdb-toggle="tooltip"
                title="Edit todo"
                onClick={()=>editer(i.tache, i.id, i.date)}
              >
                <GoPencil className="me-3" />
              </a>
              <a
                href="#!"
                className="text-danger"
                data-mdb-toggle="tooltip"
                title="Delete todo"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>infoModal(i.id, i.tache)}
              >

                <RiDeleteBin6Line />
              </a>
            </div>
            <div className="text-end text-muted">
              <a
                href="#!"
                className="text-muted"
                data-mdb-toggle="tooltip"
                title="Created date"
              >
                <p className="small mb-0">
                  <i className="fas fa-info-circle me-2"></i>
                  {parsetDate(i.date)}
                </p>
              </a>
            </div>
          </li>
        </ul>
      );
    })
  );

  return (
    <>
      {listeTaches}
      <Modal setConfirmDelete={setConfirmDelete} tacheSupp={tacheSupp} msg={msg} setMsg={setMsg}  />
    </>
  );
};

export default Taches;
