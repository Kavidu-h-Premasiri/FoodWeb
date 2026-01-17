
export const getCart = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const addToCart = (product) => {
  const cart = getCart();
  const existingItem = cart.find(item => item._id === product._id);

  if (existingItem) {
    existingItem.qty += 1;
    return;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart(cart);
};
