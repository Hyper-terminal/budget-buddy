const Razorpay = require("razorpay");
const OrderModel = require("../models/orders");
const UserModel = require("../models/user");
const { generateToken } = require("../utils/utils");

const rzp = new Razorpay({
  key_id: process.env.YOUR_KEY_ID,
  key_secret: process.env.YOUR_KEY_SECRET,
});

exports.getPremiumMembership = async (req, res) => {
  try {
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

exports.updatePremiumStatus = async (req, res) => {
  const { payment_id, order_id } = req.body;
  try {
    // Fetch the payment details from Razorpay
    const payment = await rzp.payments.fetch(payment_id);

    if (payment.status === "captured" || payment.status === "authorized") {
      const orderPromise = OrderModel.update(
        { status: "SUCCESS" },
        { where: { orderId: order_id } }
      );
      const userPromise = UserModel.update(
        { isPremium: true },
        { where: { id: req.user.id } }
      );
      await Promise.all([orderPromise, userPromise]);
      res.status(200).json({
        success: true,
        message: "Payment successful and premium status updated",
        jwtToken: generateToken(req.user.id, true),
      });
    } else {
      await OrderModel.update(
        { status: "FAILED" },
        { where: { orderId: order_id } }
      );
      res.status(400).json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
