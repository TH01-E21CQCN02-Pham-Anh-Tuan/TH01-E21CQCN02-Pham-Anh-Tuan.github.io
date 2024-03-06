// Get information from the user

document.getElementById("infoSurvey").addEventListener("submit", function (e) {
    e.preventDefault();
  
    var formData = new FormData(e.target);
    // check dataL full_name, date, cccd,phone_number,address are valid
    if (
      formData.get("full_name") === "" ||
      formData.get("date") === "" ||
      formData.get("cccd") === "" ||
      formData.get("phone_number") === "" ||
      formData.get("address") === ""
    ) {
      alert("Please fill out all the fields");
      return;
    }
    localStorage.setItem("formData", JSON.stringify(Object.fromEntries(formData)));
    // redirect to the survey page
    window.location.href = "./pages/questions.html";
  });