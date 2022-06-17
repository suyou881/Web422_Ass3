import {Card} from 'react-bootstrap';

export default function About(){
    return (
      <Card>
        <Card.Body>
          <Card.Title>Hyungchul You</Card.Title>
          <Card.Subtitle className="mb-3 text-muted">
            React, JAVA Spring Programmer
          </Card.Subtitle>
          <Card.Text>
            I'm studying to become a full stack programmer
          </Card.Text>
        </Card.Body>
      </Card>
    );
}