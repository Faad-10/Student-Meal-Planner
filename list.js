let foods =
  JSON.parse(localStorage.getItem("foods")) || [

    {
      name:"Bread & Egg",
      price:700
    },

    {
      name:"Garri & Groundnut",
      price:500
    },

    {
      name:"Custard & Akara",
      price:500
    },

    {
      name:"Indomie",
      price:400
    },

    {
      name:"Rice & Stew",
      price:1500
    }

];


const foodTableBody =
  document.getElementById("foodTableBody");

const foodModal =
  document.getElementById("foodModal");

const openModalBtn =
  document.getElementById("openModalBtn");

const closeBtn =
  document.getElementById("closeBtn");

const saveBtn =
  document.getElementById("saveBtn");

const foodName =
  document.getElementById("foodName");

const foodPrice =
  document.getElementById("foodPrice");

const modalTitle =
  document.getElementById("modalTitle");

const clearBtn =
  document.getElementById("clearBtn");


let editIndex = null;
function displayFoods(){

  foodTableBody.innerHTML = "";

  foods.forEach((food,index) => {

    foodTableBody.innerHTML += `

      <tr>

        <td>${food.name}</td>

        <td>₦${food.price}</td>

        <td>

          <button
            class="edit-btn"
            onclick="editFood(${index})"
          >
            Edit
          </button>

          <button
            class="delete-btn"
            onclick="deleteFood(${index})"
          >
            Delete
          </button>

        </td>

      </tr>

    `;

  });

}
openModalBtn.addEventListener("click", () => {

  foodModal.style.display = "flex";

  modalTitle.innerText = "Add Food";

  foodName.value = "";

  foodPrice.value = "";

  editIndex = null;

});


closeBtn.addEventListener("click", () => {

  foodModal.style.display = "none";

});

saveBtn.addEventListener("click", () => {

  const name =
    foodName.value.trim();

  const price =
    foodPrice.value;

  if(name === "" || price === ""){

    alert("Please fill all fields");

    return;

  }
  if(editIndex !== null){

    foods[editIndex].name = name;

    foods[editIndex].price = Number(price);

  }
  else{

    foods.push({

      name:name,

      price:Number(price)

    });

  }
  localStorage.setItem(
    "foods",
    JSON.stringify(foods)
  );

  foodModal.style.display = "none";

  displayFoods();

});

function editFood(index){

  editIndex = index;

  foodModal.style.display = "flex";

  modalTitle.innerText = "Edit Food";

  foodName.value =
    foods[index].name;

  foodPrice.value =
    foods[index].price;

}

function deleteFood(index){

  const confirmDelete =
    confirm("Delete this food item?");

  if(confirmDelete){

    foods.splice(index,1);
    localStorage.setItem(
      "foods",
      JSON.stringify(foods)
    );

    displayFoods();

  }

}
clearBtn.addEventListener("click", () => {

  const confirmClear =
    confirm("Clear all food items?");

  if(confirmClear){

    foods = [];

    localStorage.removeItem("foods");

    displayFoods();

  }

});
displayFoods();