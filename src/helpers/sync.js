"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
// sync():
const User = require("../models/user");
const Category = require("../models/category");
const Brand = require('../models/brand');

module.exports = async function () {

    // return null;

    /* REMOVE DATABASE *
    const { mongoose } = require('../configs/dbConnection')
    await mongoose.connection.dropDatabase()
    console.log('- Database and all data DELETED!')
    /* REMOVE DATABASE */

    await User.create([
      {
        email: "atesr782@gmail.com",
        password: "Admin123.7",
        phone: "05XXXXXXXXX",
        firstName: "Admin",
        lastName: "Admin",
        isAdmin: true,
        isActive: true,
      },
    ]);

    /* User *
    {
      "_id": "680024f786e905667f95c564",
      "email": "atesr782@gmail.com",
      "password": "3c05b998075f29d1ba6b84a287d2fbde626f8242eb19538690323b2232c52b9f",
      "phone": "05XXXXXXXXX",
      "firstName": "Admin",
      "lastName": "Admin",
      "isActive": true,
      "isAdmin": true,
      "createdAt": "2025-04-16T21:45:27.694Z",
      "updatedAt": "2025-04-16T21:45:27.694Z",
      "__v": 0
    }
*/

const categories = [
    {
      "name": "Elektronik",
      "image": "https://example.com/images/electronics.jpg"
    },
    {
      "name": "Ayakkabı",
      "image": "https://example.com/images/shoes.jpg"
    },
    {
      "name": "Moda",
      "image": "https://example.com/images/fashion.jpg"
    },
    {
      "name": "Ev ve Yaşam",
      "image": "https://example.com/images/home_living.jpg"
    },
    {
      "name": "Spor ve Outdoor",
      "image": "https://example.com/images/sports_outdoor.jpg"
    },
    {
      "name": "Güzellik ve Kişisel Bakım",
      "image": "https://example.com/images/beauty_personal_care.jpg"
    },
    {
      "name": "Oyuncak ve Hobi",
      "image": "https://example.com/images/toys_hobbies.jpg"
    },
    {
      "name": "Müzik ve Kitap",
      "image": "https://example.com/images/music_books.jpg"
    },
    {
      "name": "Yiyecek ve İçecek",
      "image": "https://example.com/images/food_drinks.jpg"
    },
    {
      "name": "Sağlık",
      "image": "https://example.com/images/health.jpg"
    },
    {
      "name": "Oto ve Aksesuar",
      "image": "https://example.com/images/auto_accessories.jpg"
    }
  ]
    for (let category of categories) {
    await Category.create({
      name: category.name,
      image: category.image
    })}

    /* Categories
    {
  "error": false,
  "result": [
    {
      "_id": "680024f786e905667f95c56b",
      "name": "Elektronik",
      "image": "https://example.com/images/electronics.jpg",
      "createdAt": "2025-04-16T21:45:27.819Z",
      "updatedAt": "2025-04-16T21:45:27.819Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c56d",
      "name": "Ayakkabı",
      "image": "https://example.com/images/shoes.jpg",
      "createdAt": "2025-04-16T21:45:27.823Z",
      "updatedAt": "2025-04-16T21:45:27.823Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c56f",
      "name": "Moda",
      "image": "https://example.com/images/fashion.jpg",
      "createdAt": "2025-04-16T21:45:27.828Z",
      "updatedAt": "2025-04-16T21:45:27.828Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c571",
      "name": "Ev ve Yaşam",
      "image": "https://example.com/images/home_living.jpg",
      "createdAt": "2025-04-16T21:45:27.830Z",
      "updatedAt": "2025-04-16T21:45:27.830Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c573",
      "name": "Spor ve Outdoor",
      "image": "https://example.com/images/sports_outdoor.jpg",
      "createdAt": "2025-04-16T21:45:27.832Z",
      "updatedAt": "2025-04-16T21:45:27.832Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c575",
      "name": "Güzellik ve Kişisel Bakım",
      "image": "https://example.com/images/beauty_personal_care.jpg",
      "createdAt": "2025-04-16T21:45:27.834Z",
      "updatedAt": "2025-04-16T21:45:27.834Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c577",
      "name": "Oyuncak ve Hobi",
      "image": "https://example.com/images/toys_hobbies.jpg",
      "createdAt": "2025-04-16T21:45:27.836Z",
      "updatedAt": "2025-04-16T21:45:27.836Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c579",
      "name": "Müzik ve Kitap",
      "image": "https://example.com/images/music_books.jpg",
      "createdAt": "2025-04-16T21:45:27.838Z",
      "updatedAt": "2025-04-16T21:45:27.838Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c57b",
      "name": "Yiyecek ve İçecek",
      "image": "https://example.com/images/food_drinks.jpg",
      "createdAt": "2025-04-16T21:45:27.845Z",
      "updatedAt": "2025-04-16T21:45:27.845Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c57d",
      "name": "Sağlık",
      "image": "https://example.com/images/health.jpg",
      "createdAt": "2025-04-16T21:45:27.847Z",
      "updatedAt": "2025-04-16T21:45:27.847Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c57f",
      "name": "Oto ve Aksesuar",
      "image": "https://example.com/images/auto_accessories.jpg",
      "createdAt": "2025-04-16T21:45:27.848Z",
      "updatedAt": "2025-04-16T21:45:27.848Z",
      "__v": 0
    },
    {
      "_id": "6803ba3148664660f177adb2",
      "name": "Pet Shop",
      "image": "https://example.com/images/pet_shop.jpg",
      "createdAt": "2025-04-19T14:58:57.620Z",
      "updatedAt": "2025-04-19T14:58:57.620Z",
      "__v": 0
  }
  ]
}
    */

    const brands = [
      "Samsung",
      "Apple",
      "Sony",
      "LG",
      "Xiaomi",
      "Huawei",
      "Nike",
      "Adidas",
      "Zara",
      "H&M",
      "Levi's",
      "Puma",
      "IKEA",
      "Yves Delorme",
      "Tefal",
      "Philips",
      "Bosch",
      "Decathlon",
      "Under Armour",
      "Columbia",
      "North Face",
      "Patagonia",
      "L'Oréal",
      "Nivea",
      "Olay",
      "Estée Lauder",
      "Clinique",
      "LEGO",
      "Hasbro",
      "Mattel",
      "Fisher-Price",
      "Play-Doh",
      "Sony Music",
      "Universal Music",
      "Warner Music",
      "Penguin Random House",
      "HarperCollins",
      "Coca-Cola",
      "Pepsi",
      "Nestlé",
      "Danone",
      "Unilever",
      "Pfizer",
      "Johnson & Johnson",
      "Bayer",
      "GSK",
      "Novartis",
      "Toyota",
      "BMW",
      "Mercedes-Benz",
      "Ford",
      "Audi"
    ];
    
    for (let brand of brands) {
      await Brand.create({
        name: brand,
      })}

    /* Brands 
    {
  "error": false,
  "result": [
    {
      "_id": "680024f786e905667f95c581",
      "name": "Samsung",
      "createdAt": "2025-04-16T21:45:27.849Z",
      "updatedAt": "2025-04-16T21:45:27.849Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c583",
      "name": "Apple",
      "createdAt": "2025-04-16T21:45:27.851Z",
      "updatedAt": "2025-04-16T21:45:27.851Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c585",
      "name": "Sony",
      "createdAt": "2025-04-16T21:45:27.852Z",
      "updatedAt": "2025-04-16T21:45:27.852Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c587",
      "name": "LG",
      "createdAt": "2025-04-16T21:45:27.853Z",
      "updatedAt": "2025-04-16T21:45:27.853Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c589",
      "name": "Xiaomi",
      "createdAt": "2025-04-16T21:45:27.855Z",
      "updatedAt": "2025-04-16T21:45:27.855Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c58b",
      "name": "Huawei",
      "createdAt": "2025-04-16T21:45:27.858Z",
      "updatedAt": "2025-04-16T21:45:27.858Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c58d",
      "name": "Nike",
      "createdAt": "2025-04-16T21:45:27.859Z",
      "updatedAt": "2025-04-16T21:45:27.859Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c58f",
      "name": "Adidas",
      "createdAt": "2025-04-16T21:45:27.860Z",
      "updatedAt": "2025-04-16T21:45:27.860Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c591",
      "name": "Zara",
      "createdAt": "2025-04-16T21:45:27.861Z",
      "updatedAt": "2025-04-16T21:45:27.861Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c593",
      "name": "H&M",
      "createdAt": "2025-04-16T21:45:27.863Z",
      "updatedAt": "2025-04-16T21:45:27.863Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c595",
      "name": "Levi's",
      "createdAt": "2025-04-16T21:45:27.865Z",
      "updatedAt": "2025-04-16T21:45:27.865Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c597",
      "name": "Puma",
      "createdAt": "2025-04-16T21:45:27.866Z",
      "updatedAt": "2025-04-16T21:45:27.866Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c599",
      "name": "IKEA",
      "createdAt": "2025-04-16T21:45:27.868Z",
      "updatedAt": "2025-04-16T21:45:27.868Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c59b",
      "name": "Yves Delorme",
      "createdAt": "2025-04-16T21:45:27.869Z",
      "updatedAt": "2025-04-16T21:45:27.869Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c59d",
      "name": "Tefal",
      "createdAt": "2025-04-16T21:45:27.870Z",
      "updatedAt": "2025-04-16T21:45:27.870Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c59f",
      "name": "Philips",
      "createdAt": "2025-04-16T21:45:27.872Z",
      "updatedAt": "2025-04-16T21:45:27.872Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c5a1",
      "name": "Bosch",
      "createdAt": "2025-04-16T21:45:27.874Z",
      "updatedAt": "2025-04-16T21:45:27.874Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c5a3",
      "name": "Decathlon",
      "createdAt": "2025-04-16T21:45:27.876Z",
      "updatedAt": "2025-04-16T21:45:27.876Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c5a5",
      "name": "Under Armour",
      "createdAt": "2025-04-16T21:45:27.877Z",
      "updatedAt": "2025-04-16T21:45:27.877Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c5a7",
      "name": "Columbia",
      "createdAt": "2025-04-16T21:45:27.878Z",
      "updatedAt": "2025-04-16T21:45:27.878Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c5a9",
      "name": "North Face",
      "createdAt": "2025-04-16T21:45:27.879Z",
      "updatedAt": "2025-04-16T21:45:27.879Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c5ab",
      "name": "Patagonia",
      "createdAt": "2025-04-16T21:45:27.880Z",
      "updatedAt": "2025-04-16T21:45:27.880Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c5af",
      "name": "Nivea",
      "createdAt": "2025-04-16T21:45:27.883Z",
      "updatedAt": "2025-04-16T21:45:27.883Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c5b1",
      "name": "Olay",
      "createdAt": "2025-04-16T21:45:27.884Z",
      "updatedAt": "2025-04-16T21:45:27.884Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c5b3",
      "name": "Estée Lauder",
      "createdAt": "2025-04-16T21:45:27.885Z",
      "updatedAt": "2025-04-16T21:45:27.885Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c5b5",
      "name": "Clinique",
      "createdAt": "2025-04-16T21:45:27.886Z",
      "updatedAt": "2025-04-16T21:45:27.886Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c5b7",
      "name": "LEGO",
      "createdAt": "2025-04-16T21:45:27.887Z",
      "updatedAt": "2025-04-16T21:45:27.887Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c5b9",
      "name": "Hasbro",
      "createdAt": "2025-04-16T21:45:27.890Z",
      "updatedAt": "2025-04-16T21:45:27.890Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c5bb",
      "name": "Mattel",
      "createdAt": "2025-04-16T21:45:27.892Z",
      "updatedAt": "2025-04-16T21:45:27.892Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c5bd",
      "name": "Fisher-Price",
      "createdAt": "2025-04-16T21:45:27.893Z",
      "updatedAt": "2025-04-16T21:45:27.893Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c5bf",
      "name": "Play-Doh",
      "createdAt": "2025-04-16T21:45:27.895Z",
      "updatedAt": "2025-04-16T21:45:27.895Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c5c1",
      "name": "Sony Music",
      "createdAt": "2025-04-16T21:45:27.896Z",
      "updatedAt": "2025-04-16T21:45:27.896Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c5c3",
      "name": "Universal Music",
      "createdAt": "2025-04-16T21:45:27.897Z",
      "updatedAt": "2025-04-16T21:45:27.897Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c5c5",
      "name": "Warner Music",
      "createdAt": "2025-04-16T21:45:27.898Z",
      "updatedAt": "2025-04-16T21:45:27.898Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c5c7",
      "name": "Penguin Random House",
      "createdAt": "2025-04-16T21:45:27.900Z",
      "updatedAt": "2025-04-16T21:45:27.900Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c5c9",
      "name": "HarperCollins",
      "createdAt": "2025-04-16T21:45:27.901Z",
      "updatedAt": "2025-04-16T21:45:27.901Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c5d3",
      "name": "Unilever",
      "createdAt": "2025-04-16T21:45:27.908Z",
      "updatedAt": "2025-04-16T21:45:27.908Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c5d5",
      "name": "Pfizer",
      "createdAt": "2025-04-16T21:45:27.909Z",
      "updatedAt": "2025-04-16T21:45:27.909Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c5d7",
      "name": "Johnson & Johnson",
      "createdAt": "2025-04-16T21:45:27.910Z",
      "updatedAt": "2025-04-16T21:45:27.910Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c5d9",
      "name": "Bayer",
      "createdAt": "2025-04-16T21:45:27.911Z",
      "updatedAt": "2025-04-16T21:45:27.911Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c5db",
      "name": "GSK",
      "createdAt": "2025-04-16T21:45:27.912Z",
      "updatedAt": "2025-04-16T21:45:27.912Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c5dd",
      "name": "Novartis",
      "createdAt": "2025-04-16T21:45:27.913Z",
      "updatedAt": "2025-04-16T21:45:27.913Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c5df",
      "name": "Toyota",
      "createdAt": "2025-04-16T21:45:27.914Z",
      "updatedAt": "2025-04-16T21:45:27.914Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c5e1",
      "name": "BMW",
      "createdAt": "2025-04-16T21:45:27.915Z",
      "updatedAt": "2025-04-16T21:45:27.915Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c5e3",
      "name": "Mercedes-Benz",
      "createdAt": "2025-04-16T21:45:27.915Z",
      "updatedAt": "2025-04-16T21:45:27.915Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c5e5",
      "name": "Ford",
      "createdAt": "2025-04-16T21:45:27.916Z",
      "updatedAt": "2025-04-16T21:45:27.916Z",
      "__v": 0
    },
    {
      "_id": "680024f786e905667f95c5e7",
      "name": "Audi",
      "createdAt": "2025-04-16T21:45:27.917Z",
      "updatedAt": "2025-04-16T21:45:27.917Z",
      "__v": 0
    }
  ]
}
  */

      /*Products *

      {
            "_id": "6803bfdfff9c07c25b58ccb4",
            "categoryId": {
                "name": "Elektronik"
            },
            "brandId": {
                "name": "Samsung"
            },
            "name": "Galaxy Buds Pro",
            "description": "Aktif gürültü engelleme özellikli kablosuz kulaklık.",
            "images": [],
            "size": "Standart",
            "color": "siyah",
            "price": 2499.99,
            "stock": 5,
            "subCategory": "none",
            "popularity": [],
            "createdAt": "2025-04-19T15:23:11.285Z",
            "updatedAt": "2025-04-19T15:23:11.285Z"
        },
        {
            "_id": "6803c1f384dd2bd4275377f4",
            "categoryId": {
                "name": "Ayakkabı"
            },
            "brandId": null,
            "name": "Nike Air Max 270",
            "description": "Günlük kullanım için konforlu spor ayakkabı.",
            "images": [],
            "size": "42",
            "color": "beyaz",
            "price": 1899.9,
            "stock": 5,
            "subCategory": "man",
            "popularity": [],
            "createdAt": "2025-04-19T15:32:03.831Z",
            "updatedAt": "2025-04-19T15:32:03.831Z"
        }
    */

    /* Finished */
    console.log('* Synchronized.')
}