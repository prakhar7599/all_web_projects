const questions = [{
   "q1" : "Grand Central Terminal, Park Avenue, New York is the world's",
   "option1" : "to maintain peace and security in the world",
   "option2" : " to work together to remove poverty, disease and illiteracy",
   "option3" : "to develop friendly relations among nations",
   "option4" : "All of the above",
   "correct" : "a",
},
{
  "q1" : "The headquarter of ESCAP Economic and Social Commission for Asia are situated at",
  "option1" : "Bangkok",
  "option2" : "Geneva",
  "option3" : "Santiago (Chile)",
  "option4" : "Baghdad",
  "correct" : "b",
},{
  "q1" : "The industrial organization of Atomic Minerals Division, Heavy Water Board (HWB) is located at",
  "option1" : "Mumbai",
  "option2" : "kolkata",
  "option3" : "Hyderabad",
  "option4" : "Jadugude, Bihar",
  "correct" : "c",
},{
  "q1" : "The Indian Air Force celebrated its Golden Jubilee in",
  "option1" : "1962",
  "option2" : "1952",
  "option3" : "1972",
  "option4" : "1982",
  "correct" : "d",
},
];
let Score = 0;
const btn = document.querySelector(".submit")
const qns = document.querySelector(".qn");
const opt = document.querySelector(".opt1")
const opt2 = document.querySelector(".opt2")
const opt3 = document.querySelector(".opt3")
const opt4 = document.querySelector(".opt4")
const data = document.getElementsByName("option")
let side_btn1 = document.querySelector(".side-left");
let side_btn2 = document.querySelector(".side-right");

let index = 0;

function load(){

  const checkedOption = document.querySelector('input[name="option"]:checked');
  if (checkedOption) {
    checkedOption.checked = false;
  }

  qns.innerText = `${index+1}) ${questions[index].q1}`;
  opt.innerText = questions[index].option1;
  opt2.innerText = questions[index].option2;
  opt3.innerText = questions[index].option3;
  opt4.innerText = questions[index].option4;
}
load();
side_btn1.addEventListener('click',()=>{
  if(index>0){
    index--;
    load();
  }
})
side_btn2.addEventListener('click',()=>{
  index++;
  load();
})


btn.addEventListener("click", function run(){
 
 const checkedOption = document.querySelector('input[name="option"]:checked');
 if (checkedOption) {
  checkedOption.checked = false;
}


 if(checkedOption){
  if(index<=questions.length){
   if(checkedOption.value === questions[index].correct){
    Score++;
   }
   index++;

   
   if(index>=questions.length){
    alert(`Thanks for Attend 
     Your Score is : ${Score}/4
    `)
     index = 0;
     Score = 0;
     load()
  
   }

}



  qns.innerText = `${index+1}) ${questions[index].q1}`;
  opt.innerText = questions[index].option1;
  opt2.innerText = questions[index].option2;
  opt3.innerText = questions[index].option3;
  opt4.innerText = questions[index].option4;

    
 }
 else{
  alert("Please Select one option")
 }
  
})


