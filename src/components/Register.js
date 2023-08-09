import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios"
import {useNavigate} from "react-router-dom"
import "./Register.css"

const Register = () => {

    const [fname,setFName] = useState("");
    const [file,setFile] = useState("");
    const [fcontent,setFContent] = useState("");

    const history = useNavigate();

    const setdata = (e)=>{
        setFName(e.target.value)
    }

    const setimgfile = (e)=>{
        setFile(e.target.files[0])
    }

    const setdataa = (e)=>{
        setFContent(e.target.value)
    }

    const addUserData = async(e)=>{
        e.preventDefault();

        var formData = new FormData();
        formData.append("photo",file)
        formData.append("fname",fname)
        formData.append("fcontent",fcontent);

        const config = {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }

        const res = await axios.post("/register",formData,config);
       
        if(res.data.status == 201){
            history("/")
        }else{
            console.log("error")
        }
    }

    return (
        <>
        <div className='bord'>
            <div className='register'>
                <h5>New Blog<br/><br/></h5>

                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" name='fname' onChange={setdata} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Select Your Image</Form.Label>
                        <Form.Control type="file" name='photo' onChange={setimgfile} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Content</Form.Label><br/>
                        <textarea type="text" name='fcontent' rows="10" cols="90" onChange={setdataa} ></textarea>
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={addUserData}>
                        Add
                    </Button>
                </Form>
            </div>
            </div>
        </>
    )
}

export default Register

{/* <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Content</Form.Label>
                        <Form.Control type="text" name='fcontent' onChange={setdataa} />
                    </Form.Group> */}