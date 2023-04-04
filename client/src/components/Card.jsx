import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';

function CardPok({name,image,id}) {
  return (
         <Card className='m-2' style={{ width: '18rem' }}>
           <Card.Img variant="top" src={image} alt="Img not found"/>
             <Card.Body>
               <Card.Title>{name}</Card.Title>
                 <Card.Text>
                   Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
             <Button variant="primary"> <Link  style={{color: 'white'}} to={`/pokes/${id}`}>  Get pokemon Details  </Link></Button>
            
             </Card.Body>
        </Card>
  );
}

export default CardPok;