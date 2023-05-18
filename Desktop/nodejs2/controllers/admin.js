const { menuItems, products, appNames, productTypes } = require('../data')

const { 
  addProduct, 
  loadProducts, 
  getProduct, 
  updateProduct,
  deleteProduct,
  getProductFields,
  updateFields,
  addProductFields,
  loadTypes,
  deleteFields,
  searchProduct,
  loadProduct,
  getType,
  updateType,
  addType,
  deleteType,
  usedType
} = require('../helpers/products')
const Product = require('../model/product')
const Order = require('../model/order')
const Consumers = require('../model/consumers')
const datetime = require('../helpers/datetime')

const deleteProductTypeController = async (req, res) => {
    const isUsed = await Product.usedType(req.params.typeid)
    
      if (isUsed?.[0]?.count > 0) {
        res.json({status: 'FAIL', message: 'Product type is used'})
      } else {
        const result = await Product.deleteType(req.params.typeid)
        console.log('qiymat ', result)
        if (result.affectedRows) {
          console.log('STATUS OK')
          res.json({status: 'OK'})  
        } else { 
          res.json(result)
        }
      }
}

const addtype = async (req, res) => {
  console.log('dwdwwwwwww', req.body.name)
  const typesName = {
    name: req.body.type
  }

console.log('man rrrrn', typesName)
  
  const result = await Product.addType(typesName)
  console.log('result',result)
      res.redirect('/admin/product-types')
}

const addTypeController = (req, res) => {
  res.render('admin/add-types', {
    title: 'Add product form',
    menu: menuItems,
    isAdmin: true,
    loggedInUser: req.session.loggedInUser
  })
}

const updateTypes = async (req, res) => {
  const types = {
    type: req.body.type,
    id: req.params.typeid
  }
  console.log('men type man',types)
  const result = await Product.updateType(types)

    res.redirect('/admin/product-types')
}

const getType1 = async (req, res) => {
  console.log('type id',req.body.type)
    const typeFunction = await Product.getType(req.params.typeid)
    console.log(typeFunction)
    //res.send(typeFunction)
    res.render('admin/edit-types', {
       title: 'Edit type form',
       types: typeFunction,
       menu: menuItems,
       isAdmin: true,
       loggedInUser: req.session.loggedInUser
    })
}

const proTypes = async (req, res) => {
  const types = await Product.loadTypes()
   res.render('admin/productTypes', {
      title: 'Product types',
      menu: menuItems,
      productTypes: types,
      appNames: appNames,
      isAdmin: true,
      loggedInUser: req.session.loggedInUser
    })
}

const deleteController = async (req, res) => {
  const result = await Product.deleteProduct(req.params.productId)
  console.log('result',result)
  res.json({status: 'OK'})
}

const aboutPro = async (req, res) => {
  try {
    console.log('before calling findById')
    const product = await Product.getProduct(req.params.productId)
    //res.send(product)
    console.log('after calling findById')
    const productFields = await Product.getProductFields(req.params.productId)
    const typesInfo = await Product.loadTypes()  
    res.render('admin/edit-product', {
      title: 'Edit product form',
      menu: menuItems,
      types: typesInfo,
      isAdmin: true,
      products: product,
      product_fields: productFields,
      loggedInUser: req.session.loggedInUser
    })
    /*.then(([product, metaData]) => {
      return Promise.all([getProductFields(req.params.productId), product])
    })
    .then(([[rows, fields], product]) => {
      const types = loadTypes()
  types
  .then(([productTypes, metaData]) => {
    console.log('heyyyyy',rows[0], product[0])
    console.log('loooooooe',rows , productTypes)
    res.render('admin/edit-product', {
      title: 'Edit product form',
      menu: menuItems,
      types: productTypes,
      isAdmin: true,
      products: product[0],
      product_fields: rows,
      loggedInUser: req.session.loggedInUser
    })
  })
  .catch((err) => {
    res.redirect('/errorPage')
    console.log(err)
 })
      //console.log('product', product)
      //console.log('fields', rows)
      
    })
    .catch((err) => {
      console.log(err)
      res.redirect('/errorPage')
    })*/
  } catch (err) {
      console.log(err)
      res.redirect('/errorPage')
  }
}

const updateProducts = async (req, res) => {
  const product = {
    name: req.body.name,
    type_id: req.body.type_id,
    price: req.body.price,
    image: req.body.image,
    description: req.body.description,
    id: req.params.productId
  }
  const fields = {
    name: req.body.field_name,
    value: req.body.field_value,
    id: req.body.field_id

  }
  console.log('men bu yerdamaneee',product , fields)


  const result = await Product.updateProduct(product)
  console.log('update result', result)
  const resultFields = await Product.getProductFields(req.params.productId)
     
      //console.log('DB fields data', fields)save
  const fieldsToDelete = []
  resultFields.forEach((field, index) => {
        let fieldFound = false
        if (typeof req.body.field_name === 'string') {
          if (field.field_id === +req.body?.field_id) {
            fieldFound = true
            console.log('hellobro', +req.body.field_id, +field.field_id)
          }
        } else if (req.body?.field_id?.length) {
          req.body?.field_id.forEach((field_id) => {
            field_id = +field_id
            if (field.field_id === field_id) {
              fieldFound = true
              console.log('hellitititobro', field_id, field.field_id)
            }
          })
        }

        if (!fieldFound) {
          fieldsToDelete.push(field.field_id)
        }
  })

  console.log('Items to delete', fieldsToDelete)

  if (typeof req.body.field_name === 'string') {
        if(req.body.field_id){
          const result2 = await Product.updateFields(req.body.field_id, req.body.field_name, req.body.field_value)
          console.log('men bu yerdafewffeman HEY4 ssss: 1', req.body.field_id)
        } else {
          const field_result2 = await Product.addProductFields(req.params.productId, req.body.field_name, req.body.field_value)
          console.log('id logirrrrn', req.body.field_id)
        }
        
        //res.redirect('/admin/products/' + req.params.productId)
  } else if(req.body.field_name?.length){
    console.log('req.body.field_name', req.body.field_name.length)
        req.body.field_name.forEach(async (field, index) => {
          if (+req.body.field_id[index]){
            await Product.updateFields(req.body.field_id[index], field, req.body.field_value[index])
            console.log('id login', req.body.field_id[index])
          } else {
            await Product.addProductFields(req.params.productId, field, req.body.field_value[index])
            console.log('id login', req.body.field_id[index])
          }
        })
  }
      
  if (fieldsToDelete?.length) {
    const deleteProduct = await Product.deleteFields(fieldsToDelete)
    if(deleteProduct[0]){
          console.log('bu yangi qiymat o\'chirish uchun',deleteProduct[0])
    }
     
  }
  
  res.redirect('/admin/products')
      
}

const profileController = (req, res) => {
  res.render('profile', {
    title: 'Profile',
    menu: menuItems,
    contact: contacts,
    inform: inform,
    id: req.params.productId,
    loggedInUser: req.session.loggedInUser
  })
}

const productController = async (req, res) => {
  const products = await Product.loadProducts()
   // console.log('hello',keys)
   res.render('admin/products', {
      title: 'Products',
      menu: menuItems,
      products: products,
      appNames: appNames,
      isAdmin: true,
      loggedInUser: req.session.loggedInUser
    })
  
}

const postAddProduct = async (req, res) => {
  console.log('dwdwwwwwww', req.body)
  const pro = {
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    description: req.body.description,
    type_id: req.body.type_id
  }
const field = {
    name: req.body.field_name,
    value: req.body.field_value,
    id: req?.body?.field_id
}

  
  const product = new Product(
    null,
    req.body.name,
    req.body.type_id,
    req.body.price,
    req.body.description,
    req.body.image
  )
  console.log('man bottaman', field, pro, product)

  const result = await product.save()
  console.log('fild inform',result)
  //addProduct(pro)
  
    
      
      if (req.body.field_name) {
        await Product.addProductFields( result.insertId, req.body.field_name, req.body.field_value)
        console.log('fild inform',result)
      }
      res.redirect('/admin/products')
}

const proAdd = async (req, res) => {
  const types = await Product.loadTypes()
    //console.log('hiiyyyyy',rows[0])
    //res.send('2.',types)
    res.render('admin/add-products', {
      title: 'Add product form',
      menu: menuItems,
      productTypes: types,
      isAdmin: true,
      loggedInUser: req.session.loggedInUser
    })
}

const postPage = async (req, res) => {
  console.log('Hey bola',req.body.keyword, req.body.name, req.body.value)
const result = await Product.searchProduct(req.query.keyword, req.query.sort_by, req.query.sort_direction)
res.send(result)
/*result
  .then((data) => {
    console.log('data',data)
    console.log('data tepada',req.body.keyword)
    res.redirect('productPage')
  })
  .catch((err) => console.log(err))*/
}

const proPage = async (req, res) => {
  console.log('query ',req.query.keyword)
  console.log('Hey bola', req.query.keyword, req.query.sort_by, req.query.value)
  const searchProductResult = await Product.searchProduct(req.query.keyword, req.query.sort_by, req.query.sort_direction)
  const types = await Product.loadTypes()
  //res.send('1.',searchProductResult)
   
      res.render('productPage', {
        title: 'Add product form',
        menu: menuItems,
        product: searchProductResult,   
        productTypes: types,   
        isAdmin: true,   
        loggedInUser: req.session.loggedInUser   
      })

}

const orderPage = async (req, res) => {
  const searchOrderResult = await Order.getOrders()
  
  console.log(searchOrderResult,'www')
      res.render('admin/orders', {
        title: 'Orders',
        menu: menuItems,
        orders: searchOrderResult,    
        //date:  mass,
        loggedInUser: req.session.loggedInUser   
      })

}

const itemPage = async (req, res) => {
      try {
        const order = await Order.getOnlyOrder(req.params.orderId)
        const getCustomer = await Consumers.getConsumer(order[0].customer_id)
        const readibleDate = datetime.getHumanReadibleDateTime(order[0].created)
        const date = datetime.makeDate(order[0].created)
        const date2 = datetime.makeDate2(order[0].created)
        
        let totalCost = 0

        order.forEach((item) => {
          totalCost += +item.count * +item.price
        })

        console.log('hhhhhhhhh', totalCost)

           res.render("admin/about-order", {
              title: "Order",
              menu: menuItems,
              order: order,
              orderId: req.params.orderId,
              status: order[0].status,
              consumer: getCustomer,
              created: readibleDate,
              date: date,
              dateDay: date2,
              totalPrice: totalCost,
              loggedInUser: req.session.loggedInUser,
            });
      } catch (err) {
        res.redirect("/errorPage");
        console.log(err);
      }
}

const itemPostPage = async (req, res) => {
  const order = await Order.updateStatus(req.body.selector,req.params.orderId)
  res.redirect('/admin/orderPage')
}

module.exports = {
    deleteProductTypeController,
    addtype,
    addTypeController,
    updateTypes,
    getType1,
    proTypes,
    deleteController,
    aboutPro,
    updateProducts,
    profileController,
    productController,
    postAddProduct,
    postPage,
    proPage,
    proAdd,
    orderPage,
    itemPage,
    itemPostPage
}