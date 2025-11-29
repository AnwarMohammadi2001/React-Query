import { createContext, useEffect, useState } from "react";
export const CardContext = createContext();
export const CardProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load from localStorage on first render
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCartItems(
      (prev) =>
        prev
          .map((item) =>
            item.id === id && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0) // auto-remove if 0
    );
  };

  // Remove from cart
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear all items
  const clearCart = () => setCartItems([]);

  // fetch data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const result = await res.json();
        setProduct(result);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  const [users, setUsers] = useState([]);
  const [userLoading, setUserLoading] = useState(false);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://dummyjson.com/users");
        const result = await res.json();
        setUsers(result.users); // ✅ fix

        setUserLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUserLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <CardContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        product,
        users,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};
