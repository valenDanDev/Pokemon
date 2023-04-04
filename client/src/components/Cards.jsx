import React from 'react';
import CardPok from './Card';
import {getAllPokemons} from '../redux/actions';
import {useDispatch,useSelector} from 'react-redux';
import { useEffect } from 'react';
import styles from './Cards.module.css'
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SearchC from './search';
import SearchResults from './SearchResults';

const Cards = () => {
    const dispatch = useDispatch(); 
    let page = useSelector(state => state.page);
    // const allPokemons = useSelector(state => state.pokemons);
    const filteredPoke = useSelector(state => state.filteredPokemons);
    const [showResults, setShowResults] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        dispatch(getAllPokemons());
    }, [dispatch])

    function handleSearch(results) {
        setShowResults(true);
        setSearchResults(results);
      }

    function handleSearch(results) {
        setShowResults(true);
    setSearchResults(results);
      }

      function handleBack() {
        setShowResults(false);
      }

    return(
        <Container>
           
         <SearchC onSearch={handleSearch} />
         {showResults && <SearchResults results={searchResults} onBack={handleBack} />}
        <Row lg={1}>
             <Col className="d-flex flex-wrap">
        {
            (filteredPoke.length  > 0 ) ? 
            filteredPoke.map(
            pokemon => <CardPok 
            key={pokemon.id} 
            id={pokemon.id} 
            name={pokemon.name}
            image={pokemon.image} 
            types={pokemon.types} />) :
            <p>no</p>
        }
        </Col>
        </Row>
        </Container>
    )
}
export default Cards;