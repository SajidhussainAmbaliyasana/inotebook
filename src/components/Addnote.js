import React, { useState } from "react";
import { useContext } from "react";
import noteContext from "../context/notes/NoteContext";
import extraContext from "../context/notes/ExtraContext";




function Addnote() {
  const context = useContext(noteContext);
  const addNote = context.addNote;
  const context2 = useContext(extraContext);
  const showAlert = context2.showAlert;
  
  const [note,setNote] = useState({title:"", description:"",tag:""})


  const handelchange = (event) =>{
    const{name,value} = event.target;
    if(name === "title"){
      setNote({ title: value, description : note.description, tag:note.tag})
    }else if(name === "description"){
      setNote({ title: note.title, description: value, tag: note.tag})
    }else if(name === "tag"){
      setNote({title: note.title, description: note.description, tag: value})
    }
  }

  const handelSubmit = async(event) => {
    event.preventDefault();
    try {
      const response = await addNote(note.title,note.description,note.tag);
      if(response && response.success){
        showAlert("Success", "Note Added");
      }else{
        showAlert("Warning", response.message)
      }
    } catch (error) {
      console.log("API Error: " + error.message);
    }
    
    setNote({title:"", description:"",tag:""});
    
  };

  return (
    <div className="add-note">
      <div className="heading">
        <p>Add Your Note</p>
      </div>
      <div className="add-form">
        <form method="get" onSubmit={handelSubmit}>
          <input type="text" placeholder="Enter Your Note Title" id="title" name="title" onChange={handelchange} value={note.title} required minLength={5} />
          <input type="tex" placeholder="Enter Your Description" id="description" name="description" onChange={handelchange} value={note.description} required minLength={5}/>
          <input type="text" placeholder="Enter Your Notes Tag" id="tag" name="tag" onChange={handelchange} value={note.tag} required minLength={5}/>
          <input type="submit" value="Create Your Note" className="submit" />
        </form>
      </div>
    </div>
  );
}

export default Addnote;
