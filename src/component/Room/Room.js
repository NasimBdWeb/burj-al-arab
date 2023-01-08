import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import '../Room/Room.css'

const Room = () => {
    const rooms = [{
        title : 'Single Room',
        description : 'Special Single Room',
        imgUrl : 'https://github.com/ProgrammingHero1/burj-al-arab/blob/master/src/images/Family.png?raw=true',
        bed :1,
        bedtype: 'single',
        capacity : 1,

    },

    {
        title : 'Family Room',
        description : 'Special Family Room',
        imgUrl : 'https://github.com/ProgrammingHero1/burj-al-arab/blob/master/src/images/Single.png?raw=true',
        bed :2,
        bedtype: 'double',
        capacity : 2,

    },

    {
        title : 'Third Room',
        description : 'Third Room',
        imgUrl : 'https://github.com/ProgrammingHero1/burj-al-arab/blob/master/src/images/Family.png?raw=true',
        bed :1,
        bedtype: 'single',
        capacity : 1,

    },
    {
        title : 'Four Room',
        description : 'Four Room',
        imgUrl : 'https://github.com/ProgrammingHero1/burj-al-arab/blob/master/src/images/Family.png?raw=true',
        bed :1,
        bedtype: 'single',
        capacity : 1,

    }
  
  
  
  
  ]

  const navigate = useNavigate();

  const action=()=>{
    navigate("/book");
  }
    return (
   <>
   {
    rooms.map((item, index)=> {
        return <div  key={index}>
              <Card className='card' style={{ width: '18rem' }}>
        <Card.Img variant="top" src={item.imgUrl} />
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
          <Card.Text>
            Description : {item.description} <br />
            bed : {item.bed} <br />
            bedtype : {item.bedtype} <br />
            capacity : {item.capacity}
          </Card.Text>
          <Button onClick={action} variant="primary">Book</Button>
        </Card.Body>
      </Card>
    </div>
    })
   }
   
   </>
    );
};

export default Room;