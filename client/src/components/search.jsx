import React from 'react';
import CardPok from './Card';
import {useDispatch,useSelector} from 'react-redux';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import searchImage from "../tools/search.png";
import { useState } from "react";
import { searchPokemonByName,getAllPokemons } from "../redux/actions";

const SearchC = () => {
    var [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const [name, setName] = useState('');


    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value.toLowerCase());
      }
      function handleSubmit(e) {
        e.preventDefault();
        dispatch(searchPokemonByName(name));
        setName('');
        setShow(show=true);
      }

      function handleClick(e){
        e.preventDefault();
        dispatch(getAllPokemons());
        setShow(show=false);
    }

    return(
        <div >
            <input
                type="text"
                value={name}
                name='name'
                placeholder="Pokemon Name..."
                onChange={handleInputChange}
            />
            <button  type="submit" onClick={handleSubmit}>
              buscar
            </button>
            <button className={`buton_bs ${!show ? "hide-lightboxs" : ""}`} onClick={(e) => {handleClick(e); }}   > Back</button>
          </div>
    )
}
export default SearchC;