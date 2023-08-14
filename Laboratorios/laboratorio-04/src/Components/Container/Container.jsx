import React, { useState, useEffect } from "react";
import "./Container.css";
import FormContainer from "./FormContainer/FormContainer";
import CardContainer from "./CardContainer/CardContainer";
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Container = () => {
    const [note, setNote] = useState("");
    const [notes, setNotes] = useState([]);
    const [showAlert, setShowAlert] = useState(false);

    const toastAlert = () => {
        //setShowAlert(true);
        toast.warning("The note can't be empty", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true,
            closeButton: false,
            pauseOnFocusLoss: false,
            draggable: false,            
        });
        /*setTimeout(() => {
            setShowAlert(false);
        }, 4000);*/
    }

    const swalAlert = () => {
        setShowAlert(true);
        
        Swal.fire({
            title: 'Alert!',
            text: `The note can't be empty`,
            icon: 'warning',
            timer: 4000,
            timerProgressBar: true,
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
        });
        setTimeout(() => {
            setShowAlert(false);
        }, 4000);
    }

    const addNote = (note) => {
        if (note.length < 1) {
            if (showAlert) {
                return;
            }
            toastAlert();
            swalAlert();
            return;
        }
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        
        const noteObj = {
            id: Date.now(),
            note,
        };

        notes.push(noteObj);
        console.log(notes);
        localStorage.setItem("notes", JSON.stringify(notes));

        setNotes(notes);
    };

    const deleteNote = (id) => {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        const newNotes = notes.filter((note) => note.id !== id);
        
        localStorage.setItem("notes", JSON.stringify(newNotes));

        setNotes((prevNotes) => {
            return prevNotes.filter((note) => note.id !== id);
        });
    };

    const editNote = (id, note) => {
        const notes = JSON.parse(localStorage.getItem("notes") || []);
        const noteIndex = notes.findIndex((note) => note.id === id);

        if (note.length < 1) {
            if (showAlert) {                
                return;
            }
            toastAlert();
            swalAlert();
            return;
        }
        notes.splice(noteIndex, 1, { id, note });

        localStorage.setItem("notes", JSON.stringify(notes));
        setNotes(notes);
    };

    useEffect(() => {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        setNotes(notes);
    }, [note]);

    return(
        <div className="container">            
            <div className="container">
                <FormContainer onAddNote={addNote} />
                <CardContainer onNotes={notes} onDelete={deleteNote} onEdit={editNote} />                
            </div>
            <ToastContainer autoClose={4000}/>
        </div>
    );
};

export default Container;