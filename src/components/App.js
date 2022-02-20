import {Table, Button, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './App.css';
import MydModalWithGrid from "./Modal";
import FIO from "./FIO";
import CheckBox from "./ChekBox";
import {TABLEINIT} from "./Constants";
import Gender from "./Gender";

function App() {
  const [table, setTable] = useState(TABLEINIT);

  const [modalShow, setModalShow] = useState(false);
  const [clickId, setClickId] = useState(0);
  const [disableDelete, setDisebleDelete] = useState(!table.length)
  const [FIOEdit, setFIOEdit] = useState(false)


  const newUser = {
    id: table.length,
    selectedRow: false,
    FIO: '',
    date: 0,
    gender: '',
    dopInfo: {
      bloodType: '',
      numberOfChildren: '',
    }
  }

  useEffect(() => {
    let selectedElem = 0;

    table.forEach((element) => {
      if (element.selectedRow) {
        selectedElem++
      }
    })
    setDisebleDelete(!table.length)
    setDisebleDelete(!selectedElem)
  }, [table]);


  const handleAddRow = () => {
    let newArrTable = table.slice();
    let newArrSelectedElem = []
    let maxElement, minElement, countElement = 0
    table.forEach((element) => {
      if (element.selectedRow) {
        newArrSelectedElem.push(element.id)
      }
    })
    console.log(newArrSelectedElem)
    maxElement = Math.max(...newArrSelectedElem) + 1
    minElement = Math.min(...newArrSelectedElem)
    countElement = newArrSelectedElem.length

    if (countElement === 0) {
      setTable((state) => [newUser, ...state])
    } else if (countElement === 1) {

      newArrTable.splice(maxElement, 0, newUser)
      sortIng(newArrTable)
      setTable(newArrTable)
    } else if (countElement > 1 && minElement !== 0) {
      newArrTable.splice(minElement, 0, newUser)
      sortIng(newArrTable)
      setTable(newArrTable)
    } else if (countElement > 1 && minElement === 0) {
      setTable((state) => [newUser, ...state])

    }

  }

  const sortIng = (Arr) => {
    let count = 0;
    Arr.map((val) => {
      val.id = count
      count++
      return val
    })
  }

  const handleDeleteRow = () => {
    let newArr = [];

    table.forEach((element) => {
      if (!element.selectedRow) {
        newArr.push(element)
      }
    })
    sortIng(newArr)
    if (!newArr.length && window.confirm("Вы уверены что хотите удалить всех пассажиров")) {
      setTable(newArr)
    } else if (newArr.length) {
      setTable(newArr)
    }
  }

  const handleIsSelectedAllRow = (event) => {

    setTable((state) => (
        state.map(
          obj => (Object.assign(obj, {selectedRow: event.target.checked}))
        )
      )
    )
  }

  const handleSetDate = (date, id) => {
    setTable((state) => (
        state.map(
          obj => (obj.id === id ? Object.assign(obj, {date: date}) : obj)
        )
      )
    )
  }

  const handelSetTable = (newItem) => (setTable(newItem))

  const handelStartModal = (id) => {
    setModalShow(true)
    setClickId(id)
  }

  return (
    <div className="App">
      <Button className='m-5' variant="primary" onClick={handleAddRow}>Добавить</Button>
      <Button variant="danger" disabled={disableDelete} onClick={handleDeleteRow}>Удалить</Button>
      {table.length ?

        <Table bordered hover size="sm" className="justify-content-md-center align-items-center">
          <thead>
          <tr>
            <th><Form.Check type="checkbox"
                            onChange={handleIsSelectedAllRow}
                            color="primary"/>
            </th>
            <th>Номер</th>
            <th>ФИО</th>
            <th>Дата рождения</th>
            <th>Пол</th>
            <th>Дополнительная информация</th>
          </tr>
          </thead>
          <tbody>
          {table.map((item, key) => {
            return (
              <tr key={item.id} className={item.selectedRow ? "selected" : ""}>
                <CheckBox item={item} setTable={setTable}/>
                <td>
                  <div className="m-2"> {key + 1}</div>
                </td>
                <FIO setTable={setTable} item={item} clickId={clickId} setClickId={setClickId} FIOEdit={FIOEdit}
                     setFIOEdit={setFIOEdit}/>
                <td>
                  <DatePicker selected={item.date} onChange={(date) => handleSetDate(date, item.id)}/>
                </td>
                <td className="justify-content-md-center">
                  <Gender item={item} setTable={setTable} clickId={clickId} table={table}/>
                </td>
                <td onClick={(id) => handelStartModal(item.id)}>
                  <p className="m-2">
                    {item.dopInfo.bloodType !== '' || item.dopInfo.numberOfChildren !== '' ? `Кол-во детей: ${item.dopInfo.numberOfChildren}; группа крови: ${item.dopInfo.bloodType}.` : 'Дополнительная информация не заполнена'}
                  </p>
                </td>
              </tr>
            )
          })}
          </tbody>
        </Table>
        : null}
      <MydModalWithGrid show={modalShow} onHide={() => setModalShow(false)} modalId={clickId} table={table}
                        setTable={handelSetTable}/>
    </div>
  );
}

export default App;
