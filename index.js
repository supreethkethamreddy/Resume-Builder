
var experinceCount = 1;
var academicExperince = 1;
const skillSet = new Set();
var fileName = "";

function addEducation() {
  console.log("addEducation() << " + academicExperince);
  let newNode = document.createElement("textarea");
  newNode.classList.add("form-control", "ed-field", "mt-1");
  newNode.setAttribute("rows", 3);
  newNode.setAttribute("id", "education-" + ++academicExperince);
  newNode.setAttribute(
    "placeholder",
    "Enter academic qualifiaction  " + academicExperince
  );
  let educationDiv = document.getElementById("education-div");
  let educationAddButtonDivs = document.getElementById("ed-btns-div");
  let ed_del_btn = document.getElementById("ed-del-btn");

  if (academicExperince > 1) {
    ed_del_btn.classList.remove("btn-outline-danger");
    ed_del_btn.classList.add("btn-danger");
    ed_del_btn.removeAttribute("disabled");
  }

  educationDiv.insertBefore(newNode, educationAddButtonDivs);
  console.log("addEducation() >> " + academicExperince);
}

function removeEducation() {
  console.log("removeEducation() << " + academicExperince);
  let latestEducation = document.getElementById(
    "education-" + academicExperince
  );
  let ed_del_btn = document.getElementById("ed-del-btn");

  if (academicExperince == 2) {
    ed_del_btn.classList.remove("btn-danger");
    ed_del_btn.classList.add("btn-outline-danger");
    ed_del_btn.setAttribute("disabled", true);
  }

  if (academicExperince > 1) {
    latestEducation.remove();
    --academicExperince;
  }
  console.log("removeEducation() >> " + academicExperince);
}

function addWorkExperience() {
  console.log("addWorkExperience() << " + experinceCount);
  let newNode = document.createElement("textarea");
  newNode.classList.add("form-control", "we-field", "mt-1");
  newNode.setAttribute("rows", 3);
  newNode.setAttribute("id", "experience-" + ++experinceCount);
  newNode.setAttribute(
    "placeholder",
    "Enter work experience " + experinceCount
  );
  let experieceDiv = document.getElementById("experience-div");
  let experienceAddButtonDivs = document.getElementById("we-btns-div");
  let we_del_btn = document.getElementById("we-del-btn");

  if (experinceCount >= 0) {
    we_del_btn.classList.remove("btn-outline-danger");
    we_del_btn.classList.add("btn-danger");
    we_del_btn.removeAttribute("disabled");
  }

  experieceDiv.insertBefore(newNode, experienceAddButtonDivs);
  console.log("addWorkExperience() >> " + experinceCount);
}

function removeWorkExperience() {
  console.log("removeWorkExperience() << " + experinceCount);
  let latestExperience = document.getElementById(
    "experience-" + experinceCount
  );
  let we_del_btn = document.getElementById("we-del-btn");

  if (experinceCount == 1) {
    we_del_btn.classList.remove("btn-danger");
    we_del_btn.classList.add("btn-outline-danger");
    we_del_btn.setAttribute("disabled", true);
  }

  if (experinceCount != 0) {
    latestExperience.remove();
    --experinceCount;
  }
  console.log("removeWorkExperience() >> " + experinceCount);
}

function generateResume() {
  console.log("generateResume() <<");
  let fullName = document.getElementById("full-name").value;
  let fullNameTemplate = document.getElementById("full-name-template");
  fullNameTemplate.innerHTML = fullName;
  fileName = fullName;

  let dob = document.getElementById("dob").value;
  let dobTemplate = document.getElementById("dob-template");
  dobTemplate.innerHTML = dob;

  let phone = document.getElementById("phone").value;
  let phoneTemplate = document.getElementById("phone-template");
  phoneTemplate.innerHTML = phone;

  let email = document.getElementById("email").value;
  let emailTemplate = document.getElementById("email-template");
  emailTemplate.innerHTML = email;

  let address = document.getElementById("address").value;
  let addressTemplate = document.getElementById("address-template");
  addressTemplate.innerHTML = address;

  let linkedin = document.getElementById("linkedin").value;
  let linkedinTemplate = document.getElementById("linkedin-template");
  linkedinTemplate.innerHTML = linkedin;

  let github = document.getElementById("github").value;
  let githubTemplate = document.getElementById("github-template");
  githubTemplate.innerHTML = github;

  let objective = document.getElementById("objective").value;
  let objectiveTemplate = document.getElementById("objective-template");
  objectiveTemplate.innerHTML = objective;
  let skillSetString = "";
  for (let skill of skillSet) {
    skillSetString += `<span class="badge rounded-pill bg-secondary skill-pill">${skill}</span>\n`;
  }
  document.getElementById("skill-template-div").innerHTML = skillSetString;

  let experiences = document.getElementsByClassName("we-field");
  let experiencesListString = "";
  for (let experience of experiences) {
    experiencesListString += `<li>${experience.value}</li>`;
  }
  document.getElementById("we-template").innerHTML = experiencesListString;

  let academicQualifications = document.getElementsByClassName("ed-field");
  let qualificationListString = "";
  for (let qualification of academicQualifications) {
    qualificationListString += `<li>${qualification.value}</li>`;
  }
  document.getElementById("ed-template").innerHTML = qualificationListString;

  let file = document.getElementById("profile-img").files[0];
  console.log(file);
  if (file === undefined) {
    console.log("No file selected");
  } else {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      document.getElementById("profile-img-template").src = reader.result;
    };
  }

  document.getElementById("resume-form").style.display = "none";
  document.getElementById("resume-template").style.display = "block";
  document.getElementById("save-btn").style.display = "block";

  console.log("generateResume() >>");
}

function printResume(areaID) {
  console.log("printResume() <<");
  var printContent = document.getElementById(areaID).innerHTML;
  var originalContent = document.body.innerHTML;
  document.body.innerHTML = printContent;
  window.print();
  document.body.innerHTML = originalContent;
  console.log("printResume() >>");
}

function generatePDFUsingHtml2pdfAndHtmlCanvas() {
  var element = document.getElementById("resume-template");
  element.style.width = "700px";
  element.style.height = "900px";
  var opt = {
    margin: 0.5,
    filename: fileName.toLowerCase() + new Date().toLocaleDateString() + ".pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 1 },
    jsPDF: {
      unit: "in",
      format: "letter",
      orientation: "portrait",
      precision: "12",
    },
  };
  html2pdf().set(opt).from(element).save();
}

function generatePDFUsingHtml2pdf() {
  const element = document.getElementById("resume-template");
  html2pdf().from(element).save();
}

function generatePDF() {
  window.jsPDF = window.jspdf.jsPDF;
  var doc = new jsPDF();
  const elementHTML = document.getElementById("resume-template");

  doc.html(elementHTML, {
    callback: function (doc) {
      doc.save(
        fileName.toLowerCase() + "_" + new Date().toLocaleDateString() + ".pdf"
      );
    },
    margin: [10, 10, 10, 10],
    autoPaging: "text",
    x: 0,
    y: 0,
    width: 190,
    windowWidth: 675, 
  });
}

function startOver() {
  console.log("startOver() <<");
  window.location.reload();
  console.log("startOver() >>");
}

function previewImage(event) {
  console.log("previewImage(event) <<");
  var imagePreview = document.getElementById("image-preview");
  if (event.target.files[0]) {
    imagePreview.src = URL.createObjectURL(event.target.files[0]);
    imagePreview.style.display = "block";
    imagePreview.onload = function () {
      URL.revokeObjectURL(imagePreview.src); // free memory
    };
  }
  console.log("previewImage(event) >>");
}

function previewImageUsingReader(event) {
  console.log("previewImageUsingReader(event) <<");
  var reader = new FileReader();
  reader.onload = function () {
    var imagePreview = document.getElementById("image-preview");
    imagePreview.src = reader.result;
    imagePreview.style.display = "block";
  };
  reader.readAsDataURL(event.target.files[0]);
  console.log("previewImageUsingReader(event) >>");
}

function addSkill() {
  if (document.querySelector("#skill-input-section input").value.length == 0) {
    alert("Please Enter a Skill");
  } else {
    var skillValue = document.querySelector("#skill-input-section input").value;
    if (skillSet.has(skillValue)) {
      alert("Skill already exists");
      return;
    }
    skillSet.add(skillValue);
    document.querySelector("#skills").innerHTML += `
          <div class="skill mt-1">
              <span id="skillname">
                  ${skillValue}
              </span>
              <button class="btn btn-outline-danger delete">
              <i class="fa-solid fa-trash-can"></i>
              </button>
          </div>
      `;

    var current_tasks = document.querySelectorAll(".delete");
    for (var i = 0; i < current_tasks.length; i++) {
      current_tasks[i].onclick = function () {
        skillSet.delete(this.parentNode.querySelector("#skillname").innerText); //remove skill from set
        this.parentNode.remove();
      };
    }
  }
  document.querySelector("#skill-input-section input").value = "";
  console.log(skillSet);
}
