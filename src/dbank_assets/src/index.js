import { dbank } from "../../declarations/dbank";

window.addEventListener("load", async function(){
    updateBalance();
});

document.querySelector("form").addEventListener("submit", async function(event){
    event.preventDefault();
    const button = event.target.querySelector("#submit-btn");
    button.setAttribute("disabled", true);

    let inputAmount = parseFloat(document.getElementById("input-amount").value);
    let withdrawalAmount = parseFloat(document.getElementById("withdrawal-amount").value);

    if(document.getElementById("input-amount").value.length != 0){
        await dbank.topUp(inputAmount);
    }
    
    if(document.getElementById("withdrawal-amount").value.length != 0){
        await dbank.withdraw(withdrawalAmount);
    }

    await dbank.compound();

    updateBalance();

    document.getElementById("input-amount").value = "";
    document.getElementById("withdrawal-amount").value = "";
    button.removeAttribute("disabled");
});

async function updateBalance(){
    const balance = await dbank.checkBalance();
    document.getElementById("value").innerText = Math.round(balance * 100)/100;
}