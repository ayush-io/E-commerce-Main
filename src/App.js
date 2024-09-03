import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import ProductList from "./components/Products/ProductList";
import MenuItems from "./components/DropdownMenu/MenuItems";
import { Drawer, List, styled } from "@mui/material";
import AllProducts from "./components/Products/AllProducts";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout";

const StyledMenu = styled(List)(({ theme }) => ({
  display: "flex",
  backgroundColor: theme.palette.primary.main,
  zIndex: 1,
}));

const getProducts = async (category) => {
  try {
    const url =
      category === "All"
        ? "https://dummyjson.com/products"
        : `https://dummyjson.com/products/category/${category}`;

    const res = await fetch(url);
    const data = await res.json();
    return data.products;
  } catch (error) {
    console.log("Error fetching data: " + error);
    return [];
  }
};

const getSearchResults = async () => {
  try {
    const res = await fetch(
      "https://dummyjson.com/products?limit=0&skip=0&sortBy=title&order=asc"
    );
    const data = await res.json();
    return data;
  } catch (error) {}
};

const getCategories = async () => {
  try {
    const res = await fetch("https://dummyjson.com/products/categories");
    const data = res.json();
    return data;
  } catch (error) {
    console.log("Error fetching data: " + error);
    return [];
  }
};

function App() {
  const [products, setProducts] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState("All");
  const [searchItems, setSearchItems] = useState([]);

  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);

  // Handle adding to cart
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const handleRemoveItem = (id) => {
    setCart((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    setCart((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  useEffect(() => {
    const fetchAllProducts = async () => {
      const productsData = await getProducts("All");
      setProducts(productsData);
    };
    fetchAllProducts();

    const fetchSearchResults = async () => {
      const searchResults = await getSearchResults();
      setSearchItems(searchResults.products);
    };
    fetchSearchResults();

    const fetchMenuItems = async () => {
      const menuItemsData = await getCategories();
      setMenuItems(menuItemsData.slice(13, 19));
    };
    fetchMenuItems();
  }, []);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      const productsData = await getProducts(selectedMenu);
      setProducts(productsData);
    };
    fetchProductsByCategory();
  }, [selectedMenu]);

  console.log(cart);

  return (
    <Router>
      <div className="App">
        <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
          <Cart
            cart={cart}
            onRemoveItem={handleRemoveItem}
            onUpdateQuantity={handleUpdateQuantity}
            setOpen={setOpen}
          />
        </Drawer>

        <Header searchItems={searchItems} cart={cart} setOpen={setOpen} />
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <StyledMenu className="styled-menu" sx={{ padding: 0 }}>
                {menuItems.map((item, index) => (
                  <MenuItems
                    item={item}
                    handler={setSelectedMenu}
                    key={index}
                    depth={1}
                  />
                ))}
              </StyledMenu>
              <ProductList
                products={products}
                selectedMenu={selectedMenu}
                onAddToCart={handleAddToCart}
              />
              <AllProducts
                products={searchItems}
                onAddToCart={handleAddToCart}
              />
            </>
          }
        />
        <Route path="/checkout" element={<Checkout cart={cart} />} />
      </Routes>
    </Router>
  );
}

export default App;
