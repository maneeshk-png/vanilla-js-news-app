const API_KEY="api_key";

const newsContainer=document.getElementById('news-container');
const navLinks=document.querySelectorAll(".nav a");

fetchNews("general");

navLinks.forEach(link=>{
    link.addEventListener("click",(e)=>{
        e.preventDefault();
        const category=link.dataset.category;
        fetchNews(category);
    })
})

async function fetchNews(keyword){
    const url = `https://gnews.io/api/v4/top-headlines?category=${keyword}&lang=en&country=us&max=10&apikey=${API_KEY}`;
    try{
        const response=await fetch(url);
        const data=await response.json();

        console.log(data);

        renderNews(data.articles);


    }catch(error){
        newsContainer.innerHTML="<p>Something went wrong</p>";
    }
}

function cleanText(text = "") {
    return text.replace(/\s+/g, " ").trim();
  }
  

function renderNews(articles){
    newsContainer.innerHTML="";

    articles.forEach(article => {
        
        const artDiv=document.createElement("div");
        artDiv.className="news-card";
        
        artDiv.innerHTML=
        `<img class="placeholder-image" src="${article.image || 'assets/placeholder.jpg'}" alt="article image" >
        <h3>${article.title}</h3>
        <p>${cleanText(article.description) ||""}</p>
        <button class="read-more">Read More</button>`;
        newsContainer.appendChild(artDiv);
        const readMoreBTn=artDiv.querySelector(".read-more");
        readMoreBTn.addEventListener("click",()=>{
            sessionStorage.setItem(
                "selectedArticle",
                JSON.stringify(article)
            )
            window.location.href="article.html";
        })
        });
}





