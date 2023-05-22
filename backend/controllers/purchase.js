const Razorpay = require("razorpay");

exports.getPremiumMembership = async (req, res) => {
  try {
    const rzp = new Razorpay({
      key_id: process.env.YOUR_KEY_ID,
      key_secret: process.env.YOUR_KEY_SECRET,
    });

    let options = {
      amount: 2500, // amount in the smallest currency unit
      currency: "INR",
    };

    const order = await rzp.orders.create(options);
    
    const savedOrder = await req.user.createOrder({
      orderId: order.id,
      status: "PENDING",
    });
    res.json({ success: true, order: savedOrder, key_id: rzp.key_id });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
