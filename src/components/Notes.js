import React, { useEffect } from 'react'
import Notesitem from './Notesitem'
import { useContext } from 'react'
import noteContext from '../context/notes/NoteContext'
import extraContext from '../context/notes/ExtraContext';
import { useState } from 'react';
import './Style.css';
import {useNavigate} from 'react-router-dom'


function Notes() {
    const context = useContext(noteContext);
    const notes = context.data;
    const fetchNotes = context.fetchNotes;
    const editnote = context.updateNote;
    const context2 = useContext(extraContext);
    const model = context2.model;
    const toggleModel = context2.toggleModel;
    const showAlert = context2.showAlert;
    const navigate = useNavigate();

    const [note,setNote] = useState({title:"" ,description:"",tag:""});
    const [id,setId] = useState('');
    
    useEffect(()=>{
      if(!localStorage.getItem('token')){
        navigate('/login');
        showAlert("Warning","Login Or SignUp To View Note")
      }else{
        fetchNotes();
      }
        
        // eslint-disable-next-line
    },[])

    const updateNote = (currentNote) =>{
        toggleModel();
        setNote(currentNote);
        setId(currentNote._id)
    }

    const closeModel = ()=>{
        toggleModel();
    }

    const handelchange = (event) =>{
        const{name,value} = event.target;
        if(name === "etitle"){
          setNote({ title: value, description : note.description, tag:note.tag})
        }else if(name === "edescription"){
          setNote({ title: note.title, description: value, tag: note.tag})
        }else if(name === "etag"){
          setNote({title: note.title, description: note.description, tag: value})
        }
      }

    const handelSubmit = async(event) => {
        event.preventDefault();   
        try {
          const response = await editnote(id,note.title,note.description,note.tag);
          if(response && response.success){
            showAlert("Success","Note Updated");
          }else{
            showAlert("Warning", response.message);
          }
        } catch (error) {
          console.log("API Error: " + error.message);
        }
       
        toggleModel(); 
        
    };
  return (
    <>
     {model && (
        <div id="overlay">
          <div id="model">
            <div className="model-row1">
              <i className="fa-solid fa-xmark fa-xl model-close-btn" style={{ color: "#6d6d6f" }} onClick={closeModel}></i>
            </div>

            <div className="heading">
              <p>Edit Your Note</p>
            </div>
            <div className="add-form">
              <form method="get" onSubmit={handelSubmit}>
                <input type="text" placeholder="Enter Your Note Title" id="etitle" name="etitle"  value={note.title} onChange={handelchange}required minLength={5} />
                <input type="text" placeholder="Enter Your Description" id="edescription" name="edescription" value={note.description} onChange={handelchange} required minLength={5}/>
                <input type="text" placeholder="Enter Your Notes Tag" id="etag" name="etag"  value={note.tag} onChange={handelchange} required minLength={5}/>
                <input type="submit" value="Save Changes" className="submit"/>
              </form>
            </div>
          </div>
        </div>
      )}
   
    <div className='notes-container'>
         
        <div className="heading">
            <p>Your Notes</p>
        </div>
        <div className='notesitem-container'>
          
        {notes.length===0 && 'No Notes Are Present Create Your Note From Above'}
            {notes.map((note)=>{
                return <Notesitem key={note._id} note={note} updateNote={updateNote}/>

            })}
         

        </div>
    </div>
    </>
  )
}

export default Notes
