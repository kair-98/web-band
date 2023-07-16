// JS Pay Modal
var buyBtns = document.querySelectorAll('.js-buy-tickets')
var modal = document.querySelector('.js-modal')
var modalClose = document.querySelector('.js-modal-close')

modalClose.addEventListener('click', hideBuyTickets)
modal.addEventListener('click', hideBuyTickets)

document.querySelector('.js-modal-container').addEventListener('click', function(event) {
    event.stopPropagation();
})

function showBuyTickets () {
    modal.classList.add('modal__active')
}

function hideBuyTickets () {
    modal.classList.remove('modal__active')
}

for (var buyBtn of buyBtns) {
    buyBtn.addEventListener('click', showBuyTickets)
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

// Purchase success/failed noti
function showNoti({ title = "", message = "", type = "info", duration = 3000 }) {
  const main = document.getElementById("pop-up");
  if (main) {
    const noti = document.createElement("div");

    const autoRemoveId = setTimeout(function () {
      main.removeChild(noti);
    }, duration + 1000);

    noti.onclick = function (e) {
      if (e.target.closest(".noti__close")) {
        main.removeChild(noti);
        clearTimeout(autoRemoveId);
      }
    };

    const icons = {
      success: "fas fa-check-circle",
    };
    const icon = icons[type];
    const delay = (duration / 1000).toFixed(2);

    noti.classList.add("noti", `noti--${type}`);
    noti.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

    noti.innerHTML = `
                    <div class="noti__icon">
                        <i class="${icon}"></i>
                    </div>
                    <div class="noti__body">
                        <h3 class="noti__title">${title}</h3>
                        <p class="noti__msg">${message}</p>
                    </div>
                    <div class="noti__close">
                        <i class="fas fa-times"></i>
                    </div>
                `;
    main.appendChild(noti);
  }
}

function showSuccess() {
    showNoti({
      title: "Congratulation!",
      message: "You have successfully pruchased the ticket(s).",
      type: "success",
      duration: 5000
    });
    hideBuyTickets();
}

// document.getElementById('buy-tickets').addEventListener('click', showSuccess);
// document.getElementById('buy-tickets').addEventListener('click', () => {
//     var btn1 = buyBtns[0]
//     var btn2 = buyBtns[1]
//     var btn3 = buyBtns[2]

//     if (btn1) {

//     }
// });

// function setOutStock(stockID = "") {
//     document.getElementById(stockID).classList.replace("in-stock", "sold-out")
// }

