import classes from './product-list.component.module.css'
import {API_ENDPOINTS} from "../../config/app-constants.config.js";
import {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";



function ProductListComponent({updateActiveProduct}){
    const [productList, setProductList] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [selectedProductOrderId, setSelectedProductOrderId] = useState(null);
    const storedFetchedProductList = useRef([]);

    async function fetchProductList() {
        setIsFetching(true);
        try{
            const response = await fetch(API_ENDPOINTS.PRODUCTS);
            const data = await response.json();
            storedFetchedProductList.current = data;
            setProductList(data);
            setIsFetching(false);
        }
        catch (error){
            console.log("Error fetching product : ", error);
            setIsFetching(false);
        }

    }

    function filterHandler(keyword){

        if(!keyword || keyword.length === 0){
            console.log("keyword : ", keyword);
            console.log("storedFetchedProductList : ", storedFetchedProductList);
            setProductList(storedFetchedProductList.current)
        }
        else{
            const filteredProductList = productList.filter((product) => product.title.toLowerCase().includes(keyword.toLowerCase()) || product.orderId.toLowerCase().includes(keyword.toLowerCase()));
            setProductList(filteredProductList)
        }
    }

    useEffect(() => {

        fetchProductList();
    }, []);



    return (
        <>
            <section className={classes["products"]}>
                <h2 className={classes["products__filter-title"]}>
                    Filter by Title/ Order ID
                </h2>
                <input
                    onChange={(event) => filterHandler(event.target.value)}
                    type="text"
                    placeholder={`Start typing to search`}
                    className={classes["products__filter-input"]}
                    />
                {
                    isFetching && <div className={classes["products__loader"]}>Loading...</div>
                }
                {
                    !isFetching &&
                    <ul className={classes["products__list"]}>
                        {
                            productList.map((product) => (
                                <li
                                    onClick={() => {
                                        setSelectedProductOrderId(product.orderId)
                                        updateActiveProduct(product)
                                    }}
                                    key={product.id}
                                    className={classes["products__list__item"]}
                                    style={selectedProductOrderId === product.orderId ? {backgroundColor: "#f0f3f6"} : null}
                                >
                                    <img
                                        src={product.imageURL}
                                        alt={product.title}
                                        className={classes["products__list__item__image"]}
                                        />
                                    <div className={classes["products__list__item__content"]}>
                                        <div className={classes["products__list__item__content__head"]}>
                                            <div className={classes["products__list__item__content__head__name"]}>
                                                {product.title}
                                            </div>
                                            <div className={classes["products__list__item__content__head__date"]}>
                                                {new Date(product.latestMessageTimestamp).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div className={classes["products__list__item__content__order-id"]}>
                                            {product.orderId}
                                        </div>
                                        <div className={classes["products__list__item__content__msg"]}>
                                            {product.messageList[0]?.message}
                                        </div>
                                    </div>
                                </li>
                            ))
                        }

                    </ul>
                }

            </section>
        </>
    )
}

ProductListComponent.propTypes = {
    updateActiveProduct: PropTypes.func.isRequired
}

export default ProductListComponent;
