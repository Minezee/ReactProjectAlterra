import logoBootstrap from "../../assets/bootstrap.svg"
import { articleData } from '../../utils/constants/articleData';
import { useEffect, useState } from 'react';
import "./createProduct.css"
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { addProduct, deleteProduct, editProduct } from "../../lib/slice/product.slice";

const Popup = ({ handleDelete, handleCancel }) => {
  return (
    <div className='vh-100 w-100 position-fixed popup-container'>
      <div className='popup'>
        <h3>Are You Sure want to Delete ?</h3>
        <div className='d-flex gap-4'>
          <button onClick={handleCancel} className='btn-success'>No</button>
          <button onClick={handleDelete} className='btn-danger'>Yes</button>
        </div>
      </div>
    </div>
  )
}


function CreateProduct() {
  const [id, setId] = useState(0)
  const [errMsg, setErrMsg] = useState("")
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [freshness, setFreshness] = useState('Brand New');
  const [price, setPrice] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const product = useSelector(state => state.products.products)
  const dispatch = useDispatch()

  const nav = useNavigate();

  const nameRegex = /^[a-zA-Z0-9\s]+$/;
  const priceRegex = /^\d+(\.\d{1,2})?$/;

  function handleNameChange(e) {
    const value = e.target.value;

    if (value === '') {
      setErrMsg("Product name must be filled.");
    } else if (!nameRegex.test(value)) {
      setErrMsg("Product name cannot contain '@/#{}'.");
    } else if (value.length > 25) {
      setErrMsg("Product name must be less than 25 characters.");
    } else {
      setErrMsg("");
    }
    
    setName(value);
  }

  function handlePriceChange(e) {
    const value = e.target.value;
    if (priceRegex.test(value)) {
      setPrice(value);
    } else {
      setErrMsg("Product price must be a valid positive number with up to 2 decimal places.");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.length > 0 && category && price.length > 0 && image && freshness) {
      if (isEdit) {
        dispatch(editProduct({
          id: id,
          updatedProduct: {
            productName: name,
            productCategory: category,
            productFreshness: freshness,
            productPrice: price,
            image: image,
            additionalDescription: description,
          }
        }));
        setName('');
        setCategory('');
        setImage(null)
        setFreshness('Brand New');
        setDescription('');
        setPrice('');
        setErrMsg("Success edit product");
        setIsEdit(false)
      } else {
        const newProduct = {
          id: id,
          productName: name,
          productCategory: category,
          productFreshness: freshness,
          productPrice: price,
          image: image,
          additionalDescription: description,
        };

        dispatch(addProduct(newProduct))

        setName('');
        setCategory('');
        setImage(null)
        setFreshness('Brand New');
        setDescription('');
        setPrice('');
        alert("Success add new product");
      }
    } else {
      setErrMsg("Please fill in all fields with valid data.");
    }
  };

  const handleDelete = () => {
    dispatch(deleteProduct(deleteIndex));
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleEditClick = (idx, e) => {
    e.stopPropagation();
    setIsEdit(true)
    setId(product[idx].id);
    setName(product[idx].productName);
    setCategory(product[idx].productCategory);
    setImage(product[idx].image)
    setFreshness(product[idx].productFreshness);
    setDescription(product[idx].additionalDescription);
    setPrice(product[idx].productPrice);
  }

  useEffect(() => {
    if (product.length > 0) {
      const lastProductId = product[product.length - 1].id;
      setId(lastProductId + 1);
    }
  }, [product]);

  useEffect(() => {
    if (name === '') {
      setErrMsg("Product name must be filled.");
    }
  },[name])

  return (
    <div className='relative'>
      {isOpen && <Popup handleDelete={handleDelete} handleCancel={handleCancel} />}
      <main className="container create-product">
        <img src={logoBootstrap} alt="" className="bs-icon" />
        <h1>Create Product</h1>
        <p>{articleData.description.en}</p>
        <form onSubmit={handleSubmit}>
          <h2>Detail Product</h2>
          <div className="form-container">
            <div className="mb-3">
              <label htmlFor="productName" className="form-label">Product name</label>
              <input value={name} onChange={handleNameChange} type="text" id="productName" className="form-control name-input" />
              <p id="nameErrMsg" style={{ marginTop: 12, color: 'red' }}></p>
            </div>
            <div className="mb-3">
              <label htmlFor="productCategory" className="form-label">Product Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-select" id="productCategory">
                <option defaultValue>Choose...</option>
                <option value="Category 1">Category 1</option>
                <option value="Category 2">Category 2</option>
                <option value="Category 3">Category 3</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="productImage" className="form-label">Image of Product</label>
              <input onChange={(e) => setImage(e.target.files[0])} className="form-control" type="file" accept="image/*" id="productImage" />
            </div>
            <div className="mb-3">
              <label htmlFor="productFreshness" className="form-label">Product Freshness</label>
              <div className="radio-group">
                <div>
                  <input onClick={() => setFreshness("Brand New")} id="brandNew" name="product_type" value="Brand New" type="radio" />
                  <label htmlFor="brandNew">Brand New</label>
                </div>
                <div>
                  <input onClick={() => setFreshness("Second Hand")} id="second" name="product_type" value="Second Hand" type="radio" />
                  <label htmlFor="second">Second Hand</label>
                </div>
                <div>
                  <input onClick={() => setFreshness("Refurbished")} id="refurbished" name="product_type" value="Refurbished" type="radio" />
                  <label htmlFor="refurbished">Refurbished</label>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="productDescription" className="form-label">Additional Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" id="productDescription" rows="3"></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="productPrice" className="form-label">Product Price</label>
              <div className="input-group price-input">
                <span className="input-group-text">$</span>
                <input value={price} onChange={handlePriceChange} type="text" className="form-control" id="productPrice" placeholder="0" />
              </div>
            </div>
            {errMsg && <p>{errMsg}</p>}
            <button type="submit" className="btn btn-primary">{isEdit ? "Edit" : "Submit"}</button>
          </div>
        </form>
        <table id="productTable">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Product Name</th>
              <th scope="col">Product Category</th>
              <th scope="col">Product Freshness</th>
              <th scope="col">Product Image</th>
              <th scope="col">Product Price</th>
              <th scope="col">Product Description</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {product.map((product, index) => (
              <tr onClick={() => nav(`/product/${product.id}`)} key={index}>
                <td>{product.id}</td>
                <td>{product.productName}</td>
                <td>{product.productCategory}</td>
                <td>{product.productFreshness}</td>
                <td>
                  <div className="text-center">
                    {product.image ? <img src={URL.createObjectURL(product.image)} alt="image" style={{ width: "auto", height: "32px" }} /> : null}
                  </div>
                </td>
                <td>{product.productPrice}</td>
                <td>{product.additionalDescription}</td>
                <td>
                  <div className='d-flex gap-2'>
                    <button onClick={(e) => handleEditClick(index, e)} className='btn-success'>Edit</button>
                    <button onClick={(e) => { e.stopPropagation(); setIsOpen(true); setDeleteIndex(index); }} className='btn-danger'>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  )
}

export default CreateProduct
