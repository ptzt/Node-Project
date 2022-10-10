const getConnection = require('../model/db')

const getAllOrders = async (req, res) => {
    try {
        const conn = await getConnection()
        const result = await conn.query("SELECT * FROM orders")
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(console.log(error))
    }
}

const getOrderById = async (req, res) => {
    try {
        const { id_order } = req.params
        const connecion = await getConnection()
        const result = await connecion.query("SELECT * FROM orders WHERE id_order = ?", id_order)
        res.json(result[0])
    } catch (error) {
        res.status(500).json(console.log(error))
    }
}

const createOrder = async (req, res) => {
    try {
        const connection = await getConnection()
        let conn = await connection.query("INSERT INTO orders(`total_price`) VALUES (0.0)")
        res.json({ order_id: conn.insertId })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong.' })
    }
}

const addProduct = async (req, res) => {
    try {
        let sum = 0
        const { id_product, quantity } = req.body
        const { id_order } = req.params
        const connection = await getConnection()
        let validation = await connection.query("SELECT * FROM product_order WHERE id_product = ? AND id_order = ?", [id_product, id_order])
        if (!Boolean(validation.length)) {
            let result = await connection.query("INSERT INTO product_order (id_product, id_order, quantity) VALUES (?, ?, ?)", [id_product, id_order, quantity])
            let productByOrder = await connection.query("SELECT * FROM orders O LEFT JOIN product_order PO ON O.id_order = PO.id_order LEFT JOIN products P ON P.id_p = PO.id_product WHERE O.id_order = ?;", id_order)
            productByOrder.forEach((data) => {
                sum += data.price * data.quantity
            })
            let priceUpdate = await connection.query("UPDATE orders SET total_price=? WHERE id_order=?", [sum, id_order])
            res.json({
                message: `Orders' final price is: ${sum}$`
            })
        } else {
            res.json({ message: 'This product was added previously.' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong.' })
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id_order } = req.params
        const { id_products } = req.body

        const order = { id_products }
        const connection = await getConnection()
        const result = await connection.query("UPDATE orders SET ? WHERE id_order = ?", [order, id_order])
        res.json(201).json({ message: "Order was updated" })
    } catch (error) {
        res.status(500).json(console.log(error))
    }
}

const deleteOrder = async (req, res) => {
    try {
        const { id_order } = req.params
        const connection = await getConnection()
        const result = await connection.query("DELETE FROM orders WHERE id_order = ?", id_order)
        res.json({ message: "Order deleted" })
    } catch (error) {
        res.status(500).json(console.log(error))
    }
}

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    addProduct,
    updateProduct,
    deleteOrder
}