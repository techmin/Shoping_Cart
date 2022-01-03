import CartItem from "../CartItem/CartItem";
//styled
import { Wrapper } from "./Cstyle";
import { Button } from "@material-ui/core";
import {Link} from "react-router-dom";
//types
import { CartItemType } from "../App";
import { ReactText } from "react";

type props={
    cartitems: CartItemType[];
    addToCart:(clickedItem: CartItemType)=>void;
    removeFromCart:(id:number)=>void;
};

const Cart:React.FC<props>=({cartitems,addToCart,removeFromCart})=>
{
    const calculateTotal =(items:CartItemType[])=>
        items.reduce((ack:number, item) => ack+item.amount*item.price,0);
    return(
        <Wrapper>
            <h2>
                your shopping cart
            </h2>
            {cartitems.length==0?<p>no item in cart</p> :null}
            {cartitems.map(item=>(
                <CartItem
                    key={item.id}
                    item={item}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
            ))}
            <h2>
                Total: ${calculateTotal(cartitems).toFixed(2)}
            </h2>
           <div className="buttons"> 
                <Button>
                    <ul>
                        <li>
                            <Link to={"../CartScreen/cartScreen"}
                            >
                                To bag 
                            </Link>
                        </li>
                    </ul>
                </Button>
           </div>
        </Wrapper>

    )
}
export default Cart;