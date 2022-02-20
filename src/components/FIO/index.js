import {useState} from "react";
import {Form} from "react-bootstrap";
import {INVALID_FIO_INPUT, REGFIO} from "../Constants";

export default function FIO(props) {
  const {setTable, item, clickId, setClickId, FIOEdit, setFIOEdit} = props
  const [isError, setIsError] = useState('')
  const [isFIO, SetIsFIO] = useState(item.FIO)


  const handleFIOEdit = (e, id, FIO) => {

    if (REGFIO.test(FIO) || FIO === '') {
      setIsError('');
      if (e.target.tagName === 'INPUT') {
        setTable((state) => (
            state.map(
              obj => (obj.id === id && !isError ? Object.assign(obj, {FIO: FIO}) : obj)
            )
          )
        )
      } else  {
        setTable((state) => (
            state.map(
              obj => (obj.id === id && !isError ? Object.assign(obj, {FIO: FIO}) : obj)
            )
          )
        )
        SetIsFIO(FIO)
        setFIOEdit(!FIOEdit)
      }

     } else {
      setIsError(INVALID_FIO_INPUT);
    }
    if (REGFIO.test(e.target.value) || e.target.value === '' || e.target.value === undefined) {
      setIsError('');
    } else {
      setIsError(INVALID_FIO_INPUT);
    }
    setClickId(id)
  }

  const handleKeyPress = (e, id, FIO) => {
    e.charCode !== 13 ? setFIOEdit(FIOEdit) : setFIOEdit(!FIOEdit)
    if(!isError && e.charCode === 13){
      setTable((state) => (
          state.map(
            obj => (obj.id === id && !isError ? Object.assign(obj, {FIO: e.target.value}) : obj)
          )
        )
      )
    }else if(isError && e.charCode === 13){
      SetIsFIO(FIO)
    }

    setClickId(id)
  }

  const handleChange = (e, id) => {



    if (REGFIO.test(e.target.value) || e.target.value === '') {
      setIsError('');
      setTable((state) => (
          state.map(
            obj => (obj.id === id && !isError ? Object.assign(obj, {FIO: e.target.value}) : obj)
          )
        )
      )
    } else {
      setIsError(INVALID_FIO_INPUT);
    }
   SetIsFIO(e.target.value)
    setClickId(id)
  }

  return (
    <td onClick={(e) => handleFIOEdit(e, item.id, item.FIO)}
        onKeyPress={(e) => handleKeyPress(e, item.id, item.FIO)}>

      {FIOEdit && item.id === clickId ?
        <>
          <Form.Control className='d-inline-block m-2'
                        type="text"
                        isInvalid={isError}
                        isValid={!isError}
                        onChange={(e) => handleChange(e, item.id)}
                        autoFocus
                        value={isFIO}/>
          <Form.Control.Feedback type="invalid">
            {isError}
          </Form.Control.Feedback>
        </>
        : <div className="m-2">{item.FIO}</div>}

    </td>
  )
}