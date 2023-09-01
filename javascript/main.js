"use strict";


// === VARIBAL ===

let bill = document.querySelector("#bill");
let nop = document.querySelector("#nop");
let radio = document.querySelectorAll(".radio-btn");
let perc = document.querySelectorAll(".label-btn");
let custom = document.querySelector(".custom");
let tip = document.querySelector(".output-div:first-of-type span");
let total = document.querySelector(".output-div:nth-of-type(2) span");
let reset = document.querySelector(".reset");
let save_btn = document.querySelector(".save");
let history_a = document.querySelector(".history");
let history = document.querySelector(".history + div");
let history_element_qs = document.querySelectorAll(".history-element");
let history_date = document.querySelector(".history-element span:last-of-type");
let delet_btn = document.querySelector(".delete");
let cbz_bill = document.querySelector("#cb-zero-bill");
let cbz_nop = document.querySelector("#cb-zero-nop");

let json = {
    "history": [

    ]
}

let bill_value = 0;
let percantage_value = 0;
let nop_value = 0;
let tip_value = 0;
let total_value = 0;
let date = new Date();


// === LOCAL-STORAGE ===

let ls = 0; 
if (localStorage.getItem("history") !== null) {
    ls = JSON.parse(localStorage.getItem("history"));
    json = ls;
}







//  === EVENT-LISTENER ===


window.addEventListener("load", e => {
    for(let i = 0; i<ls.history.length; i++) {
        let history_element = document.createElement("div");
        history_element.className = "history-element";
        history_element.innerHTML = "<span>Bill: "+ls.history[i].bill+"</span><br><span>Date: " +ls.history[i].date +"</span>";
        history.appendChild(history_element);
    }

    
});


history_a.addEventListener("click", e=> {
    if (history.style.transform === "scaleX(1)")
    {
        history.style.transform = "scaleX(0)";
    }
    else {
        history.style.transform = "scaleX(1)"
    }
    
});

delet_btn.addEventListener("click", e=> {
    localStorage.clear();
})



bill.addEventListener("change", e => {
    if (e.target.valueAsNumber !== 0) {
        bill.style.border = "2px solid green";
        cbz_bill.style.display = "none";
        bill_value = e.target.valueAsNumber;
        result();
    }
    else {
        bill.style.border = "2px solid red";
        cbz_bill.style.display = "inline-block";
    }
    
});

for(let i=0; i<perc.length; i++) {
    perc[i].addEventListener("click", e => {
        percantage_value = perc[i].innerHTML;
        result();
    });
}

custom.addEventListener("change", e => {
    if (e.target.valueAsNumber !== 0) {
        custom.style.border = "2px solid green";
        percantage_value = e.target.valueAsNumber;
        for (let j=0; j<radio.length; j++) {
            radio[j].checked = false;
        }
        result();
    }
    
});

nop.addEventListener("change", e => {
    if (e.target.valueAsNumber !== 0) {
        nop.style.border = "2px solid green";
        cbz_nop.style.display = "none";
        nop_value = e.target.valueAsNumber;
        result();
    }
    else {
        nop.style.border = "2px solid red";
        cbz_nop.style.display = "inline-block";
    }
});


save_btn.addEventListener("click", e => {
    if(bill_value !== 0 && percantage_value !== 0 && nop_value !== 0) {
        json.history.push({
            "bill": bill_value,
            "tip": percantage_value,
            "Number_of_people": nop_value,
            "tip_amount": tip_value,
            "total": total_value,
            "date": date.toUTCString()
        });
    }
    localStorage.setItem("history", JSON.stringify(json));
});



// === SHOW RESULT ===


function result() {
    tip_value = 0;
    total_value = 0;
    if(bill_value !== 0 && percantage_value !== 0 && nop_value !== 0) {
        tip_value = bill_value * (0.01 * percantage_value) / nop_value;
        total_value = bill_value/nop_value + tip_value;
        tip.innerHTML = Math.round((tip_value + Number.EPSILON) * 100) /100;
        total.innerHTML= Math.round((total_value + Number.EPSILON) * 100) /100;
    }
}
