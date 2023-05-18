const fs = require('fs')
const path = require('path')

const db = require('../helpers/database')
const datetime = require('../helpers/datetime')

module.exports = class orders {

    constructor(  ids, payment_type, consumer_id,taking_form, status) {
        this.ids = ids
        this.payment_type = payment_type
        this.consumer_id = consumer_id
        this.taking_form = taking_form
        this.status = status
        this.products = []
    }

    addProduct(product) {
        this.products.push(product)
    }

    async save() {
        const result = await db.execute('INSERT INTO pro.orders (customer_id,taking_form, payment_type,status) VALUES(?, ?, ?,?)', [
            this.consumer_id,
            this.taking_form,
            this.payment_type,
            this.status 
        ])

        if (result[0]) {
            this.id = result[0].insertId
        }
    }

    setId(id) {
        this.id = id
    }

    static async get(id) {
        const result = await db.execute('SELECT * FROM orders where id=?', [id])
        //console.log('result',result)
        if (result[0]) {
            const order = new orders(
                result[0][0].customer_id,
                result[0][0].payment_type,
                result[0][0].taking_form,
                result[0][0].status
            )
            order.setId(result[0][0].id)
            return order
        }
    }

    async addProduct(product, count) {
        if (!this.id) {
            throw 'Order is not saved'
        }
        return await db.execute('INSERT INTO ordered_products (order_id,name,price,image,description, type_id, created, count,product_id) VALUES (?,?,?,?,?,?,?,?,?)', [
            this.id,
            product.name,
            product.price,
            product.image,
            product.description, 
            product.type_id,
            product.created,
            count,
            product.id
        ])
    }

    async showProduct(product, count) {
        return await db.execute('INSERT INTO ordered_products (order_id,name,price,image,description, type_id, created, count,product_id) VALUES (?,?,?,?,?,?,?,?,?)', [
            this.consumer_id,
            product.name,
            product.price,
            product.image,
            product.description, 
            product.type_id,
            product.created,
            count,
            product.id
        ])
    }

    static async addProductInformation(taking_form,payment_type){
        return await db.execute('INSERT INTO pro.orders (taking_form, payment_type,status) VALUES(?, ?, ?)', [
            taking_form,
            payment_type,
            status
        ])
    }
    
    static async addOrderedProduct(id, product, count){
        return await db.execute('INSERT INTO ordered_products (iorder_idd,name,price,image,description, type_id, created, count) VALUES (?,?,?,?,?,?,?,?)', [
            id,
            product.name,
            product.price,
            product.image,
            product.description, 
            product.type_id,
            product.created,
            count
        ])
    }
    
    async getOrderedProducts() {
        console.log('new success!')
        const result = await db.execute('SELECT * FROM pro.ordered_products WHERE order_id=?', [this.ids])
        if(result[0]){
            //console.log(result[0])
            return result[0]
        }
        return null
    }

setCreated(created) {
    this.created = created
    this.createdHumanReadable = datetime.getHumanReadibleDateTime(created)
    return this.createdHumanReadable
}

    static async getOnlyOrder(id) {
        //console.log('new success!')
        const result = await db.execute('SELECT op.order_id,op.name,op.price,op.image,op.description,op.type_id,op.count,op.product_id,o.* FROM ordered_products op JOIN orders o ON op.order_id=o.id WHERE op.order_id=?', [id])
        //console.log(result)
        if(result[0]){
            console.log(result[0])
           return result[0]
        }
        return null
    }

    setCount(count) {
        this.count = count
    }

    static async getOrders() {
        //console.log('new success!')
        const result = await db.execute('SELECT o.*, (select sum(count) from ordered_products where order_id=o.id) as count FROM orders o ORDER BY created DESC')
        if(result[0]){
            let order = []
            result[0].forEach((item, index) => {
                if(item?.id){
                    order.push(new orders(
                        null,
                        item.payment_type,
                        item.customer_id,
                        item.taking_form,
                        item.status
                    )) 
                    order[index].setCreated(item.created)
                    order[index].setId(item?.id)
                    order[index].setCount(item?.count)
                } 
            });
            return order
        }
        return null
    }

    static async updateStatus(status, id) {
        //console.log('new success!')
        const result = await db.execute('UPDATE orders SET status = ? WHERE id = ?', 
        [status, id])
        console.log(result)
        if(result[0]){
            return result[0]
        }
        return null
    }
    
}

