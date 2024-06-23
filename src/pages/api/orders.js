// pages/api/orders.js

import dbConnect from '../../../lib/dbConnect';
import Order from '../../../models/Order';
import OrderItem from '../../../models/OrderItem';

dbConnect();

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { userId, items, totalPrice } = req.body;

      // Create a new order
      const order = new Order({
        userId,
        status: 'Pending', // Initial status
        totalPrice,
      });
      await order.save();

      // Create order items
      const orderItems = items.map(item => ({
        orderId: order._id,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      }));
      await OrderItem.insertMany(orderItems);

      // Update the order with the order items
      order.items = orderItems.map(item => item._id);
      await order.save();

      res.status(201).json({ success: true, order });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error', error });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
};
