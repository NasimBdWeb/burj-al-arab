import React, { useContext, useState } from 'react';
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { getAuth, signInWithPopup, GoogleAuthProvider,signInWithEmailAndPassword  } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from '../Authentication/firebaseConfig'


import { UserContext } from '../../App';
import { useLocation, useNavigate } from 'react-router-dom';


function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loggedInuser,setloggedInuser] = useContext(UserContext)
  const [user, setUser] = useState({
       name:'',
       email:'',
       password:'',
       isSignedIn:false,
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

  const handleSignin=(event) => {
      if (user.email && user.password) {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, user.email, user.password)
          .then((res) => {
            const {displayName,photoURL,email} = res.user;
    
            const signedInuser={
                name: displayName,
                email: email
            }
            
            setUser(signedInuser)
            setloggedInuser(signedInuser)

            storeAuthToken(signedInuser)
             if(location.state?.from) 
            {navigate(location.state.from)}
            
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
          });
      }
      event.preventDefault();
  }
  
  const handleGoogle=()=>{
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => {
        const {displayName,photoURL,email} = res.user;

        const signedInuser={
            name: displayName,
            email: email
        }
        setUser(signedInuser)
        setloggedInuser(signedInuser)
       storeAuthToken()

        if(location.state?.from) 
             {navigate(location.state.from)}
      }).catch((error) => {
        
        const errorCode = error.code;
        const errorMessage = error.message;
        
        const email = error.customData.email;
        
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
  

  const storeAuthToken=()=>{
    getAuth().currentUser.getIdToken(/* forceRefresh */ true)
    .then(function(idToken) {
      sessionStorage.setItem('token',idToken);
    }).catch(function(error) {
      
    });
  }

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">

      <MDBRow>
          
        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
        </MDBCol>

        <MDBCol col='4' md='6'>

          <div className="d-flex flex-row align-items-center justify-content-center">

            <p className="lead fw-normal mb-0 me-3">Sign in with</p>
            

            <MDBBtn floating size='md' tag='a' className='me-2'>
              <MDBIcon fab icon='facebook-f' />
            </MDBBtn>

            <MDBBtn floating size='md' tag='a'  className='me-2'>
              <MDBIcon fab icon='twitter' />
            </MDBBtn>

            <MDBBtn floating size='md' tag='a'  className='me-2' onClick={handleGoogle}>
              <MDBIcon fab icon='google' />
            </MDBBtn>

          </div>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0"></p>
          </div>
          <form onSubmit={handleSignin}>
          <MDBInput className='mb-4' label='Email address' name='email' onChange={handleChange}  type='email' size="lg"/>
          <MDBInput className='mb-4' label='Password' name='password' onChange={handleChange}  type='password' size="lg"/>

          <div className="d-flex justify-content-between mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!#">Forgot password?</a>
          </div>

          <div className='text-center text-md-start mt-4 pt-2'>
            <MDBBtn className="mb-0 px-5" size='lg'>Login</MDBBtn>
            </div>
           </form>
           <div className='text-center text-md-start mt-4 pt-2'>
            <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <span onClick={()=> navigate('/signup')} className="link-danger">Register</span></p>
            </div>
          
        </MDBCol>

      </MDBRow>

      
    </MDBContainer>
  );
}

export default Login;