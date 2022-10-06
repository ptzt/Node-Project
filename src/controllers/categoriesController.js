const getConnection = require('../model/db')

const getAllCategory = async (req, res) => {
    try {
        const connection = await getConnection()
        const result = await connection.query("SELECT * FROM categories")
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}

const getCategoryById = async (req, res) => {
    try {
        const { id_c } = req.params
        const connection = await getConnection()
        const result = await connection.query("SELECT * FROM categories WHERE id_c = ?", id_c)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}

const addCategory = async (req, res) => {
    try {
        const { category_name } = req.body
        const category = { category_name }
        const connection = await getConnection()
        let result = await connection.query("INSERT INTO categories set ?", category)
        res.status(201).json({ message: "Category was created" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

const updateCategory = async (req, res) => {
    try {
        const { id_c } = req.params
        const { category_name } = req.body

        const category = { category_name }
        const connection = await getConnection()
        const result = await connection.query("UPDATE categories SET ? WHERE id_c = ?", [category, id_c])
        res.status(201).json({ message: "Category was updated" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}

const deleteCategory = async (req, res) => {
    try {
        const { id_c } = req.params
        const connection = await getConnection()
        const result = await connection.query("DELETE FROM categories WHERE id_c = ?", id_c)
        res.json({ message: "Category deleted" })
    } catch (error) {
        res.status(500).json(console.log(error))
    }
}

module.exports = {
    getAllCategory,
    getCategoryById,
    addCategory,
    updateCategory,
    deleteCategory
}