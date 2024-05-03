import { useState } from 'react'
import classes from './app.module.css'
import ProductListComponent from "./components/product-list/product-list.component.jsx";
import ChatComponent from "./components/chat/chat.component.jsx";

function App() {
    const [activeProduct, setActiveProduct] = useState(null);

    function updateActiveProduct(product){
        setActiveProduct(product);
    }

  return (
    <>
        <main className={classes["main"]}>
            <ProductListComponent updateActiveProduct={updateActiveProduct}/>
            {
                activeProduct &&
                <ChatComponent activeProduct={activeProduct}/>
            }
        </main>
    </>
  )
}

export default App
