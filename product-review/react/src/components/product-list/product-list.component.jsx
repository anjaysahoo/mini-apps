import classes from "./product-list.component.module.css"
import PropTypes from 'prop-types';
import {useEffect, useState} from "react";

function ProductListComponent({updateActiveProduct}){
    const [productList, setProductList] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [errorLoadingProducts, setErrorLoadingProducts] = useState(false);
    const [selectedProductOrderId, setSelectedProductOrderId] = useState(null);

    // function getStarCountFromLS(orderId){
    //     const currentReviewsLSValue = JSON.parse(localStorage.getItem("REVIEWS_BY_ORDER_ID"));
    //
    //     if(currentReviewsLSValue && currentReviewsLSValue[orderId]){
    //         return currentReviewsLSValue[orderId].rating;
    //     }
    //     else{
    //         return null;
    //     }
    //
    // }

    async function fetchProductList() {
        setErrorLoadingProducts(false);
        try{
            const response = await fetch("https://my-json-server.typicode.com/codebuds-fk/chat/chats");
            const data = await response.json();
            setProductList(data);
            setIsFetching(false);
        }
        catch (error){
            console.log("Error fetching product : ", error);
            setErrorLoadingProducts(true);
        }

    }

    useEffect(() => {
        setIsFetching(true)

        fetchProductList();
    }, []);



    return (
        <>
            <section className={classes["product"]}>
                <h3 className={classes["product__filter-title"]}>
                    Filter by Title / Order ID
                </h3>
                <input
                    type="text"
                    placeholder={`Start typing to search`}
                    className={classes["product__search-bar"]}
                />
                {
                    errorLoadingProducts &&
                    <div className={classes["product__re-load"]}>
                        <button
                            onClick={fetchProductList}
                            >
                            Reload
                        </button>
                    </div>
                }
                {
                    !errorLoadingProducts &&
                    isFetching ?
                        <div className={classes["product__loader"]}>
                            Loading...
                        </div>
                        :
                        <ul className={classes["product__list"]}>
                            {
                                productList.map((product) => (
                                    <li onClick={() => {
                                        updateActiveProduct(product);
                                        setSelectedProductOrderId(product.orderId)
                                    }}
                                        className={classes["product__list__item"]}
                                        style={selectedProductOrderId === product.orderId ? {background: "#f0f3f6"} : null}
                                        key={product.id}
                                    >
                                        <img
                                            src={product.imageURL}
                                            className={classes["product__list__item__image"]}
                                            alt={product.title}/>
                                        <div className={classes["product__list__item__content"]}>
                                            <div className={classes["product__list__item__content__head"]}>
                                                <div className={classes["product__list__item__content__head__name"]}>
                                                    {product.title}
                                                </div>
                                                <div className={classes["product__list__item__content__head__date"]}>
                                                    {new Date(product.latestMessageTimestamp).toLocaleDateString()}
                                                </div>
                                            </div>
                                            <div className={classes["product__list__item__content__order-id"]}>
                                                {product.orderId}
                                            </div>
                                            {/*{*/}
                                            {/*    getStarCountFromLS(product.orderId) &&*/}
                                            {/*    <div className={classes["product__list__item__content__rating"]}>*/}
                                            {/*        {getStarCountFromLS(product.orderId)} stars*/}
                                            {/*    </div>*/}
                                            {/*}*/}
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
    updateActiveProduct: PropTypes.func.isRequired,
};

export default ProductListComponent
