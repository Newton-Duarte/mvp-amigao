import { useEffect, useRef, useState } from 'react';
import { FiSliders } from 'react-icons/fi';
import { Button } from '../Button';
import { ButtonIcon } from '../ButtonIcon';
import { Input } from '../Form';
import { Tooltip } from '../Tooltip';
import { Container, Append, Filters } from './styles';

export function SearchBar({ containerStyle = {}, filters, onSaveFilter, children, ...rest }) {
  const filtersRef = useRef()
  const searchBarRef = useRef()
  const [showFilters, setShowFilters] = useState(false)
  const [date, setDate] = useState({
    start: new Date().toISOString().substr(0, 10),
    end: new Date().toISOString().substr(0, 10)
  })

  function handleClickOutside (event) {
    if (showFilters) {
      if (
        filtersRef.current &&
        !filtersRef.current.contains(event.target) &&
        searchBarRef &&
        !searchBarRef.current.contains(event.target)
      ) {
        setShowFilters(false)
      }
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    } 
  })

  const handleFilter = () => {
    onSaveFilter({
      ...date
    })

    setShowFilters(false)
  }

  return (
    <Container
      ref={searchBarRef}
      style={containerStyle}
    >
      <Input type="search" {...rest} />
      {filters && (
        <Append>
          <Tooltip text="Filtros">
            <ButtonIcon
              onClick={() => setShowFilters(!showFilters)}
            >
              <FiSliders size={16} />
            </ButtonIcon>
          </Tooltip>
        </Append>
      )}
      {showFilters && (
        <Filters ref={filtersRef}>
          <Input
            type="date"
            label="Data Inicial"
            value={date.start}
            onChange={({ target }) => setDate({ ...date, start: target.value })}
            containerStyle={{ height: '73px', marginBottom: '1rem', fontWeight: 'bold' }}
          />
          <Input
            type="date"
            label="Data Final"
            value={date.end}
            onChange={({ target }) => setDate({ ...date, end: target.value })}
            containerStyle={{ height: '73px', fontWeight: 'bold' }}
          />
          {children}
          <Button id="save" onClick={handleFilter}>Salvar</Button>
        </Filters>
      )}
      
    </Container>
  )
}