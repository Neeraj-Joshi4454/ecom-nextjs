import { toast } from "react-toastify";

const handlePayment = async (amount) => {
    const token = localStorage.getItem('auth_token');
    if (!amount || amount < 1) {
      alert("Enter a valid amount!");
      return;
    }
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/razorpay`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `${token}`
      },
      body: JSON.stringify({ amount }),
    });
  
    const { id, amount: orderAmount, currency, error } = await res.json();
  
    if (error) {
      alert("Error: " + error);
      return;
    }
  
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_Rg1hWe9gZjoq8B",
      amount: orderAmount,
      currency,
      name: "Test Payment",
      order_id: id,
      handler: (response) => {
        toast.success("Payment successful! Payment ID: " + response.razorpay_payment_id);
      },
      modal: {
        ondismiss: function () {
          console.log("User closed the Razorpay modal.");
        },
      },
    };
  
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  
  export default handlePayment;
  