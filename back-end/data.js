// import faker from 'faker';
// import i1 from './foods/1.jpeg';
// import i2 from './foods/2.jpeg';
// import i3 from './foods/3.jpeg';
// import i4 from './foods/4.jpeg';
// import i5 from './foods/5.jpeg';
// import i6 from './foods/6.jpeg';
// import i7 from './foods/7.jpeg';
// import i8 from './foods/8.jpeg';
// import i9 from './foods/9.jpeg';
// import i10 from './foods/10.jpeg';
// import i11 from './foods/11.jpeg';

// const imagesArray = [i1, i2, i3, i4, i5, i6, i7, i8, i9, i10, i11];
// export let products = [];

// for (let i = 0; i < 10; i++) {
//     const randomImages = [];
//     while (randomImages.length < 3) {
//         const randomImage = imagesArray[Math.floor(Math.random() * imagesArray.length)];
//         if (!randomImages.includes(randomImage)) {
//             randomImages.push(randomImage);
//         }
//     }
//     products.push(
//         {
//             categoryId: "67fbd26e1409ea4a2294f0dd",
//             title: faker.commerce.productName(),
//             description: faker.commerce.productDescription(),
//             stock: faker.random.number({ min: 5, max: 35 }),
//             price: faker.commerce.price({ min: 100, max: 1000 }),
//             discount: faker.random.number({ min: 1, max: 80 }),
//             images: randomImages,
//             available: true,
//             }
//     );
// }
import faker from 'faker';

export let products = [];

for (let i = 0; i < 10; i++) {
    products.push(
        {
            categoryId: "67fd44692623971638b823a0",
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            stock: faker.datatype.number({ min: 5, max: 35 }), 
            price: Number(faker.commerce.price(100, 1000)), 
            discount: faker.datatype.number({ min: 1, max: 80 }), 
            available: true,
        }
    );
    console.log(products[i]);
}