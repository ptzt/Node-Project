const getConnection = require('../model/db')

const getAllProducts = async (req, res) => {
    try {
        const conn = await getConnection();
        const result = await conn.query("SELECT P.*, C.categoryName FROM products P JOIN categories C on P.category = C.id_c");
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id_p } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM products WHERE id_p = ?", id_p);
        res.json(result[0]);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
};

const getProductByCategory = async (req, res) => {
    try {
        const { categoryName } = req.params
        const connection = await getConnection()
        const result = await connection.query("SELECT * FROM products LEFT JOIN categories ON products.category = categories.id_c WHERE categories.categoryName = ?", categoryName)
        res.json(result)
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}

const addProduct = async (req, res) => {
    try {
        const { productName, price, shipping, description, productCondition, category } = req.body
        const product = { productName, price, shipping, description, productCondition, category }
        const connection = await getConnection()
        let conn = await connection.query("INSERT INTO products set ?", product)
        res.json({ message: 'Product added' })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { productName, price, shipping, description, productCondition, category } = req.body

        const product = { productName, price, shipping, description, productCondition, category }
        const connection = await getConnection()
        const result = await connection.query("UPDATE products SET ? WHERE id = ?", [product, id])
        res.status(201).json({ message: "Product was updated" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const connecion = await getConnection()
        const result = await connecion.query("DELETE FROM products WHERE id = ?", id)
        res.json({ message: "Product deleted" })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}


module.exports = {
    getAllProducts,
    getProductById,
    getProductByCategory,
    addProduct,
    deleteProduct,
    updateProduct
}