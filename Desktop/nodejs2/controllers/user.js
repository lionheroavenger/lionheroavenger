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
  const Product = require('../model/product')
  const Users = require('../model/users')
  const Consumers = require('../model/consumers')
  const Order = require('../model/order')


const homePage = (req, res) => {
    console.log(menuItems);
    res.render("indexing", {
      title: "Homepage",
      menu: menuItems,
      loggedInUser: req.session.loggedInUser,
    });
  }

const cartPage = (req, res) => {
      try {
           res.render("cartPage", {
              title: "Cart product",
              menu: menuItems,
              appNames: appNames,
              loggedInUser: req.session.loggedInUser,
            });

      } catch (err) {
        res.redirect("/errorPage");
        console.log(err);
      }
} 

const proceedToCheckOut = (req, res) => {
  console.log('new ids', req?.query?.ids)
  res.render("proceedToCheckOut", {
    title: "order product",
    menu: menuItems,
  });
}

const addInfo = async (req, res) => {
  try {
    const user = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      phone_number: req.body.phone_number,
      country: req.body.country,
      city: req.body.city,
      zip: req.body.zip
    }

    //const getUser = await Consumers.addOrderUser(user)

    let consumer = await Consumers.doesExist(req.body.phone_number)

    if(!consumer?.id){

      consumer = new Consumers(
        req.body.firstname,
        req.body.lastname,
        req.body.phone_number,
        req.body.country,
        req.body.city,
        req.body.zip
      )
      
      await consumer.save()
      console.log('it is exist',consumer)
    }


    console.log('Consumer id is exist',consumer.id)

    const productAbout = JSON.parse(req.body.ids)
    let ids = []
    let count = []
    
    productAbout.products.forEach(element => {
      ids.push(element.id)
      count.push(element.quantity)
    });
    
    
    //const idValue = consumer.setId(getUser[0].insertId)
    //const b = consumer.save(user)
    //console.log('idlar qiymatlari',getUser[0].insertId, req.body.firstname, req.body.lastname, req.body.phone_number)


    const order = new Order(
      null,
      req.body.payment_type,
      consumer.id,
      req.body.taking_form,
      'new'
    )
    await order.save()

    const product = new Product(ids)
//2007010420000127*20021405
    //console.log('qimat2222222222',consumerDetails)
    const getChosenPro = await Product.getById(ids)
    getChosenPro.forEach(async (item, index) => {
        const product = await order.addProduct(item, count[index])
        return product.id
    })
    
  // Haridor ma'lumoti qo'shitiladi
  //
  
  
  // Agar yuqoridagi amallar muvaffaqiyatli tugasa
  res.redirect('/orders/' + order.id)
  } catch (err){
    // fail bo'lsa
    res.redirect("/errorPage");
    console.log(err);
  }
}

const productInfo = async (req, res) => {
  const order = await Order.get(req.params.orderId)
  const a = new Order(order.id)
  console.log('idslar2112', a)
  const getChosenProducts = await a.getOrderedProducts()
  res.render("newTable", {
    title: "Order table",
    menu: menuItems,
    products: getChosenProducts,
    contact: contacts,
    loggedInUser: req.session.loggedInUser,
  });
}


const postPro = async (req, res) => {
  console.log(req.body.keyword);
  console.log('beiiiie2',req.body.value);
  const result = await Product.loadProducts(req.query.sort_by, req.query.sort_direction);
  const search = new Users(req.body.keyword)
  const result1 = search.fetchAll();
  res.redirect("products");
}

const cart = async (req, res) => {
  try {
    const productsIds = req?.query?.ids.split()
    //const result = new Product(productsIds)
    const getChosenProduct = await Product.getById(productsIds)
    console.log('idlar', req?.query?.ids)
    res.send(getChosenProduct)
  
   /*     if (getChosenProduct) {
          console.log('STATUS OK')
          const a = res.json(getChosenProduct)  
          console.log(a)
        } else { 
          console.log('yo\'q')
        }*/
      
  } catch (err) {
    res.redirect("/errorPage");
    console.log(err);
  }
} 

  const productCont = async (req, res) => {
    console.log('tttta', typeof req.body.value, req.body.value)
    const sortDetails = Product.getSortCriteria(req.query.sort_by)
    console.log('beiiie1', req.query.keyword, req.query.sort_by);
    const searchProductResult = await Product.fetchAll(
      req.query.keyword,
      sortDetails.sortField,
      sortDetails.sortDirection
  );
  console.log('aaaaaaaaaaaaaaaaaa', sortDetails)
      const types = await Product.loadTypes();
          res.render("products", {
            title: "Products",
            menu: menuItems,
            pro: searchProductResult,
            sortby: req?.query?.sort_by ?? '',
            productTypes: types,
            keyword: req?.query?.keyword ?? '',
            loggedInUser: req.session.loggedInUser
          });
     
  }

  const contactInform = (req, res) => {
    res.render("contacts", {
      title: "Contacts",
      menu: menuItems,
      contact: contacts,
      loggedInUser: req.session.loggedInUser,
    });
  }

  const information = (req, res) => {
    res.render("informs", {
      title: "Informs",
      menu: menuItems,
      contact: contacts,
      inform: inform,
      loggedInUser: req.session.loggedInUser,
    });
  }

  const profile = (req, res) => {
    console.log('produc',req?.params?.productIds);
    res.render("profile", {
      title: "Profile",
      users: users,
      menu: menuItems,
      contact: contacts,
      inform: inform,
      loggedInUser: req.session.loggedInUser,
    });
  }

  const errPage = (req, res) => {
    res.render("errorPage", {
      title: "Error",
      menu: menuItems,
    });
  }

  const proPage2 = (req, res) => {
    res.render("productPage", {
      title: "product page",
      menu: menuItems,
    });
  }

  const logOut = (req, res) => {
    req.session.destroy(() => {
      res.redirect("/");
    });
  }

  const loginPage = (req, res) => {
    if (req.session.loggedIn) {
      res.redirect("/");
    }
    res.render("login", {
      title: "Login",
      menu: menuItems,
    });
  }

  const itemPage = async (req, res) => {
/* console.log('before calling findById')
    const product = await Product.findById(req.params.productId)
    console.log('after calling findById')
    const productFields = await getProductFields(req.params.productId)
    console.log(productFields)
    const types = loadTypes() */

    try {
      const product = await Product.findById(req.params.productId)
        const proFields = await Product.getProductFields(req.params.productId);
        //res.send(product)
         res.render("about-item", {
            title: "Products",
            menu: menuItems,
            products: product,
            product_fields: proFields,
            appNames: appNames,
            loggedInUser: req.session.loggedInUser,
          });
    } catch (err) {
      res.redirect("/errorPage");
      console.log(err);
    }
  }

  const editUserPage = (req, res) => {
    res.render("edit-user", {
      title: "Add product form",
      menu: menuItems,
      loggedInUser: req.session.loggedInUser,
    });
  }

  const loginPostPage = async (req, res) => {
    let message = "invalid";

    /*const loginUser = new Users(
      req.body.login, 
      req.body.password  insertUser(login, password, role_id, firstname, lastname)
    )*/

    const authResult = await Users.authenticate(req.body.login, req.body.password)
    //res.send(authResult)
    /*const insertUser = await Users.insertUser(
      authResult[0].login,
      authResult[0].password,
      authResult[0].role_id,
      authResult[0].firstname,
      authResult[0].lastname)*/
    //const isLoggedUser = loginUser.saveUser()

        console.log('Logged Users are valid: ',authResult);
        if (authResult.length) {
          const user = new Users(
            authResult[0].login,
            authResult[0].password,
            authResult[0].firstname,
            authResult[0].lastname,
            authResult[0].role
          )
          user.setId(authResult[0].id)
          req.session.loggedIn = true;
          req.session.loggedInUser = user;
          res.redirect("/");
        
        }

  }

  const postProfilePage = (req, res) => {
    const userInforms = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      id: req.session.loggedInUser.id
    };

    const user = new Users(
      req.session.loggedInUser.login,
      req.session.loggedInUser.password,
      req.session.loggedInUser.firstname,
      req.session.loggedInUser.lastname
    )

    user.setId(req.session.loggedInUser.id)
    user.setFirstname(req.body.firstname)
    user.setLastname(req.body.lastname)
    const result = user.save();
    result
      .then((data) => {
        console.log("datartddsiri6t76t", data);
        req.session.loggedInUser = user
        res.redirect("/profile");
      })
      .catch((err) => {
        console.log("datartddsiri6t76t", err);
        res.redirect("/errorPage");
      });
  }
  module.exports = {
    homePage,
    productCont,
    postPro,
    contactInform,
    information,
    profile,
    errPage,
    proPage2,
    logOut,
    loginPage,
    itemPage,
    editUserPage,
    loginPostPage,
    postProfilePage,
    cartPage,
    cart,
    proceedToCheckOut,
    addInfo,
    productInfo
  }