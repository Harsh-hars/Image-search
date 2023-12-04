const access_key = 'y8SrslB71Ap1Tak3cfjyS7ExxFyRYkJeWMlH9sDY6jA';
// unsplash api key

const form = document.querySelector("form");
const input = document.getElementById("search-input");
const container = document.getElementById("container");
const showmore = document.getElementById("more-btn");

let input_data = "";
let page = 1;

console.log("script is running")

async function searchimage() {
    input_data = input.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${input_data}&client_id=${access_key}`

    const responce = await fetch(url);
    const data = await responce.json();
    console.log(data);
    const result = data.results;

    if (page === 1) {
        container.innerHTML = "";
    }

    result.map((res) => {
        const imgwrapper = document.createElement("div");
        imgwrapper.classList.add("search-result");
        const img = document.createElement("img");
        img.src = res.urls.small;
        img.alt = res.alt_description;
        const imagelink = document.createElement("a");
        imagelink.href = res.links.html;
        imagelink.target = "_blank";
        imagelink.textContent = res.alt_description;

        imgwrapper.appendChild(img);
        imgwrapper.appendChild(imagelink);
        container.appendChild(imgwrapper);
    });
    page++;
    if (page > 1) {
        showmore.style.display = "block";
    }

}
form.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchimage();
})

showmore.addEventListener("click", () => {
    searchimage();
})