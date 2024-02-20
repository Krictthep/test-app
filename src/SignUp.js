import React, {useState, useEffect } from 'react'
import { BrowserRouter, NavLink, Route , Routes, useNavigate } from 'react-router-dom'
import stylesSignUp from "./SignUp.module.css";
import { toHaveFocus } from '@testing-library/jest-dom/matchers';
import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'


import Cropper from 'react-easy-crop'
import Slider from '@material-ui/core/Slider'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { getOrientation } from 'get-orientation/browser'
import ImgDialog from './ImgDialog'
import { getCroppedImg, getRotatedImage } from './canvasUtils'
import { styles } from './styles'

import Modal from "@material-ui/core/Modal";
import { left, right } from '@popperjs/core';

//Submit form
import { useForm } from 'react-hook-form'

import { Link } from 'react-router-dom'

import dataProvince from './provinces.json'
import dataDistrict from './districts.json'
import dataSubDistrict from './subDistricts.json'

import SweetAlert2 from 'react-sweetalert2';



const SignUp = () => {

  const provinces = dataProvince.provinces
  const districts = dataDistrict.districts
  const subdistricts = dataSubDistrict.subdistricts

  //Ref Contact Data
  const textEmail = React.useRef()
  const textPswd = React.useRef()
  const textCfPswd = React.useRef()
  const textCompanyName = React.useRef()
  const textTaxID = React.useRef()
  const selectCountry = React.useRef()
  const selectPrePhoneNo = React.useRef()
  const textPhoneNo = React.useRef()
  const textWebSite = React.useRef()
  const textAddress = React.useRef()
  const textProvince = React.useRef()
  const textDistrict = React.useRef()
  const textSubDistrict = React.useRef()
  const textZipCode = React.useRef()
  const inputFile = React.useRef()

  let [postedData, setPostedData] = React.useState('')
  const form = React.useRef()


  //Modal
  const [open, setOpen] = React.useState(false);


  //Image
  const [image, setImage] = useState(null)
 
  const [image2, setImage2] = useState(null)
  const handleClose = () => {
      setOpen(false);
  };

  const handleOpen = () => {
      setOpen(true);
  };
  
  const ORIENTATION_TO_ANGLE = {
    '3': 180,
    '6': 90,
    '8': -90,
  }

  const imgOnClick =() => {
    inputFile.current.click();
  }
 
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {      
      
      setImage(URL.createObjectURL(event.target.files[0]))

    }
  } 
  
  const [imageSrc, setImageSrc] = React.useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)
 

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      )
      console.log('donee', { croppedImage })
      setCroppedImage(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }

  const onClose = () => {
    setCroppedImage(null)
  }

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      let imageDataUrl = await readFile(file)

      try {
        // apply rotation if needed
        const orientation = await getOrientation(file)
        const rotation = ORIENTATION_TO_ANGLE[orientation]
        if (rotation) {
          imageDataUrl = await getRotatedImage(imageDataUrl, rotation)
        }
      } catch (e) {
        console.warn('failed to detect the orientation')
      }

      setImageSrc(imageDataUrl)
    }
  }


  
  function readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.addEventListener('load', () => resolve(reader.result), false)
      reader.readAsDataURL(file)
    })
  }





  //Check Password
  const [password, setPassword] = useState("");
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);


  
  

  const onBlurPassword = () => {
    let pswd = textPswd.current.value
       if(pswd !== '' && !pswd.match(/^[0-9a-zA-Z]+$/)){
      textPswd.current.value = ''
      alert('ต้องเป็น 0-9 หรือ a-z หรือ A-Z เท่านั้น')
    }
  }


  const onBlurConfirmPassword = () => {
   
    if(textCfPswd.current.value !== textPswd.current.value){
      textCfPswd.current.value = ''
      alert('รหัสผ่านทั้งสองช่องไม่ตรงกัน')
    }
  }
  

  const handleToggle = () => {
    if (type==='password'){
       setIcon(eye);
       setType('text')
    } else {
       setIcon(eyeOff)
       setType('password')
    }

    
    

 }

 //Submit form 
 const { register, handleSubmit, formState: {errors}, getValues} = useForm()
 const navigate = useNavigate();
 const onSubmitForm = (event) =>{

      const { email, pswd, pswd2, provinceid, taxid, fullnameid, phonenoid } = getValues();   
   
     
      if(image != null){
        localStorage.setItem('imagecontact', image)
      }
      else{
        localStorage.setItem('imagecontact', "/pic.png") 
      }
      
      localStorage.setItem('email', email);
      localStorage.setItem('pswd', pswd);
      localStorage.setItem('pswd2', pswd2);
      localStorage.setItem('provinceid', provinceid);
      localStorage.setItem('taxid', taxid);
      localStorage.setItem('fullnameid', fullnameid);
      localStorage.setItem('phonenoid', phonenoid);

      setSwalProps({
        show: true,
        title: ' ',
        text: 'Sigin Completed ',
        icon: 'success',
        timer: 3000,
        willClose: () => {
          navigate('/');
        }
      });

      //navigate('/');
      
      // alert(localStorage.getItem('email'))

 }

 const [swalProps, setSwalProps] = useState({});



  

    return (      
      
      <form onSubmit={handleSubmit(onSubmitForm)}>
        
        <SweetAlert2 {...swalProps}>
              
            </SweetAlert2>
                  
        <div className={stylesSignUp.signUp}>
          <div style={{paddingTop: 30}}>
          <label htmlFor='imgpf' class="col col-1">Your Image </label>
                
                <div class="col col-lg-12">
                    <img id="img" className={stylesSignUp.picIcon} onClick={imgOnClick} alt="" src={image ? image : "/pic.png"}  />
            
                </div>
                <input type="file" id="imgcontact" name="imgcontact" accept="image/*" ref={inputFile} onChange={onImageChange} hidden />
                
                
                <Modal
                      onClose={handleClose}
                      open={open}
                      style={{
                          position: "absolute",
                          border: "2px solid #000",
                          backgroundColor: "white",
                          boxShadow: "2px solid black",
                          height: 500,
                          width: 500,
                          margin: "auto", 
                          padding: "2%",
                          color: "white",
                      }}
                  >
                      <>
                          <a onClick={handleClose} style={{top: 0, float: right}}>X</a>
                          
                      </>
                  </Modal>
          </div> 
          <div className='container' style={{paddingTop: 30, paddingLeft: 50, paddingRight: 50}}>
            <div className='col-lg-12'>
              <div className='row'>
                <div className='col-lg-4'>
                  <label htmlFor='pswd' className={stylesSignUp.labelLeft} >Email</label>
                  <div class="input-group">                  
                    <div class="input-group-prepend">
                      <div class="input-group-text">@</div>
                    </div>
                    <input ref={textEmail} type={'email'} class="form-control form-control-sm" id='email' maxLength={100} maxLenght='100' 
                     onBlur={onBlurPassword} placeholder={'Enter Email'} {...register('email', {required: true})} />
                     {errors.email && <div style={{color: 'red'}} className='input-group' >Please fill email</div>}
                  </div>
              
                </div>
                <div className='col-lg-4'>
                  <label htmlFor='pswd' className={stylesSignUp.labelLeft} >Password</label>
                  <div class="input-group">                  
                    <div class="input-group-prepend">
                      <div class="input-group-text">@</div>
                    </div>
                    <input type={type} id='pswd' maxLenght='10' maxLength={10}
                  className='form-control form-control-sm'  onChange={(e) => setPassword(e.target.value)}  
                  ref={textPswd} placeholder={'Enter Password'}       
                  {...register('pswd', {required: true, pattern: { value: /^[0-9a-zA-Z]+$/, message: "Password should be 0-9 or a-z or A-Z only" }})}                  
                  />
                  
                  {errors.pswd?.message && <div style={{color: 'red'}} className='input-group' >{errors.pswd?.message}</div>}

                  {/* <span class="flex justify-around items-center" onClick={handleToggle}>
                    <Icon class="absolute mr-10" icon={icon} size={25}/>
                  </span> */}
                  </div>

                 
                </div>
                <div className='col-lg-4'>
                 <label htmlFor='pswd2' className={stylesSignUp.labelLeft}>Confirmed Password</label>
                  <div class="input-group">                  
                    <div class="input-group-prepend">
                      <div class="input-group-text">@</div>
                    </div>
                    <input type={type} id='pswd2' maxLenght='10' maxLength={10}
                      className='form-control form-control-sm'
                      ref={textCfPswd} placeholder={'Enter Confirmed Password'}
                      {...register("pswd2", {validate: value => {
                        const { pswd } = getValues();
                        return pswd === value || "Passwords should match!"
                      }}
                      )}           
                    />                  
                    
                     {errors.pswd2?.message && <div style={{color: 'red'}} className='input-group' >Passwords should match!</div>}

                  </div>
                
                 
                </div>      
                <div className='col-lg-12' style={{ paddingTop: 20}} ><hr style={{width: '100%', color: 'grey', size: 20}} /></div>  


                       
              </div>
              
            </div>
            
            <div className='col-lg-12'>
              <div className='row'>
                <div className='col-lg-12' style={{paddingTop: 20}}>
                  <label htmlFor='ifmt' className={stylesSignUp.labelLeft} style={{color: '#255FA8', fontSize: 20}}>Information</label>
                </div>
                <div className='col-lg-4' style={{paddingTop: 20}}>
                  <label htmlFor='cpn' className={stylesSignUp.labelLeft}>Company Name</label>
                  <div class="input-group">                  
                      
                      <input ref={textCompanyName} type={'text'} id='cpn' maxLenght='100' maxLength={100}
                        className='form-control form-control-md'
                        placeholder={'Enter Company Name'} {...register("cpn")}
                      />
                    </div>
                </div>
                <div className='col-lg-4' style={{paddingTop: 20}}>
                  <label htmlFor='taxid' className={stylesSignUp.labelLeft}>Tax ID</label>
                  <div class="input-group">                  
                      
                      <input ref={textTaxID} type={'text'} id='taxid' maxLenght='50' maxLength={50}
                        className='form-control form-control-md'
                        placeholder={'Enter Tax ID'} {...register("taxid")}
                      />
                    </div>
                </div>
                <div className='col-lg-4' style={{paddingTop: 20}}>
                  <label htmlFor='fullname' className={stylesSignUp.labelLeft}>Full Name</label>
                  <div class="input-group">                  
                      
                      <input type={'text'} id='fullnameid' maxLenght='50' maxLength={50}
                        className='form-control form-control-md'
                        placeholder={'Enter Full Name'} {...register("fullnameid")}
                      />
                    </div>
                </div>
                <div className='col-lg-4' style={{paddingTop: 20}}>
                  <label htmlFor='country' className={stylesSignUp.labelLeft}>Country </label>
                  <div class="input-group">                  
                      
                      <select id='countryid' size={1}
                        className='form-select form-control-md'
                        ref={selectCountry} 
                      >
                       <option value={1} selected>Thailand</option>                        
                        </select>
                    </div>
                </div>

                <div className='col-lg-4' style={{paddingTop: 20}}>
                  <label htmlFor='phonenoid' className={stylesSignUp.labelLeft}>Phone Number </label>       
                  <div class="input-group">                  
                    <div class="input-group-prepend">
                    <select id='prephonenoid' size={1}
                        className='form-select'
                        ref={selectPrePhoneNo} 
                      >
                       <option value={1} selected>+66</option>                        
                        </select>
                    </div>
                      <input type={'text'} id='phonenoid' maxLenght='20' maxLength={20}
                        className='form-control form-control-md'
                        placeholder={'Enter Phone Number'} {...register("phonenoid")}
                      />
                  
                    </div>
                </div>


                <div className='col-lg-4' style={{paddingTop: 20}}>
                  <label htmlFor='webid' className={stylesSignUp.labelLeft}>Website </label>
                  <div class="input-group">                  
                      
                      <input type={'text'} id='webid' maxLenght='100' maxLength={100}
                        className='form-control form-control-md'
                        placeholder={'Enter Website'} {...register("webid")}
                      />
                    </div>
                </div>

                
                <div className='col col-lg-4' style={{paddingTop: 20}}>
                  <label htmlFor='adrid' className={stylesSignUp.labelLeft}>Address </label>
                  <div class="input-group">                  
                      
                      <textarea  type={'text'} id='adrid' maxLenght='500' maxLength={500}
                        className='form-control form-control-md' style={{height: 120}}
                        placeholder={'Enter Address'} {...register("adrid")}
                      />
                    </div>
                </div>

                <div className='col col-lg-4' style={{paddingTop: 20}}>
                  <label htmlFor='provinceid' className={stylesSignUp.labelLeft}>State/Province </label>
                  <div class="input-group">                  
                      
                      <select id='provinceid' size={1}
                        className='form-select form-control-md'
                        ref={selectCountry}  {...register("provinceid")}
                      >
                       <option value="" selected disabled hidden>Select Province</option>

                       { provinces.map(c => (<option key={c.PROVINCE_ID} value={c.PROVINCE_ID}>{c.PROVINCE_NAME}</option>))}

                       
                       {/* <option value={1} >Thailand</option>                         */}
                        </select>
                    </div>


                    <label htmlFor='districtid' className={stylesSignUp.labelLeft} style={{paddingTop: 20}}>District </label>
                  <div class="input-group">                  
                      
                      <select id='districtid' size={1}
                        className='form-select form-control-md'
                        ref={selectCountry}   {...register("districtid")}
                      >
                       <option value="" selected disabled hidden>Select District</option>                       
                       { districts.map(c => (<option key={c.DISTRICT_ID} value={c.DISTRICT_ID}>{c.DISTRICT_NAME}</option>))}
                                          
                        </select>
                    </div>
                </div>

                <div className='col col-lg-4' style={{paddingTop: 20}}>
                  <label htmlFor='subdistrictid' className={stylesSignUp.labelLeft}>Sub-District </label>
                  <div class="input-group">                  
                      
                      <select id='subdistrictid' size={1}
                        className='form-select form-control-md'
                        ref={selectCountry}  {...register("subdistrictid")}
                      >
                       <option value="" selected disabled hidden>Select Sub-District</option>
                       { subdistricts.map(c => (<option key={c.SUB_DISTRICT_ID} value={c.SUB_DISTRICT_ID}>{c.SUB_DISTRICT_NAME}</option>))}                        
                        </select>
                    </div>

                    <label htmlFor='zipcodeid' className={stylesSignUp.labelLeft} style={{paddingTop: 20}}>Zip Code </label>
                    <div class="input-group">                  
                      
                      <input  type={'text'} id='zipcodeid' maxLenght='10' maxLength={10}
                        className='form-control form-control-md' {...register("zipcodeid")}
                        placeholder={'Enter Zip Code'}
                      />
                    </div>


                </div>

                <div className='col col-lg-6' style={{paddingTop: 40 }}>

                  <Link to="/" className={stylesSignUp.buttonCancel} type='button' >Cancel</Link>


                  

                </div>
                <div className='col col-lg-6' style={{paddingTop: 40 }}>
                  <button className={stylesSignUp.buttonSumit} >Submit</button>

                </div>
            

              </div>
            </div>
          </div>
      
               
          
         

        </div>        
      </form>
    )
  
}

export default SignUp
