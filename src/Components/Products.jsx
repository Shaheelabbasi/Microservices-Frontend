import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Products = () => {
  // State to hold product data
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:10000/mart/getallcategories');
        const { data } = response;
        // setCategories(data.data);
        // setCategories(...categories)
        setCategories([{id:"345678",name:"All Categories"},...data.data])
      } catch (error) {
        console.log('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products from backend based on selected category
  useEffect(() => {
    const fetchProducts = async () => {
      console.log("All the cateegories are jpp",categories)
      console.log("The selected category is ",selectedCategory)
      try {
        let response=null
        if(selectedCategory !="All Categories")
        {
         response = await axios.get(`http://localhost:10000/mart/getproductsbycategory?categoryname=${selectedCategory}`);
        }
        else{
          response=await axios.get(`http://localhost:10000/mart/getallproducts`);
        }
        const { data } = response;
        setProducts(data.data);
      } catch (error) {
        console.log('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [selectedCategory]); // Run effect when selectedCategory changes

  const searchProducts=async()=>{
    try {
      console.log("search function has been called")

      console.log('the search query is ',searchQuery)
      const response = await axios.get(`http://localhost:11000/mart/searchproducts?name=${searchQuery}`);
      const { data } = response;
      setSearchQuery("")
      // setSelectedCategory("")
      console.log("All the products in search funtion are ",data.data)
      setProducts(data.data);
    } catch (error) {
      console.log('Error searching  products:', error);
    }
  

  }

  return (
    <div className="container mx-auto p-4">
      {/* Dropdown for categories */}
      <div className="mb-4">
        <label htmlFor="category" className="block text-lg font-medium mb-2">
          Filter by Category:
        </label>
        <select
          id="category"
          className="p-2 border rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">{selectedCategory}</option>
          {
          categories.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
   {/* Input for Search Query */}
   <div className="flex items-center ml- -1">
          <input
            type="text"
            className="p-2 border rounded"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          {/* Search Button */}
          <button
          onClick={searchProducts}
            className="p-2 bg-blue-500 text-white rounded ml-4"
          >
            Search Products
          </button>
        </div>
     

      {/* Flexbox layout for product cards */}
      <div className="flex flex-wrap justify-center gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="w-full sm:w-1/2 lg:w-1/3 p-4">
              <div className="flex flex-col items-center bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Wrapper for Image to center it */}
                <div className="flex justify-center w-full h-48">
                  <img
                    className="object-cover"
                    src={`http://localhost:10000/Public${product.Image}`}
                    alt={product.title}
                  />
                </div>

                {/* Product Details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  {/* Product Title */}
                  <h2 className="font-bold text-lg text-center">{product.name}</h2>

                  {/* Product Description */}
                  <p className="text-gray-600 text-center mt-2">{product.description}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </div>
  );
};

export default Products;
