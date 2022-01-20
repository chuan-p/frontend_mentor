//inputs
const btnDiv = document.querySelector(".btns");
const customRatio = document.querySelector(".customRatio");
const pplInput = document.querySelector(".pplInput");
const billInput = document.querySelector(".billInput");
const reset = document.querySelector(".reset");

//results
const tipperperson = document.querySelector(".tipperperson");
const totalperperson = document.querySelector(".totalperperson");

//grab the activated one
let nowActivated = document.querySelector(".activated");

//declare values
let ratio;
let ppl;
let bill;

//toggle activated & calc
btnDiv.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn")) {
        event.target.classList.toggle("activated");
        nowActivated.classList.toggle("activated");
        nowActivated = event.target;
        calc();
    }
});

customRatio.addEventListener("focus", (event) => {
    event.target.classList.toggle("activated");
    nowActivated.classList.toggle("activated");
    nowActivated = event.target;
    calc();
});

customRatio.addEventListener("input", (event) => {
    detectNaN(event);
    calc();
});

billInput.addEventListener("input", (event) => {
    detectNaN(event);
    calc();
});

pplInput.addEventListener("input", (event) => {
    detectNaN(event);
    calc();
});

//reset
reset.addEventListener("click", () => {
    pplInput.value = 1;
    billInput.value = 0;
    nowActivated.classList.toggle("activated");
    nowActivated = btnDiv.firstElementChild;
    btnDiv.firstElementChild.classList.toggle("activated");
    billInput.classList.remove("error");
    pplInput.classList.remove("error");
    customRatio.classList.remove("error");
    calc();
});

//detect nan and report error
let detectNaN = (event) => {
    if (
        (isNaN(Number.parseFloat(event.target.value)) &&
            !event.target.classList.contains("error")) ||
        (!isNaN(Number.parseFloat(event.target.value)) &&
            event.target.classList.contains("error"))
    ) {
        event.target.classList.toggle("error");
    }
};

let calc = () => {
    ratio = Number.parseFloat(nowActivated.innerText || nowActivated.value);
    ppl = Number.parseFloat(pplInput.value);
    bill = Number.parseFloat(billInput.value);
    if (!isNaN(ratio) && !isNaN(ppl) && !isNaN(bill) && ppl != 0) {
        tipperperson.innerText = "$" + Math.round((ratio * bill) / ppl) / 100;
        totalperperson.innerText =
            "$" + Math.round((ratio * bill) / ppl + (100 * bill) / ppl) / 100;
    } else {
        totalperperson.innerText = "Null";
        tipperperson.innerText = "Null";
    }
};
