import {Button, Form} from "react-bootstrap";
import {useState} from "react";

export default function Gender(props) {
  const {item, setTable, clickId,table} = props
  const [gender, setGender] = useState(table[clickId].gender)

  const handlerChangeGender = (e) => {
    setGender(e.target.value)
  }
  const handleSubmit = (e, id) => {
    e.preventDefault()
    setTable((state) => (
        state.map(
          obj => {
            if (obj.id === id) {
              return Object.assign(obj, obj.gender = gender)
            } else {
              return obj
            }
          }
        )
      )
    )
  }
  return (
    <Form onSubmit={(e) => handleSubmit(e, item.id)} className="justify-content-md-center align-items-center">
      <Form.Select name="Пол"
                   className="d-inline-block"
                   onChange={(e) => handlerChangeGender(e)}>
        <option value="s">{item.gender === 'm' ? 'Мужчина' : item.gender === 'w' ? 'Женьщина' : item.gender === 'w' ? 'Другое' : ''}</option>
        <option value="m">Мужчина</option>
        <option value="w">Женьщина</option>
        <option value="o">Другое</option>
      </Form.Select>
      <Button className="m-2 sm" size="sm" variant="primary" type="submit">Сохранить</Button>
    </Form>
  );
}
