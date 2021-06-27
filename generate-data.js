const faker = require("faker");
const fs = require("fs");

// Set locale to use Vietnamese
faker.locale = "vi";

// Random data
// console.log(faker.commerce.department());
// console.log(faker.commerce.productName());
// console.log(faker.commerce.productDescription());

// console.log(faker.random.uuid());
// console.log(faker.image.imageUrl());
// console.log(faker.name.findName());
const randomMerchantList = (n) => {
  if (n <= 0) return [];
  const merchantList = [];

  // loop and push category
  Array.from(new Array(n)).forEach(() => {
    const merchant = {
      id: faker.random.uuid(),
      name: faker.commerce.department(),
      foodName: faker.commerce.productName(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    merchantList.push(merchant);
  });

  return merchantList;
};

const randomFoodList = (merchantList, numberOfFoods) => {
  if (numberOfFoods <= 0) return [];
  const foodList = [];

  // random  data
  for (const merchant of merchantList) {
    Array.from(new Array(numberOfFoods)).forEach(() => {
      const food = {
        merchantId: merchant.id,
        id: faker.random.uuid(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: Number.parseFloat(faker.commerce.price()),
        thumbnailUrl: faker.image.food(400, 400),
        createdAt: 1616346754759,
        updatedAt: 1616346754759,
      };
      foodList.push(food);
    });
  }

  return foodList;
};
//  IFFE
(() => {
  // random data
  const merchantList = randomMerchantList(5);
  const foodList = randomFoodList(merchantList, 5);
  //   const f
  const db = {
    foods: foodList,
    orders: [],
    merchants: merchantList,
  };

  //   write db object to db.json
  fs.writeFile("db.json", JSON.stringify(db), () => {
    console.log("Write data successfully");
  });
})();
