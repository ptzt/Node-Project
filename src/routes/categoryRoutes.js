const router = require('express').Router()
const categoriesController = require('../controllers/categoriesController')

router
    .route("/")
    .get(categoriesController.getAllCategory)
    .post(categoriesController.addCategory)

router
    .route("/:id_c")
    .get(categoriesController.getCategoryById)
    .put(categoriesController.updateCategory)
    .delete(categoriesController.deleteCategory)

module.exports = router
