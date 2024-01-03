
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

//user input to change the  unsplash query and change what is rendered on page 
const form = document.getElementById("searchForm");

form.addEventListener("submit", async function(event){
    event.preventDefault();
    const userQuery = event.target.query.value;
    console.log(userQuery);
    //make API call with the user's query
    getImages(userQuery);
});


// make API call to unsplash to get images
async function getImages(query) {
    //make a fetch call to unsplash
    const response = await fetch (`https://api.unsplash.com/search/photos?query=${query}&client_id=mGrCIgBZNFz0VK6M5r0Ku0ZuqH07Q3OfjhdbYqQWXwo`);
    //turn response into JSON
    const json = await response.json();
    //call renderImages to show them on page 
    renderImages(json.results);
};

function renderImages(data) {
    //remove old images 
    document.getElementById("mainFeed").innerHTML = "";
    //loop through results of getImages() and render an image for each item in the array 
    data.forEach(function(unsplashImages) {
        // create a new image tag, set src and alt,
        const img = document.createElement("img");

        img.src = unsplashImages.urls.regular; //these are properties of the object returned by unsplashImages
        img.alt= unsplashImages.alt_description;
        //append image to page
        document.getElementById("mainFeed").appendChild(img);
        });
    };

getImages("new year"); //default//



//summary notes: when user submits the form, the getImages function is called. The user's search query is the  parameter that is passed through getImages. getImages takes that query and makes a fetch call to API to get all the images related to that query e.g. cats. It gets that data, turns it into JSON and with that json data calls renderImages. renderImages takes that data (json data) and executes its function - i.e. renders the images on the page. 