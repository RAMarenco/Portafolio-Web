import Form from "./Form/Form";
import "./FormContainer.css";

const FormContainer = ({ onAddNote }) => {    
    const addNoteHandler = (note) => {
        onAddNote(note);
    };
    return (
        <div className="form-container">
          <Form onAddNoteHandler={addNoteHandler} />
        </div>
    );
}

export default FormContainer;