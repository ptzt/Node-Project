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
        const orders = await connecion.query("SELECT * FROM orders O LEFT JOIN product_order PO ON O.id_order = PO.id_order LEFT JOIN products P ON P.id_p = PO.id_product WHERE O.id_order = ?", id_order)
        console.log(orders)
        let result = { 
            id_order : id_order,
            total_price: orders[0].total_price,
            quantity_of_products: orders.filter((order) => order.id_p).length,
            "products": orders.filter((order) => order.id_p).map((order) => (
              {
                id_p: order.id_p,
                product_name: order.product_name,
                price: order.price,
                quantity: order.quantity,
                shipping: order.shipping,
                description: order.description,
                product_condition: order.product_condition
              }  
            )),
        } 
        res.json(result)
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
        // el validation.length no responde a comparaciones 
        let validation = await connection.query("SELECT * FROM product_order WHERE id_product = ? AND id_order = ?", [id_product, id_order])
        //console.log(validation.length, Boolean(validation.length), validation.lenght > 0)
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
        const { id_product,quantity } = req.body
        let sum = 0

        const connection = await getConnection()
        const result = await connection.query("UPDATE product_order SET quantity = ? WHERE id_order = ? AND id_product = ?", [quantity, id_order, id_product])
        let productByOrder = await connection.query("SELECT * FROM orders O LEFT JOIN product_order PO ON O.id_order = PO.id_order LEFT JOIN products P ON P.id_p = PO.id_product WHERE O.id_order = ?;", id_order)
            productByOrder.forEach((data) => {
                sum += data.price * data.quantity
            })
        await connection.query("UPDATE orders SET total_price=? WHERE id_order=?", [sum, id_order])
        res.status(201).json({ message: "Order was updated" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong. '})
    }
}

const deleteProduct = async(req,res) => {
    try {
        const {id_order,id_product} = req.body
        let sum = 0

        const connection = await getConnection()
        const result = await connection.query("DELETE FROM product_order WHERE id_order = ? AND id_product = ?", [id_order, id_product])
        let productByOrder = await connection.query("SELECT * FROM orders O LEFT JOIN product_order PO ON O.id_order = PO.id_order LEFT JOIN products P ON P.id_p = PO.id_product WHERE O.id_order = ?;", id_order)
            productByOrder.forEach((data) => {
                sum += data.price * data.quantity
            })
        await connection.query("UPDATE orders SET total_price=? WHERE id_order=?", [sum, id_order])
        res.status(202).json({ message: `Product deleted from order ${id_order}`})
    }catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong.' })
    }
}

const deleteOrder = async (req, res) => {
    try {
        const { id_order } = req.params
        const connection = await getConnection()
        await connection.query("DELETE FROM orders WHERE id_order = ?", id_order)
        await connection.query("DELETE FROM product_order WHERE id_order = ?", id_order)
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
    deleteProduct,
    deleteOrder
}