const auth_token = JSON.parse(localStorage.getItem("authentication"));

$("#log-out").click(function(){
  localStorage.clear()
  window.location.href = "http://127.0.0.1:5500/authentication/auth.html"
}) 
if(auth_token){
  const fetchData = function(){
    return fetch("http://127.0.0.1:3000/items", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json', // Corrected to lowercase 'application/json'
        Authorization: `Bearer ${auth_token}` // Use backticks (`) for string interpolation
      }
    }).then(response => {
        if(response.status === 200){
          return response.json()
        }
      })
      .catch(error => {
        return error
      });
  }
  fetchData().then(data => {
    const reverseData = data.slice().reverse()
    const filteredData = reverseData.slice(0,40);
    const sidePosts = filteredData.sort((a,b) => {
      return moment(b.created_at) - moment(a.created_at)
    })
    let mainPost = 8;
    let currentPage = 1;
    let startIndex = (currentPage - 1) * mainPost
    let endIndex = startIndex + mainPost
    let totalPages = Math.ceil(filteredData.length/mainPost)
    function showSidePosts(){
      for(let i=0;i<4;i++){
        let side_post = sidePosts[i]
        const htmlSnippet = `
            <a href="post_list.html?id=${side_post.id}" class="post" style="text-decoration:none">
                <div class="image-container">
                    <img src="${side_post.image_url}" alt="image not found">
                </div>
                <div class="heading">
                    <div><b>${side_post.title}</b></div>
                    <div class="text-muted" style="font-size: 13px;">${moment(side_post.created_at).startOf('hour').fromNow()}</div>
                </div>
                <div class="post-body">${side_post.content}</div>
            </a>
            `
          $(".side-posts").append(htmlSnippet)
      }
    }
    function showMainPosts(startIndex,endIndex){
      for(startIndex; startIndex<endIndex; startIndex++){
        if(filteredData.length>startIndex){
          post = filteredData[startIndex]
          const htmlSnippet = `
            <a href="post_list.html?id=${post.id}" class="post" style="text-decoration:none">
                <div class="image-container">
                    <img src="${post.image_url}" alt="image not found">
                </div>
                <div class="heading">
                    <div><b>${post.title}</b></div>
                    <div class="text-muted" style="font-size: 13px;">${moment(post.created_at).startOf('hour').fromNow()}</div>
                </div>
                <div class="post-body">${post.content}</div>
            </a>
            `
          $(".main-posts").prepend(htmlSnippet)
        }
      }
      if($(".next:hidden")){
        $(".next").slideDown(500)
      }
      if($(".prev:hidden")){
        $(".prev").slideDown(500)
      }
    }
  
    showMainPosts(startIndex,endIndex);
    showSidePosts();

    $(".next").click(()=>{
      if(currentPage<4){
        $(".main-posts>.post").fadeOut(500)
        $(".next").slideUp(500)
        currentPage ++;
        startIndex = (currentPage - 1) * mainPost
        endIndex = startIndex + mainPost
        console.log(currentPage)
        setTimeout(function(){
          showMainPosts(startIndex,endIndex)
        },500)
      }else{
        alert("There are no more posts!")
      }
    })
    $(".prev").click(()=>{
      if(currentPage >1){
        $(".main-posts>.post").fadeOut(500)
        $(".prev").slideUp(500)
        currentPage --;
        startIndex = (currentPage - 1) * mainPost
        endIndex = startIndex + mainPost
        setTimeout(function(){
          showMainPosts(startIndex,endIndex)
        },500)
      }else{
        alert("There are no more posts!")
      }
    })
  })
}else{
  $(".post-grid-container").css("display","none")
}

