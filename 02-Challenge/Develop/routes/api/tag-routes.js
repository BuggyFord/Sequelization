const router = require('express').Router();
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
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
