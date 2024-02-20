const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropDown Select");

const btn = document.querySelector("button");

const from = document.querySelector(".from select");
const to = document.querySelector(".to select");
const msg = document.querySelector(".msg")
const exc = document.querySelector("i");

window.addEventListener("load", () => {
  updateExchangeRate();
})

for(let select of dropdowns){
  for(let currCode in countryList){
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if(select.name === "from" && currCode === "USD"){
      newOption.selected = "selected";
    }
    else if(select.name === "to" && currCode === "INR"){
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  })
}

const updateFlag = (element) => {
  let currCode = element.value;
  let cunCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${cunCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate(evt);
})

const updateExchangeRate = async (evt) => {
  let amount = document.querySelector(".amount input")
  let amtVal = amount.value;
  if(amtVal === "" || amtVal < 1){
    amtVal = 1; 
    amount.value = "1";   
  } 
  const URL = `${BASE_URL}/${from.value.toLowerCase()}/${to.value.toLowerCase()}.json`;
  let exRate = await fetch(URL);
  let data = await exRate.json();
  let rate = data[to.value.toLowerCase()];

  let finalAmt = amtVal * rate;
  msg.innerText = `${amtVal} ${from.value} = ${finalAmt} ${to.value}`;
}

exc.addEventListener("click", (evt) => {
  let temp = from.value;
  from.value = to.value;
  to.value = temp;

  let imageFrom = from.parentElement.querySelector("img");
  let imageTo = to.parentElement.querySelector("img");
  temp = imageFrom.src;
  imageFrom.src = imageTo.src;
  imageTo.src = temp;
  
  console.log(from.val);  
  updateExchangeRate();
})