let foods = JSON.parse(localStorage.getItem("foods")) || [
    { name: "Bread & Egg", price: 700 },
    { name: "Garri & Groundnut", price: 500 },
    { name: "Custard & Akara", price: 500 },
    { name: "Indomie", price: 400 },
    { name: "Rice & Stew", price: 1500 }
];

function generatePlan() {
    const allowance = parseInt(document.getElementById('allowance').value) || 10000;
    const mealCount = parseInt(document.querySelector('input[name="meal"]:checked').value);
    const btn = document.getElementById('generateBtn');

    if (foods.length === 0) {
        alert("No foods available. Please add some on the Food List page first.");
        return;
    }

    btn.textContent = "Generating...";
    btn.disabled = true;

    setTimeout(() => {
        const mealLabels = mealCount === 2
            ? ["Breakfast", "Lunch"]
            : ["Breakfast", "Lunch", "Dinner"];

        const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

        function pickFood(lastName) {
            if (foods.length === 1) return foods[0];
            let pick;
            do {
                pick = foods[Math.floor(Math.random() * foods.length)];
            } while (pick.name === lastName);
            return pick;
        }

        let totalCost = 0;
        let lastFood = null;

        const weekPlan = days.map(day => {
            const dayMeals = mealLabels.map(label => {
                const food = pickFood(lastFood?.name);
                lastFood = food;
                totalCost += food.price;
                return { label, food };
            });
            return { day, meals: dayMeals };
        });

        const grid = document.getElementById('planGrid');
        grid.innerHTML = weekPlan.map(({ day, meals }) =>
            `<div class="plan-day">
                <div class="plan-day-name">${day}</div>
                ${meals.map(({ label, food }) =>
                    `<div class="plan-meal-item">
                        <span class="plan-meal-label">${label}</span>
                        <span>${food.name}</span>
                        <span class="plan-meal-price">₦${food.price.toLocaleString()}</span>
                    </div>`
                ).join('')}
            </div>`
        ).join('');

        const pct = Math.min(100, Math.round((totalCost / allowance) * 100));
        const overBudget = totalCost > allowance;
        document.getElementById('budgetSpend').textContent =
            `₦${totalCost.toLocaleString()} / ₦${allowance.toLocaleString()}`;
        document.getElementById('budgetFill').style.width = pct + '%';
        document.getElementById('budgetFill').style.background = overBudget ? '#dc3545' : '#138c2f';

        document.getElementById('planner').style.display = 'block';

        btn.textContent = "Regenerate Plan";
        btn.disabled = false;
    }, 600);
}