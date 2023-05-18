const menuItems = [
    {
      name: 'Home',
      url: '/'
    },
    {
      name: 'Products',
      url: '/products'
    },
    /*{
      name: 'Contacts',
      url: '/contacts'
    },*/
    {
      name: 'Inform',
      url: '/informs'
    },
    {
      name: 'Add product',
      url: '/admin/products/add'
    },
    {
      name: 'pro types',
      url: '/admin/product-types'
    },
    {
      name: 'Add types',
      url: '/admin/types/add'
    }
    ,
    {
      name: 'Orders',
      url: '/admin/orderPage'
    }
]

const products = [
    {
        name: 'Buhanka',
        type: 'non',
        price: 2800,
        image: 'https://darakchi.uz/storage/35/55/8a/92101/conversions/buhanka-600x240-xl.jpg'
    },
    {
        name: 'Baton',
        type: 'non',
        price: 3800,
        image: 'https://st4.depositphotos.com/15827116/27125/i/450/depositphotos_271250678-stock-photo-top-view-woman-holding-fresh.jpg'
    }
]

const contacts = [
  {
      name: 'Nodir',
      number: '99 020 63 47'
  },
  {
      name: 'Bob',
      number: '99 999 99 99'
  }
]

const inform = [
      {
        name: 'Buhanka',
        image: 'https://darakchi.uz/storage/35/55/8a/92101/conversions/buhanka-600x240-xl.jpg'
      },
      {
        name: ' Baton',
        image: 'https://dag-produkt.ru/images/photos/big/shop1694.jpg'
      },
      {
        name: ' Nonvoy-non',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Uzbek_bread_%28Nonvoy_non%29.jpg/800px-Uzbek_bread_%28Nonvoy_non%29.jpg'
      },
      {
        name: ' Patir non',
        image: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/%D0%9F%D0%B0%D1%82%D0%B8%D1%80-%D0%BD%D0%BE%D0%BD-01.jpg'
      },
      {
        name: ' Patir',
        image: 'http://ic.pics.livejournal.com/oleg_a/29917544/331632/331632_900.jpg'
      },
      {
        name: ' Chiabatta',
        image: 'https://e1.edimdoma.ru/data/ingredients/0000/1338/1338-ed4_wide.jpg?1525765976'
      },
      {
        name: ' Qatlama non',
        image: 'https://makepedia.uz/wp-content/uploads/2019/05/qatlama-tayyorlash.jpg'
      },
      {
        name: ' Baguette',
        image: 'https://img.freepik.com/free-photo/slice-of-bread-with-baguette-on-tablecloth_114579-5829.jpg?w=2000'
      },
      {
        name: ' Qora bulka non',
        image: 'https://static.zarnews.uz/crop/6/3/720__80_635debe8714a69a8f02793f9edb1d731.jpg?img=self&v=1607584821'
      },
      {
        name: ' Mazzali oq bulka non',
        image: 'http://storage.kun.uz/source/1/ssEjJUu1uNZtl84wFUwb11XwDH3wT1l0.jpg'
      },
      {
        name: ' Pita non',
        image: 'http://sc04.alicdn.com/kf/Hd3f54fbef8df43cca6084306569b97218.png'
      },
]

const appNames = [
  {
    matn: 'nodejs application',
    data: 2022
  }
]

const USER_ROLE_ADMIN = 'administrator'
const USER_ROLE_USER = 'user'

const users = [
  {
    login: 'admin',
    password: '12345',
    firstname: 'John',
    lastname: 'Cena',
    role: USER_ROLE_ADMIN
  },
  {
    login: 'TillaBola',
    password: '2007',
    firstname: 'Oyatillo',
    lastname: 'Abdusamatov',
    role: USER_ROLE_USER
  }
]


const productTypes = [ 'non', 'go\'sht', 'un', 'uskuna', 'shirinlik' ]



module.exports = {
  menuItems: menuItems,
  products: products,
  contacts: contacts,
  inform: inform,
  productTypes: productTypes,
  users: users
}