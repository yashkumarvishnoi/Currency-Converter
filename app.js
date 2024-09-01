const URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const button=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const amt=document.querySelector(".amount input");
const result=document.querySelector(".message");


let i=0;
for(let select of dropdowns){
    for(currCode in countryList){
        let newOption= document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected="selected";
        }
        if(select.name === "to" && currCode === "INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt) =>{
        updateFlag(evt.target);
    })
}



const updateFlag= (element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];

    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
    // console.log(currCode,countryCode);

};
button.addEventListener("click", async (evt) =>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amountVal=amount.value;
    if(amountVal ==="" || amountVal < 1){
        amountVal=1;
        amount.value="1";
    }
    let choice1=fromCurr.value.toLowerCase();
    let choice2=toCurr.value.toLowerCase();
    console.log(choice1,choice2);
    console.log(typeof(choice1),typeof(choice2));

    const newUrl=`${URL}/${choice1}.json`;
    let response= await fetch(newUrl);
    let data= await response.json();
    console.log(data);
    const choice1Data = data[choice1];
    const choice2Value = choice1Data[choice2];
    let amtVal=amt.value;
    console.log(choice2Value); 
    console.log(amtVal); 
    finalAmt=amtVal*choice2Value;
    result.innerText=`${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;

    
});