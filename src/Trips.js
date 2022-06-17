import { useState, useEffect } from "react"
import { Badge, Card, Pagination, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Trips(){
    const navigate = useNavigate();

    const perPage = 10;
    const [trips, setTrips] = useState(null);
    const [page, setPage] = useState(1);

    useEffect(()=>{
        fetch(`https://dry-ocean-88125.herokuapp.com/api/trips?page=${page}&perPage=${perPage}`)
        .then(res=>res.json())
        .then(data=>{
            //console.log(data);
            setTrips(data);
        });
        
    },[page])

    function previousPage(){
        if(page>1){
            setPage(page-1);
        }
    }

    function nextPage(){
        setPage(page+1);
    }

    if(trips){
        return (
            <>
                <Card>
                <Card.Body>
                    <Card.Title>Trips List</Card.Title>
                    <Card.Subtitle className="mb-1 text-muted">
                    Full list of Citibike Trips.
                    </Card.Subtitle>
                    <Card.Text>
                    <div className="float-right">
                        <Badge className="Subscriber">Subscribers</Badge>
                        <Badge className="Customer">customers</Badge>
                    </div>
                    </Card.Text>
                </Card.Body>
                </Card>
                <br/><br/>
    
                <Table bordered hover className="table">
                <thead>
                    <tr>
                    <th scope="col">Bike ID</th>
                    <th scope="col">Start Station</th>
                    <th scope="col">End Station</th>
                    <th scope="col">Duration (Minutes)</th>
                    </tr>
                </thead>
                <tbody>
                    {trips.map((trip)=>{
                        return (
                            <tr key={trip._id} className={trip.usertype} onClick={()=>{navigate(`/Trip/${trip._id}`)}}>
                                <td>{trip.bikeid}</td>
                                <td>{trip["start station name"]}</td>
                                <td>{trip["end station name"]}</td>
                                <td>{(trip.tripduration/60).toFixed(2)}</td>
                            </tr>
                        )
                    })}
                </tbody>
                </Table>

                <Pagination className="Pagination"> 
                    <Pagination.Prev onClick={previousPage}/> 
                    <Pagination.Item>{page}</Pagination.Item> 
                    <Pagination.Next onClick={nextPage}/> 
                </Pagination>
            </>
          );
    }else{
        return (
            <h1>Loading trips..</h1>
        )
    }
    
}