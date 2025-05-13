const btn = document.querySelector("#delete");

btn.addEventListener("click", function (e) {
  const confirmed = confirm("Are you sure you want to delete this chat?");
  if (!confirmed) {
    e.preventDefault(); 
  } else {
    console.log("Chat deleted"); 
  }
});
