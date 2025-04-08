//fetch dishes fr. API and display in table
// CRUD operations for dishes UI
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

function editDish(id) {
  const row = [...document.querySelectorAll('#recipeTable tbody tr')]
    .find(r => r.querySelector(`button[onclick="editDish(${id})"]`));

  const cells = row.querySelectorAll('td');
  const original = [...cells].map(cell => cell.textContent);

  row.innerHTML = `
    <td><input value="${original[0]}" id="edit-name-${id}"></td>
    <td><input value="${original[1]}" id="edit-ing-${id}"></td>
    <td><input value="${original[2]}" id="edit-steps-${id}"></td>
    <td><input value="${original[3]}" id="edit-time-${id}" type="number"></td>
    <td><input value="${original[4]}" id="edit-origin-${id}"></td>
    <td><input value="${original[5]}" id="edit-spice-${id}"></td>
    <td><button onclick="submitUpdate(${id})">Save</button></td>
    <td><button onclick="loadDishes()">Cancel</button></td>
  `;
}

async function submitUpdate(id) {
  const updatedDish = {
    name: document.getElementById(`edit-name-${id}`).value,
    ingredients: document.getElementById(`edit-ing-${id}`).value.split(',').map(x => x.trim()),
    preparationSteps: document.getElementById(`edit-steps-${id}`).value,
    cookingTime: Number(document.getElementById(`edit-time-${id}`).value),
    origin: document.getElementById(`edit-origin-${id}`).value,
    spiceLevel: document.getElementById(`edit-spice-${id}`).value
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

document.getElementById('addDishForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;

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