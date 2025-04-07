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
        <td>${dish.spiceLevel || dish.difficulty || dish.servings || '-'}</td>
        <td><button>Update</button></td>
        <td><button>Delete</button></td>
      `;
      tableBody.appendChild(row);
    });
  } catch (err) {
    console.error('❌ Error fetching dishes:', err);
  }
}

// Run it when the page loads
window.addEventListener('DOMContentLoaded', loadDishes);