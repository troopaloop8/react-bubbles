import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth"

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
    .put(`/colors/${colorToEdit.id}`, colorToEdit)
    .then(res => {
      updateColors(
        colors.map(color => {
          return color.id === res.data.id ? res.data : color;
        })
      )
    })
    .catch(err => console.log(err))
  };

  

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
    .delete(`/colors/${color.id}`, colorToEdit)
    .then(res => {
      updateColors(
        colors.filter(color => {
          return color.id !== res.data
        })
      )
    })
    .catch(err => console.log(err))
  };

  const addColor = e => {
    e.preventDefault()
    axiosWithAuth()
    .post(`/colors`, newColor)
    .then(res => {
      updateColors([...colors, newColor]);
      setNewColor(initialColor);
    })
    .catch(err => console.log(err))
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <form onSubmit={addColor}>
          <p>add color</p>
          <label>
            color name:
            <input 
            placeholder="color name"
            value={newColor.color}
            onChange={e => {
              setNewColor({...newColor, color: e.target.value})
            }}
            />
          </label>
          <label>
            hex code:
            <input 
            placeholder="#ffffff"
            value={newColor.code.hex}
            onChange={e => {
              setNewColor({ ...newColor, code: { hex: e.target.value } })
            }}
            />
          </label>
          <button type="submit">Add Color</button>
        </form>
      <div className="spacer" />
        
    </div>
  );
};

export default ColorList;
