const router = require('express').Router()
const productsController = require('../controllers/productsController')

router
    .route("/")
    .get(productsController.getAllProducts)
    .post(productsController.addProduct)

router
    .route("/:id_p")
    .get(productsController.getProductById)
    .put(productsController.updateProduct)
    .delete(productsController.deleteProduct)

router
    .route("/category/:categoryName")
    .get(productsController.getProductByCategory)


module.exports = router