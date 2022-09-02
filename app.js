// all category show
function category() {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => displayCategory(data.data));
}

// show all category to ui
const displayCategory = (data) => {
  const ul = document.getElementById("category");
  data.news_category.map((data) => {
    const li = document.createElement("li");
    li.classList.add("nav-item");
    const a = document.createElement("a");
    a.classList.add("nav-link");
    a.classList.add("category-btn");
    a.onclick = function () {
      showData(data.category_id);
    };
    a.innerText = data.category_name;
    li.appendChild(a);
    ul.appendChild(li);
  });
};
// show all news by category
function showData(data) {
  const url = ` https://openapi.programming-hero.com/api/news/category/${data}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showNews(data.data));
}

// show all news
const showNews = (data) => {
  const showlength = document.getElementById("showNewslength");
  showlength.innerText = data.length;
  const showNews = document.getElementById("showNews");
  showNews.innerHTML = "";
  data.map((news) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
        <div id="card" onClick=modal('${news._id}') class="card mb-3" style="max-width: 100%;" data-bs-toggle="modal" data-bs-target="#exampleModal">
         <div class="row g-0 p-2">
          <div class="col-md-4">
            <img src="${news.image_url}" class="img-fluid rounded-start" alt="...">
          </div>
       <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${news.title}</h5>
          <p class="card-text">${news.details.slice(0,200)} ....</p>
          <div class="row row-cols-3 row-cols-lg-3 row-cols-md-3 g-4 ">
            <div class="col">
                <div class="d-flex align-items-center justify-content-around">
                <img src="${news.author.img}" class="img-fluid rounded-circle w-25" alt="author name">
                <div class="ms-2">
                <p class="m-0">${news.author.name ? news.author.name : "not found"}</p>
                <p class="m-0 text-secondary">${news.author.published_date ? news.author.published_date : "not found"}</p>
                </div>
                </div>
            </div>
            <div class="col text-end">
             <p class="mt-3 fw-bold"><img src="./img/carbon_view.png"> ${news.total_view ? news.total_view : "not found"} M</p>
            </div>
            <div class="col text-end mt-3">
             <p class="mt-3"><img class="img-fluid" src="./img/bi_arrow-right-short.png"></p>
            </div>
        </div>
        </div>
        
        </div>
       
       </div>
     </div>
    </div>
        `;
    showNews.appendChild(div);
  });
};
// modal function 
function modal(data){
    const url =`https://openapi.programming-hero.com/api/news/${data}`
    fetch(url)
    .then(res => res.json())
    .then(data => showModal(data.data[0]))
}
// show modal data 
const showModal = data => {
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("exampleModalLabel");
    console.log(data)
    modalTitle.innerText=data.title
    modal.innerHTML = `
        <p>badge: ${data.rating.badge}</p>
    `
}
showData("02")
category();
