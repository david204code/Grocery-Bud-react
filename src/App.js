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
    }
    else {
      // show alert
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

  return (
    <section className ="section-center">
      <form className ="grocery-form" onSubmit ={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert ={showAlert}/>}
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
          <List items ={list}/>
          <button className ="clear-btn">
            Clear Items
          </button>
        </div>
      }
    </section>
  );
}

export default App
