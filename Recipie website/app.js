const SubmitBtn = document.querySelector(".Submit");
const Input = document.querySelector(".input");
const box_container = document.querySelector(".recipie-container");
const textElement = document.querySelector(".text");
const sectionClass = document.querySelector(".section");
const recipieDetails = document.querySelector(".recipe-details");
const recipeCloseBtn = document.querySelector(".recipeCloseBtn");
const recipieDetailContent = document.querySelector(".recipie-detail-content");


const fetching = async (input) => {
  try {
    box_container.innerHTML = "";
    box_container.innerText = "Fetching...";
    const fetchData = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`
    );
    const data = await fetchData.json();
    box_container.innerText = "";
    const searchBox = document.createElement("div");
    searchBox.innerHTML = `<h1>Result of ${input} ....</h1>`;
    searchBox.classList.add("searchBox");
    sectionClass.appendChild(searchBox);

    textElement.innerText = "";
    data.meals.forEach((element) => {
      const box = document.createElement("div");
      box.classList.add("card");
      box.innerHTML = `<img src="${element.strMealThumb}" alt="">
           <h1>${element.strMeal} </h1>
           <h3>${element.strCategory}</h3>
           <h3>${element.strArea}</h3> `;
      const viewRecipie = document.createElement("button");
      viewRecipie.classList.add("view");
      viewRecipie.innerText = "View Recipe";
      box.appendChild(viewRecipie);
      box_container.appendChild(box);
      viewRecipie.addEventListener("click", () => {
      console.log('before popup')
        openPopUp(element);
            
      });
    });
  } catch (error) {
    box_container.innerHTML = "";
    const searchBox = document.createElement("div");
    searchBox.innerHTML = `<h1> No recipie Found ....</h1>`;
    searchBox.classList.add("searchBox");
    sectionClass.appendChild(searchBox);
    console.log("No recipie Found");
  }
};
recipeCloseBtn.addEventListener('click',()=>{
  recipieDetailContent.parentElement.style.display = 'none'
})
const fetchIngredients= (meal) =>{
  console.log(meal);
  let ingredentList = '';
  for(let i = 1 ; i <= 20 ; i++){
    const ingredent = meal[`strIngredient${i}`];

    if(ingredent){
      const measure = meal[`strMeasure${i}`];
      ingredentList += `<li>${measure} ${ingredent}</li>`
    }
    else{
      break;
    }
  }
  return ingredentList;
}
const openPopUp = (meal)=>{
   recipieDetailContent.innerHTML = `
      <h2 class"recipieName">${meal.strMeal}</h2>
      <h3>Ingredents:</h3>
      <ul class"ingredientList">${fetchIngredients(meal)} </ul>
      <div class"instructions"> 
      <h3>Instructions</h3>
      <p >${meal.strInstructions}</p>
  </div>
   `
   
    recipieDetailContent.parentElement.style.display='block';
  
}

  
SubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const inputValue = Input.value.trim();
  if (inputValue === "") {
    alert("Please Enter a Recipe");
  } else {
    fetching(inputValue);
  }
});
