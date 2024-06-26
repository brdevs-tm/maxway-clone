import React, { useState, useEffect } from "react";
import axios from "axios";

const CartPage = () => {
  document.title = "Cart";
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const storedCartItems =
        JSON.parse(localStorage.getItem("cartItems")) || {};
      const cartItemIds = Object.keys(storedCartItems);

      if (cartItemIds.length === 0) {
        setLoading(false);
        return;
      }

      const responses = await Promise.all(
        cartItemIds.map((id) =>
          axios.get(
            `https://6635009e9bb0df2359a382a9.mockapi.io/brdevs/products/${id}`
          )
        )
      );

      const itemsWithQuantities = responses.map((response) => ({
        ...response.data,
        quantity: storedCartItems[response.data.id] || 0,
      }));

      setCartItems(itemsWithQuantities);
    } catch (error) {
      setError("Failed to fetch cart items");
      console.error("Error fetching cart items:", error);
    }
    setLoading(false);
  };

  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleQuantityChange = (id, increment) => {
    const updatedItems = cartItems
      .map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + (increment ? 1 : -1);
          if (newQuantity < 1) {
            if (
              window.confirm("Do you want to remove this item from your cart?")
            ) {
              return null;
            }
            return item;
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
      .filter((item) => item);
    updateLocalStorage(updatedItems);
    setCartItems(updatedItems);
  };

  const updateLocalStorage = (items) => {
    const updatedStorage = items.reduce(
      (acc, item) => ({ ...acc, [item.id]: item.quantity }),
      {}
    );
    localStorage.setItem("cartItems", JSON.stringify(updatedStorage));
  };

  const handleRemoveItem = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    updateLocalStorage(updatedItems);
    setCartItems(updatedItems);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4 pt-10">
      <h1 className="text-xl font-bold my-4">Cart Items</h1>
      {cartItems.length > 0 ? (
        <div>
          <table className="min-w-full table-auto text-sm bg-white shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">Product</th>
                <th className="p-4 text-left hidden lg:block">Description</th>
                <th className="p-4 text-center">Price</th>
                <th className="p-4 text-center">Qty</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-4 flex items-center flex-col sm:flex-row sm:space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 object-cover rounded-md"
                    />
                    <div>
                      <div className="font-medium text-gray-800">
                        {item.name}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 hidden lg:block">{item.description}</td>
                  <td className="p-4 text-center">${item.price}</td>
                  <td className="p-4 text-center">{item.quantity}</td>
                  <td className="p-4 text-center flex flex-col sm:flex-row sm:space-x-2 justify-center">
                    <button
                      className="bg-blue-500 text-white rounded-full h-10 w-10 flex justify-center items-center hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700"
                      onClick={() => handleQuantityChange(item.id, true)}
                    >
                      +
                    </button>
                    <button
                      className="bg-red-500 text-white rounded-full h-10 w-10 flex justify-center items-center hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-700"
                      onClick={() => handleQuantityChange(item.id, false)}
                    >
                      -
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 p-4 bg-gray-100 rounded-lg flex justify-between items-center">
            <h2 className="text-lg font-bold">Total: ${getTotalPrice()}</h2>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Proceed to Payment
            </button>
          </div>
        </div>
      ) : (
        <p className="pb-[200px] text-center mt-16">No items in your cart.</p>
      )}
    </div>
  );
};

export default CartPage;
