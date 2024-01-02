
//################ DROPDOWN FUNCTION ##############
//event listener on document - uses fetch/then could use async/fetch if better?

document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:3333/users") //for testing - will need changing
    .then((response) => response.json())
    .then((data) => populateUserList(data))
    .catch((error) => console.error("Error fetching dropdown options:", error));
});
//above function feeds the 'data' field (an array of usernames) into the below function. The function then creates the options for the dropdown menu, with the value = users ID. This can be referenced later.
function populateUserList(entry) {
  const userDropDown = document.getElementById("userDropdown");
  console.log(userDropDown);
  //   userDropDown.innerHTML = "";
  entry.forEach(function (entry) {
    const optionElement = document.createElement("Option");
    optionElement.value = entry.id;
    optionElement.text = entry.username;
    userDropDown.appendChild(optionElement);
  });
}
//############### END of dropdown functions ###########

// ############# Add user function ###########
const userForm = document.getElementById("addUser");

userForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  const formData = new FormData(userForm);
  const formVal = Object.fromEntries(formData);
  console.log(formVal);
  const res = await fetch("http://localhost:3333/users", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(formVal),
  });
});

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

