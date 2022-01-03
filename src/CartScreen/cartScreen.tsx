import CartItem from "../CartItem/CartItem";
//styled
import { Wrapper } from "./csStyle";
//types
import { CartItemType } from "../App";
import { ReactText } from "react";

type props={
    cartitem:CartItemType[];
    addToCart:(clickedItem: CartItemType)=>void;
    removeFromCart:(id:number)=>void;
}
const Cart:React.FC<props>=({cartitem,addToCart,removeFromCart})=>
{
    const calculateTotal =(items:CartItemType[])=>
        items.reduce((ack:number, item) => ack+item.amount*item.price,0);
    return(
        <Wrapper>
            <h2>
                your Bag
            </h2>
            {cartitem.length==0?<p>no item in cart</p> :null}
            {cartitem.map(item=>(
                <CartItem
                    key={item.id}
                    item={item}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
            ))}
            <h2>
                Total: ${calculateTotal(cartitem).toFixed(2)}
            </h2>
        </Wrapper>

    )
}
export default Cart;