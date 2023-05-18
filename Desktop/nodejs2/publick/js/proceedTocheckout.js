

const idInput = document.createElement('idInput')
const classId = document.createElement('class')
idInput.type = 'hidden'

const checkoutForm = document.getElementById('proceed_checkout')

checkoutForm?.addEventListener('submit', function(e) {
    e.preventDefault()
    const hiddenInput = document.getElementById('idInput')
    hiddenInput.value = (JSON.stringify(cartProducts))
    e.target.submit()
})

console.log('checkoutForm', checkoutForm)

function ariphmetica(a, b){
    console.log(a,b)
    return a * b
}

if(b.length){
    let ab = 0
        const a = getProductId(b)
        const totalCost = document.getElementById('div')
        console.log
        a.then((data) => {
            data.forEach((item,index) => {
                cartProducts.products.forEach((item1, index) => {
                    if(item.id === +item1.id && +item1.quantity >= 1){
                        ab += ariphmetica(item.price, +item1.quantity)
                        console.log(ariphmetica(item.price, +item1.quantity  ))
                    } 
                    div.innerHTML = 'The total cost is: ' + ab
                })  
                //================================================\\
            })
        })  
} else {
    console.log('yo\'q')
}

function addFacilities(){
    if(localStorage.getItem('firstRadio')){
        valueContainer?.classList.remove('block')
        valueContainer?.classList.add('hidden')
        localStorage.removeItem('secondRadio')
    } else {
        valueContainer?.classList.add('block')
        valueContainer?.classList.remove('hidden')
    }
}

function addSecondFacilities(){
    if(localStorage.getItem('in-cash')){
        localStorage.removeItem('credit-card')
    } 
}

const valueContainer = document.getElementById('hidden')
const pickUp = document.getElementById('pickUp')

pickUp?.addEventListener('change', (e) => {
	localStorage.setItem('firstRadio', e.target.checked ? true : '')
    addFacilities()
})

const firstRadio = localStorage.getItem('firstRadio')
if (firstRadio) {
	pickUp ? pickUp.checked = true : ''
    addFacilities()
} else {
    console.log(b.length)
}

const deliveryRadio = document.getElementById('Delivery')


deliveryRadio?.addEventListener('change', (e) => {
	localStorage.setItem('secondRadio', e.target.checked ? true : '')
    localStorage.removeItem('firstRadio')
    addFacilities()
})

const secondRadio = localStorage.getItem('secondRadio')
if (secondRadio) {
	deliveryRadio.checked = true
    addFacilities()
} else {
    console.log('yoq')
}


const inCash = document.getElementById('inCash')

inCash?.addEventListener('change', (e) => {
	localStorage.setItem('in-cash', e.target.checked ? true : '')
    addSecondFacilities()
})

const secondCash = localStorage.getItem('in-cash')
if (secondCash) {
	inCash.checked = true
    addSecondFacilities()
} else {
    console.log('yoq')
}

const CreditCard = document.getElementById('CreditCard')

CreditCard?.addEventListener('change', (e) => {
	localStorage.setItem('credit-card', e.target.checked ? true : '')
    localStorage.removeItem('in-cash')
    addSecondFacilities()
})

const secondCredit = localStorage.getItem('credit-card')
if (secondCredit) {
	CreditCard.checked = true
    addSecondFacilities()
} else {
    console.log('yoq')
}

const getProductIds = async (productIds) => {
    const response = await fetch('/addUserDetails?id=' + productIds.join(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    console.log(response)
    const b = response
    return b
}

const alo = getProductIds(b)
console.log(alo)
            alo.then((data) => {
                console.log(data)
                if (data.status === 200) {
                    //window.location.reload()
                    console.log(data)
                } else{
                    //alert(data)
                    console.log(data)
                }
            }).catch(err => {
                console.log(err)
            }) 

            

/*if(b.length){
    const a = getProductIds(b)
    console.log(a)
    a.then((data) => {
            data.forEach((item,index) => {
               if(item){
                    console.log(item)
               }
                //================================================\\
            })
        }).catch(err => {
            console.log(err)
        }) 
          
} else {
    console.log('yo\'q')
}*/

const submitedCart = document.getElementById('submitBtn')

submitedCart?.addEventListener('click', () => {
    localStorage.removeItem('cartProducts')
})

