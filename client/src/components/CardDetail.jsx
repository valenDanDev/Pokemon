import React, { useEffect } from "react";
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from "react-redux";
import { getPokemonById,clean } from "../redux/actions/index.js";
import logoPoke from "../tools/logo.png";
import health from "../tools/health.ico";
import attack from "../tools/attack.ico";
import defense from "../tools/defense.ico";
import speed from "../tools/speed.ico";
import weight from "../tools/weight.ico";
import height from "../tools/height.ico";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
// import { useState } from "react";
// import Colors from "../components/ColorsType.jsx";

const DetailPage = () =>{

    const { id } = useParams();
    console.log({id})
    const dispatch = useDispatch();
    const pokemon = useSelector((state) => state.pokemon);

    useEffect(() => {
        dispatch(getPokemonById(id));
      }, [dispatch, id]);



    function handleClick(e) {
        dispatch(clean());
    }
    
    
    return(
        <React.Fragment>
            <Card className='m-2' style={{ width: '45rem' }} >
                <nav >
                   
                    <div >PokemPage</div>
                    <Link to="/pokemons">
                        <button onClick={(e) => {handleClick(e)}}>Back</button>
                    </Link>
                </nav>
                <div >
                    <Col className='lg={2}' >
                        
                        <h3  >Id:{pokemon.id_Pokemon} </h3>
                        {/*<p>{pokemon.id_Pokemon}</p> */}
                        <Card.Img  src={pokemon.image}/>
                        <Card.Title >{pokemon.name}</Card.Title>
                    </Col>
                    <Col className="d-flex flex-wrap" >
                        <div >
                            <div>
                                <h3> <Card.Img  src={health}/> HEALTH: {pokemon.health}</h3>
                                <h3> <Card.Img  src={attack}/> ATTACK: {pokemon.attack}</h3>
                                <h3> <Card.Img src={defense}/> DEFENSE: {pokemon.defense}</h3>
                            </div>
                            <div>
                                <h3> <Card.Img src={speed}/> SPEED: {pokemon.speed}</h3>
                                <h3> <Card.Img src={weight}/> WEIGHT: {pokemon.weight}</h3>
                                <h3> <Card.Img  src={height}/> HEIGHT: {pokemon.height}</h3>
                            </div>
                        </div>
                        <div>
                            <h1 >Types : </h1>
                            {/* <Colors type = {pokemon.types[0]}/>
                            <Colors type = {pokemon.types[1]}/> */}
                            {/* <h3 className={styles.types}>{pokemon.types[1]}</h3> */}
                            
                        </div>
                        {console.log(pokemon.name)}
                        <h1 >{pokemon.name}</h1>
                    </Col>
                </div>
            </Card>
        </React.Fragment>
    )
}

export default DetailPage;