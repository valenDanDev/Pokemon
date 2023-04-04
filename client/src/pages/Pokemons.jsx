import React from "react";
import Pag from "../components/Pagination.jsx";
import Cards from "../components/Cards.jsx";

const PokePage = () => {
    return (
        <React.Fragment>
             <div >
                <nav>
                    <div >PokemPage</div>
                    <Pag/>
                    <Cards/>
                </nav>
                <nav>


                </nav>

             </div>        
        </React.Fragment>
    )
};

export default PokePage;