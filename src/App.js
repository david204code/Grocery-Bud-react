import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: true, 
    msg:'', 
    type:'',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('Blessed it be the Name of our God');

    if(!name) {
      // display alert and setting the attribute of the object
      showAlert(true, 'danger', 'please enter value');
    } 
    else if(name && isEditing) {
      // deal with edit
      setList(list.map((item) => {
        if(item.id === editID) {
          return { ... item, title: name}
        }
        return item
      }))
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'success', 'value changed',)
    }
    else {
      // show alert
      showAlert(true, 'success', 'item added to the list');
      // create the new itme  and add it to the list
      const newItem = {id: new Date().getTime().toString(), title: name};
      // spread operator to get the old value(s)
      setList([...list, newItem]);
      setName('');
    }
  };

  // function for the alert
  const showAlert = (show =false, type ="", msg ="") => {
    setAlert({ show:show, type:type, msg:msg, })
  }

  const clearList = () => {
    showAlert(true, 'danger', 'empty list');
    setList([]);
  }

  // look for the id
  const removeItem = (id) => {
    // show the alert and set the list to the new values
    showAlert(true, 'danger', 'item removed');
    // list.filter will return a new array which the ID does not matched
    setList(list.filter((item) => item.id !== id))
  }

  const editItem = (id) => {
    // get the item who id matches
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  }

  return (
    <section className ="section-center">
      <form className ="grocery-form" onSubmit ={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert ={showAlert} list ={list}/>}
        <h3>Grocery bud</h3>
        <div className ="form-control">
          <input 
            type ="text" 
            className ="grocery" 
            placeholder ="e.g pray"
            value ={name}
            onChange ={(e) => setName(e.target.value)}
          />
          <button type ="submit" className ="submit-btn">
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 &&
        <div className ="grocery-container">
          <List items ={list} removeItem ={removeItem} editItem ={editItem}/>
          <button className ="clear-btn" onClick ={clearList}>
            Clear Items
          </button>
        </div>
      }
    </section>
  );
}

export default App
