import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Products.css";
import ProductCard from"./ProductCard";
// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 * 
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */


const Products = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading,setIsloading]=useState(false);
  const [productData, setproductData] = useState([]);
  const [filteredProductData, setFilteredproductData] = useState([]);
  const [finalCartData, setFinalCartData] = useState([]);
  const [debounceTimeout,setDebounceTimeout]=useState(null);
  // TODO: CRIO_TASK_MODULE_PRODUCTS - Fetch products data and store it
  /**
   * Make API call to get the products list and store it to display the products
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on all available products
   *
   * API endpoint - "GET /products"
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "name": "iPhone XR",
   *          "category": "Phones",
   *          "cost": 100,
   *          "rating": 4,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "v4sLtEcMpzabRyfx"
   *      },
   *      {
   *          "name": "Basketball",
   *          "category": "Sports",
   *          "cost": 100,
   *          "rating": 5,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "upLK9JbQ4rMhTwt4"
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 500
   * {
   *      "success": false,
   *      "message": "Something went wrong. Check the backend console for more details"
   * }
   */
  const performAPICall = async () => {
    setIsloading(true);
    try{
      let url=`${config.endpoint}/products`;
      const response=await axios.get(url);
      setIsloading(false);
      setFilteredproductData(response.data);
      setproductData(response.data);
      setIsloading(true);
      console.log("BeforApiLoading",isLoading);
      try {let urldata = await axios.get(`${config.endpoint}/products`);
      setIsloading(false);
      let data=urldata.data;
      setproductData(data);
      setFilteredproductData(data);
      //console.log('afterloading', productData);
      } catch (e) {
        setIsloading(false);
        if (e.response && e.response.status === 500) {
          enqueueSnackbar(e.response.data.message, { variant: "error" });
                  console.log(e.response.message);}
        else {
          enqueueSnackbar("Something went wrong!", { variant: "error" });
  
          console.log("Something went wrong!");
        }
      }  return response.data;
    }
    catch(error){
      setIsloading(false);
      if(!error.response.success){
        // enqueueSnackbar(error.response.data.message, { variant: "error" })
        enqueueSnackbar("No Products Found", { variant: "error" })
      }
      else{
        enqueueSnackbar("Error", { variant: "error" })
    }
    }
  };
  useEffect(()=>{
    performAPICall();
  },[]);
  // TODO: CRIO_TASK_MODULE_PRODUCTS - Implement search logic
  /**
   * Definition for search handler
   * This is the function that is called on adding new search keys
   *
   * @param {string} text
   *    Text user types in the search bar. To filter the displayed products based on this text.
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on filtered set of products
   *
   * API endpoint - "GET /products/search?value=<search-query>"
   *
   */
  const performSearch = async (text) => {
    try {let response = await axios.get(`${config.endpoint}/products/search?value=${text}`);
    let resData=response.data;
    //setproductData(resData);
    if(resData){
      setFilteredproductData(resData);
    }
    //setFilteredproductData(resData);
    //console.log("SearchApi",productData);
    else{
      setFilteredproductData([]);
    }
    } catch (e) {
      if (e.response && e.response.status === 404) {
        //setproductData([]);
        setFilteredproductData([]);
                }
      if (e.response && e.response.status === 500) {
                  enqueueSnackbar(e.response.data.message, { variant: "error" });
                          console.log(e.response.message);}
      else {
        enqueueSnackbar("Something went wrong!", { variant: "error" });
        //console.log("Something went wrong!");
      }
    }
  };

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Optimise API calls with debounce search implementation
  /**
   * Definition for debounce handler
   * With debounce, this is the function to be called whenever the user types text in the searchbar field
   *
   * @param {{ target: { value: string } }} event
   *    JS event object emitted from the search input field
   *
   * @param {NodeJS.Timeout} debounceTimeout
   *    Timer id set for the previous debounce call
   *
   */
  const debounceSearch = (event, debounceTimeout) => {
    const value=event.target.value;

    if(debounceTimeout){
      clearTimeout(debounceTimeout);
    }
    const timeout= setTimeout(async ()=>{await performSearch(value)},500)
    setDebounceTimeout(timeout);
  };
  

  return (
<div>
      <Header>
        {/* TODO: CRIO_TASK_MODULE_PRODUCTS - Display search bar in the header for Products page */}
        <TextField
        className="search-desktop"
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
        onChange={(e)=>{debounceSearch(e,debounceTimeout)}}
      />

      </Header>

        {/* TODO: CRIO_TASK_MODULE_PRODUCTS - Display search bar in the header for Products page */}
      {/* Search view for mobiles */}
      <TextField
        className="search-mobile"
        size="small"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
        onChange={(e)=>{debounceSearch(e,debounceTimeout)}}
      />
       <Grid container spacing={1} mb={1}>
         <Grid item className="product-grid">
           <Box className="hero">
             <p className="hero-heading">
               India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
               to your door step
             </p>
           </Box>
         </Grid>
         {isLoading?(<Box display="flex" alignItems="center" justifyContent="center">
        <CircularProgress/>
        <h4>Loading Products...</h4>
       </Box>):(
       <Grid container mb={2} mt={2} spacing={2}>
       {filteredProductData.length?(filteredProductData.map((prod)=>(
           <Grid item xs={6}  md={3} key={prod._id}>
             <ProductCard
             product={prod}
             /> </Grid>
        ))):(<Box className="loading">
          <SentimentDissatisfied color="action"/>
          <h4 style={{color:"grey"}}>No Products Found</h4></Box>)}
                 </Grid>)}
        </Grid>
      <Footer />
    </div>
  );
};

export default Products;