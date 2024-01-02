// make API call to unsplash to get images

async function getImages(query) {
    //make a fetch call to unsplash
    const response = await fetch (`https://api.unsplash.com/search/photos?query=new%20year&client_id=mGrCIgBZNFz0VK6M5r0Ku0ZuqH07Q3OfjhdbYqQWXwo`);
    //turn response into JSON
    const json = await response.json();
    //return images
    return json.results;
}

getImages();


//use response from Unsplash to change images on the page
async function renderImages() {
    const data = await getImages();
    //loop through results and render an image for each item 
    data.forEach(function(imageObj) {
        // create a new image tag, set src and alt,
        const img = document.createElement("img");

        img.src = imageObj.urls.regular;
        img.alt= imageObj.alt_description;
        //append image to page
        document.getElementById("mainFeed").appendChild(img);
        });
    };


//user input to change the  unsplash query and change what is rendered on page 
const form = document.getElementById("searchForm");

form.addEventListener("submit", function(event){
    event.preventDefault();
    const userQuery = event.target.query.value;

    //make API call with new query

    
});

renderImages();
