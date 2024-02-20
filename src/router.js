import React, {useState} from 'react'
import { BrowserRouter, NavLink, Route , Routes,  Link  } from 'react-router-dom'
import styles from "./HomeBeforeLogin.module.css"
import HomeBeforeLogin from './HomeBeforeLogin.js'
import SignUp from './SignUp.js'
import { getByDisplayValue } from '@testing-library/react'
import stylesSignUp from "./SignUp.module.css"

import { Nav, Navbar, NavDropdown, NavItem, Container} from 'react-bootstrap'
import { CenterFocusStrong } from '@material-ui/icons'

export default function Router1() 
{ 
    const [image, setImage] = useState(null)
    const [email, setEmail] = useState(null)
   
    const load = () => {

        //localStorage.clear();
        setImage(localStorage.getItem('imagecontact'))
        setEmail(localStorage.getItem('email'))
    }

  
    const logout = ()=>{
       
        localStorage.clear();
        setImage(localStorage.getItem('imagecontact'))
         
    }

    return (       

        <div className={styles.homeBeforeLogin} onLoad={load}>
        <BrowserRouter>

                <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand className={'col col-lg-6'} > <div className={styles.frameChild}><NavLink to="/" className={styles.logo}>LOGO</NavLink></div></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" >
                    <Nav className='col col-lg-6'>
                        <Nav.Link href="/" style={{right: 'calc(40%)', position: 'relative'}} >Home</Nav.Link>  
                    </Nav>

                    {image ?  
                        <Nav className="me-auto">
                                        

                        <NavDropdown style={{position: 'relative', textAlign: 'center !important'}} eventKey={1} 
                            title={
                                <div className="pull-left">
                                    <img className="thumbnail-image" 
                                        src={image ? image : "/pic.png"}
                                        alt="user pic" style={{width: 40, position: 'relative', borderRadius: '50%'}}
                                    />                                                          
                                </div>
                            } 
                            id="basic-nav-dropdown">     
                            <NavDropdown.Item style={{textAlign: 'center'}} >  <div className="pull-left">
                                    <img className="thumbnail-image" 
                                        src={image ? image : "/pic.png"}
                                        alt="user pic" style={{width: 40, position: 'relative', textAlign: 'center', borderRadius: '50%'}}
                                    />                                                          
                                </div> <span>{ email.split("@")[0]  }</span></NavDropdown.Item>        
                                           
                            <NavDropdown.Item href="/" style={{textAlign: 'center'}} >Profile</NavDropdown.Item>                         
                            <NavDropdown.Item style={{textAlign: 'center'}}>
                                <Link to="/" type='button' onClick={logout} ><i className="fa fa-sign-out"></i> Logout</Link>                                 
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    :
                        <Nav className="me-auto">
                            <div className={styles.buttonNewDefault}>
                            <NavLink to="Signup" className={styles.signIn} >Sign in</NavLink>
                            </div>
                        </Nav>
                    }
             
                    </Navbar.Collapse>
                </Container>
                </Navbar>

                 {/* <a className={styles.buttonRegistered} href="#"><img id="img" alt="" src={image ? image : "/pic.png"} className={styles.contact} /></a>                   */}

            {/* <div className={styles.header}>
                <div className={styles.ellipseParent}>
                <div className={styles.frameChild} />
                <NavLink to="/" className={styles.logo}>LOGO</NavLink>              
  
                </div>
                {image ?  
                  
                     <Nav pullRight>
                     <NavDropdown eventKey={1} 
                         title={
                             <div className="pull-left">
                                 <img className="thumbnail-image" 
                                     src={image ? image : "/pic.png"}
                                     alt="user pic" style={{width: 40}}
                                 />
         
                               
                             </div>
                         } 
                         id="basic-nav-dropdown">
         
                         <NavDropdown.Item eventKey={1.1} href="/profile">Profile</NavDropdown.Item>
                         <NavDropdown.Item divider />
                         <NavDropdown.Item eventKey={1.3}>
                             <i className="fa fa-sign-out"></i> Logout
                         </NavDropdown.Item>
                     </NavDropdown>
                    </Nav>
                    
               
                :
                <div className={styles.buttonDefault}>
                    <NavLink to="Signup" className={styles.signIn} >Sign in</NavLink>
                    </div>
                }
                <NavLink to="/" className={styles.home}>HOME</NavLink>
            </div> */}

           
            <div class="content">
                <Routes>                   
                    <Route path="/" exact={true}  Component={HomeBeforeLogin}></Route>
                    <Route path="/Signup" exact={true} Component={SignUp}></Route>
                    
                </Routes>
         
            </div>
            
          
            
           
        </BrowserRouter>
        
      

        </div>
        
        
    )
}