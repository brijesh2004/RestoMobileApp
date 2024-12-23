import { createSlice } from '@reduxjs/toolkit';

interface cartType {
    id: number;
    numberOf: number;
    image: string;
    name: string;
    price: number;
}
interface initialStateType {
    cart:cartType[];
    login: boolean,
    totalPrice: number;
}

const initialState:initialStateType = {
    cart: [],
    login: false,
    totalPrice: 0,
}

const Slice = createSlice({
    name: 'Cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const data: cartType = {
                id: action.payload.id,
                numberOf: 1,
                image: action.payload.imageurl,
                name: action.payload.name,
                price: action.payload.price
            }
            state.cart.push(data)
            state.totalPrice += action.payload.price
        },

        IncreaseQuantity:(state , action)=>{
            state.cart.forEach(element=>{
                if(element.id ===action.payload.id){
                    element.numberOf+=1;
                }
            });
            state.totalPrice+=action.payload.price;
        },
        DecreaseQuantity:(state , action)=>{
            state.cart.forEach(element=>{
                if(element.id===action.payload.id){
                    element.numberOf-=1;
                }
            });
            state.totalPrice-=action.payload.price;
        },

        RemoteCartItem:(state , action)=>{
            let newCart:cartType[]=[];
            let removedItemPrice = 0;
            let removedItemQuantity = 0;

            state.cart.forEach(element=>{
                if(element.id!==action.payload.id){
                    newCart.push(element);
                }
                else{
                    removedItemPrice=element.price;
                    removedItemQuantity=element.numberOf;
                }
            });

            state.totalPrice-=(removedItemPrice*removedItemQuantity);
            state.cart=newCart;
        },

        EmptyCartItem:(state)=>{
            state.cart=[],
            state.totalPrice=0
        },
        Logind:(state , action)=>{
            state.login=action.payload;
        }
    }
})


export const {addToCart , IncreaseQuantity , DecreaseQuantity,RemoteCartItem , Logind , EmptyCartItem} = Slice.actions;

export default Slice.reducer;