const API_KEY="api_key";

const newsContainer=document.getElementById('news-container');
const navLinks=document.querySelectorAll(".nav a");

fetchNews("latest");

navLinks.forEach(link=>{
    link.addEventListener("click",(e)=>{
        e.preventDefault();
        const category=link.dataset.category;
        fetchNews(category);
    })
})

async function fetchNews(keyword){
    const url = `https://newsdata.io/api/1/news?apikey=${API_KEY}&q=${keyword}&language=en`;
    try{
        const response=await fetch(url);
        const data=await response.json();
        console.log(data);
        renderNews(data.results);

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
        
        const image = article.image_url
      ? `<img src="${article.image_url}" alt="news image">`
      : "";

        artDiv.innerHTML=
        `${image}<h3>${article.title}</h3>
        <p>${cleanText(article.description) ||""}</p>
        <a href="${article.link}" target="_blank">Read more</a>`;
        newsContainer.appendChild(artDiv);
        });
}





