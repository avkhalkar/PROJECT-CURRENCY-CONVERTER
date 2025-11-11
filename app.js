// Note:

// countryList comes from codes.js; script is included in index.html
// can be used directly here
// API key comes from config.js 

// Variables

const dropdowns = document.querySelectorAll(".dropdown");
const btn = document.querySelector("#submit");
const exchange_result_msg = document.querySelector("submit-msg");
const freecurrencyapi =  new Freecurrencyapi(API_KEY);
const msg = document.querySelector("#result-msg");

// Event for updating flags

const updateFlag = async (element)=>{
    const flag_code = countryList[element.value];
    console.log(flag_code);
    const category = element.id;
    console.log(category);
    if(category=="from-dropdown"){
        const image_ref = document.querySelector("#from-image");
        image_ref.src = `https://flagsapi.com/${flag_code}/flat/64.png`;
    }
    else{
        const image_ref = document.querySelector("#to-image");
        image_ref.src = `https://flagsapi.com/${flag_code}/flat/64.png`;
    }
};

// Adding options in dropdown

for(dropdown of dropdowns){
    for(curr_code in countryList){
        // First create option
        let newOption = document.createElement("option");
        newOption.value= curr_code;
        newOption.innerText = curr_code;
        newOption.className = dropdown.id;
        dropdown.append(newOption);
        // console.log(newOption);
        if(dropdown.id=="from-dropdown" && newOption.value==="USD"){
            newOption.selected=true;
        }
        else if(dropdown.id=="to-dropdown" && newOption.value==="INR"){
            newOption.selected=true;
        }
    }
    // Adding event Listeners for updating map
    dropdown.addEventListener("change", async (evt)=>{
        console.log(`You changed to ${evt.target}`); // evt.target here is the select tag with value as the currency selected
        // or instead the option selected
        updateFlag(evt.target, updateFlag);
    });
}

// Exchange rate function
async function get_exchange_rate(base, derived){

    const response = await freecurrencyapi.latest({
        base_currency:base,
        currencies:derived
    });

    return response; // Returns the response object
}
let response;

// Adding Event Listener for showing Exchange ratio

btn.addEventListener("click", async (evt)=>{
    // Stop reloading the page
    evt.preventDefault();
    
    input_amount = document.querySelector("#amount-number").value;
    let from = document.querySelector("#from-dropdown").value;
    let to = document.querySelector("#to-dropdown").value;
    
    console.log(`Input_amount:${input_amount}, from:${from}, to:${to}`);
    
    
    try{
        response = await get_exchange_rate(from, to); // Directly returns exchange rate in receiver currency
        let from_exchange_rate = 1;
        let to_exchange_rate = response.data[to];
        let rate = to_exchange_rate;

        console.log(`Exchange rate from: ${from_exchange_rate}, ${to_exchange_rate}`);

        let exchange_amount = rate*input_amount;

        msg.innerText = `${input_amount} ${from} = ${Number(exchange_amount).toFixed(2)} ${to}`; // Returning 2 decimal fixed result
        msg.style.color="green";
        console.log(exchange_amount);
    }
    catch(err){
        console.log(`Error! Could not fetch data of exchange from ${from} to ${to}`);
        msg.innerText = `Failed to fetch exchange rate please try again`;
        msg.style.color="red";
    }    
});