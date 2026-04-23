const mongoose = require('mongoose');
const Food = require('./models/Food'); // Will be auto-created from schema

mongoose.connect('mongodb://127.0.0.1:27017/golden_dragon')
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Sample Chinese menu items
    const menuItems = [
      {
        name: 'Veg Noodles',
        price: 180,
        category: 'Noodles',
        image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246'
      },
      {
        name: 'Chicken Fried Rice',
        price: 220,
        category: 'Rice',
        image: 'https://cicili.tv/wp-content/uploads/2024/08/Chicken-Fried-Rice-Small-2-1200x900.jpg'
      },
      {
        name: 'Pork Dumplings',
        price: 250,
        category: 'Dumplings',
        image: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2020/11/19/0/MW612_pork-dumplings_s4x3.jpg.rend.hgtvcom.1280.960.suffix/1605802271825.webp'
      },
      {
        name: 'Vegetable Spring Rolls',
        price: 190,
        category: 'Appetizers',
        image: 'https://www.cubesnjuliennes.com/wp-content/uploads/2021/01/Spring-Roll-Recipe-500x375.jpg'
      },
      {
        name: 'Hakka Noodles',
        price: 200,
        category: 'Noodles',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmg7gMdjVi3XmFyBuIkrujLjg6ot1UTGBW_g&s'
      },
      {
        name: 'Manchurian Rice',
        price: 210,
        category: 'Rice',
        image: 'https://www.nehascookbook.com/wp-content/uploads/2022/10/Fried-rice-lobi-manchurian-WS-1.jpg'
      },
      {
        name: 'Schezwan Chicken',
        price: 220,
        category: 'Appetizers',
        image: 'https://hips.hearstapps.com/hmg-prod/images/szechuan-chicken-horizontal-1526594491.jpg?crop=0.667xw:1.00xh;0.170xw,0&resize=1200:*'
      },
      {
        name: 'Gobbi Manchurian',
        price: 120,
        category: 'Appetizers',
        image: 'https://palatesdesire.com/wp-content/uploads/2022/09/dry-gobi-manchurian-recipe@palates-desire-480x270.jpg'
      },
      {
        name: 'Veg Fried Rice',
        price: 100,
        category: 'Rice',
        image: 'https://blog.swiggy.com/wp-content/uploads/2024/09/Image-1_-Schezwan-Fried-Rice-1024x538.png'
      },
      {
        name: 'Schezwan Noodles',
        price: 200,
        category: 'Noodles',
        image: 'https://herbivorecucina.com/wp-content/uploads/2023/09/Schezwan-Noodles-2.jpg'
      },
      {
        name: 'Egg Schezwan Noodles',
        price: 165,
        category: 'Noodles',
        image: 'https://www.cookwithmanali.com/wp-content/uploads/2021/08/Schezwan-Noodles-500x500.jpg'
      },
      {
        name: 'Egg Puff',
        price: 25,
        category: 'Appetizers',
        image: 'https://www.pavaniskitchen.com/wp-content/uploads/2023/04/egg-puffs-4.jpg'
      },
      {
        name: 'Paneer Schezwan',
        price: 125,
        category: 'Appetizers',
        image: 'https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_960,w_960//InstamartAssets/Receipes/paneer_schezwan.webp'
      },
      {
        name: 'Chicken Chilly',
        price: 225,
        category: 'Appetizers',
        image: 'https://pupswithchopsticks.com/wp-content/uploads/chilli-chicken-thumbnail-500x500.jpg'
      },
      {
        name: 'Schezwan Fried Rice',
        price: 225,
        category: 'Rice',
        image: 'https://www.maggi.in/sites/default/files/srh_recipes/f6f14791459d6873db11a54ee5deea60.jpg'
      },
      {
        name: 'Chicken Dumpling',
        price: 225,
        category: 'Dumplings',
        image: 'https://rasamalaysia.com/wp-content/uploads/2018/01/chicken-dumplings.jpg'
      },
    ];

    // Clear existing & seed new
    await Food.deleteMany({});
    await Food.insertMany(menuItems);
    
    
    process.exit(0);
  })
  .catch(err => {
    console.error('Seed failed:', err);
    process.exit(1);
  });

