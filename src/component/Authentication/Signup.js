import React, { useContext, useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon
}
from 'mdb-react-ui-kit';
import { getAuth, createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';

function Signup() {
  const[loggedInUser,setloggedInUser] =  useContext(UserContext);
  const navigate = useNavigate()
  const [user,setUser] = useState({
    fname:'',
    lname:'',
    email:'',
    password:'',
    photo:''
  })

  const handleChange=(event) => {
    let isFieldValid = true;
       if (event.target.name === 'email') {
       isFieldValid = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value))
       }
       if (event.target.name === 'password') {
        isFieldValid = /\d{6}/.test(event.target.value)
       }
       if (isFieldValid){
         const newUserinfo ={...user};
         newUserinfo[event.target.name] = event.target.value;
         setUser(newUserinfo)
       }
       event.preventDefault();
  }

  const handleSignup=(event)=>{
      if(user.email && user.password){
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, user.email, user.password)
          .then((res) => {
             const newUserinfo={...user}
             setUser(newUserinfo)
             setloggedInUser(newUserinfo)
             updateUser(user.fname, user.lname)
               
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
          });
      }
      event.preventDefault();
  }

   const updateUser = (fname,lname)=>{
    const auth = getAuth();

    updateProfile(auth.currentUser,{
      displayName: fname +''+ lname,
      // photoURL: photo
    }).then(() => {
     console.log('Successfully updated profile')
    }).catch((error) => {
      console.log(error.message)
    });
   }

  return (
    <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>

      <MDBRow>

        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

          <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{color: 'hsl(218, 81%, 95%)'}}>
            The best offer <br />
            <span style={{color: 'hsl(218, 81%, 75%)'}}>for your business</span>
          </h1>

          <p className='px-3' style={{color: 'hsl(218, 81%, 85%)'}}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Eveniet, itaque accusantium odio, soluta, corrupti aliquam
            quibusdam tempora at cupiditate quis eum maiores libero
            veritatis? Dicta facilis sint aliquid ipsum atque?
          </p>

        </MDBCol>

        <MDBCol md='6' className='position-relative'>
        
          <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
          <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
         
          <MDBCard className='my-5 bg-glass'>
            <MDBCardBody className='p-5'>
             
            <div>
            <form onSubmit={handleSignup}>
              <MDBRow>
                <MDBCol col='6'>
                  <MDBInput className='mb-4' label='First name' id='form1' type='text' name='fname'  onChange={handleChange}/>
                </MDBCol>

                <MDBCol col='6'>
                  <MDBInput className='mb-4' label='Last name' id='form2' type='text' name='lname'  onChange={handleChange}/>
                </MDBCol>
              </MDBRow>

              <MDBInput className='mb-4' label='Email' id='form3' type='email' name='email'  onChange={handleChange}/>
              <MDBInput className='mb-4' label='Password' id='form4' type='password' name='password'  onChange={handleChange}/>


              <MDBBtn className='w-100 mb-4' size='md'>sign up</MDBBtn>
              
              </form>
              </div>
              <div className="text-center">
              <div >
            <p className="small fw-bold mt-2 pt-1 mb-2">Already have an account? <span onClick={()=> navigate('/login')} className="link-danger">Login</span></p>
            </div>
            
                <p>or sign up with:</p>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='facebook-f' size="sm"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='twitter' size="sm"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='google' size="sm"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='github' size="sm"/>
                </MDBBtn>

              </div>
            
            </MDBCardBody>
          </MDBCard>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default Signup;