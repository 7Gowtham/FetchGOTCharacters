const API_URL = "https://thronesapi.com/api/v2/Characters";
const itemsPerPage = 6;
let currentPage = 1;
let allData = [];

function gotCharacters(data) {
    let sec = document.getElementById("section")
    sec.innerHTML = "";

    data.forEach((e) => {
        let div = document.createElement("div");
        div.classList.add("card", "mb-3", "d-flex", "justify-content-center");
        div.innerHTML = `
            <div class="card-body">
                <div class="text-center mb-3">
                    <h3 class="card-title">${e.fullName}</h3>
                    <img src="${e.imageUrl}" class="img-fluid rounded" alt="${e.fullName}">
                <div class="info">
                    <div><strong>ID:</strong> ${e.id}</div>
                    <div><strong>First Name:</strong> ${e.firstName}</div>
                    <div><strong>Last Name:</strong> ${e.lastName}</div>
                    <div><strong>Full Name:</strong> ${e.fullName}</div>
                    <div><strong>Title:</strong> ${e.title}</div>
                    <div><strong>Family:</strong> ${e.family}</div>
                </div>
                </div>
            </div> 
        `
        sec.appendChild(div)
    });
}


async function fetchData() {
    try {
        let res = await fetch(API_URL);

        let data = await res.json();

        if (res.status === 200) {
            console.log(data)
            allData = data;
            displayPage(currentPage)
        } else {
            alert("Not able to fetch");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function displayPage(page){
    const start = (page - 1) * itemsPerPage
    const end = start + itemsPerPage
    const pageData = allData.slice(start, end)
    gotCharacters(pageData) 
}

function prevPage(){
    if(currentPage > 1){
        currentPage--;
        displayPage(currentPage)
    }
}

function nextPage(){
    if(currentPage < Math.ceil(allData.length / itemsPerPage)){
        currentPage++;
        displayPage(currentPage);
    }
}

fetchData();

document.getElementById("prevButton").addEventListener('click', prevPage)
document.getElementById("nextButton").addEventListener('click', nextPage)