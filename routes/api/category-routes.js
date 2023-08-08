const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
    const categories = await Category.findAll({
      include:[{model:Product}]
    });
    res.status(200).json(categories);
  } catch(error){
   res.status(500).json({error:"internal server error"});
  }
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

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: { id: req.params.id },
  })
    .then((updatedCategory) => {
      if (!updatedCategory[0]) {
        res.status(404).json({ message: 'There is no category with that id. Try again.' });
        return;
      }
      res.json({ message: 'Category updated successfully.' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const catDelete = await Category.destroy({
      where: {id: req.params.id}
    });
    if(!catDelete) {
      res.status(404).json({message: 'No category with this id'});
      return;
    }
    res.status(200).json(catDelete)
  }catch(error) {
    res.status(500).json({error:"internal server error"});
  }
});

module.exports = router;
