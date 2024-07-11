import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Person } from './components/Person'
import { People } from './components/People'


function App() {
      // Crear un array de objetos para denderizar a las personas
      const [persons, setPersons] = useState([
        { id:1, name: 'Juan', role: 'Frontend developer', img:"https://bootdey.com/img/Content/avatar/avatar1.png" },
        { id: 2, name: 'Pedro',role: 'Backend developer',img:"https://bootdey.com/img/Content/avatar/avatar2.png" },
        { id: 3, name: 'Maria', role: 'QA' ,img:"https://bootdey.com/img/Content/avatar/avatar3.png"}
    ]);

  return (
    <>
      <div className="container">
        <div className="container">
        <People persons={persons} setPersons ={setPersons}/>
        </div>
      </div>
    </>
  )
}

export default App
