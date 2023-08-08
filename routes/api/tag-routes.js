const router = require('express').Router();
const { any } = require('sequelize/types/lib/operators');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
try{
  const tags = await Tag.findAll();
} catch(error){
  res.status(500).json({error:"internal server error"});
}
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  let tagId = req.params.id;
  // find a single tag by its `id`
  try{
    let currentTag = await Tag.findOne({
      where: { id: req.params.id},
        // be sure to include its associated Product data
        include: [Product]
    });
    console.log("Data: ", currentTag);
    res.json(currentTag);
  } catch(error) {
    res.status(500).json({error:"internal server error"});
  }

});

router.post('/', async (req, res) => {
  // create a new tag
  let userTag = req.body;

  let newTagg = await Tag.create(req.body);

  res.json({msg: "Tag Created Successfully"});
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: { id: req.params.id },
  })
  .then((updatedTag) => {
    if(!updatedTag[0]) {
      res.status(404).json({ message: 'There is no tag with that id.'});
      return;
    }
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  })  
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    const tagDelete = await Tag.destroy({
      where: { id: req.params.id}
    });
    if(!tagDelete) {
      res.status(404).json({message: 'No tag with this id '});
      return;
    }
    res.status(200).json(tagDelete)
  }catch(error) {
    res.status(500).json({error: "internal server error"})
  }
});

module.exports = router;
