//################ DROPDOWN FUNCTION ##############
//event listener on document - uses fetch/then could use async/fetch if better?
const userDropDown = document.getElementById("userDropdown");
userDropDown.value = 1;
let selectedUserId = userDropDown.value;
userDropDown.addEventListener("change", function () {
  selectedUserId = userDropDown.value;
  console.log("Selected User ID:", selectedUserId);
  getImgURL();
});

document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:3333/users") //for testing - will need changing
    .then((response) => response.json())
    .then((data) => populateUserList(data))
    .catch((error) => console.error("Error fetching dropdown options:", error));
});

document.addEventListener("DOMContentLoaded", function () {
  selectedUserId = userDropDown.value;
  console.log("Initially Selected User ID:", selectedUserId);
});
//above function feeds the 'data' field (an array of usernames) into the below function. The function then creates the options for the dropdown menu, with the value = users ID. This can be referenced later.

function populateUserList(entry) {
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

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const userQuery = event.target.query.value;
  console.log(userQuery);
  //make API call with the user's query
  getImages(userQuery);
});

// make API call to unsplash to get images
async function getImages(query) {
  //make a fetch call to unsplash
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&client_id=mGrCIgBZNFz0VK6M5r0Ku0ZuqH07Q3OfjhdbYqQWXwo`
  );
  //turn response into JSON
  const json = await response.json();
  //call renderImages to show them on page
  renderImages(json.results);
}
//use response from Unsplash to change images on the page
async function renderImages(data) {
  document.getElementById("mainFeed").innerHTML = "";
  //loop through results and render an image for each item
  data.forEach(function (unsplashImages) {
    const div = document.createElement("div"); //div to contain extra elements (ASH)
    div.className = "img-container";
    // create a new image tag, set src and alt,
    const img = document.createElement("img");
    const likeBtn = document.createElement("img");
    //likeBtn to append (ASH)
    likeBtn.src = "./images/heart.png";
    likeBtn.alt = "like button";
    likeBtn.className = "like-button";
    img.src = unsplashImages.urls.regular; //these are properties of the object returned by unsplashImages
    img.alt = unsplashImages.alt_description;
    //######### Like Button function #########
    likeBtn.addEventListener("click", async function (event) {
      event.stopImmediatePropagation();
      console.log(unsplashImages.urls.regular);
      const newEntry = {
        id: selectedUserId,
        imagePath: unsplashImages.urls.regular,
      };
      console.log(selectedUserId.value);
      const res = await fetch("http://localhost:3333/liked", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newEntry),
      });
    });
    div.appendChild(img);
    div.appendChild(likeBtn);
    //append image to page
    document.getElementById("mainFeed").appendChild(div);
  });
}
// getImages("new year"); //default//

//########## USER AREA #############
const thumBar = document.getElementById("thumbnails");

//fetch URL's from Database for selected user
async function getImgURL() {
  const CurrentUserId = { id: selectedUserId };
  const response = await fetch("http://localhost:3333/userImages", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(CurrentUserId),
  });
  if (!response.ok) {
    console.error("Error fetching user images:", response.status);
    return;
  }

  const imgArr = await response.json();
  console.log("image array", imgArr);
}
getImgURL();
