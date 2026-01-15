const container=document.getElementById("article-container");

const storedData=sessionStorage.getItem("selectedArticle");

if(!storedData){
    container.innerHTML="<p>No Article Found</p>"
}else{
    const article=JSON.parse(storedData);

    container.innerHTML=`
    <div class="image-wrapper">
    <img class="placeholder-image" src="${article.image || 'assets/placeholder.jpg'}" alt="article image"></div>
    <h1 class="article-title">${article.title}</h1>
    <p class="article-description">${article.description || ""}</p>
    <p>${article.content || ""}</p>
    `
}

