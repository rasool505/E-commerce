import { useEffect, useRef, useState } from "react";
import { categoriesURL, productsURL, productURL} from "../../Api/Api";
import { Form, Button } from "react-bootstrap";
import { Axios } from "../../Api/AxiosCreate";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Loading from "../../Components/Website/Loading";
import { useParams } from "react-router-dom";



export default function UpdateProduct(){
    // gsap 
    useGSAP(()=>{
        gsap.fromTo("#input-anm",{
          y: 500,
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
        categoryId: '',
        title: '',
        description: '',
        stock: '',
        price: '',
        discount: '',
        available: ''
    });
    const [images, setImages] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState({})
    const { id } = useParams();

    //handle Image Upload
    function handleImageUpload(e){
        if ([...e.target.files].length > 3) {
            setErrorMessage('you are not allowed to but images more than 3')
            setImages([])
        } else{
            setImages(e.target.files)
            setErrorMessage('')
        }
    }

    //get all categories
    useEffect(()=>{
    Axios.get(categoriesURL)
    .then(data=>setCategories(data.data))
    .catch((error)=>console.log(error))
    }, []);
    const categoriesShow = categories.map((item, i)=><option className="text-center" key={i} value={item._id}>{item.title}</option>)

    //get product
    useEffect(()=>{
    Axios.get(`${productURL}/${id}`)
    .then(data=>{
        setForm({...form,
             categoryId: data.data.categoryId === null ? "" : data.data.categoryId._id,
             title: data.data.title,
             description: data.data.description,
             stock: data.data.stock,
             price: data.data.price,
             discount: data.data.discount,
             available: data.data.available,
            });
        setProduct(data.data);
    })
    .catch((error)=>console.log(error))
    }, [id]);

    //Ref
    const click = useRef(null);

    // handle form change
    function handleChange(e){
        setForm({...form, [e.target.name]: e.target.value})
    }

    //form data
    const formDate = new FormData();
    formDate.append('categoryId', form.categoryId)
    formDate.append('title', form.title)
    formDate.append('description', form.description)
    formDate.append('stock', form.stock)
    formDate.append('price', form.price)
    formDate.append('discount', form.discount)
    formDate.append('available', form.available)
    for(var i = 0; i<images.length; i++) {
        formDate.append('images', images[i])
    }


    // handle submit
    async function handleSubmit(e){
        e.preventDefault();
        try{
            setLoading(true);
            const res = await Axios.put(`${productsURL}/${id}`, formDate)
            .then(()=>{
                setLoading(false);
                window.location.pathname="/dashboard/products";
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
                <Form onSubmit={handleSubmit} className="form gap-0">
                <div className="conatiner-inside-form">
                <div className="sec-conatiner-first gap-5 h-auto">

                <Form.Select className="control-input mt-4" id="input-anm" value={form.categoryId} name="categoryId" onChange={handleChange}>
                <option disabled value='' className="text-center">Select category</option>
                {product.length > 0 && <option className="text-center" value={product.categoryId._id}>{product.categoryId.title}</option>}
                {categoriesShow}
                </Form.Select>

                <Form.Group className="title">
                <Form.Label id="input-anm" className="la-title">Title</Form.Label>
                <Form.Control id="input-anm" autoFocus className="control-input" type="text" name="title" value={form.title || ''} onChange={handleChange} placeholder="Title.." minLength={3}/>
                </Form.Group>

                <Form.Group className="stock">
                <Form.Label id="input-anm" className="la-stock">Stock</Form.Label>
                <Form.Control id="input-anm" className="control-input" type="number" name="stock" value={form.stock || ''} onChange={handleChange} placeholder="Stock.."/>
                </Form.Group>

                <Form.Group className="price">
                <Form.Label id="input-anm" className="la-price">Price</Form.Label>
                <Form.Control id="input-anm" className="control-input" type="number" name="price" value={form.price || ''} onChange={handleChange} placeholder="Price.." minLength={6}/>
                </Form.Group>
                </div>
                <div className="sec-conatiner-second gap-5 h-auto">
                <Form.Group className="discount">
                <Form.Label id="input-anm" className="la-discount">Discount</Form.Label>
                <Form.Control id="input-anm" className="control-input" type="number" name="discount" value={form.discount || ''} onChange={handleChange} placeholder="Discount.."/>
                </Form.Group>

                <Form.Select className="control-input mt-4" id="input-anm" value={form.available} name="available" onChange={handleChange}>
                <option disabled value='' className="text-center">Select State</option>
                <option value={true} className="text-center">Available</option>
                <option value={false} className="text-center">Unavailable</option>
                </Form.Select>

                <div className="input-image w-100 mt-4 g-3" id="input-anm" onClick={handlClick}>
                {
                images.length === 0
                ? <svg xmlns="http://www.w3.org/2000/svg" 
                height="24px" 
                viewBox="0 -960 960 960" 
                width="24px" 
                fill="#e8eaed">
                <path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H520q-33 0-56.5-23.5T440-240v-206l-64 62-56-56 160-160 160 160-56 56-64-62v206h220q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41h100v80H260Zm220-280Z"/>
                </svg>
                : <>
                {images[0] && <img className="me-1 ms-1" src={URL.createObjectURL(images[0])}/>}
                {images[1] && <img className=" m-auto" src={URL.createObjectURL(images[1])}/>}
                {images[2] && <img className=" me-1 ms-1" src={URL.createObjectURL(images[2])}/>}
                </>
                }
                </div>
                <Form.Group className="image">
                <Form.Control id="input-anm" ref={click} multiple accept="image/*" className="control-input mt-4 d-none" type="file" name="image" onChange={handleImageUpload}/>
                </Form.Group>
                </div>
                </div>
                <Form.Group
                controlId="floatingTextarea"
                label="Comments"
                className="mt-3 mb-3"
                style={{width: '430px' || "auto"}}
                id="input-anm">
                <Form.Control as={"textarea"} value={form.description} name="description" style={{height: "100px", resize: "none"}} placeholder="Leave a comment here" onChange={handleChange} />
                </Form.Group>
                <p className="mb-3" style={{color: "var(--error)"}}>{errorMessage}</p>
                <Button id="input-anm" className="btn btn-primary w-25 z-0 m-0" type="submit">Save</Button>
                </Form> 
                </div>
            </div>
            </div> }
         </div> 
        </>
    );
}