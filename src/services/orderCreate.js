const Product = require("../models/product");
const Order = require("../models/order");

module.exports = async (userId, items, paymentMethod, status) => {
    
    if (!Array.isArray(items) || items.length === 0) {
        throw new Error("Cart is empty!");
    }

    let totalAmount = 0;
    const verifiedItems = [];

    for (const item of items) {
        const product = await Product.findById(item.productId);
        if (!product) throw new Error("Product not found");

        verifiedItems.push({
            productId: product._id,
            quantity: item.quantity,
            price: product.price,
        });

        totalAmount += product.price * item.quantity;
    }

    const newOrder = await Order.create({
        userId,
        items: verifiedItems,
        amount: totalAmount,
        status,
        paymentMethod,
    });

    return newOrder;
};