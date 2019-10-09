//sujeto, verbo, predicado;
//selector, método, callback;
$(".nav-item div").on("click",(event)=>{
    $(".nav-item").removeClass("active");
    $(event.target).closest(".nav-item").addClass("active");
})

const GET_POSTS_COLLECTION = () => {
    $.ajax({
        method:"GET",
        url: 'https://blog-5g.firebaseio.com/raziel/posts/.json',
        success: (response) => {
            FILL_ENTRIES(response);
        }
    });
}

const FILL_ENTRIES = (postsData) => {
    $(".entries-wrapper").empty();
    console.log(postsData);
    $.each(postsData, (index,value) => {
        $(".entries-wrapper").append(`
            <div class="col-12 col-lg-6">
                <div id="entry-${index} class="card mb-3">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                        <img src="${value.imgUrl}" class="card-img" alt="...">
                        </div>
                        <div class="col-md-8">
                        <div class="card-body">
                            <h5 id="card-sample-title" class="card-title">${value.title}</h5>
                            <p class="card-text card-content">${value.content}</p>
                            <p class="card-text"><small class="text-muted card-date">${value.createDate}</small></p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        `)
    })  
}

const LOAD_VIEW = (contentUrl,callbackFn) => {
    $(".content-wrapper").load(contentUrl,callbackFn);
}

LOAD_VIEW('views/home.html',GET_POSTS_COLLECTION)

const SUBMIT_POST = (postObject) => {
    $.ajax({
        method:"POST",
        url: 'https://blog-5g.firebaseio.com/raziel/posts/.json',
        data: JSON.stringify(postObject),
        success: (response) => {
            console.log(response)
        }
    });
}

const GET_ENTRY_DATA = () => {
    let title = $("#title").val();
    let content = $("#content").val();
    let imgUrl = $("#imgUrl").val();
    let createDate = new Date();

    let postObject = {title, content, imgUrl, createDate}
    console.log(postObject);
    SUBMIT_POST(postObject)
}

const ADD_FORM_LISTENERS = () => {
    $("#submit-entry").on("click",GET_ENTRY_DATA);
}
