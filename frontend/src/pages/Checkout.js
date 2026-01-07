import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const payWithPaystack = () => {
    const handler = window.PaystackPop.setup({
      key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
      email: "customer@email.com",
      amount: totalAmount * 100, // kobo
      currency: "KES",
      callback: function (response) {
        alert("Payment successful! Ref: " + response.reference);
        clearCart();
      },
      onClose: function () {
        alert("Payment cancelled");
      }
    });

    handler.openIframe();
  };

  return (
    <div>
      <h2>Checkout</h2>
      <p>Total: KES {totalAmount}</p>
      <button onClick={payWithPaystack}>
        Pay with Paystack
      </button>
    </div>
  );
};

console.log("PAYSTACK KEY:", process.env.REACT_APP_PAYSTACK_PUBLIC_KEY);

export default Checkout;
