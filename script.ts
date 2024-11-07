// Define interface for resume data
interface ResumeData {
    name: string;
    contact: number;
    cnic:number;
    address: string;
    email: string;
    facebook: string;
    linkedin: string;
    academicQualifications: string[];
    workExperiences: string[];
    skills: string[];
    imageUrl: string | null; // To store the image URL
  }
  
  // Initialize data object
  const resumeData: ResumeData = {
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
  function generateResume(): void {
    //  data from form fields
    resumeData.name = (
      document.getElementById("nameField") as HTMLInputElement
    ).value;
    resumeData.contact = Number(
      (document.getElementById("contactField") as HTMLInputElement).value
    );
    resumeData.cnic = Number(
      (document.getElementById("cnicField") as HTMLInputElement).value
    );
    resumeData.address = (
      document.getElementById("addressField") as HTMLTextAreaElement
    ).value;
    resumeData.email = (
      document.getElementById("emailField") as HTMLInputElement
    ).value;
    resumeData.facebook = (
      document.getElementById("fbField") as HTMLInputElement
    ).value;
    resumeData.linkedin = (
      document.getElementById("linkedField") as HTMLInputElement
    ).value;
  
    //  Academic Qualifications
    resumeData.academicQualifications = Array.from(
      document.getElementsByClassName(
        "eqField"
      ) as HTMLCollectionOf<HTMLTextAreaElement>
    ).map((el) => el.value);
  
    //  Work Experiences
    resumeData.workExperiences = Array.from(
      document.getElementsByClassName(
        "weField"
      ) as HTMLCollectionOf<HTMLTextAreaElement>
    ).map((el) => el.value);
  
    // Skills
    resumeData.skills = Array.from(
      document.getElementsByClassName(
        "ssFied"
      ) as HTMLCollectionOf<HTMLTextAreaElement>
    ).map((el) => el.value);
  
    //  set the image
    const imgField = document.getElementById("imgField") as HTMLInputElement;
    if (imgField.files && imgField.files[0]) {
      const file = imgField.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        resumeData.imageUrl =
          typeof reader.result === "string" ? reader.result : null;
        populateResumeTemplate();
      };
      reader.readAsDataURL(file);
    } else {
      populateResumeTemplate(); // Call directly if no image is uploaded
    }
  }
  
  //  resume template with data
  function populateResumeTemplate(): void {
    (document.getElementById("nameT1") as HTMLElement).innerText =
      resumeData.name;
    (document.getElementById("nameT2") as HTMLElement).innerText =
      resumeData.name;
    (document.getElementById("contactT") as HTMLElement).innerText =
      String(resumeData.contact);
    (document.getElementById("cnicT") as HTMLElement).innerText =
      String(resumeData.cnic);    
    (document.getElementById("addressT") as HTMLElement).innerText =
      resumeData.address;
    (document.getElementById("emailT") as HTMLElement).innerText =
      resumeData.email;
    (document.getElementById("fbT") as HTMLElement).innerText =
      resumeData.facebook;
    (document.getElementById("linkedT") as HTMLElement).innerText =
      resumeData.linkedin;
  
    //  academic qualifications
    const aqT = document.getElementById("aqT") as HTMLElement;
    aqT.innerHTML = resumeData.academicQualifications
      .map((item) => `<li>${item}</li>`)
      .join("");
  
    //  work experiences
    const weT = document.getElementById("weT") as HTMLElement;
    weT.innerHTML = resumeData.workExperiences
      .map((item) => `<li>${item}</li>`)
      .join("");
  
    //  skills
    const skillsT = document.getElementById("skillsT") as HTMLElement;
    skillsT.innerHTML = resumeData.skills
      .map((item) => `<li>${item}</li>`)
      .join("");
  
    // Set image if available
    if (resumeData.imageUrl) {
      (document.getElementById("imgTemplate") as HTMLImageElement).src =
        resumeData.imageUrl;
    }
  
    // Show resume template and hide form
    document.getElementById("cv-form")!.style.display = "none";
    document.getElementById("cv-template")!.style.display = "block";
  }
  
  // Toggle between view and edit mode
  function editCV(): void {
    // Show form and hide resume template
    document.getElementById("cv-form")!.style.display = "block";
    document.getElementById("cv-template")!.style.display = "none";
  
    // Populate form with existing resume data for editing
    (document.getElementById("nameField") as HTMLInputElement).value =
      resumeData.name;
    (document.getElementById("contactField") as HTMLInputElement).value =
      String(resumeData.contact);
    (document.getElementById("cnicField") as HTMLInputElement).value =
      String(resumeData.cnic); 
    (document.getElementById("addressField") as HTMLTextAreaElement).value =
      resumeData.address;
    (document.getElementById("emailField") as HTMLInputElement).value =
      resumeData.email;
    (document.getElementById("fbField") as HTMLInputElement).value =
      resumeData.facebook;
    (document.getElementById("linkedField") as HTMLInputElement).value =
      resumeData.linkedin;
  }
  
  // Function to print or download the resume
  function printCV(): void {
    window.print();
  }
  
  // Add new field for academic qualification
  function addNewAqField(): void {
    const aqContainer = document.getElementById("aq") as HTMLElement;
    const newField = document.createElement("textarea");
    newField.className = "form-control eqField mt-2";
    newField.placeholder = "Enter Here";
    aqContainer.insertBefore(newField, document.getElementById("aqAddButton"));
  }
  
  // Add new field for work experience
  function addNewWeField(): void {
    const weContainer = document.getElementById("we") as HTMLElement;
    const newField = document.createElement("textarea");
    newField.className = "form-control weField mt-2";
    newField.placeholder = "Enter Here";
    weContainer.insertBefore(newField, document.getElementById("weAddButton"));
  }
  
  // Add new field for skills
  function addNewSsField(): void {
    const ssContainer = document.getElementById("skills") as HTMLElement;
    const newField = document.createElement("textarea");
    newField.className = "form-control ssFied mt-2";
    newField.placeholder = "Enter Here";
    ssContainer.insertBefore(newField, document.getElementById("ssAddButton"));
  }
  