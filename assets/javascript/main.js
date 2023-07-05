// JS Pay Modal
const buyBtns = document.querySelectorAll('.js-buy-tickets')
const modal = document.querySelector('.js-modal')
const modalContainer = document.querySelector('.js-modal-container')
const modalClose = document.querySelector('.js-modal-close')

function showBuyTickets () {
    modal.classList.add('active')
}

function hideBuyTickets () {
    modal.classList.remove('active')
}

for (const buyBtn of buyBtns) {
    buyBtn.addEventListener('click', showBuyTickets)
}

modalClose.addEventListener('click', hideBuyTickets)
modal.addEventListener('click', hideBuyTickets)
modalContainer.addEventListener('click', function(event) {
    event.stopPropagation()
})

// Stock menu
var stocks = document.querySelectorAll('.stock');
var stocksLength = stocks.length;
var buyTickets = document.getElementById('buy-tickets');

for (var i = 0; i < stocksLength; i++) {
    var stock = stocks[i];

    buyTickets.onclick = function () {
        hideBuyTickets();
        stock.classList.remove('in-stock');
        stock.classList.add('sold-out');
        stock.innerHTML = 'Sold out';
    }
}

// JS Mobile menu
var header = document.getElementById('header');
var mobileMenu = document.getElementById('mobile-menu');
var headerHeight = header.clientHeight

// Open close mobile menu
mobileMenu.onclick = function() {
    var isClosed = header.clientHeight === headerHeight;
    if (isClosed) {
        header.style.height = 'auto';
    } else {
        header.style.height = null;
    }
}

// Auto close when click
var menuItems = document.querySelectorAll('#nav li a[href*="#"]');
var itemsLength = menuItems.length;
for (var i = 0; i < itemsLength; i++) {
    var menuItem = menuItems[i];

    menuItem.onclick = function() {
        var isParentMenu = this.nextElementSibling && this.nextElementSibling.classList.contains('subnav');
        if (isParentMenu) {
            preventDefault ();
        } else {
            header.style.height = null;
        }
    }
}