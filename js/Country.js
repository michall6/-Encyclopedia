import { init } from "./app.js";

export default class Country {
  constructor(perent, item) {
    this.perent = perent;
    this.name = item.name.official;
    this.cioc = item.cioc;
    this.img = item.flags.png;
    this.pop = `${(Math.floor((item.population / 1000000) * 100) / 100).toLocaleString()}M`;
    this.realPop = item.population;
    this.languages = Object.values(item.languages);
    this.capital = item.capital;
    this.borders =  item.borders || "none borders exist";
    this.location = item.latlng;
    this.coins = (Object.keys(item.currencies)) + "," + Object.values(Object.values(item.currencies)[0])[0];
     
  }
  render() {
    if(this.realPop < 1000000){
      this.pop = `${(Math.floor((this.realPop / 10000) * 10)).toLocaleString()}K`
  }
  if(this.realPop < 100000){
      this.pop = `${(Math.floor((this.realPop / 100) * 100)).toLocaleString()} pepople`
  }

    let myDiv = document.createElement("div");
    myDiv.className = "container mt-4 text-white"
    myDiv.innerHTML = `
        <div class="row">
        <iframe src="https://maps.google.com/maps?q=${this.location[0]},${this.location[1]}&z=7&output=embed"  style="border:1;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" class="rounded h-250 w-100 float-end m-2"></iframe>
        
         <img src="${this.img}" alt="${this.cioc}" class="col-12 col-lg-6 my-auto" height="280">
          <div class="col-12 col-lg-5 pt-1 ps-3 text-center text-lg-start" >
            <table class="table table-striped table-info col-10 rounded">
             <tbody>
             <tr>
               <th scope="row">Country: </th>
               <td> ${this.name}</td>
             </tr>
             <tr>
               <th scope="row">population: </th>
               <td> ${this.pop}</td>
             </tr>
           
             <tr>
               <th scope="row">Languages: </th>
               <td> ${this.languages}</td>
             </tr>  
             <tr>
             <th scope="row">Coins: </th>
             <td> ${this.coins}</td>
           </tr>  
           <tr>
           <th scope="row">Capital:   </th>
           <td>${this.capital} </td>
         </tr>   
         <tr>
         <th scope="row">Border: </th>
         <td> <div class="">
         <p id="border" class="text-center"></p>
         </div></td>
       </tr>
            </tbody>
           </table>
          </div>
        </div>
    <div class="pt-5 justify-content-between container-fluid">
     
    </div>    
        `
    document.querySelector(this.perent).append(myDiv);

    document.querySelector("#return").addEventListener("click", () => {
      document.querySelector("#id_row").innerHTML = "";
      init();
    })
    let p = document.createElement("p");
    p.className = "text-info ms-3 text-center"
    document.querySelector("#border").append(p);
    if(this.borders != "none borders exist"){
    this.borders.forEach(item => {
        p.innerHTML += `<span class="p-2" id="${item}">${item}</span>`
        document.querySelector("#border").append(p)
        p.style = " cursor: pointer; text-decoration: underline;"
      });

    let borders_ar = this.borders;
    borders_ar.forEach(item => {
      document.querySelector(`#${item}`).addEventListener("click", ()=>{
         fetchCountry(`alpha/${item}`);
      })
    })
  }
  else{
    p.innerHTML = `${this.borders}`;

  }  
  } 
}

 
export  const fetchCountry =  async (id) => {
  document.querySelector("#id_row").innerHTML = " ";
  console.log(id);
  
  let url = `https://restcountries.com/v3.1/${id}`
  let resp = await fetch(url);
  let data = await resp.json();
  console.log(data);
  document.querySelector("#inputs").classList.add("d-none");
  hideLoading();
  let country = new Country("#id_row",data[0],fetchCountry);
  country.render();
}

const hideLoading = () => {
  document.querySelector("#id_loading").style.display = "none";
  document.querySelector("#id_row").style.display = "flex";
}


fetchCountry();