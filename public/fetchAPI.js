//fetch dishes fr. API and display in table
async function loadDishes() {
  try {
    const res = await fetch('/api/dishes');
    const dishes = await res.json();

    const tableBody = document.querySelector('#recipeTable tbody');
    tableBody.innerHTML = '';

    dishes.forEach(dish => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${dish.name}</td>
        <td>${dish.ingredients.join(', ')}</td>
        <td>${dish.preparationSteps}</td>
        <td>${dish.cookingTime}</td>
        <td>${dish.origin}</td>
        <td>${dish.spiceLevel || '-'}</td>
        <td><button onclick="editDish(${dish.id})">Update</button></td>
        <td><button onclick="deleteDish(${dish.id})">Delete</button></td>
      `;
      tableBody.appendChild(row);
    });

  } catch (err) {
    console.error('Error fetching dishes:', err);
  }

}

// CRUD operations for dishes UI
async function deleteDish(id) {
  if (confirm("Are you sure you want to delete this dish?")) {
    const res = await fetch(`/api/dishes/${id}`, { method: 'DELETE' });
    if (res.ok) {
      alert("Dish deleted!");
      loadDishes(); // reload the table
    } else {
      alert("Failed to delete dish.");
    }
  }
}

// ... aka spread operator, Convert NodeList to real array so we can use .find() and .map()
function editDish(id) {
  const row = [...document.querySelectorAll('#recipeTable tbody tr')] //find the row of the dish to edit w/ edit button
    .find(r => r.querySelector(`button[onclick="editDish(${id})"]`));

  const cells = row.querySelectorAll('td');
  const original = [...cells].map(cell => cell.textContent); //turns cell into array and grabs the text content of each cell

  //{original[]} array to get original values, & replace the whole row with inputs fileds with pre-filled values fr. original values.
  row.innerHTML = `
    <td><input value="${original[0]}" id="editName${id}"></td> 
    <td><input value="${original[1]}" id="editIng${id}"></td>
    <td><input value="${original[2]}" id="editSteps${id}"></td>
    <td><input value="${original[3]}" id="editTime${id}" type="number"></td>
    <td><input value="${original[4]}" id="editOrigin${id}"></td>
    <td><input value="${original[5]}" id="editSpice${id}"></td>
    <td><button onclick="submitUpdate(${id})">Save</button></td>
    <td><button onclick="loadDishes()">Cancel</button></td>
  `;
}

//* This function is called when the user clicks the "Save" button after editing a dish.
//* It collects the updated values from the input fields and sends them to the server using a PUT request.
async function submitUpdate(id) {
  const updatedDish = {
    name: document.getElementById(`editName${id}`).value,
  ingredients: document.getElementById(`editIng${id}`).value.split(',').map(x => x.trim()),
  preparationSteps: document.getElementById(`editSteps${id}`).value,
  cookingTime: Number(document.getElementById(`editTime${id}`).value),
  origin: document.getElementById(`editOrigin${id}`).value,
  spiceLevel: document.getElementById(`editSpice${id}`).value
  };

  const res = await fetch(`/api/dishes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedDish)
  });

  if (res.ok) {
    alert("Dish updated!");
    loadDishes();
  } else {
    alert("Failed to update dish.");
  }
}

//Add new dish
document.getElementById('addDishForm').addEventListener('submit', async (e) => {
  e.preventDefault(); //prevent refreshing the page when the form is submitted
  const form = e.target; // get the form element itself

  const newDish = {
    name: form.name.value,
    ingredients: form.ingredients.value.split(',').map(i => i.trim()),
    preparationSteps: form.preparationSteps.value,
    cookingTime: Number(form.cookingTime.value),
    origin: form.origin.value,
    spiceLevel: form.spiceLevel.value
  };

  const res = await fetch('/api/dishes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newDish)
  });

  if (res.ok) {
    alert("Dish added!");
    form.reset(); // clear the input fields
    loadDishes(); // reload the table w/ updated data
  } else {
    const error = await res.json();
    alert("Failed to add dish: " + error.message);
  }
});

window.addEventListener('DOMContentLoaded', loadDishes);