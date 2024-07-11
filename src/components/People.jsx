import PropTypes from 'prop-types'
import { Person } from './Person'
import { useState } from 'react'

export const People = ({persons, setPersons}) => {
  // manejo de id de la persona
  const [editingId, setEditingId] =useState (null)

  // manejo de estado, para  objecto de cada persona y los setea vaciso para poder capturarlos
  const [editedPerson, setEditedPerson] = useState({
    name: '',
    role: '',
    img:''
  });
  // Varible de estado  para saber si hay un proceo de edición
  const [isEditing, setIsEditing] = useState(false)

  
  // Estado para guardar la persona eliminada
  const [personToDelete, setPersonToDelete] = useState(null);

  //método para manejar los cambios del formulario
  const handleChange = (e) => {
    const {name, value} = e.target;
    // Enviamos en función fecha para actuliozar el estado de la persona que edita y lo guarde en el array
    setEditedPerson((prev) => ({...prev, [name]: value}));
  }
  //método para crear nuevo empleado
  const handleCreate = (e) => {
    e.preventDefault();
    setPersons([... persons, {id:persons.length +1, ...editedPerson}]);
    // resetear los campos
    setEditedPerson({name: '', role: '', img:''});
  }

  // método para editar los de la personas
  const hadleEdit =(id,e) =>{

    // EStablecemos el ID de la persona a editar
    setEditingId(id);
    // Activar estado de edición
    setIsEditing(true);
    // Obtener la persona a editar
    const personToEdit = persons.find((person) => person.id === id);
    // Actualizar el estado de la persona a editar
    setEditedPerson({...personToEdit});
  }

  // Método para actulizar los datos modificados
  const handleUpdate = (e) => {
    e.preventDefault();
    // Actulizar el estado de person del array
    const personToUpdate = persons.map(person => person.id === editingId ? editedPerson :person)

    //actulziar los datos de la persona en el arrya
    setPersons(personToUpdate);

    // desactivar el estado de edición
    setIsEditing(false);

    //Resetara la vairble delñ estado editingId a nulo
    setEditingId(null);

    //limpar contrles del estado editedPerson
    setEditedPerson({name: '', role:'', img:''});
  }

    // Métodos para eliminar una persona del array

  // Obtener el id de la persona a eliminar del array
  const handleDelete = (id) => {
    setPersonToDelete(id);
  }

  const confirmDelete = () => {
    setPersons(persons.filter(person => person.id !== personToDelete));
    setPersonToDelete(null);
  }

  const cancelDelete = () => {
    setPersonToDelete(null);
  }
  return (
    <div>
        <h2 className='text-center my-4'>IT Team</h2>
        <div className="container">
        <div className='row d-flex flex-wrap row-cols-1 row-cols-md-2 row-cols-lg-3'>
        {persons.map((person)=>{
            return (
            <div key={person.id} >
                <Person
            name={person.name}
            img={person.img}
            role={person.role}
            handleEdit={()=> hadleEdit (person.id)}
            handleDelete={handleDelete}
            />
            </div>
          )})}
        </div>
        </div>
        {/* Renderizar formulario */}
        <div className='container mt-4 row p-2'>
        <h2>{isEditing ?'Actulizar empleado':'Crear empleado'}</h2>
      <form className='border border-dark rounded p-4'>
        <div className="mb-3">
          <label className="form-label">Nombres</label>
          <input type="text" className="form-control" aria-describedby="nombre" name='name' value={editedPerson.name} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Cargo</label>
          <input type="text" className="form-control" name='role' value={editedPerson.role} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Avatar</label>
          <input type="text" className="form-control" name='img' value={editedPerson.img} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary" onClick={isEditing ?handleUpdate: handleCreate}>{isEditing ?'Actulizar ':'Crear'}</button>
      </form>
      </div>
      {/* Renderización para apertura de modal */}
      <div id="deleteModal" className='modal fade' tabIndex="-1">
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>Confirmar Eliminación</h4>
              <button type="button" className='btn-close' data-bs-dismiss="modal" aria-label="Close" onClick={cancelDelete}></button>
            </div>
            <div className='modal-body'>
              <p>¿Estás seguro de eliminar a {persons.find(person => person.id === personToDelete)?.name}</p>
            </div>
            <div className='modal-footer'>
              <button type="button" className='btn btn-secondary' data-bs-dismiss="modal" onClick={cancelDelete}>Cancelar</button>
              <button type="button" className='btn btn-danger' data-bs-dismiss="modal" onClick={confirmDelete}>Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

People.propTypes ={
    persons: PropTypes.array,
    setPersons: PropTypes.func
}
