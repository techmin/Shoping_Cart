import Button from '@material-ui/core/Button';
//type
import { CartItemType } from '../App';
//style 
import { Wrapper } from '../CartItem/CartItem.styles';

type props={
    item:CartItemType;
    addToCart:(clickedItem: CartItemType)=>void;
    removeFromCart: (id:number)=>void;



}
const CartItem: React.FC<props> = ({ item, addToCart, removeFromCart }) => (
        <Wrapper>
        <div>
            <h3>{item.title}</h3>
            <div className='information'>
                <p>price: ${item.price}</p>
                <p>Total:${item.amount *item.price}</p>
            </div>
            <div className='buttons'>
              <Button
                size='small'
                disableElevation
                variant='contained'
                onClick={()=>removeFromCart(item.id)}
                >
                 -
                </Button>
                <Button
                    size="small"
                    disableElevation
                    variant='contained'
                    onClick={()=>addToCart(item)}
                >
                    +
                </Button>
            </div>
        </div>
        <img src={item.image} alt={item.title}/>
    </Wrapper>
);

export default CartItem;