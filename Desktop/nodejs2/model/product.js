const fs = require('fs')
const path = require('path')

const db = require('../helpers/database')

module.exports = class Product {
    constructor( ids, name, typeId, price, description, image,) {
        this.ids = ids ? ids : null
        this.name = name
        this.typeId = typeId
        this.price = price
        this.description = description
        this.image = image
        
        

        console.log(this.name)
    }

    async save() {
        const result = await db.execute('INSERT INTO products (name,price,image,description, type_id) VALUES (?,?,?,?,?)',
        [
            this.name,
            this.price, 
            this.image,
            this.description,
            this.typeId
        ]   
        )

        if(result[0]){
            return result[0]
        } 

        return null
    }

    static async deleteProduct(productId) {
        console.log('productId',productId)
    if (!productId || !(+productId) || +productId < 1) {
        
        throw new Error('Invalid product Id')
        
    }
    const result = await db.execute('DELETE FROM products WHERE id=?', [productId])
    if(result[0]){
        return result[0]
    }

    return null
    }

    static async deleteFields(fieldsId) {
        if (!fieldsId?.length) {
            console.log('qara, hatoying bor: ', +fieldsId )
            throw new Error('Invalid product Id')
            
        }
    
        
        const ids = fieldsId.join()
        const sql = `DELETE FROM products_fields WHERE field_id IN (${ids})`
        console.log(sql)
        const deleteFieldsFunc = await db.execute(sql)
    
        if(deleteFieldsFunc[0]){
            return deleteFieldsFunc[0]
        }
    
        return null
    }
    
    static async findById(productId) {
        if (!productId || !(+productId) || +productId < 1) {
            console.log(`Error: ${productId}`)
            throw new Error('Invalid product Id')
        }
        console.log('before findById db exec')
        const result = await db.execute('SELECT p.*,t.type FROM products p JOIN types t ON p.type_id=t.id WHERE p.id=?', [productId])
        console.log('after findById bd exec')
        if (result[0]) {
            return result[0]
        }

        return null
    }

    static async fetchAll(name, orderBy = '', orderDirection = '') {
        let sqlQuery = 'SELECT * FROM products'

        if(name && typeof name === 'string'){
            sqlQuery += ` WHERE name LIKE ?`
        }

        if (orderBy) {
            const orderByDir = orderDirection === 'ASC' ? orderDirection : 'DESC'
            sqlQuery += ` ORDER BY ${orderBy} ${orderByDir}`
        }
        console.log('To\'gri')
        const result = await db.execute(sqlQuery, [`%${name}%`])  
        if(result[0]){
            return result[0]
        }
        return null
    }

    static async loadTypes(){
        const result = await db.execute('select *, (SELECT count(*) FROM products WHERE type_id=t.id) as used from types t')
    
    if(result[0]){
        return result[0]
    }
    return null

    }

    static async getType(typeId){
        if (!typeId || !(+typeId) || +typeId < 1) {
            throw new Error('Invalid product Id')
        }
        const type = await db.execute('SELECT * FROM  types t WHERE t.id=?', [typeId])

        if(type[0][0]){
           return type[0][0]
        }

        return null
    }

    static async searchProduct(name, orderBy = '', orderDirection = ''){
        // WHERE name LIKE ?
        let sqlQuery = 'SELECT * FROM products'
    
        if(name && typeof name === 'string'){
            sqlQuery += ` WHERE name LIKE ?`
        } else {
            console.log('it is not name')
        }
    
        if (orderBy) {
            const orderByDir = orderDirection === 'ASC' ? orderDirection : 'DESC'
            sqlQuery += ` ORDER BY ${orderBy} ${orderByDir}`
        }
    
        console.log('sql', sqlQuery)
    
        const qiymat = await db.execute(sqlQuery, [`%${name}%`])
    
        if(qiymat[0][0]){
            return qiymat[0][0]
        }
        return null
    }

    static async updateType(productType){
        const data = await db.execute('UPDATE types SET type=? WHERE id=?', [
            productType.type,
            productType.id])
        if(data[0][0]){
            return data[0][0]
        }
        /*[
            productType.type,
            productType.id,
        ])*/
    }

    static async updateProduct (product) {
        const result = await db.execute('UPDATE products SET name=?,type_id=?,price=?,image=?,description=? WHERE id=?',
            [
                product.name,
                product.type_id,
                product.price,
                product.image,
                product.description,
                product.id
            ])
            if(result[0]){
                return result[0]
            }
            return null
    }

    static async getProductFields(product_id) {
        if (!(+product_id) || +product_id < 1) {
            throw new Error('Invalid product Id')
        }
    
        const resultFields = await db.execute('SELECT * FROM products_fields WHERE product_id=?', [product_id])
        if(resultFields[0]){
            return resultFields[0]
        }
    
        return null
    }
    
    static async updateFields(field_id, field, value) {
        return await db.execute(`UPDATE products_fields SET field_name=?, field_value=? WHERE field_id=?`,
            [field, value, +field_id])
    }

    static async addProductFields (product_id, fields, values) {
        if (typeof fields === 'string') {
            const result = await db.execute('INSERT INTO products_fields (field_name,field_value,product_id) VALUES (?,?,?)',
            [fields, values, +product_id])
            if(result[0]){
                return result[0]
            }
            return null
        }
        console.log(fields, values)
        fields.forEach( async (field, index) => {
            console.log(field, values[index], product_id)
            const result2 = await db.execute('INSERT INTO products_fields (field_name,field_value,product_id) VALUES (?,?,?)',
            [field, values[index], +product_id])
            console.log('bu yangi qiymat 2',result2[0])
            if(result2[0]){
                console.log('bu yangi qiymat 2',result2[0])
                return result2[0]
            }
            return null
        })
        
    }

    static async loadProducts (orderingColumn , orderingDirection) {
        /*const filename = path.join(__dirname, '..', 'product.json')
        try {
            const data = fs.readFileSync(filename, 'utf8')
            return JSON.parse(data)
        } catch(error) {
            console.log(error)
        }
        return []*/
    
        let sqlQuery = 'SELECT * FROM pro.products'
    
        if (orderingColumn) {
            const orderByDir = orderingDirection === 'ASC' ? orderingDirection : 'DESC'
            sqlQuery += ` ORDER BY ${orderingColumn} ${orderByDir}`
        }
    
        const result = await db.execute(sqlQuery)
    
        if(result[0]){
            return result[0]
        }
        return null
    }

    static async getProduct(productId) {
        if (!productId || !(+productId) || +productId < 1) {
            console.log(`Error: ${productId}`)
            throw new Error('Invalid product Id')
        }
        console.log('before findById db exec')
        const result = await db.execute('SELECT p.*,t.type FROM products p JOIN types t ON p.type_id=t.id WHERE p.id=?', [productId])
        console.log('after findById bd exec')
        //console.log(result)
        if (result[0][0]) {
            return result[0][0]
        }
    
        return null
    }

    static async getProductFields(product_id) {
        if (!(+product_id) || +product_id < 1) {
            throw new Error('Invalid product Id')
        }
    
        const resultFields = await db.execute('SELECT * FROM products_fields WHERE product_id=?', [product_id])
        if(resultFields[0]){
            return resultFields[0]
        }
    
        return null
    }

    static async usedType(typeId){
        const val = await db.execute('SELECT count(*) as count FROM products WHERE type_id=?', [typeId])
        if(val[0]){  
            return val[0]
        }

        return null
    }

    static async deleteType(typeid){
        console.log('productId',typeid)
        if (!typeid || !(+typeid) || +typeid < 1) {
            
            throw new Error('Invalid product Id')
            
        }
        const qiymat = await db.execute('DELETE FROM types WHERE id=?', [typeid])

        if(qiymat[0]){
            return qiymat[0]
        }

        return null
    }

    static async addProductFields (product_id, fields, values) {
        if (typeof fields === 'string') {
            const result = await db.execute('INSERT INTO products_fields (field_name,field_value,product_id) VALUES (?,?,?)',
            [fields, values, +product_id])
            if(result[0]){
                //console.log('bu yangi qiymat',result[0])
                return result[0]
            }
            return null
        }
        console.log(fields, values)
        fields.forEach( async (field, index) => {
            console.log(field, values[index], product_id)
            const result2 = await db.execute('INSERT INTO products_fields (field_name,field_value,product_id) VALUES (?,?,?)',
            [field, values[index], +product_id])
            //console.log('bu yangi qiymat',result2[0])
            if(result2[0]){
                //console.log('bu yangi qiymat',result2[0])
                return result2[0]
            }
            return null
        })
        
    }
    
    static async addType (type) {
        return await db.execute('INSERT INTO types (type) VALUES (?)',
        [
            type.name
        ])
    }

    static getSortCriteria(sortBy='') {
        if (typeof sortBy === 'string') {
            console.log('hello', typeof sortBy, sortBy)
        }
            const items = sortBy.split(' ')
            console.log('items', typeof items, items)
            let direction = 'DESC'
            if (items.length > 1 && items[1] === 'low') {
                direction = 'ASC'
                console.log('1 dan katta va 2-qiymat low')
            }
    
            return {
                sortField: items.length ? items[0] : '',
                sortDirection: direction
            }
    }


    static async getById(ids){
    
        const proIds = ids//.join()
        const sql = `SELECT * FROM products p WHERE p.id IN (${proIds})`
        console.log(sql)
        const result = await db.execute(sql)
    
        if(result[0]){
            return result[0]
        }
    
        return null
    }
}