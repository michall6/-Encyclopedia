import { initCountry ,router ,hideLoading} from "./routerer.js";



export const init = () => {
    initApp();
    router(initApp,initCountry);
}
const initApp = async (search = "all")  => {
    showLoading();
    let url =  `https://restcountries.com/v3.1/${search}`
    let resp = await fetch(url);
    let data = await resp.json();
    console.log(data.status);
    if(data.status != 404){
        initSelects(data);
        initCountry(data);
    }
    else{
        hideLoading();
        document.querySelector("#id_row").innerHTML = " "
        document.querySelector("#id_message").classList.remove("d-none");
       
    }
}

const showLoading = () => {
    document.querySelector("#id_loading").style.display = "block";
    document.querySelector("#id_row").style.display = "none";
}

export const initSelects=(allCountries_ar)=>{
    let select = document.querySelector("#id_select")

    allCountries_ar.forEach(item =>{
      select.innerHTML +=`
      <option value="${item.cca3}">${item.name.common}</option>`;
    })
  }



init()