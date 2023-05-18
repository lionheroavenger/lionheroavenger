
const keyValue = JSON.parse(localStorage.getItem('cartProducts'))
const myIndex = keyValue?.quantity ?? ''

const b = []

keyValue?.products.forEach((item, index) => {
    b.push(item.id)
})

const sendButton = document.getElementById("buttonSend")

if(keyValue){
    sendButton?.classList.remove("hidden")
}
    

const productCount = []

keyValue?.products.forEach((item, index) => {
    productCount[item.id] = item.quantity
})


const getProductId = async (productIds) => {
    const response = await fetch('/products/details?ids=' + productIds.join(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const jsonData = await response.json()
    console.log('/products/details?ids=' + productIds.join())
    return jsonData
}


const ValueBoxx = document.getElementById('value_box')
const InputBoxx = document.getElementById('input_box')

function makeSelectBox(item){
                console.log(item)
                const massive = [1,2,3,4,5,6,7,8,9]
                const selector = document.createElement('select')
                selector.classList = 'cart-item-dropdown'
                let options = ''
                selector.dataset.count = productCount[item.id]
                selector.dataset.id = item.id
                
                for (let k = 0; k < massive.length; k++) {
                    let selected = ''
                    
                    if (massive[k] === +productCount[item.id]) {
                        selected = 'selected'
                    }
                    options = options + '<option ' + selected + ' value="' + massive[k] + '">' + massive[k] + '</option>'
                }
                selector.innerHTML = options
                const img = document.createElement('img')
                const deleteButton = document.createElement('button')
                deleteButton.dataset.deleteId = item.id
                deleteButton.innerText = 'X'
                img.setAttribute('src', item.image)
                const ul = document.createElement('ul')
                const li = document.createElement('li')
                const li2 = document.createElement('li')
                const li3 = document.createElement('li')
                const li4 = document.createElement('li')
                const li5 = document.createElement('li')
                const li6 = document.createElement('li')
                li.classList = 'none-dot'
                ul.classList = 'border-pro'
                li2.classList = 'none-dot'
                li3.classList = 'none-dot'
                li4.classList = 'none-dot'
                li5.classList = 'none-dot'
                li6.classList = 'none-dot'
                deleteButton.classList = 'delete-product-button'
                li.append('name: ',item.name, ' ')
                li2.append('price: ',item.price, ' ')
                li4.append('image: ',img, ' ')
                li5.append(selector)
                li6.append(deleteButton)
                li3.append('description: ',item.description, ' ')
                ul.appendChild(li)
                ul.appendChild(li2)
                ul.appendChild(li4)
                ul.appendChild(li5)
                ul.appendChild(li3)
                ul.appendChild(li6)
                ValueBoxx?.appendChild(ul)
                selector.addEventListener('change', (e) => {
                    const selector1 = e.target
                    const selectedIndex = e.target.selectedIndex
		            const currentValue = e.target.options[selectedIndex].value
                    const previousValue = e.target.dataset.count
                    const productId = e.target.dataset.id
                    if (!currentValue) {
		            	console.log(currentValue)
		            }

                    cartProducts?.products?.forEach((item, index) => {
                        if(+item.id === +productId){
                            item.quantity = currentValue
                        }
                    })
                    getTotalValue()
                    updateStorage()
                    updateCart()
                })

                deleteButton.addEventListener('click', (e) => {
                    const deleteProductId = e.target.dataset.deleteId
                    cartProducts?.products?.forEach((item, index) => {
                        if(+item.id === +deleteProductId){
                            cartProducts?.products.splice(index, 1);
                        }
                    })
                    getTotalValue()
                    updateStorage()
                    updateCart()
                    location.reload();
                    if(cartProducts?.quantity === 0){ 
                        localStorage.removeItem('cartProducts')
                    }
                })
                
}




const div = document.createElement('div')
const secondItem = document.getElementById('item2')

function getCountProduct(id){
    let count = 0
    cartProducts?.products.forEach((item, index) => {
        if(+item.id === +id){
            count = item.quantity
        }
    })

    return count
}


function makeProduct(item){
    const img = document.createElement('img')
    img.setAttribute('src', item.image)
    img.classList = 'img-product'
    const ul = document.createElement('ul')
    const li = document.createElement('li')
    const li2 = document.createElement('li')
    const li4 = document.createElement('li')
    const li5 = document.createElement('li')
    const li6 = document.createElement('li')
    const input = document.createElement('input')
               //input.name = 'ids'
                input.value = item.id
    li.classList = 'none-dot'
    ul.classList = 'border-pro'
    li2.classList = 'none-dot'
    li4.classList = 'none-dot'
    li5.classList = 'none-dot'
    li6.classList = 'none-dot'
    li.append('name: ',item.name, ' ')
    li2.append('price: ',item.price, ' ')
    li4.append('image: ',img, ' ')
    li5.append('count: ',getCountProduct(item.id))
    ul.appendChild(li)
    ul.appendChild(li2)
    ul.appendChild(li4)
    ul.appendChild(li5)
    ul.appendChild(li6)
    secondItem?.appendChild(ul)
    secondItem?.appendChild(div)
    secondItem?.appendChild(input)
}

//order_details ni 

if(b.length){
    let ab = 0
        const a = getProductId(b)
        a.then((data) => {
            data.forEach((item,index) => {
                makeSelectBox(item)
                makeProduct(item)
                //================================================\\
            })
        })  
} else {
    console.log('yo\'q')
}

