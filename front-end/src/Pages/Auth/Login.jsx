import { useState } from "react";
import { loginURL} from "../../Api/Api";
import { Link } from "react-router-dom";
import Cookie from "cookie-universal";
import { Form, Button } from "react-bootstrap";
import { Axios } from "../../Api/AxiosCreate";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import NavBar from "../../Components/Website/NavBar";
import Footer from "../../Components/Website/Footer";
import Loading from "../../Components/Website/Loading";

export default function Login(){
       // gsap 
       useGSAP(()=>{
        gsap.fromTo("#rocket",{
          y: 300,
          duration: 3,
        },
        {
          y: 0,
          repeat: 0,
          yoyo: true,
          duration: 3,
          ease: "elastic",
          stagger: {
            amount: 1,
            grid: [1,1,1,1],
            axis: "y",
            ease: "circ.inOut",
            from: "start"
          }
        }
      )
      },[]);

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
        email: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    //cookies
    const cookie = Cookie();
    // handle form change
    function handleChange(e){
        setForm({...form,[e.target.name]: e.target.value})
    }
    // handle submit
    async function handleSubmit(e){
        e.preventDefault();
        try{
          setLoading(true)
          const res = await Axios.post(loginURL, form)
          const token = res.data.token;
          cookie.set("accessToken", token);
          setLoading(false);
          if(res.data.role === 0)
            window.location.pathname="/dashboard/users";
          else if (res.data.role === 3)
            window.location.pathname="/dashboard/products";
          else if (res.data.role === 2)
            window.location.pathname="/dashboard/delivery";
          else
            window.location.pathname="/home"
        }
        catch(err){
          if(err){
            if (err.response) {
              setErrorMessage(err.response.data.message);
            }else{
              setErrorMessage(err.config.message);
            }
          }
            setLoading(false);
        }
    }


    return(
      <>
      <div className= "conatiner-main">
     <div className="d-flex justify-content-center align-items-center w-100 position-sticky top-0 z-3">
     <NavBar/>
     </div>
     {loading ? <div className= "conatiner-loading gap-4">
       <Loading/>
     </div>
     : <div className="d-flex justify-content-center align-items-end flex-column vh-100 w-100 z-0">
            <div className= "content">
            <div className="conetnt-text">
                    <div className="conetnt-rocket">
                    <img width={"80px"} src={require("../../assets/rocket-launch.png")} alt="rocket" id="rocket"/>
                    <h6 style={{color: "white"}} id="rocket">Welcome</h6>
                    <p className="w-50 text-wrap" id="rocket" style={{textAlign: "center", color: "white"}}>You are 30 seconds away from getting the best proudcts</p>
                    </div>
                    <Link className="btn btn-light" id="rocket" style={{color: "var(--dark-blue)", width: "100px"}} to={'/register'}>Register</Link>
                </div>
                <div className= "conatiner-form">
                <Form onSubmit={handleSubmit} className="form">
                <div className="conatiner-inside-form">

                <div className="sec-conatiner gap-5 h-auto">
                <Form.Group className="email" >
                <Form.Label id="input-anm" className="la-email">Email</Form.Label>
                <Form.Control id="input-anm" className="control-input" type="email" name="email" value={form.email} onChange={handleChange} placeholder="name@email.com" required/>
                </Form.Group>

                <Form.Group className="password" >
                <Form.Label id="input-anm" className="la-password">Password</Form.Label>
                <Form.Control id="input-anm" className="control-input" type="text" name="password" value={form.password} onChange={handleChange} placeholder="Password123@" required minLength={6}/>
                </Form.Group>
                </div>

                </div>
                <p style={{color: "var(--error)"}}>{errorMessage}</p>
                <Button id="input-anm" className="btn btn-primary link-nav w-25" type="submit">Login</Button>
                </Form> 
                </div>
            </div>
            </div> }
         <Footer/>
         </div> 
        </>
    );
}