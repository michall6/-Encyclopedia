
import Country from "./CountryTitle.js";
import { fetchCountry } from "./Country.js";
let startPage_ar = ["israel","united states","france","thailand"];
let _ar = []

export const initCountry = (counties_ar = _ar) =>{
    document.querySelector("#return").classList.add("d-none");
    document.querySelector("#inputs").classList.remove("d-none");
    document.querySelector("#id_message").classList.add("d-none");
    document.querySelector("#id_row").innerHTML = " ";
    hideLoading();   
    _ar = counties_ar;
    startPage_ar = counties_ar.filter(item => startPage_ar.includes(item.name.common.toLowerCase()))
    if(startPage_ar.length > 0){
        _ar = startPage_ar; 
        startPage_ar.forEach(item=> {
            let card = new Country("#id_row",item,fetchCountry, shortCountryName);
            card.render();
            startPage_ar = [];
        });
    }
    else{
        counties_ar.forEach(item=> {
        let card = new Country("#id_row",item,fetchCountry, shortCountryName);
        card.render(); 
    });
    }
        
   
}

export const router = (initApp) => {
    let search = document.querySelector("#id_search");
    let searchBtn = document.querySelector("#searchBtn");
    let selectList = document.querySelector("#id_select");
    let messageBtn = document.querySelector("#closeBtn");

    searchBtn.addEventListener("click", () => {
          initApp(`name/${search.value}`);
        })
    search.addEventListener("keydown",(e) => {
            if(e.key == "Enter"){
                initApp(`name/${search.value}`);
            }
        })
    //message not found ! 
   

    messageBtn.addEventListener("click", () =>{
       
        initCountry(_ar);
    })
   
    selectList.addEventListener("change", () => { 
        let selectVal = document.querySelector("#id_select").value;
       fetchCountry(`alpha/${selectVal}`);
    })    
 
    document.querySelector("#israel").addEventListener("click", () =>{
        fetchCountry("alpha/376");
    })
    document.querySelector("#usa").addEventListener("click", () =>{
        fetchCountry("alpha/840");
    })
    document.querySelector("#thailand").addEventListener("click", () =>{
        fetchCountry("alpha/764");
    })
    document.querySelector("#france").addEventListener("click", () =>{
        fetchCountry("alpha/250");
    })
}
const shortCountryName = (_name = "israel") => {
    if(_name.length > 11 ){
        _name = _name.substring(0,11) + ".." ;
    }
    return _name;
}


 export const hideLoading = () => {
    document.querySelector("#id_loading").style.display = "none";
    document.querySelector("#id_row").style.display = "flex";
  }