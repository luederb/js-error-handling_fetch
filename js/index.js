console.clear();

const userElement = document.querySelector(".user");
const errorMessage = document.querySelector(".error");
async function loadUser(url) {
  console.log(url);
  const response = await fetch(url);
  try {
    if (!response.ok) {
      console.log("Network error - couldn't load user ");
      userElement.innerHTML = "";
      errorMessage.textContent = "Network error";
      return null; //ist sowieso der default
    }
    const json = await response.json();
    const user = json.data;
    console.log("Response: ", json);
    console.log("User Data: ", user);
    if (!user) {
      console.log("user nicht gefunden");
      return null;
    }
    userElement.innerHTML = `
  <h2>${user.first_name} ${user.last_name}</h2>
  <img alt="${user.first_name} ${user.last_name}" src="${user.avatar}"/>
  `;
  } catch (error) {
    userElement.innerHTML = "";
    errorMessage.textContent = "Error parsing JSON";
  }
}
document.querySelectorAll("button[data-url]").forEach((button) =>
  button.addEventListener("click", (event) => {
    loadUser(event.target.dataset.url);
    console.log("event: ", event);
  })
);
