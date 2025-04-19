const Order = require("../models/order");
const {decrease} = require('./controlStock')

module.exports = async (userId, items, address, paymentMethod, status) => {
    
    if (!Array.isArray(items) || items.length === 0) {
        throw new Error("Cart is empty!");
    }
    
    const updateItems = await decrease(items)

    let totalAmount = 0;

    for (const item of updateItems) {
        totalAmount += item.price * item.decrease;
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