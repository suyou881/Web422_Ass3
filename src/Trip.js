import {Link, useParams, useNavigate} from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import { Button, Card, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';

export default function Trip(){
    const {id} = useParams();
    const navigate = useNavigate();

    const[trip, setTrip] = useState(null);
    const[loading, setLoading] = useState(true);

    useEffect(()=>{
        setLoading(true);
        fetch(`https://dry-ocean-88125.herokuapp.com/api/trips/${id}`)
        .then(res=>res.json())
        .then(data=>{
            setLoading(false);
            if(data.hasOwnProperty("_id")){ 
                setTrip(data); 
            }else{ 
                setTrip(null); 
            }
        });
    },[id]);

    function handleChange(e){
        const target = e.target;
        let value = target.value;
        const name = target.name;

        setTrip(curTrip=>{
            return {...curTrip, [name]:value}
        });
    }

    function handleSubmit(e){
        e.preventDefault();
        delete trip._id;
        console.log(trip);
        fetch(`https://dry-ocean-88125.herokuapp.com/api/trips/${id}`,{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(trip)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('success:', data);
        })
        .then(()=>navigate(`/trips`))
        .catch((err) => {
            console.error('fail:', err);
        });

    }

    if(trip){
        return (
            <>
            <Card>
            <Card.Body>
                <Card.Title>{`Bike: ${trip.bikeid} (${trip.usertype}) ${trip._id}`}</Card.Title>
                <Card.Subtitle className="mb-1 text-muted">
                {`${trip["start station name"]} - ${trip["end station name"]}`}
                </Card.Subtitle>
            </Card.Body>
            </Card>
            <br/>
            <MapContainer 
                style={{ "height": "400px" }} 
                center={[
                    trip["start station location"]["coordinates"][1],
                    trip["start station location"]["coordinates"][0]
                ]} 
                zoom={15}> 
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> 
                <Marker position={[
                    trip["start station location"]["coordinates"][1],
                    trip["start station location"]["coordinates"][0]]}> 
                    <Tooltip permanent direction='right'>Start: {trip["start station name"]}</Tooltip> 
                </Marker> 
                <Marker position={[
                    trip["end station location"]["coordinates"][1],
                    trip["end station location"]["coordinates"][0]]}> 
                    <Tooltip permanent direction='right'>End: {trip["end station name"]}</Tooltip> 
                </Marker>
            </MapContainer>
            <br/>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Bike ID</Form.Label>
                    <Form.Control type="number" name="bikeid" value={trip.bikeid} onChange={handleChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Birth Year</Form.Label>
                    <Form.Control type="number" name="birth year" value={trip["birth year"]} onChange={handleChange}/>
                </Form.Group>
                <Form.Check
                    type="radio"
                    label="Subscriber"
                    name="usertype"
                    value="Subscriber"
                    id="subscriber"
                    checked={trip.usertype==="Subscriber"}
                    onChange={handleChange}

                />
                <Form.Check
                    type="radio"
                    label="Customer"
                    name="usertype"
                    value="Customer"
                    id="customer"
                    checked={trip.usertype==="Customer"}
                    onChange={handleChange}
                />
                <hr />
                <Link to="/Trips" className="btn btn-secondary float-right ml-1">Back to Trips</Link>
                <Button type="submit" className="float-right" >Update Trip User</Button>
            </Form>
            </>
        )
    }else{
        return(
            <>
            <Card>
                <Card.Body>
                    <Card.Title>{`Unable to find Trip with id: ${id}`}</Card.Title>
                </Card.Body>
            </Card>
            </>
        )
    }
    
}