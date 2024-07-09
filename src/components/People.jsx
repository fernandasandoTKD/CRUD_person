import PropTypes from 'prop-types'

export const People = ({persons, setPersons}) => {
  return (
    <div>People</div>
  )
}

People.propTypes ={
    persons: PropTypes.object,
    setPersons: PropTypes.func
}
