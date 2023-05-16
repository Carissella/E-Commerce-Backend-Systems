const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

router.get("/", (req, res) => {
  Product.findAll()
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

router.get("/:id", (req, res) => {
  Product.findOne({ where: { id: req.params.id } })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

router.post("/", (req, res) => {
  Product.create({
    product_name: req.body.product_name,
    price: req.body.price,
    stock: req.body.stock,
    tagIds: req.body.tagIds,
  })
    .then((product) => {
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put("/:id", (req, res) => {
  Tag.update(req.body, { where: { id: req.params.id } })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

router.delete("/:id", (req, res) => {
  Product.destroy({ where: { id: req.params.id } })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

module.exports = router;
