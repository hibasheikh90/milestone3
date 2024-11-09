// Initialize data object
var resumeData = {
    name: "",
    contact: 0,
    cnic: 0,
    address: "",
    email: "",
    facebook: "",
    linkedin: "",
    academicQualifications: [],
    workExperiences: [],
    skills: [],
    imageUrl: null,
};
//  form input and generate resume
function generateResume() {
    //  data from form fields
    resumeData.name = document.getElementById("nameField").value;
    resumeData.contact = Number(document.getElementById("contactField").value);
    resumeData.cnic = Number(document.getElementById("cnicField").value);
    resumeData.address = document.getElementById("addressField").value;
    resumeData.email = document.getElementById("emailField").value;
    resumeData.facebook = document.getElementById("fbField").value;
    resumeData.linkedin = document.getElementById("linkedField").value;
    //  Academic Qualifications
    resumeData.academicQualifications = Array.from(document.getElementsByClassName("eqField")).map(function (el) { return el.value; });
    //  Work Experiences
    resumeData.workExperiences = Array.from(document.getElementsByClassName("weField")).map(function (el) { return el.value; });
    // Skills
    resumeData.skills = Array.from(document.getElementsByClassName("ssFied")).map(function (el) { return el.value; });
    //  set the image
    var imgField = document.getElementById("imgField");
    if (imgField.files && imgField.files[0]) {
        var file = imgField.files[0];
        var reader_1 = new FileReader();
        reader_1.onload = function () {
            resumeData.imageUrl =
                typeof reader_1.result === "string" ? reader_1.result : null;
            populateResumeTemplate();
        };
        reader_1.readAsDataURL(file);
    }
    else {
        populateResumeTemplate(); // Call directly if no image is uploaded
    }
}
//  resume template with data
function populateResumeTemplate() {
    document.getElementById("nameT1").innerText =
        resumeData.name;
    document.getElementById("nameT2").innerText =
        resumeData.name;
    document.getElementById("contactT").innerText =
        String(resumeData.contact);
    document.getElementById("cnicT").innerText =
        String(resumeData.cnic);
    document.getElementById("addressT").innerText =
        resumeData.address;
    document.getElementById("emailT").innerText =
        resumeData.email;
    document.getElementById("fbT").innerText =
        resumeData.facebook;
    document.getElementById("linkedT").innerText =
        resumeData.linkedin;
    //  academic qualifications
    var aqT = document.getElementById("aqT");
    aqT.innerHTML = resumeData.academicQualifications
        .map(function (item) { return "<li>".concat(item, "</li>"); })
        .join("");
    //  work experiences
    var weT = document.getElementById("weT");
    weT.innerHTML = resumeData.workExperiences
        .map(function (item) { return "<li>".concat(item, "</li>"); })
        .join("");
    //  skills
    var skillsT = document.getElementById("skillsT");
    skillsT.innerHTML = resumeData.skills
        .map(function (item) { return "<li>".concat(item, "</li>"); })
        .join("");
    // Set image if available
    if (resumeData.imageUrl) {
        document.getElementById("imgTemplate").src =
            resumeData.imageUrl;
    }
    // Show resume template and hide form
    document.getElementById("cv-form").style.display = "none";
    document.getElementById("cv-template").style.display = "block";
}
// Toggle between view and edit mode
function editCV() {
    // Show form and hide resume template
    document.getElementById("cv-form").style.display = "block";
    document.getElementById("cv-template").style.display = "none";
    // Populate form with existing resume data for editing
    document.getElementById("nameField").value =
        resumeData.name;
    document.getElementById("contactField").value =
        String(resumeData.contact);
    document.getElementById("cnicField").value =
        String(resumeData.cnic);
    document.getElementById("addressField").value =
        resumeData.address;
    document.getElementById("emailField").value =
        resumeData.email;
    document.getElementById("fbField").value =
        resumeData.facebook;
    document.getElementById("linkedField").value =
        resumeData.linkedin;
}
// Function to print or download the resume
function printCV() {
    window.print();
}
// Add new field for academic qualification
function addNewAqField() {
    var aqContainer = document.getElementById("aq");
    var newField = document.createElement("textarea");
    newField.className = "form-control eqField mt-2";
    newField.placeholder = "Enter Here";
    aqContainer.insertBefore(newField, document.getElementById("aqAddButton"));
}
// Add new field for work experience
function addNewWeField() {
    var weContainer = document.getElementById("we");
    var newField = document.createElement("textarea");
    newField.className = "form-control weField mt-2";
    newField.placeholder = "Enter Here";
    weContainer.insertBefore(newField, document.getElementById("weAddButton"));
}
// Add new field for skills
function addNewSsField() {
    var ssContainer = document.getElementById("skills");
    var newField = document.createElement("textarea");
    newField.className = "form-control ssFied mt-2";
    newField.placeholder = "Enter Here";
    ssContainer.insertBefore(newField, document.getElementById("ssAddButton"));
}
