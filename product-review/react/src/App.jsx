import './App.module.css'
import ProductListComponent from "./components/product-list/product-list.component.jsx";
import {useState} from "react";
import ReviewComponent from "./components/review/review.component.jsx";
import classes from "./App.module.css";

function App() {
    const [activeProduct, setActiveProduct] = useState(null);

    function updateActiveProduct(orderId) {
        setActiveProduct(orderId);
    }
  return (
    <>
        {/*<h1 className={classes["title"]}>Flipkart Product Review</h1>*/}
        <main className={classes["main"]}>
            <div className={classes["main__item"]}>
                <ProductListComponent updateActiveProduct={updateActiveProduct}></ProductListComponent>
            </div>
            {
                activeProduct &&
                <div className={classes["main__item"]}>
                     <ReviewComponent activeProduct={activeProduct}/>
                </div>
            }
        </main>

    </>
)
}

export default App
