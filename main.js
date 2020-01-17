const title = document.querySelector(".title");
const inputs = document.querySelectorAll("input");
const userScore = document.querySelector("#scoreInput");
const totalScore = document.querySelector("#scoreTotal");
const BTNcalc = document.querySelector(".buttonCalc");
const BTNreset = document.querySelector(".buttonReset");
const modal = document.querySelector(".modal");
const result = document.querySelector("#result");
const BTNaverage = document.querySelector('.buttonTotal');

const test = document.querySelector(".test");

const li = document.querySelector("#list-container");

let scores = [];

function grades() {
  let g = userScore.value;
  let s = totalScore.value;

  let total = ((g / s) * 100).toFixed(2);
    if (total >= 100){
    test.innerHTML = `
    <h1 class="text-win">You scored ${total}%!</h1>
    <i class="fas fa-grin-stars fa-5x" id="chewy"></i>`
  }else if(total >= 90 && total <= 99) {
    test.innerHTML = `
    <h1 class="text-win">You scored ${total}% for an A!</h1>
    <i class="far fa-laugh-beam fa-5x" id="chewy"></i>`;
  } else if (total >= 80 && total <= 89) {
    test.innerHTML = `
    <h1 class="text-win">You scored ${total}% For a B</h1>
    <i class="far fa-smile-beam fa-5x" id="chewy"></i>`;
  } else if (total >= 70 && total <= 79) {
    test.innerHTML = `
    <h1 class="text-win">You scored ${total}% for a C</h1>
    <i class="far fa-smile fa-5x" id="chewy"></i>`;
  } else if (total >= 60 && total <= 69) {
    test.innerHTML = `
    <h1 class="text-win">You scored ${total}% for a D</h1>
    <i class="far fa-grimace fa-5x" id="chewy"></i>`;
  } else {
    test.innerHTML = `
    <h1 class="text-win">You scored a ${total}% and failed</h1>
    <i class="fas fa-thumbs-down fa-5x" id="chewy"></i>`;
  }
  scores.push(total);
  // getAverage();
  // modal.style.display = "block";
  document.querySelector(".test").style.display = "block";
}

BTNaverage.addEventListener('click', testing)
function testing(){
  modal.style.display = "block";
}

function getAverage() {
  const reducer = (acc, currentVal) => parseFloat(acc) + parseFloat(currentVal);
  console.log(scores.reduce(reducer));
  t = scores.reduce(reducer);
  let avg = (t / scores.length).toFixed(2);
  console.log(avg);
  // test.innerHTML = `<h1>${scores.reduce(reducer)}</h1>`
  // test.innerHTML = `<h1>Average is ${avg}</h1>`
  if(avg == 100){
    result.innerHTML = `<h1 class="test"> Wow! Your average is ${avg}%!</h1>
    <i class="fas fa-grin-stars fa-5x"></i>`;
  }else if(avg >= 90 && avg <= 99) {
    result.innerHTML = `<h1 class="test"> Your average is ${avg}% for an A!</h1>
    <i class="far fa-laugh-beam fa-5x"></i>`;
  } else if (avg >= 80 && avg <= 89) {
    result.innerHTML = `<h1 class="test"> Your average is ${avg}% for a B</h1>
    <i class="far fa-smile-beam fa-5x"></i>`;
  } else if (avg >= 70 && avg <= 79) {
    result.innerHTML = `<h1 class="test"> Your average is ${avg}% for a C</h1>
    <i class="far fa-smile fa-5x"></i>`;
  } else if (avg >= 60 && avg <= 69) {
    result.innerHTML = `<h1 class="test"> Your average is ${avg}% for a D</h1>
    <i class="far fa-grimace fa-5x"></i>`;
  } else {
    result.innerHTML = `<h1 class="test"> Your average is ${avg}%</h1>
    <i class="fas fa-thumbs-down fa-5x"></i>`;
  }
}

// reset button
function clearInput() {
  document.querySelector("#scoreInput").value = "";
  document.querySelector("#scoreTotal").value = "";
  document.querySelector(".buttonCalc").disabled = false;
  document.querySelector(".test").style.display = "none";
  document.querySelector("#list-container").style.display = "none";
  document.querySelector('#result').innerHTML = '';

  document.querySelector('.scoresH1').innerHTML = ''

  // below resets list values
  // scores.length = 0;
  // for(j=0; j <= scores.length-1; j++){
  document.querySelector('#list-container').innerHTML = '';
  
  // close.parentNode.removeChild(close);

  // }
  scores = [];
  getAverage();

}

// This runs on the buttons to make sure there is input then it runs the main program function if conditions are met
function success() {
  if (
    document.querySelector("#scoreInput").value === "" ||
    document.querySelector("#scoreTotal").value === ""
  ) {
    document.querySelector(".buttonCalc").disabled = true;
  } else {
    document.querySelector(".buttonCalc").disabled = false;
    grades();
    addItem();
    document.querySelector('.scoresH1').innerHTML = `Scores`
  }
}

// clear modal function
function clearModal(e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
}

// event listeners
BTNcalc.addEventListener("click", success);

window.addEventListener("click", clearModal);

BTNreset.addEventListener("click", clearInput);

// li.addEventListener('click', removeItem)

// Try adding a list underneath the buttons with each score and add delete the items and have the avg update if things are deleted

function addItem() {
  // adds element to list display
  let ul = document.getElementById("list-container");
  let inputValue = document.getElementById("scoreInput");
  let li = document.createElement("li");
  let j =0;
  for(j=0; j <= scores.length-1; j++){
  li.setAttribute("id", "newListItem-" + j);
  }
  li.appendChild(document.createTextNode(inputValue.value));
  ul.appendChild(li);
  //
  document.querySelector("#list-container").style.display = "block";
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);


  // removes element when clicked on (getAverage in loop to update average when value removed. Its also after loop to update average when element is added)
  li.onclick = function(e) {
    console.log(e.target);
    let testt = parseInt(this.id.split('-')[1]);
    this.parentNode.removeChild(this);
    scores.splice(testt,1);
    document.querySelector('.text-win').innerHTML = `<h1 class="text-win">You scored ${scores.slice(-1)[0]}%</h1>`;

    document.getElementById('chewy').style.display = 'none';

    if(scores.length === 0){
      document.querySelector('.test').innerHTML = '';
      document.querySelector('.scoresH1').innerHTML = '';
      
    }

    i = 0;
    for (i = 0; i < scores.length; i++) {
      getAverage();
    }
  };
  getAverage();


}

