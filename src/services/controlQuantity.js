"use strict"

const Product = require('../models/product');
const sendMail = require('../helpers/sendMail')


module.exports = async (items) => {
    const updatedItems = [];

    for (const item of items) {
        const product = await Product.findById(item.productId);
        
        if (!product) {
            throw new Error(`Product with ID ${item.productId} not found`);
        }
        
        if (product.stock < item.quantity) {
            throw new Error(`Not enough stock for ${product.name}. Available stock: ${product.stock}`);
        }

        // Stok güncellemesi
        product.stock -= item.quantity;
        await product.save();

        updatedItems.push({
            productId: product._id,
            quantity: item.quantity,
            price: product.price
        });

        // Stok durumu düşükse, yöneticiyi bilgilendir
        if (product.stock <= 5) {
            await sendMail(
                process.env.ADMIN_EMAIL, 
                'Stokta Düşük Ürün', 
                `
                    <h3>Stokta Düşük Ürün Bildirimi</h3>
                    <p>Ürün id: ${product._id}</p>
                    <p>Ürün adı: ${product.name}</p>
                    <p>Stok Miktarı: ${product.stock}</p>
                    <p>Stokta 5 veya daha az ürün kaldı. Lütfen kontrol edin.</p>
                `
            );
        }
    }

    return updatedItems;
};
