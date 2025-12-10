import { createContext, useEffect, useState } from "react";
import { fetchCategories } from "../Service/CategoryService.js";
import { fetchItems } from "../Service/ItemService.js";

export const AppContext = createContext(null);

export const AppContextProvider = (props) => {

    const [categories, setCategories] = useState([]);
    const [itemsData, setItemsData] = useState([]);
    const [auth, setAuth] = useState({ token: null, role: null });
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        const itemId = item.itemId || item.id;
        const existingItem = cartItems.find(cartItem => (cartItem.itemId || cartItem.id) === itemId);
        if (existingItem) {
            setCartItems(cartItems.map(cartItem =>
                (cartItem.itemId || cartItem.id) === itemId
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            ));
        } else {
            setCartItems([...cartItems, {
                ...item,
                itemId: itemId,
                quantity: 1
            }]);
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems(cartItems.filter(item => item.itemId !== itemId));
    }

    const updateQuantity = (itemId, newQuantity) => {
        setCartItems(cartItems.map(item => item.itemId === itemId ? { ...item, quantity: newQuantity } : item));
    }

    useEffect(() => {
        async function loadData() {
            if (localStorage.getItem("token") && localStorage.getItem("role")) {
                setAuthData(
                    localStorage.getItem("token"),
                    localStorage.getItem("role")
                );
            }
            try {
                const response = await fetchCategories();
                console.log('categories response', response);
                setCategories(response.data || []);
            } catch (error) {
                console.error('Failed to load categories:', error);
                setCategories([]);
            }
            try {
                const itemResponse = await fetchItems();
                console.log('item response', itemResponse);
                setItemsData(itemResponse.data || []);
            } catch (error) {
                console.error('Failed to load items:', error);
                setItemsData([]);
            }
        }
        loadData();
    }, []);

    const setAuthData = (token, role) => {
        setAuth({ token, role });
    }

    const clearCart = () => {
        setCartItems([]);
    }

    const contextValue = {
        categories,
        setCategories,
        auth,
        setAuthData,
        itemsData,
        setItemsData,
        addToCart,
        cartItems,
        removeFromCart,
        updateQuantity,
        clearCart
    }

    return <AppContext.Provider value={contextValue}>
        {props.children}
    </AppContext.Provider>
}