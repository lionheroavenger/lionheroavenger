const express = require('express');
const { deleteProductTypeController, addtype, addTypeController,
  updateTypes, getType1, proTypes, deleteController, aboutPro,  
  updateProducts, proAdd, proPage, postPage, postAddProduct,
  profileController, productController, orderPage, itemPage, itemPostPage } = require('../controllers/admin');


//const deleteProductTypeController = require('../controllers/admin')


const router = express.Router();

router.get('/products/add', proAdd)
router.get('/productPage', proPage)
router.get('/products', productController)
router.get('/profile', profileController)
router.get('/products/:productId', aboutPro) 
router.get('/product-types', proTypes) 
router.get('/product-types/:typeid', getType1) 
router.get('/types/add', addTypeController)
router.get('/orderPage', orderPage)
router.get('/order/:orderId', itemPage)


router.post('/products/add', postAddProduct)
router.post('/products/:productId', updateProducts)
router.post('/productPage', postPage)
router.post('/product-types/:typeid', updateTypes)
router.post('/types/add', addtype)
router.post('/order/:orderId', itemPostPage)

router.delete('/products/:productId', deleteController)
router.delete('/product-types/:typeid', deleteProductTypeController)



exports.router = router