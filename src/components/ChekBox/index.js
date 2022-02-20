import {Form} from "react-bootstrap";

export default function CheckBox(props) {
  const {item, setTable} = props
  const handleIsSelectedRow = (e, id) => {
    setTable((state) => (
        state.map(
          obj => (obj.id === id ? Object.assign(obj, {selectedRow: e.target.checked}) : obj)
        )
      )
    )
  }
  return (
    <td>
      <Form.Check className="m-2" type="checkbox"
                  checked={item.selectedRow}
                  onChange={(e) => handleIsSelectedRow(e, item.id)}
                  id={item.id}
                  color="primary"/>
    </td>
  );
}
