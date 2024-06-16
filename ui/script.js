const logoUploadButton = document.getElementById("logo-upload-button");
const removeLogoButton = document.getElementById("remove-logo-button");
const uploadIconImage = document.getElementById("upload-icon-image");
const loaderContainer = document.getElementById("loader-container");
const imageContainer = document.querySelector(".image-container");
const umbrellaImage = document.getElementById("umbrella-image");
const uploadedLogo = document.getElementById("uploaded-logo");


const logoUploadInput = document.createElement("input");
logoUploadInput.setAttribute("type", "file");
logoUploadInput.setAttribute("accept", ".jpg,.png");
logoUploadInput.style.display = "none";

function showLoader() {
  loaderContainer.style.opacity = "1";
  uploadIconImage.src = "./assets/Loader.svg";
  uploadIconImage.style.animation = "spin 2s linear infinite";
  if(uploadedLogo.src !== "") {
    uploadedLogo.style.display = "none";
  }
}

function hideLoader() {
  loaderContainer.style.opacity = "0";
  uploadIconImage.src = "./assets/Upload.svg";
  uploadIconImage.style.animation = "none";
  if(uploadedLogo.src !== "") {
    uploadedLogo.style.display = "block";
  }
}

const handleLogoUpload = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    uploadedLogo.src = reader.result;
    uploadedLogo.style.display = "block";
    umbrellaImage.style.zIndex = "-1";
  };
  removeLogoButton.style.opacity = "1";
  removeLogoButton.style.pointerEvents = "all";
};

logoUploadButton.addEventListener("click", () => {
  logoUploadInput.click();
});

logoUploadInput.addEventListener("change", handleLogoUpload);

removeLogoButton.addEventListener("click", (event) => {
  event.stopPropagation();
  uploadedLogo.src = "";
  uploadedLogo.style.display = "none";
  umbrellaImage.style.zIndex = "1";
  removeLogoButton.style.opacity = "0";
  removeLogoButton.style.pointerEvents = "none";
});

//Theme Change Functionality

const UmbrellaData = {
  Blue: {
    background: "#e7f6fd",
    buttonColor: "#00a2e0",
    image: "./assets/Blue.png",
  },
  Yellow: {
    background: "#fffaee",
    buttonColor: "#ffc007",
    image: "./assets/Yello.png",
  },
  Pink: {
    background: "#F4C4C4",
    buttonColor: "#dc378f",
    image: "./assets/Pink.png",
  },
};

const handleThemeChange = (key) => {
  showLoader();
  setTimeout(() => {
    umbrellaImage.style.display = "none";
    const themeElements = document.querySelectorAll(".theme");
    themeElements.forEach((element) => {
      if (element.classList.contains(key)) {
        element.classList.add("selected");
      } else {
        if (element.classList.contains("selected")) {
          element.classList.remove("selected");
        }
      }
    });
    document.body.style.backgroundColor = UmbrellaData[key].background;
    logoUploadButton.style.backgroundColor = UmbrellaData[key].buttonColor;

    loaderContainer.style.color = UmbrellaData[key].buttonColor;

    setTimeout(() => {
      umbrellaImage.src = UmbrellaData[key].image;
      umbrellaImage.style.display = "block";
      hideLoader();
    }, 2000);
  }, 0);
};
