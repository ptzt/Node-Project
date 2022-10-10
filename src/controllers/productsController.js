const getConnection = require('../model/db')

const getAllProducts = async (req, res) => {
    try {
        const conn = await getConnection();
        // const result = await conn.query("SELECT P.*, C.category_name FROM products P JOIN categories C on P.category = C.id_c");
        const result = await conn.query("SELECT * FROM products");
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id_p } = req.params;
        if (id_p === 0 || id_p === undefined) {
            console.log('error')
        } else {
            const connection = await getConnection();
            const result = await connection.query("SELECT * FROM products WHERE id_p = ?", id_p);
            res.json(result[0]);
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
};

const getProductByCategory = async (req, res) => {
    try {
        const { categoryName } = req.params
        const connection = await getConnection()
        const result = await connection.query("SELECT * FROM products LEFT JOIN categories ON products.category = categories.id_c WHERE categories.category_name = ?", categoryName)
        res.json(result)
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}

const addProduct = async (req, res) => {
    try {
        const { product_name, price, shipping, description, product_condition, category } = req.body
        const product = { product_name, price, shipping, description, product_condition, category }
        const connection = await getConnection()
        let conn = await connection.query("INSERT INTO products set ?", product)
        res.json({ message: 'Product added' })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id_p } = req.params
        const { product_name, price, shipping, description, product_condition, category } = req.body

        const product = { product_name, price, shipping, description, product_condition, category }
        const connection = await getConnection()
        const result = await connection.query("UPDATE products SET ? WHERE id_p = ?", [product, id_p])
        res.status(201).json({ message: "Product was updated" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id_p } = req.params
        const connection = await getConnection()
        const result = await connection.query("DELETE FROM products WHERE id_p = ?", id_p)
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