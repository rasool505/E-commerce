import { useState } from "react";
import { adduserURL} from "../../Api/Api";
import Cookie from "cookie-universal";
import { Form, Button } from "react-bootstrap";
import { Axios } from "../../Api/AxiosCreate";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Loading from "../../Components/Website/Loading";


export default function AddUser(){
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
        role: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    //cookies
    const cookie = Cookie();
    // handle form change
    function handleChange(e){
        setForm({...form, [e.target.name]: e.target.value})
    }
    // handle submit
    async function handleSubmit(e){
        e.preventDefault();
        try{
            setLoading(true);
            const res = await Axios.post(`${adduserURL}`, form)
            .then(()=>{
                setLoading(false);
                window.location.pathname="/dashboard/users";
            })
            .catch((err)=>{setLoading(false)
                console.log(err)
            })
        }
        catch(err){
            setErrorMessage(err.response.data.message)
            console.log(err)
            setLoading(false);
        }
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

                <Form.Select className="control-input mt-4" id="input-anm" value={form.role} name="role" onChange={handleChange}>
                <option disabled value=''>Select Role</option>
                <option value="0">Admin</option>
                <option value="1">User</option>
                <option value="2">Delivery</option>
                <option value="3">Writer</option>
                </Form.Select>
                </div>
                </div>
                <p style={{color: "var(--error)"}}>{errorMessage}</p>
                <Button id="input-anm" className="btn btn-primary w-25 z-0" type="submit">Update User</Button>
                </Form> 
                </div>
            </div>
            </div> }
         </div> 
        </>
    );
}