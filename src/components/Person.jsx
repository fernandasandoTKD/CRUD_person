import PropTypes from 'prop-types'
// Coloco en la función lo que me traigo del padre y le indico el tipo con proTypes
export const Person = ({id,name, role, img, handleEdit,handleDelete}) => {
// se desestrucutra lo que se envia del padre
  return (
    <div className="col">
        <div className="card" style={{width:"18rem"}}>
        <img src={img} alt={name}  className='card-img-top'/>
        <div className="card-body">
        <h3 className='card-text'>{name}</h3>
        <p className='card-text'>{role}</p>
        </div>
        <div className="container mb-4 text center">
            <button className="btn btn-success me-2" onClick={handleEdit}>Editar</button>
            <button className='btn btn-danger' onClick={() => handleDelete(id)} data-bs-toggle="modal" data-bs-target="#deleteModal">Eliminar</button>
        </div>
        </div>
    </div>
  )
}

// Tipato de elementos a recibir.
Person.propTypes={
    id: PropTypes.number,
    name: PropTypes.string,
    role: PropTypes.string,
    img: PropTypes.string,
    handleEdit: PropTypes.func,
    handleDelete: PropTypes.func
}