const express = require("express");

const router = express.Router();
const { homePage, productCont, postPro, contactInform, 
  information, profile, errPage, proPage2, logOut, loginPage,
  itemPage, editUserPage, loginPostPage, postProfilePage, cartPage, cart, proceedToCheckOut, addInfo, productInfo} = require('../controllers/user');

const {
  menuItems,
  products,
  inform,
  contacts,
  appNames,
  users,
} = require("../data");
const user = require("../helpers/user");
const { isValidUser, updateUser } = require("../helpers/user");
const {
  loadProducts,
  getProduct,
  getProductFields,
  searchProduct,
  loadProduct,
  loadTypes,
  HightToLow,
  LowToHigh,
  getSortCriteria
} = require("../helpers/products");

router.get("/html", function (req, res) {
  const indexFileName = path.join(__dirname, "index2.html");
  console.log("html filename", indexFileName);
  res.send(htmlString);
});

router.get("/", homePage);

router.get("/products", productCont);

router.post("/products", postPro);

router.get("/orders/:orderId", productInfo);

router.post("/orders", addInfo);

router.get("/contacts", contactInform);
router.get("/informs", information);
router.get("/profile", profile);
router.get("/errorPage", errPage);
router.get("/productPage", proPage2);
router.get("/logout", logOut);
router.get("/login", loginPage);
router.get("/cartPage", cartPage);
router.get('/products/details', cart)
router.get('/proceedToCheckOut', proceedToCheckOut)


// /about-item/34
router.get("/about-item/:productId", itemPage);
router.get("/edit-user", editUserPage);
router.post("/login", loginPostPage);
router.post("/profile", postProfilePage);

/*router.post('/productPage/:productId', (req, res) => {
    const product = {
      name: req.body.name,
      type: req.body.type,
      price: req.body.price,
      image: req.body.image,
      description: req.body.description,
      id: req.params.productId
    }
    const result = getProduct(req.params.productId)
    result
      .then((data) => {
        console.log(data)
        res.redirect('/admin/products')
      })
      .catch((err) => {
        console.log(err)
        res.redirect('/errorPage')
      }
  })*/

/*router.get("/productPage", (req, res) => {
  console.log(req.query.keyword);
  const sortDetails = getSortCriteria(req.query.sort_by)
  console.log('beiiie1', req.query.keyword, req.query.sort_by );
  const searchProductResult = searchProduct(
    req.query.keyword,
    sortDetails.sortField,
    sortDetails.sortDirection
  );
  searchProductResult
    .then(([products, data]) => {
      const types = loadTypes();
      return Promise.all([types, products]);
    })
    .then(([[rows, metaData], products]) => {
      console.log("heyyyyy");
      res.render("productPage", {
        title: "Add product form",
        menu: menuItems,
        product: products,
        productTypes: rows,
        keyword: req?.query?.keyword ?? '',
        loggedInUser: req.session.loggedInUser
      });
    })
    .catch((err) => {
      res.redirect("/errorPage");
      console.log(err);
    });
});*/

/*router.post("/productPage", (req, res) => {
  console.log(req.body.keyword);
  console.log('bee2',req.body.keyword, req.body.name, req.body.value);
  
      res.redirect("productPage");
    })
    .catch((err) => console.log(err));
});*/

module.exports = router;
