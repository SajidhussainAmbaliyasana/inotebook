import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const [data, setData] = useState([]);

  const fetchNotes = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    };
    console.log(localStorage.getItem('token'));
    const response = await fetch(`${host}/api/notes/fetchallnotes`,requestOptions);
    const parsed_data = await response.json();
    console.log(parsed_data.notes);
    setData(parsed_data.notes);
  };

  const addNote = async (title, description, tag) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    };
    try {
      const add_note = await fetch(`${host}/api/notes/addnotes`, requestOptions);
      const newnote = await add_note.json();
      const status = newnote.success
      if(status){
        setData(data.concat(newnote.saved_notes));
        return newnote;
      }
    } catch (error) {
      console.log("Api Error" + error.message);
      throw error; // Re-throw the error to be caught in the calling function
    }
    
  };

  const deleteNote = async (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    };
    try {
      const delete_note = await fetch(`${host}/api/notes/deletenote/${id}`,requestOptions);
      const response = await delete_note.json();
      const status = response.success;
      if (status) {
        const newNotes = data.filter((note) => {
          return note._id !== id;
        });
  
        setData(newNotes);
        return response;
      } 

      
    } catch (error) {
      console.log("Api Error" + error.message);
      throw error; // Re-throw the error to be caught in the calling function
    }
  };

  const updateNote = async (userid, title, description, tag) => {
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    };
    try {
      const updateNote = await fetch(`${host}/api/notes/updatenote/${userid}`,requestOptions);
      const response = await updateNote.json();
      const status = response.success;
      if (status) {
        
        let newNotes = JSON.parse(JSON.stringify(data));
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if (element._id === userid) {
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
          }
        }
        setData(newNotes);
        return response;
      }
    } catch (error) {
      console.log("Api Error" + error.message);
      throw error; // Re-throw the error to be caught in the calling function
    }
   
  };

  return (
    <NoteContext.Provider
      value={{ data, addNote, fetchNotes, deleteNote, updateNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
