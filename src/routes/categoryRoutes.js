const router = require('express').Router()
const categoriesController = require('../controllers/categories.controller')

router
    .route("/")
    .get(categoriesController.getAllCategory)
    .post(categoriesController.addCategory)

router
    .route("/:id_c")
    .get(categoriesController.getCategoryById)
    .put(categoriesController.updateCategory)

module.exports = router
