import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../Auth";

const Index = () => {
    const navigate = useNavigate()

    const [products, setProducts] = useState([])

    const newProduct = () => {
        navigate("/product/new")
    }

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        // await axios.get("/api/get_all_products")
        //     .then((data) => {
        //         // console.log('data', data)
        //         setProducts(data)
        //         // console.log(products);
        //     })

        const { http } = Auth();

        http.get('/get_all_products')
            .then((data) => {
                console.log('data', data)
                setProducts(data.data.products)
                // console.log(products);
            })

            .catch(({ response }) => {

            })
    }

    return (
        <div className="container">
            <div className="products_list">
                <div className="titlebar">
                    <div className="titlebar_item">
                        <h1>Products</h1>
                    </div>
                    <div className="titlebar_item">
                        <div className="btn" onClick={() => newProduct()}>
                            Add Product
                        </div>
                    </div>
                </div>

                <div className="table">
                    <div className="list_header">
                        <p>Image</p>
                        <p>Product</p>
                        <p>Type</p>
                        <p>Inventory</p>
                        {/* <p>Price</p> */}
                        <p>Actions</p>
                    </div>

                    {/* {JSON.stringify(products)} */}
                    {
                        products?.length > 0 && (
                            products?.map((item, key) => (
                                
                                <div className="list_items" key={key}>
                                    <img src={`/product_img/${item.photo}`} height="40px" />
                                    <a>{item.name}</a>
                                    <a>{item.type}</a>
                                    <a>{item.quantity}</a>
                                    {/* <a>{item.price}</a> */}
                                    <div>
                                        <button className="btn-icon success">
                                            <i className="fas fa-pencil-alt"></i>
                                        </button>
                                        <button className="btn-icon danger">
                                            <i className="far fa-trash-alt"></i>
                                        </button>
                                    </div>
                                </div>
                            ))
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default Index
