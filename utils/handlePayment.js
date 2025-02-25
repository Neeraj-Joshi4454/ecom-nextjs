const handlePayment = async (amount) => {
    if (!amount || amount < 1) {
      alert("Enter a valid amount!");
      return;
    }
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/razorpay`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
        alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
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
  