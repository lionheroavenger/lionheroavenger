const deleteBtns = document.getElementsByClassName('delete-button')
const deleteForm = document.getElementById('deleteForm')
const fieldDeleteBtns = document.getElementsByClassName('deleteBtn')
const inputSearch = document.getElementById('inputSearch')
const searchBtn = document.getElementById('searchBtn')
const searchForm = document.getElementById('search_form')
const list = document.getElementById('list1')
const grid = document.getElementById('list2')
const Container = document.getElementById('container')
const productsContainer = document.getElementById('products-container')
const item = document.getElementsByClassName('item')
const sortBy = document.getElementById('products_sort_by')
const searchedValue = document.getElementById('searched_value')
const sortsBy = document.getElementById('valuable')
//const sortDirection = document.getElementById('value2')delete-btn
const deleteTypes = document.getElementsByClassName('delete-btn')

console.log('hello guys',sortsBy)
const addProductField = document.getElementById('add_product_field')

addProductField?.addEventListener('click', (e) => {
    const parent = e.target.parentNode
    let input_field_value = document.createElement('input')
    let input_field_name = document.createElement('input')
    let input_field_id = document.createElement('input')
    let br = document.createElement('br')
    let button = document.createElement('button')
    input_field_id.name = `field_id`
    input_field_id.type = 'hidden'
    input_field_name.name=`field_name`
    input_field_value.name=`field_value`
    button.innerText = 'X'
    button.type = 'button'
    button.addEventListener('click', (e) => {
            input_field_name.remove()
            input_field_value.remove()
            input_field_id.remove()
            br.remove()
            e.target.remove()
            console.log('hello')
    })
    parent.appendChild(br)
    parent.appendChild(input_field_id)
    parent.appendChild(input_field_name)
    parent.appendChild(input_field_value)
    parent.appendChild(button)
})
console.log(searchedValue.value, searchedValue)
//searchForm.submit()

sortBy?.addEventListener('change', (e)=> {
        let selectBox = e.target
        const index = selectBox.selectedIndex
        let jismNomi = selectBox.options[index].value

        sortsBy.value = jismNomi
        //sortDirection.value = direction
        searchForm.submit()
})
//dfddddddddddddddddddddddddddddddddddddd

/*let jismNomi = localStorage.getItem('select');
let itemValue = localStorage.getItem('asc')
if (list) {
if(jismNomi) {
    sortBy.value = jismNomi;
}
//ddddddddddddddddddddddddddddddddddddddddd
/*
searchedValue.addEventListener('input', (e) => {
    localStorage.setItem('write', e.target.value ? e.target.value : '')
})
*/
/*const write = localStorage.getItem('write')
console.log(write)
if (write) {
	searchedValue.value = write
}
}*/

/*const keyed1 = localStorage.getItem('key1') ? 'selected' : 'unselected'
console.log(keyed, value1)
if (keyed1) {
    console.log('yoq')
} else {
    console.log('hello',localStorage.getItem('key1'))
}*/

list?.addEventListener('click', (e) => {
    grid.style.background = 'none'
    list.style.background = 'red'
    localStorage.setItem('showAs', 'list');
    Container.classList.add('container')
    productsContainer.classList.remove('products-container')
    productsContainer.classList.add('list-container')
})

grid?.addEventListener('click', (e) => {
    list.style.background = 'none'
    grid.style.background = 'red'
    localStorage.setItem('showAs', 'grid');
    Container.classList.add('container')
    productsContainer.classList.add('products-container')
    productsContainer.classList.remove('list-container')
})

if (list) {
    const showAs = localStorage.getItem('showAs') ? localStorage.getItem('showAs') : 'list'
    console.log(showAs)
    if (showAs === 'list') {
        list.click()
    } else {
        grid.click()
    }
}

for(btn of deleteBtns) {
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        if (!confirm('Do you want to delete product?')) {
            return
        }

        console.log(e.target.dataset.productid)
        removeProduct(e.target.dataset.productid)
            .then((data) => {
                if (data.status === 'OK') {
                    window.location.reload()
                }
            })
        
    })
}

for(btns of deleteTypes) {
    btns.addEventListener('click', async (e) => {
        e.preventDefault()

        if(e.target.classList.contains('disabled')){
            return false
        }

        if (!confirm('Do you want to delete types?')) {
            return
        }

        console.log(e.target.dataset.typeid)
        const alo = await removeType(e.target.dataset.typeid)
            //.then((data) => {
                console.log(alo)
                if (alo.status === 'OK') {
                    window.location.reload()
                } else{
                    alert('xato:' + alo.status + ' va ' + alo.message)
                }
            //})
        
    })
}

const removeProduct = async (productId) => {
    const response = await fetch('/admin/products/' + productId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return response.json()
}

const removeType = async (typeId) => {
    const response = await fetch('/admin/product-types/' + typeId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return response.json()
}



/*let input_field_value = document.createElement('input')
let input_field_name = document.createElement('input')
let input_field_id = document.createElement('input')
let br = document.createElement('br')
let button = document.createElement('button')*/





for(deleteField of fieldDeleteBtns){
    //console.log(deleteField)
    deleteField.addEventListener('click', (e) => {
        e.preventDefault()
        const parentElement = e.target.parentNode
        parentElement.remove()
        e.target.remove()
        
        /*if (!confirm('Do you want to delete field?')) {
            return
        }

        if(e.target.dataset.fieldid){
            console.log(e.target.dataset.fieldid)
            removeField(e.target.dataset.fieldid)
                .then((data) => {
                    if (data.status === 'OK') {
                        window.location.reload()
                    }
            })
        }*/
       
        
        
        
    })
}

/*const removeField = async (fieldId) => {
    const response = await fetch('/admin/products_field/' + fieldId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return response.json()
}*/

searchBtn?.addEventListener('click', (e) => {
    if(inputSearch.value){
        console.log(inputSearch.value)
    } else {
        console.log('please, enter a value')
    }
    
})



const addProductCart = document.getElementsByClassName('add_product_to_cart')
const korsatkich = document.getElementById('b')
const son = document.getElementById('i')

let quantity = 0
const qiymat = localStorage.getItem('currentValue')
        console.log(qiymat)
for(addBtn of addProductCart) {
    addBtn.addEventListener('click', (e)=> {
        addProductToCart(e.target.dataset.productid ? e.target.dataset.productid : '') 
    })
}






function loadCartProducts() {
    const cartProduct = JSON.parse(localStorage.getItem('cartProducts')) ?? { quantity: 0, products: []}
    return cartProduct
}
const cartProducts = loadCartProducts()

console.log(cartProducts)



//for(let i = 0; )
//cartProducts['mahsulotlar'] = JSON.parse(localStorage.getItem('cartProducts'))
//console.log(JSON.parse(localStorage.getItem('cartProducts')) ?? '')

'{quantity:2, products: [{quantity: 1, id: 112},{quantity: 1, id: 113}]}'

cartProducts: {
    mahsulotlar: {}
}

function updateCart() {
    const quantity = cartProducts?.quantity ?? 0
    //console.log(cartProducts.mahsulotlar?.quantity)
    //console.log(cartProducts.mahsulotlar)
    if (quantity) {
        son.innerHTML = quantity //+ cartProducts.mahsulotlar?.quantity ? cartProducts.mahsulotlar?.quantity : 0
        korsatkich.style.display = 'block'
    }
    // denazavr o'yinining funksiyasi - Runner.instance_.gameOver= () =>{}
}

/*

1. Load Cart Products
2. Update Cart
3. Add product 



cartProducts
{
    quantity: 5,
    products: [
        {
            quantity: 5,
            id: 112
        }
    ]
}



*/

function isProductInCart(productId) {
    //const cartProduct = JSON.parse(localStorage.getItem('cartProducts'))
    // console.log(cartProducts.mahsulotlar)
    let qiymat 
    cartProducts?.products?.forEach((item, index) => {
        if(+item.id === +productId){
            //console.log('yedi', cartProduct.products[index])
            qiymat = cartProducts.products[index]
        }
    })
    return qiymat
    // agar mavjud bo'lsa, products massivining indexing qaytaring
    //false - topilmasa
    //product index in cartProducts
}

function updateStorage() {
    //console.log('started')
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts))
    //console.log('finished')
}

/*
{"quantity":4,"products":[
    {"quantity":3,"id":"112"},
    {"quantity":1,"id":"113"}
]}
*/
function getTotalValue(){
    cartProducts.quantity = cartProducts?.products?.reduce((total, item) => {
        return +total + +item.quantity
    }, 0/*- 0 qiymati totalning birinchi kirib kelgandagi qiymati*/)
}
function addProductToCart(productId) {
    const doesProductExist = isProductInCart(productId)

    if (doesProductExist) {
        doesProductExist.quantity++
    } else {
        cartProducts.products.push({quantity: 1, id: productId})
    }

    
    getTotalValue()
    updateStorage()
    updateCart()
}


function initializeCart()  {
        updateCart()
}


document.body.onload = function() {
    initializeCart()
}

const dateValue = document.getElementsByClassName('date_qiymat')
const datevalue = document.getElementsByClassName('dateQiymat')


/*let  minute = []

function calculateValue(value){
    for(btn of value) {
        let d = +new Date() - +new Date(btn.value)
        const second = +d / 1000
        const minutes = +second / 60
        minute.push(minutes)
        //+Math.ceil(day)
    }
}
 

calculateValue(dateValue)
calculateValue(datevalue)
//minutni soatga aylantirish formulasi - hour = minute * 1 /60
//soatni minutga aylantirish - minutes = hours × 60
//sekundni minutga aylantirish - minutes = seconds / 60

function addTimeToTable(min){
    const td = document.querySelectorAll('.td')
    for (let i = 0; i < td.length; i++) {
        const hours = min[i] * 1 /60
        if(min[i] < 60){
            td[i].innerHTML = +Math.ceil(min[i]) + ' ' + 'minutes ago'
        } else if(+Math.ceil(min[i]) >= 60 && min[i] < 1440){
            td[i].innerHTML = +Math.floor(hours) + ' ' + 'hours ago'
        } else if(+Math.ceil(min[i]) >= 1440 && +Math.ceil(min[i]) <= 2880){
            td[i].innerHTML = 'yesterday'
        } else {
            const days = +Math.ceil(min[i]) / 1440
            td[i].innerHTML = +Math.floor(days) + ' ' + 'days ago'
        }
      }
}
addTimeToTable(minute)


    function showTimeToTable(minut){
        const td = document.getElementsByClassName('td')
        console.log(td)
            const hours = minut * 1 /60
            if(minut < 60){
                td.innerHTML = +Math.ceil(minut) + ' ' + 'minutes ago'
            } else if(+Math.ceil(minut) >= 60 && minut < 1440){
                td.innerHTML = +Math.floor(hours) + ' ' + 'hours ago'
            } else if(+Math.ceil(minut) >= 1440 && +Math.ceil(minut) <= 2880){
                td.innerHTML = 'yesterday'
            } else {
                const days = +Math.ceil(minut) / 1440
                const a = +Math.floor(days) + ' ' + 'days ago'
                if(td){
                    td.innerText = a
                } else {
                    return
                }
            }
    }

    showTimeToTable(minute)

    const changeStatus = document.getElementsByClassName('orders_change_status')
    const statusValue = document.getElementsByClassName('status_value')
    console.log(statusValue)
    let jismNomi 
   
        for(btns of changeStatus) {
            btns?.addEventListener('change', (e)=> {
                let selectBox = e.target
                const index = selectBox.selectedIndex
                let jismNomi = selectBox.options[index].value
                console.log(jismNomi)
                const array = new Array(statusValue)
                array.forEach((item, index) => {
                    item[index].value = jismNomi
                })
            })
        }
        

    //unit test va integration test
    
    
    */


