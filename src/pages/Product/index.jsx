import { useLocation } from 'react-router-dom';
import "./index.css"

const Product = () => {
  const location = useLocation();
  const data = location.state;
  console.log(data)
  return (
    <div className='product-detail'>
      <h2>Product Details</h2>
      <img style={{height: "100px", width: "auto"}} src={URL.createObjectURL(data.image)} alt="" />
      <span>Product Name: {data.name}</span>
      <span>Product Category: {data.category}</span>
      <span>Product Freshness: {data.freshness}</span>
      <span>Product Price: {data.price}</span>
    </div>

  )
}

export default Product