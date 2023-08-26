import React from 'react';
import { CartState } from '../Context/Context';
import Singleproduct from './Singleproduct'

import './style.css'
import Filter from './Filter';

function Home(props) {
    const {state:{products},
    productState:{byStock,byFastDelivery,sort,byRating,searchQuery},
    productDispatch}=CartState()
    const transformProduct=()=>{
        let sortedProduct=products
        if(sort){
            sortedProduct=sortedProduct.sort((a,b)=>
                sort==='lowToHigh'?a.price-b.price:b.price-a.price
            )
        }
        if(!byStock){
            sortedProduct=sortedProduct.filter((prod)=>prod.inStock)
        }
        if(byFastDelivery){
            sortedProduct=sortedProduct.filter((prod)=>prod.fastDelivery)
        }
        if(byRating){
            sortedProduct=sortedProduct.filter((prod)=>prod.ratings>=byRating)
        }
        if(searchQuery){
            sortedProduct=sortedProduct.filter((prod)=>prod.name)
        }
        return sortedProduct
    }
    console.log(products)

    return (
        <div className='home'>
        <Filter/>
        <div className='productContainer'>
        {transformProduct().map((prod)=>{
            return <Singleproduct prod={prod} key={prod.id}/>
        })}
        </div>
      
            
        </div>
    );
}

export default Home;