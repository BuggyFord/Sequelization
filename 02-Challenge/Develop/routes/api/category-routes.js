const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
 
  // find all categories
  // Find all users
  try{
    const categories = await Category.findAll();
    res.json(categories);
  }catch (error){
   res.status(500).json({error:"internal server error"});
  }
  
  // be sure to include its associated Products
});

// '/api/categories/?
router.get('/:id', async (req, res) => {
  // we CAPTURE the dynamic part of the incoming REQUEST (req.params.id)
  let categoryId = req.params.id;
  // find one category by its `id` value
  try{ 
    let currentCategory = await Category.findOne({ 
      where: { id: req.params.id },
      // be sure to include its associated Products
      include: [Product]
    });
    console.log("Data: ", currentCategory);
    res.json(currentCategory);
  } catch(error) {
    res.status(500).json({error:"internal server error"});
  }
});

router.post('/', async (req, res) => {
  // create a new category
  let userInput = req.body;  // { category_name: "bingo" }

  let newCategory = await Category.create(req.body);

 //  res.json(newCategory);
  res.json({ msg: "Category Created Successfully"});
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  let categoryId = await Category.
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
