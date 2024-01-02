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