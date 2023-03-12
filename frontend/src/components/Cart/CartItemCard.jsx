import React from "react";
import "./CartItem.css";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <img src={`https://www.erdshoppe.com/wp-content/uploads/2021/12/ERD-TC-21-Micro-USB-Charger-2-Amp-Mobile-Charger-with-Detachable-Cable-White-Cable-Included-1.jpg`} alt="ssa" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
        <p onClick={() => deleteCartItems(item.product)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;
