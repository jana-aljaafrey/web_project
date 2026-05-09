

caculate_price()
update_priceBox()
display();

function display() {
    let basket = JSON.parse(localStorage.getItem("items"));

    if (!Array.isArray(basket)) {
        basket = [];
    };
    let cardsSection = document.getElementById("cards");
    let reservation = document.getElementById("reservation_info");

    if (!cardsSection) return;

    if (basket.length === 0) {
        cardsSection.innerHTML = `<p class="empty">"The Basket is Empty"</p>`;
        reservation.style.display = "none"
    } else {
        cardsSection.innerHTML = "";
        basket.forEach(item => {


            cardsSection.innerHTML +=
                `<article class="card_content" style="padding:10px 80px;">
                <div class="infos" style="justify-items:center;"> <!--product info-->
                    <div class="photo"> <!--product photo-->
                        <img src=${item.plink} alt="${item.name}" width="150">
                    </div>
                    <div class="text_info"> <!--title and price-->
                        <h3>${item.name}</h3>
                        <p class="price">${item.total_price}</p>
                    </div>
                </div>
                <div class="quantity_control" style="margin-right: 40px;"> <!--quantity control-->
                    <div class="quantity">
                        <button onclick="reduce_quantity('${item.name}')" style="background: none; padding: 0px; margin-top: -1px;"><img class="icon" src="Assets/images/thick_minus.png"
                            alt="minus sign to reduce product quantity by one" width="30" height="30"></button>
                        <p style="margin-right:15px;margin-left:15px;">${item.quantity}</p>
                        <button onclick="add_quantity('${item.name}')" style="background: none; padding: 0px; margin-top: -1px;"><img class="icon" src="Assets/images/plus.png"
                            alt="plus sign to increase product quantity by one" width="20" height="20"></button>
                    </div>
                    <div class="garbige">
                        <button onclick="remove_item('${item.name}')" style="background: none; padding: 0px; margin-top: -1px;"><img class="icon" src="Assets/images/garbige.png" alt="garbige icon for removing the item"
                            width="40"></button>
                    </div>
                </div>
            </article>`});

        reservation.innerHTML = ` <h2 class="reservation_title">Reservation Info</h2>
            <div class="reservation_box">

                <label for="phoneNumber" class="small_label">Phone number:</label>
                <div class="input_group">
                    <input type="tel" id="phoneNumber" name="phoneNumber" placeholder="05xxxxxxxx" inputmode="numeric"
                        maxlength="10" required>
                    <span id="phoneNumberMassage"></span>
                </div>

                <label for="reservation_time" class="time_label">Select Time</label>
                <div class="input_group">
                    <input type="time" id="reservation_time" name="reservation_time" required>
                </div>

                <label for="reservation_date" class="date_label">Select Date</label>
                <div class="input_group">
                    <input type="date" id="reservation_date" name="reservation_date" required min="2026-03-30">
                </div>

                <label for="reservation_comments" class="comments_label">Comments</label>
                <div class="input_group">
                    <textarea id="reservation_comments" name="reservation_comments"
                        placeholder="Write your comments here..."></textarea>
                    <span id="contentMassage"></span>
                </div>
                <div class="branch_box">
                    <label for="branch">Choose a branch:</label>

                    <select id="branch" name="branch" required>
                        <option disabled selected value="">Select a branch</option>
                        <option value="dhahran">Prince Mutaib Road, Hajer District, Dhahran 34254, Saudi Arabia.
                        </option>
                        <option value="al_khobar">King Saud bin Abdulaziz Road, Al-Safa District, Al Khobar 34222,
                            Saudi
                            Arabia.</option>
                        <option value="dammam">Abu Bakr Al-Siddiq Street, Al-Manar District, Dammam 32274, Saudi
                            Arabia.
                        </option>
                    </select>
                </div>
            </div>`
    };
    console.log(cardsSection);
};

// function for changing the basket page icon when click on basket item icon 
function addToBasket(name, price, link) {
    let basket = JSON.parse(localStorage.getItem("items"));
    if (!Array.isArray(basket)) {
        basket = [];
    }
    let isExisit = basket.find(item => item.name === name);
    let announcmect = document.getElementById("announcement");
    let icon = document.getElementById("basket_icon");

    if (announcmect) {
        announcmect.style.opacity = "1";
        setTimeout(function () {
            announcmect.style.opacity = "0";

        }, 2000);
    }
    if (icon) {
        icon.src = "Assets/images/coffeeBasket.png";
        setTimeout(function () {
            icon.src = "Assets/images/emptyBasket.png";
        }, 2000);

    }

    if (isExisit) {
        isExisit.quantity += 1;
    } else {
        basket.push({
            name: name,
            price: price,
            quantity: 1,
            plink: link,
            total_price: 0
        });
    };

    localStorage.setItem("items", JSON.stringify(basket));
    caculate_price();
    update_priceBox()
    display();


}


function add_quantity(name) {

    let basket = JSON.parse(localStorage.getItem("items"));
    if (!Array.isArray(basket)) {
        basket = [];
    };

    basket.forEach(item => {
        if (item.name === name) {
            item.quantity += 1;

        }

    });

    localStorage.setItem("items", JSON.stringify(basket));
    caculate_price();
    update_priceBox()
    display();
}

function reduce_quantity(name) {
    let basket = JSON.parse(localStorage.getItem("items"));
    if (!Array.isArray(basket)) {
        basket = [];
    };
    let isExisit = basket.find(item => item.name === name);
    if (!isExisit) {
        return;
    }
    if (isExisit.quantity > 1) {
        isExisit.quantity -= 1;
    } else {
        basket = basket.filter(item => item.name !== name);
    }

    localStorage.setItem("items", JSON.stringify(basket));
    caculate_price()
    update_priceBox()
    display();
}

function caculate_price() {
    let basket = JSON.parse(localStorage.getItem("items"));
    if (!Array.isArray(basket)) {
        basket = [];
    };
    basket.forEach(item => {
        item.total_price = item.quantity * item.price;

    });
    localStorage.setItem("items", JSON.stringify(basket));
}

function remove_item(name) {
    let basket = JSON.parse(localStorage.getItem("items"));
    if (!Array.isArray(basket)) {
        basket = [];
    };
    basket = basket.filter(item => item.name !== name);

    localStorage.setItem("items", JSON.stringify(basket));
    caculate_price()
    update_priceBox()
    display();
}

function update_priceBox() {
    let basket = JSON.parse(localStorage.getItem("items"));
    let subtotal = 0;
    if (!Array.isArray(basket)) {
        basket = [];
    };
    basket.forEach(item => {
        subtotal += item.price * item.quantity;

    })
    let tax = Number((subtotal * 0.05).toFixed(2));
    let total_total = subtotal + tax;
    document.getElementById("subtotal").innerText = subtotal;
    document.getElementById("tax").innerText = tax;
    document.getElementById("total").innerText = total_total;

}

// function for full name and titel in contact us (should be letters only from 1 to 50 and don't contain numbers& shouldn't be empty)
function check_name() {

}
// function to check phone numbers in contact us and basket (should be in this format: "05xxxxxxxx" start with 05 then andy 8 numbert)
// it shouldn't be empty
function check_phone() {

    let phoneArea = document.getElementById("phoneNumber");
    let userPhone = phoneArea.value.trim();
    let phoneError = document.getElementById("phoneNumberMassage");

    if (userPhone === "") {

        phoneError.innerText = "required";
        return false;

    } else if (isNaN(userPhone)) {

        phoneError.innerText = "must contain numbers only";
        return false;

    } else if (!userPhone.startsWith("05")) {

        phoneError.innerText = "must start with 05";
        return false;

    } else if (userPhone.length !== 10) {

        phoneError.innerText = "must contain 10 numbers";
        return false;

    } else {
        phoneError.innerText = "";
        return true;
    }
}
// function to check massage content in contact us and comments basket
// it shouldn't be empty
function check_content() {

    let messageArea =
        document.getElementById("customerMessage") || document.getElementById("reservation_comments");

    let userMessage = messageArea.value.trim();
    let messageError = document.getElementById("contentMassage");

    if (userMessage === "") {

        messageError.innerText = "required";
        return false;
    }

    let textWords = userMessage.split(/\s+/);

    if (textWords.length > 250) {

        messageError.innerText = "must not exceed 250 words";
        return false;

    } else {
        messageError.innerText = "";
        return true;
    }
}

function saveOrderForm() {

    let basket = JSON.parse(localStorage.getItem("items"));

    let orderForm = {
        phone: document.getElementById("phoneNumber").value,
        time: document.getElementById("reservation_time").value,
        date: document.getElementById("reservation_date").value,
        comments: document.getElementById("reservation_comments").value,
        branch: document.getElementById("branch").value,
        items: basket
    };

    localStorage.setItem("orderForm", JSON.stringify(orderForm));

    return true;
}