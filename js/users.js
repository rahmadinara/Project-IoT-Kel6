const userForm =
document.getElementById("userForm");

const userList =
document.getElementById("userList");

userForm.addEventListener("submit",(e)=>{

  e.preventDefault();

  const username =
  document.getElementById("newUser").value;

  const li =
  document.createElement("li");

  li.innerText = username;

  userList.appendChild(li);

});