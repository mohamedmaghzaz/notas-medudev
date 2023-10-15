import { useEffect, useState } from 'react';
import './App.css';
import Note from './Note';
import getAllNotes from './services/notes/getAllNotes';
import createNote from './services/notes/createNote';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true)
    getAllNotes().then(notes => {
      setNotes(notes)
      setLoading(false);
    })
  }, []);



  const handleChange = (e) => {
    setNewNote(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('crear nota');
    const noteToAddToState = {
      title: newNote,
      body: newNote,
      userId: 1
    };

    setError('');

    createNote(noteToAddToState)
      .then((newNote) => {
        setNotes((prevNotes) => prevNotes.concat(newNote));
      })
      .catch((error) => {
        console.error(error);
        setError('La API ha petado');
      })

    setNewNote('');
  };
  return (
    <div>
      <h1>Notes</h1>
      {
        loading ? 'Cargando...' : ''
      }

      <ol>
        {notes
          .map(note => (
            <Note key={note.id} {...note} />
          ))}
      </ol>
      <form onSubmit={handleSubmit} >
        <input type='text' onChange={handleChange} value={newNote} />
        <button>Crear nota</button>
      </form>
      {error ? <span style={{ color: 'red' }}>{error}</span> : ''}
    </div>

  );
}
export default App;
