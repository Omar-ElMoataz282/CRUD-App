let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let others = document.getElementById("others");
let discount = document.getElementById("discount");
let total = document.querySelector(".total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.querySelector(".create");
let table = document.querySelector(".table table tbody");
let search = document.getElementById("search");
let searchTitle = document.querySelector(".search-title");
let SearcCategory = document.querySelector(".search-category");
let delAll = document.querySelector(".delete-all");

let mood = "Create";
let searchMood = "Title";
let tmp;

let arrProducts = [];

getDataFromLocalStorage();

// Total Price
function totalPrice() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +others.value - discount.value;
    total.innerHTML = result;
  } else {
    total.innerHTML = "";
  }
}

function emptyInputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  others.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

create.addEventListener("click", () => {
  addToArray();
});

// [1] - Add Data To Array
function addToArray() {
  let dataProducts = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    others: others.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };

  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    total.innerHTML > 0
  ) {
    if (mood === "Create") {
      if (dataProducts.count > 0) {
        for (let i = 0; i < dataProducts.count; i++) {
          arrProducts.push(dataProducts);
          emptyInputs();
        }
      } else {
        arrProducts.push(dataProducts);
        emptyInputs();
      }
    } else {
      arrProducts[tmp] = dataProducts;
      mood = "Create";
      create.innerHTML = "Create";
      count.style.display = "block";
      emptyInputs();
    }
  }

  addToPage(arrProducts);

  addToLocalStorage(arrProducts);
}

// [2] - Add Data To Page
function addToPage(data) {
  table.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    table.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${arrProducts[i].title}</td>
                <td>${arrProducts[i].price}</td>
                <td>${arrProducts[i].taxes}</td>
                <td>${arrProducts[i].others}</td>
                <td>${arrProducts[i].discount}</td>
                <td>${arrProducts[i].total}</td>
                <td>${arrProducts[i].category}</td>
                <td><button class="upd-btn" onclick='updateItem(${i})'>Update</button></td>
                <td><button class="del-btn" onclick='deleteItem(${i})'>Delete</button></td>
            </tr>
        `;
  }

  //Delete If Condition
  if (arrProducts.length > 0) {
    delAll.innerHTML = `<button onclick='deleteAll()'>Delete All (${arrProducts.length}) Items</button>`;
  }
}

// [3] - Add Data To LocalStorage
function addToLocalStorage(arrProducts) {
  window.localStorage.setItem("Products", JSON.stringify(arrProducts));
}

// [4] - Get Data From LocalStorage
function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("Products");
  if (data) {
    arrProducts = JSON.parse(data);
    addToPage(arrProducts);
  }
}

// [5] - Delete Item
function deleteItem(i) {
  arrProducts.splice(i, 1);
  addToLocalStorage(arrProducts);
  addToPage(arrProducts);

  if (arrProducts.length === 0) {
    delAll.innerHTML = "";
  }
}

// [6] - Update Item
function updateItem(i) {
  title.value = arrProducts[i].title;
  price.value = arrProducts[i].price;
  taxes.value = arrProducts[i].taxes;
  others.value = arrProducts[i].others;
  discount.value = arrProducts[i].discount;
  total.innerHTML = arrProducts[i].total;
  category.value = arrProducts[i].category;
  mood = "Update";
  tmp = i;
  create.innerHTML = "Update";
  count.style.display = "none";
  scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// [7] - Search
function searchData(e) {
  if (e.id === "search-title") {
    searchMood = "Title";
    search.setAttribute("placeholder", "Search By Title : ");
  } else {
    searchMood = "Category";
    search.setAttribute("placeholder", "Search By Category : ");
  }
  search.focus();
  search.value = "";
}

function searchValue(val) {
  console.log(val.value);
  table.innerHTML = "";

  for (let i = 0; i < arrProducts.length; i++) {
    if (searchMood === "Title") {
      if (
        arrProducts[i].title.toLowerCase().includes(val.value.toLowerCase())
      ) {
        table.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${arrProducts[i].title}</td>
                <td>${arrProducts[i].price}</td>
                <td>${arrProducts[i].taxes}</td>
                <td>${arrProducts[i].others}</td>
                <td>${arrProducts[i].discount}</td>
                <td>${arrProducts[i].total}</td>
                <td>${arrProducts[i].category}</td>
                <td><button class="upd-btn" onclick='updateItem(${i})'>Update</button></td>
                <td><button class="del-btn" onclick='deleteItem(${i})'>Delete</button></td>
            </tr>
        `;
      }
    } else {
      if (
        arrProducts[i].category.toLowerCase().includes(val.value.toLowerCase())
      ) {
        table.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${arrProducts[i].title}</td>
                <td>${arrProducts[i].price}</td>
                <td>${arrProducts[i].taxes}</td>
                <td>${arrProducts[i].others}</td>
                <td>${arrProducts[i].discount}</td>
                <td>${arrProducts[i].total}</td>
                <td>${arrProducts[i].category}</td>
                <td><button class="upd-btn" onclick='updateItem(${i})'>Update</button></td>
                <td><button class="del-btn" onclick='deleteItem(${i})'>Delete</button></td>
            </tr>
        `;
      }
    }
  }
}

// [8] - Delete All
function deleteAll() {
  window.localStorage.removeItem("Products");

  arrProducts.splice(0);

  delAll.innerHTML = "";

  if (arrProducts.length === 0) {
    addToPage([]);
  }
}

// Dark Theme
let dark = document.querySelector(".dark");

if (window.localStorage.getItem("Theme")) {
  document.body.setAttribute(
    "data-theme",
    window.localStorage.getItem("Theme")
  );
  if (window.localStorage.getItem("Theme") === "dark") {
    dark.innerHTML = "Light";
  } else {
    dark.innerHTML = "Dark";
  }
}

dark.onclick = function () {
  if (document.body.getAttribute("data-theme") === "light") {
    document.body.setAttribute("data-theme", "dark");
    window.localStorage.setItem(
      "Theme",
      document.body.getAttribute("data-theme")
    );
    dark.textContent = "Light";
  } else if (document.body.getAttribute("data-theme") === "dark") {
    document.body.setAttribute("data-theme", "light");
    window.localStorage.setItem(
      "Theme",
      document.body.getAttribute("data-theme")
    );
    dark.textContent = "Dark";
  }
};
