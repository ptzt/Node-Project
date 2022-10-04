const { get } = require('../app')
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
        const { categoryName } = req.body
        const category = { categoryName }
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
        const { name } = req.body

        const category = { name }
        const connection = await getConnection()
        const result = await connection.query("UPDATE categories SET ? WHERE id_c = ?", [category, id_c])
        res.status(201).json({ message: "Category was updated" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}

const deleteCategory = async (req, res) => {
    try {

    } catch (error) {

    }
}

module.exports = {
    getAllCategory,
    getCategoryById,
    addCategory,
    updateCategory
}