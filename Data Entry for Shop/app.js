const form = document.querySelector('.form');
const submitBtn = document.querySelector('.submit');
const items = document.querySelector('.items');
const mains = document.querySelector('.main');
let checkStatus = 0 ;
let arr = [];

function displayItems() {
  
    arr = JSON.parse(localStorage.getItem('data')) || [];
    mains.innerHTML=''
    arr.forEach((element, index) => {
        const box = document.createElement('div');
        const crossBtn = document.createElement('button');
        crossBtn.innerText = 'X';
        box.appendChild(crossBtn);
        box.classList.add('items');

        const UName = document.createElement('div');
        UName.innerHTML = `<h3>Name</h3> 
                            <p>${element.name}</p>`;
        box.appendChild(UName);

        const UMail = document.createElement('div');
        UMail.innerHTML = `<h3>Email</h3> 
                            <p>${element.email}</p>`;
        box.appendChild(UMail);

        const UNumber = document.createElement('div');
        UNumber.innerHTML = `<h3>Number</h3> 
                            <p>${element.number}</p>`;
        box.appendChild(UNumber);

        mains.appendChild(box);

        crossBtn.addEventListener('click', () => {
            arr.splice(index, 1);
            localStorage.setItem('data', JSON.stringify(arr)); 
            box.remove(); 
        });
    });
}

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const name = form.name.value;
    const email = form.email.value;
    const number = form.number.value;
    checkStatus = 0;
    arr.forEach((element)=>{
      console.log(element.name,name);
      if(element.name === name){
        checkStatus =1;
      
        
      }
      console.log(checkStatus);
      
    })
    if(checkStatus == 1){
      alert("User Name Already Exist")
    }
    else{

      arr.push({
          "name": name,
          "email": email,
          "number": number
      });
      localStorage.setItem('data', JSON.stringify(arr));
      displayItems();
    }
});

displayItems();
