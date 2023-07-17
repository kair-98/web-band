// JS Pay Modal
var buyBtns = document.querySelectorAll('.js-buy-tickets');
var modal = document.querySelector('.js-modal');
var modalClose = document.querySelector('.js-modal-close');

modalClose.addEventListener('click', hideBuyTickets);
modal.addEventListener('click', hideBuyTickets);

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
var headerHeight = header.clientHeight;

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

// Purchase success noti
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

//Validator
function Validator(options) {

    var selectorRules = {};

    function validate(inputElement, rule) {
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        var errorMessage;
        var rules = selectorRules[rule.selector];
        for (var i = 0; i < rules.length; ++i) {
            errorMessage = rules[i](inputElement.value);
            if (errorMessage) break;
        }
            if (errorMessage) {
                errorElement.innerText = errorMessage;
                inputElement.parentElement.classList.add('invalid');
            } else {
                errorElement.innerText = '';
                inputElement.parentElement.classList.remove('invalid');
            }
        return !errorMessage;
    }

    var formElement = document.querySelector(options.form);
    if (formElement) {
        formElement.onsubmit = function(e) {
            e.preventDefault();
            var formValid = true;
            options.rules.forEach(function(rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if (!isValid) {
                    formValid = false;
                }
            });

            if (formValid) {
                if (typeof options.onSubmit === 'function') {
                    var validInputs = formElement.querySelectorAll('[name]');
                    var formValues = Array.from(validInputs).reduce(function(values, input) {
                        return (values[input.name] = input.value) && values;
                    }, {});
                    options.onSubmit(formValues);
                    validInputs.forEach(input => {
                        input.value = '';
                    });
                }
            }
        }
        options.rules.forEach(function(rule) {
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }
            var inputElement = formElement.querySelector(rule.selector);
            if (inputElement) {
                inputElement.onblur = function() {
                    validate(inputElement, rule);
                }
                inputElement.oninput = function() {
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid');
                }
            }
        });
    }
}

Validator.isRequired = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            return value.trim() ? undefined: message || 'Please fill in this blank.';
        }
    };
}

Validator.isEmail = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined: message || 'This is an invalid email.';
        }
    };
}