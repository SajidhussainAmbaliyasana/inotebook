import React from 'react'
import { useContext } from "react";
import noteContext from "../context/notes/NoteContext";
import extraContext from '../context/notes/ExtraContext';


function Notesitem(props) {

  const Context = useContext(noteContext);
  const deleteNote = Context.deleteNote;
  const {note,updateNote} = props;
  const context2 = useContext(extraContext);
  const showAlert = context2.showAlert;

  const handelDelete = async()=>{
    const id = note._id;
    try {
      const response = await deleteNote(id);
      if(response && response.success){
        showAlert("Success",response.message);
      }else{
        showAlert("Warning", response.message);
      }
    
    } catch (error) {
      console.log("API Error: " + error.message);
    }
    
  }

  
  return (
    <>
   
    <div className='notes-item'>
        <div className="note-heading"><p>{note.title}</p></div>
        <p className='note-des'>{note.description} </p>
        <div className="note-row">
          
          <i className="fa-solid fa-trash fa-lg cursor" style={{color: "#666666",}} onClick={handelDelete}></i>
          <i className="fa-solid fa-pen-to-square fa-lg cursor" style={{color: "#666666",}} onClick={()=>{updateNote(note)}}></i>
        </div>
       
    </div>
    
    </>
  )
}

export default Notesitem
