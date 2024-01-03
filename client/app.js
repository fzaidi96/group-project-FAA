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
    .then((data) => popUserList(data))
    .catch((error) => console.error("Error fetching dropdown options:", error));
});

document.addEventListener("DOMContentLoaded", function () {
  popUserList();
  selectedUserId = userDropDown.value;
  console.log("Initially Selected User ID:", selectedUserId);
});
//above function feeds the 'data' field (an array of usernames) into the below function. The function then creates the options for the dropdown menu, with the value = users ID. This can be referenced later.

async function popUserList() {
  const response = await fetch("http://localhost:3333/users");
  const user = await response.json();
  const userDropDown = document.getElementById("userDropdown");

  // Clear previous options
  userDropDown.innerHTML = "";

  // For each user in the database, create an option in the dropdown
  user.forEach(function (user) {
    const optionElement = document.createElement("option");

    // Populate the options with the matching username from the database
    optionElement.textContent = user.username;
    optionElement.value = user.id;

    // Append them to the dropdown
    userDropDown.appendChild(optionElement);
  });

  // Trigger the 'change' event on the dropdown after options are appended
  userDropDown.dispatchEvent(new Event("change"));
}

// ############# Add user function and automatically populate user list###########
const userForm = document.getElementById("addUser");
userForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  const formData = new FormData(userForm);
  const formVal = Object.fromEntries(formData);
  const response = await fetch("http://localhost:3333/users", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(formVal),
  });
  const json = await response.json();
  const userDropDown = document.getElementById("userDropdown");
  userDropDown.innerHTML = "";

  popUserList();
});

//when user clicks submit, the function calls the getImages() function with the search term (passed through function as userQuery). Then getImages makes an fetch call
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
  //fetch data from unsplash
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&client_id=mGrCIgBZNFz0VK6M5r0Ku0ZuqH07Q3OfjhdbYqQWXwo`
  );
  //turn response into JSON
  const json = await response.json();
  //call renderImages to show them on page
  renderImages(json.results);
}

//use jsonified Unsplash data to display the images the user searched for on the page, with a like button
async function renderImages(data) {
  //this removes what is already there

  document.getElementById("mainFeed").innerHTML = "";

  //this loops through the data and renders an image for each item in the returned data and assigns src, alt
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

getImages("new year"); //default//

//########## USER AREA #############
const thumBar = document.getElementById("thumbnails");
const mainImg = document.getElementById("mainImage");
//fetch and display image URL's from Database for selected user

async function getImgURL() {
  //get userID from userDropdownValue
  const CurrentUserId = { id: selectedUserId };
  //post request (userID) to /userImages
  const response = await fetch("http://localhost:3333/userImages", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(CurrentUserId),
  });
  //minor error handling
  if (!response.ok) {
    console.error("Error fetching user images:", response.status);
    return;
  }
  //reteive an array containing imageID and imageURL
  const imgArr = await response.json();
  console.log("image array", imgArr);
  //select the thumbnail container (can be out of function)
  const thumbContainer = document.getElementById("thumbnails");
  //clear previous images
  thumBar.innerHTML = "";
  //for each element within the array -> create a new div containing an image and a unlike button
  imgArr.forEach((element) => {
    //create elements
    const thumbImg = document.createElement("img");
    const thumbDiv = document.createElement("div");
    const delBtn = document.createElement("button");
    //element settings
    delBtn.textContent = "unlike";
    delBtn.className = "del-btn";
    thumbImg.src = element.image_path;
    thumbImg.alt = element.image_path;
    thumbImg.className = "thumbnail-img";
    //assemble elements & append to thumbnail area
    thumbDiv.appendChild(thumbImg);
    thumbDiv.appendChild(delBtn);
    thumbContainer.appendChild(thumbDiv);

    //######### UNLIKE function ################
    //functionnally a delete button
    delBtn.addEventListener("click", async function (event) {
      //prevent activating elements beneath button
      event.stopImmediatePropagation();
      //obtain imageID entry from the inital array
      const delEntry = { id: element.id };
      //send ID to /unlike which will remove the entry
      const res = await fetch("http://localhost:3333/unlike", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(delEntry),
      });
      console.log("delete", delEntry);
      //remove the element dynamically from page
      thumbDiv.remove();
    });
    //######### end of unlike function
    //############# THUMBNAIL function ###########
    //click the thumbnail, make the image show on the main section of the screen
    thumbImg.addEventListener("click", function () {
      mainImg.style.backgroundImage = `url("${element.image_path}")`;
      console.log(mainImg.style.backgroundImage);
    });
  });
}

getImgURL();
