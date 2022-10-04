const router = require('express').Router()
const productsController = require('../controllers/products.controller')
const categoriesController = require('../controllers/categories.controller')

router
    .route("/products")
    .get(productsController.getAllProducts)
    .post(productsController.addProduct)

router
    .route("/products/:id_p")
    .get(productsController.getProductById)
    .put(productsController.updateProduct)
    .delete(productsController.deleteProduct)

router
    .route("/products/category/:categoryName")
    .get(productsController.getProductByCategory)

router
    .route("/category")
    .get(categoriesController.getAllCategory)
    .post(categoriesController.addCategory)

router
    .route("/category/:id_c")
    .get(categoriesController.getCategoryById)
    .put(categoriesController.updateCategory)
    .delete(categoriesController.deleteCategory)
module.exports = router