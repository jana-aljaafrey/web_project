
// localStorage.clear()
display();
caculate_price()

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

// function for changing the basket page icon when click on basket item icon (Jana)
function addToBasket(name, price, link) {
    let basket = JSON.parse(localStorage.getItem("items"));
    if (!Array.isArray(basket)) {
        basket = [];
    }
    let isExisit = basket.find(item => item.name === name);
    let announcmect = document.getElementById("announcement");

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
    // if (cardsSection && reservation) {
    display();
    // }


    document.getElementById("basket_icon").src = "Assets/images/coffeeBasket.png";

    announcmect.style.opacity = "1";
    console.log(basket);


    setTimeout(function () {
        document.getElementById("basket_icon").src = "Assets/images/emptyBasket.png";
    }, 2000);

    setTimeout(function () {
        announcmect.style.opacity = "0";

    }, 2000);

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
    display();
}

function reduce_quantity(name) {
    let basket = JSON.parse(localStorage.getItem("items"));
    if (!Array.isArray(basket)) {
        basket = [];
    };
    let isExisit = basket.find(item => item.name === name);
    if (!isExisit){
        return;
    }
    if (isExisit.quantity > 1) {
        isExisit.quantity -= 1;
    } else {
        basket = basket.filter(item => item.name !== name);
    }

    localStorage.setItem("items", JSON.stringify(basket));
    caculate_price()
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
    display();
}