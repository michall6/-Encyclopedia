
export default class Country{
    constructor(_perent , item,fetchCountry, shortCountryName){
        this.perent = _perent;
        this.name = item.name.common;
        this.fullName = item.name.official;
        this.flag = item.flags.png;
        this.pop =  `${(Math.floor((item.population / 1000000) * 100) / 100).toLocaleString()}M`
        this.realPop = item.population;
        this.code = item.ccn3;
        this.fetchCountry = fetchCountry
        this.shortCut = shortCountryName;
    }
    render(){
        if(this.realPop < 1000000){
            this.pop = `${(Math.floor((this.realPop / 10000) * 10)).toLocaleString()}K`
        }
        if(this.realPop < 100000){
            this.pop = `${(Math.floor((this.realPop / 100) * 100)).toLocaleString()}`
        }
        this.name = this.shortCut(this.name);
        let myDiv = document.createElement("div");
        myDiv.className = " col-12 col-md-6 col-lg-4 mt-3"
        myDiv.title = this.fullName;
        myDiv.innerHTML = `
        <div class="m-2 box col-11 rounded border-2 shadow text-dark  bg-info text-center ">
        <img src="${this.flag}" alt="${this.name}" title="${this.name}" class="my-2 mx-auto col-11" height="200" width="170" >
            <h2>${this.name}</h2>
           
            <h3 class=" badge p-3 col-12 text-black">  More Info</h3>
            </div>
        `
        document.querySelector(`${this.perent}`).append(myDiv);
        myDiv.addEventListener("click", () => {
            this.fetchCountry(`alpha/${this.code}`);
        })
    }    

}