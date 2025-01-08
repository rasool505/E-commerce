import { useEffect, useRef, useState } from "react";
import { adsURL, categoriesURL} from "../../Api/Api";
import { useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { Axios } from "../../Api/AxiosCreate";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Loading from "../../Components/Website/Loading";


export default function UpdateAds(){
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
      },[]);

    //Ref
    const click = useRef(null);

    // states
    const [form, setForm] = useState({
        description: '',
        available: ''
    });
    const [image, setImage] = useState('')

    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const id = useParams().id;

    useEffect(()=>{
      Axios.get(`${adsURL}/${id}`)
      .then(data => setForm({
        description: data.data.description,
        available: data.data.available,

      }))
      .catch(err=>setErrorMessage(err.response.data.message))
    }, [])


    // handle form change
    function handleChange(e){
        setForm({...form,[e.target.name]: e.target.value})
    }

    // from data
    const formData = new FormData();
    formData.append('description', form.description);
    formData.append('available', form.available);
    formData.append('image', image);

    // handle submit
    async function handleSubmit(e){
        e.preventDefault();
        try{
            setLoading(true);
            const res = await Axios.put(`${adsURL}/${id}`, formData)
            setLoading(false);
            window.location.pathname="/dashboard/ads";
        }
        catch(err){
            setErrorMessage(err.response.data.message)
            setLoading(false);
        }
    }

    function handlClick(){
        click.current.click();
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

               <Form.Group
                controlId="floatingTextarea"
                label="Comments"
                className="mt-3 mb-3"
                style={{width: '480px'}}
                id="input-anm">
                <Form.Control as={"textarea"} value={form.description} name="description" style={{height: "100px", resize: "none", width: "480px"}} placeholder="Leave a comment here" onChange={handleChange} />
                </Form.Group>

                
                <Form.Select className="control-input mt-3 mb-3" id="input-anm" value={form.available} name="available" onChange={handleChange}>
                <option disabled value='' className="text-center">Select State</option>
                <option value={true} className="text-center">Available</option>
                <option value={false} className="text-center">Unavailable</option>
                </Form.Select>
                
               <div className="input-image" id="input-anm" onClick={handlClick}>
               {
               image.length === 0
               ? <svg xmlns="http://www.w3.org/2000/svg" 
               height="24px" 
               viewBox="0 -960 960 960" 
               width="24px" 
               fill="#e8eaed">
               <path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H520q-33 0-56.5-23.5T440-240v-206l-64 62-56-56 160-160 160 160-56 56-64-62v206h220q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41h100v80H260Zm220-280Z"/>
               </svg>
               : <img src={URL.createObjectURL(image)}></img>
               }
               </div>
               <Form.Group className="image">
               <Form.Control id="input-anm" ref={click} className="control-input mt-4 d-none" type="file" name="image" onChange={(e)=>setImage(e.target.files.item(0))}/>
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