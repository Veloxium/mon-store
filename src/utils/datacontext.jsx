import { createContext, useContext, useState, useEffect, useRef } from "react";
import ThemeMusic from "../assets/sounds/theme.mp3";
import { Howl } from "howler";

const CART_STORAGE_KEY = "cartItems";

const DataContext = createContext();

export function PagesProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isToggled, setIsToggled] = useState(true);
  const soundRef = useRef(null);

  const initialCartItems =
    JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
  const [cartItems, setCartItems] = useState(initialCartItems);

  useEffect(() => {
    soundRef.current = new Howl({
      src: [ThemeMusic],
      loop: true,
      volume: 0.5,
    });

    // Cleanup function to stop audio when the component is unmounted
    return () => {
      soundRef.current.stop();
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const togglePlayback = () => {
    if (isPlaying) {
      soundRef.current.pause();
    } else {
      soundRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const addToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      const updatedCart = cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const value = {
    isPlaying,
    togglePlayback,
    isToggled,
    setIsToggled,
    cartItems,
    setCartItems,
    addToCart,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useDataContex() {
  return useContext(DataContext);
}
