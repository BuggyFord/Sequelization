const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
router.get('/', async (req, res) => {
  try{
    const tag = await Tag.findAll({
      include:[{model:Product, 
        attributes: ["id", "product_name", "price", "stock", "category_id"]}
      ]
    });
    res.status(200).json(tag);
  } catch(error){
   res.status(500).json({error:"internal server error"});
  }
});

// '/api/categories/?
router.get('/:id', async (req, res) => {
  // we CAPTURE the dynamic part of the incoming REQUEST (req.params.id)
  let tagId = req.params.id;
  // find one category by its `id` value
  try{ 
    let currentTag = await Tag.findOne({ 
      where: { id: req.params.id },
      // be sure to include its associated Products
      include: [Product]
    });
    console.log("Data: ", currentTag);
    res.json(currentTag);
  } catch(error) {
    res.status(500).json({error:"internal server error"});
  }
});

router.post('/', async (req, res) => {
  // create a new category
  let newTag = await Category.create(req.body);

 //  res.json(newTag);
  res.json({ msg: "Tag Created Successfully"});
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: { id: req.params.id },
  })
    .then((updatedTag) => {
      if (!updatedTag[0]) {
        res.status(404).json({ message: 'There is no tag with that id. Try again.' });
        return;
      }
      res.json({ message: 'Tag updated successfully.' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  // delete a tag by its `id` value
  try{
    const tagDelete = await Tag.destroy({
      where: {id: req.params.id}
    });
    if(!tagDelete) {
      res.status(404).json({message: 'No Tag with this id'});
      return;
    }
    res.status(200).json(tagDelete)
  }catch(error) {
    res.status(500).json({error:"internal server error"});
  }
});

module.exports = router;
