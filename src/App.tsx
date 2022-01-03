//const is a arrow functions
import{useState} from 'react'
import{useQuery} from'react-query'
//components
import Item from './Item/Item';
import Drawer from '@material-ui/core/Drawer'; //import of external component needs ;
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
import Cart from './cart/cart'
import cartScreen from './CartScreen/cartScreen'
//styles
import { Wrapper,StyledButton } from './styles';
//types
export  type CartItemType ={
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}
 
const getProducts =async (): Promise<CartItemType[]> =>
  await(await fetch('https://fakestoreapi.com/products')).json(); //convertingt the product to json 


const App=() => {
   const [cartOpen,isCartOpen] = useState(false); //this is a state that will tell if the cart is open or close
   const [cartItems, isItem ] = useState([] as CartItemType[]);//list to hold the items
  const {data,isLoading,error} = useQuery<CartItemType[]>(
    'products', 
    getProducts
  )
  console.log(data) //listing the 
  const getTotalItem =(items:CartItemType[]) => 
    items.reduce((ack:number,item)=> ack+item.amount,0);

  const handleAddtoCart = (ClickedItem: CartItemType) =>{
    isItem(prev => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find(item => item.id === ClickedItem.id);

      if (isItemInCart) {
        return prev.map(item =>
          item.id === ClickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // First time the item is added
      return [...prev, { ...ClickedItem, amount: 1 }];
    });

  };
 
  const handleRemovefromCart =(id:number)=>{
    isItem(prev => 
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    )
  };
   if(isLoading) return <LinearProgress/>;
   if(error) return <div>somethign Went wrong 404</div>
   
      return (
        <Wrapper>
             <Drawer anchor='right' open={cartOpen} onClose={()=> isCartOpen(false) }>
           <Cart 
            cartitems={cartItems}
            addToCart={handleAddtoCart}
            removeFromCart={handleRemovefromCart}
            />
           </Drawer>
           <StyledButton onClick={()=> isCartOpen(true)}>
           <Badge badgeContent={getTotalItem(cartItems)} color='error'>
            <AddShoppingCartIcon/>
           </Badge>
           </StyledButton>


          <Grid container spacing={3}>
          {data?.map(item=>(
            <Grid item key={item.id} xs={12} sm={4}>
              <Item item={item} handleAddToCart={handleAddtoCart}/>
              
              </Grid>
          ) )}
          </Grid>
         </Wrapper>
        );
 
}

export default App;
