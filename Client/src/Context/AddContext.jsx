import { createContext, useEffect, useState } from "react";

export const AddContext = createContext();

const AddProvider = ({ children }) => {
  // 🛒 CART
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saveCart = localStorage.getItem("cartItems");
      return saveCart ? JSON.parse(saveCart) : [];
    } catch (error) {
      console.error("Error parsing cartItems from localStorage:", error);
      return [];
    }
  });

  // 🛍️ PRODUCTS
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 👤 USERS & AUTH
  const [users, setUsers] = useState([]);
  const [userLoading, setUserLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // 🌙 DARK MODE
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  // --- Persist States ---
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  // --- Fetch Products ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const url = "https://fakestoreapi.com/products";
        const res = await fetch(url);
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- Fetch Users ---
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setUserLoading(true);
        const res = await fetch("https://dummyjson.com/users");
        const result = await res.json();
        setUsers(result.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setUserLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // --- Auth Functions ---
  const login = (username) => {
    const foundUser = users.find((u) => u.username === username);
    if (foundUser) {
      setCurrentUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setCartItems([]); // clear cart when logged out
  };

  // --- Cart Functions (only if logged in) ---
const addToCart = (product) => {
  if (!currentUser) {
    alert("⚠️ Please log in to add items to cart!");
    return;
  }

  setCartItems((prev) => {
    const existing = prev.find((item) => item.id === product.id);
    if (existing) {
      return prev.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    }
    return [...prev, { ...product, quantity: 1 }];
  });
};

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // --- Provided Values ---
  const value = {
    // products
    data,
    loading,

    // cart
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,

    // dark mode
    darkMode,
    toggleDarkMode: () => setDarkMode((prev) => !prev),

    // users & auth
    users,
    userLoading,
    currentUser,
    login,
    logout,
  };

  return <AddContext.Provider value={value}>{children}</AddContext.Provider>;
};

export default AddProvider;
