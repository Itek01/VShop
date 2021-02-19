var imageBox = document.getElementsByClassName("image");
var button = document.getElementsByClassName("info-btn");
var img = document.getElementsByClassName("imgOn1");
var description = document.getElementsByClassName("descriptionOff1");

function handleInfo(elementNum) {
    if (imageBox[elementNum].firstElementChild.className == "descriptionOff1") {
        button[elementNum].innerHTML = "Show Less";
        
        imageBox[elementNum].lastElementChild.className = "imgOff1";
        imageBox[elementNum].firstElementChild.className = "descriptionOn1";
    }
    else if (imageBox[elementNum].firstElementChild.className == "descriptionOn1") {
        button[elementNum].innerHTML = "Info";

        imageBox[elementNum].lastElementChild.className = "imgOn1";
        imageBox[elementNum].firstElementChild.className = "descriptionOff1";
    }
}

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('add-btn')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    console.log(event)
    var button = event.target
    var shopItem = button.parentElement.parentElement.parentElement
    var title = shopItem.getElementsByClassName('title')[0].innerText

    if (shopItem.getElementsByClassName('descriptionOff1')[0] == undefined) {
        var priceTemp = shopItem.getElementsByClassName('descriptionOn1')[0].innerText
        var price = priceTemp.substring(0,5);
        var imageSrc = shopItem.getElementsByClassName('imgOff1')[0].src
    }
    else {
        var priceTemp = shopItem.getElementsByClassName('descriptionOff1')[0].innerText
        var price = priceTemp.substring(0,5);
        var imageSrc = shopItem.getElementsByClassName('imgOn1')[0].src
    }
    
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    console.log(cartRow)
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    console.log(cartItems)
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')

    console.log(cartItems, cartItemNames)
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}
// function test(btnNum) {
//     document.write(document.getElementsByClassName("add-btn")[0].value * 2);
// }