import { useEffect, useState } from "react";
import { usersURL, userURL} from "../../Api/Api";
import { Form, Button } from "react-bootstrap";
import { Axios } from "../../Api/AxiosCreate";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Loading from "../../Components/Website/Loading";
import Cookie from "cookie-universal";

export default function EditUser(){
    // gsap 
    useGSAP(()=>{
        gsap.fromTo("#input-anm",{
          y: 400,
          duration: 3,
        },
        {
          y: 0,
          repeat: 0,
          yoyo: true,
          duration: 3,
          ease: "elastic",
          stagger: {
            amount: 1.5,
            grid: [1,1,1,1],
            axis: "y",
            ease: "circ.inOut",
            from: "start"
          }
        }
      )
      },[])

    // states
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        location: '',
        phone: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState();

    // remove cookie
    const cookie = Cookie();

    //get user
    useEffect(()=>{
      Axios.get(userURL)
      .then((data)=>{
        setForm({
        name: data.data.name,
        location: data.data.location,
        phone: data.data.phone});
        setId(data.data._id)
    })
    .catch((error)=>console.log(error))
}, [])



    // handle form change
    function handleChange(e){
        setForm({...form,[e.target.name]: e.target.value})
    }
    // handle submit
    async function handleSubmit(e){
        e.preventDefault();
        try{
            if (id) {
            setLoading(true);
            const res = await Axios.put(`${usersURL}/${id}`, form)
            setLoading(false);
            window.location.pathname="/dashboard";
            }
        }
        catch(err){
            setErrorMessage(err.response.data.message)
            setLoading(false);
        }
    }

    async function handleDelete(){
        await Axios.delete(`${usersURL}/${id}`)
        cookie.remove("accessToken");
        localStorage.removeItem('cart');
        window.location.pathname="/login";
    }

    return(
        <>
         <div className= "conatiner-main">
        <div className="d-flex justify-content-center align-items-center w-100 position-sticky top-0 z-3">
        </div>
        {loading ? <div className= "conatiner-loading gap-4">
          <Loading/>
        </div>
        : <div className="d-flex justify-content-center align-items-end flex-column vh-100 w-100 z-0">
            <div className= "content">
                <div className="d-flex h-100 w-25 justify-content-center align-items-center flex-column gap-2 text-center">
                    <p id="input-anm" className=" text-white">Are you sure you want to delete your account?</p>
                    <Button id="input-anm" className="btn btn-primary w-75 z-0 bg-danger" onClick={handleDelete}>Delete User</Button>
                </div>
                <div className= "conatiner-form">
                <Form onSubmit={handleSubmit} className="form">
                <div className="conatiner-inside-form">
                <div className="sec-conatiner-first gap-5 h-auto">
                <Form.Group className="name">
                <Form.Label id="input-anm" className="la-name">Name</Form.Label>
                <Form.Control id="input-anm" autoFocus className="control-input" type="text" name="name" value={form.name || ''} onChange={handleChange} placeholder="Name.." minLength={3}/>
                </Form.Group>

                <Form.Group className="email">
                <Form.Label id="input-anm" className="la-email">Email</Form.Label>
                <Form.Control id="input-anm" className="control-input" type="email" name="email" value={form.email || ''} onChange={handleChange} placeholder="name@email.com"/>
                </Form.Group>

                <Form.Group className="password">
                <Form.Label id="input-anm" className="la-password">Password</Form.Label>
                <Form.Control id="input-anm" className="control-input" type="text" name="password" value={form.password || ''} onChange={handleChange} placeholder="Password123@" minLength={6}/>
                </Form.Group>
                </div>
                <div className="sec-conatiner-second gap-5 h-auto">
                <Form.Group className="location">
                <Form.Label id="input-anm" className="la-location">Location</Form.Label>
                <Form.Control id="input-anm" className="control-input" type="text" name="location" value={form.location || ''} onChange={handleChange} placeholder="city/street"/>
                </Form.Group>

                <Form.Group className="phone">
                <Form.Label id="input-anm" className="la-phone">Phone</Form.Label>
                <Form.Control id="input-anm" className="control-input" type="text" name="phone" value={form.phone || ''} onChange={handleChange} placeholder="07800000000" minLength={11}/>
                </Form.Group>
                </div>
                </div>
                <p style={{color: "var(--error)"}}>{errorMessage}</p>
                <Button id="input-anm" className="btn btn-primary w-25 z-0" type="submit">Save</Button>
                </Form> 
                </div>
            </div>
            </div> }
         </div> 
        </>
    );
}