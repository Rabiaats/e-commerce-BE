const Order = require("../models/order");
const quantity = require('./statusQuantity')

module.exports = async (userId, items, address, paymentMethod, status) => {
    
    if (!Array.isArray(items) || items.length === 0) {
        throw new Error("Cart is empty!");
    }
    
    const updateItems = await quantity(items)

    let totalAmount = 0;

    for (const item of updateItems) {
        totalAmount += item.price * item.quantity;
    }

    const newOrder = await Order.create({
        userId,
        items: updateItems,
        amount: totalAmount,
        address,
        status,
        paymentMethod,
    });

    return newOrder;
};