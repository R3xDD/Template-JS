// local storage check
let mainColors = localStorage.getItem("color-option");
if (mainColors !== null) {
    document.documentElement.style.setProperty('--main-color', mainColors);
    // remove class active from all colors list items
    document.querySelectorAll(".colors-list li ").forEach(el => {
        el.classList.remove("active");
        // add active class to the mainColors in local storage
        if (el.dataset.color === mainColors) {
            el.classList.add("active")
        }
    })
}





// random bg option
let backgroundRandom = true;
// variable to Control The imgs
let bgInterval;
// local storage check random bg
let backgroundItems = localStorage.getItem("bg-option");
if (backgroundItems !== null) {
    if (backgroundItems === "true") {
        backgroundRandom = true;
    } else {
        backgroundRandom = false;
    }
    // remove active class from all span
    document.querySelectorAll(".option-box .span span").forEach((el) => {
        el.classList.remove("active");
    });
    if (backgroundItems === "true") {
        document.querySelector(".yes").classList.add("active")
    } else {
        document.querySelector(".no").classList.add("active")
    }
}





// background change
const randomBg = document.querySelectorAll(".option-box .span span");
randomBg.forEach(span => {
    span.addEventListener("click", (e) => {
        // remove active  class from all children
        handleActive(e); 
        if (e.target.dataset.background === "yes") {
            backgroundRandom = true;
            randomImgs();
            localStorage.setItem("bg-option", true )
        } else {
            backgroundRandom = false;
            clearInterval(bgInterval);
            localStorage.setItem("bg-option", false )
        }
    });
})








// class open on click
let imgIcon = document.querySelector(".image");
let imgParent = document.querySelector(".settings-box");
imgIcon.onclick = function () {
    imgParent.classList.toggle("open");
}







// switch color
const colorsli = document.querySelectorAll(".colors-list li");
colorsli.forEach(li => {
    li.addEventListener("click", (e) => {
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
        localStorage.setItem("color-option", e.target.dataset.color);
        handleActive(e);
    })
})










// select landing page element 
let landing = document.querySelector("#landing");
// get array of imgs
let imgsArray = ["landing1.jpg", "landing2.jpg", "landing3.jpg", "landing4.jpg", "landing5.jpg", "landing6.jpg"];

function randomImgs() {

    if (backgroundRandom === true) {
        bgInterval = setInterval(() => {
            //  get  random number 
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
            landing.style.backgroundImage = 'url("imgs/' + imgsArray[randomNumber] + '")';
        },5000)
    }
}

randomImgs();
















let skills = document.querySelector(".skills");
window.onscroll = function () {
    let skillsOffsetTop = skills.offsetTop;
    let skillsOuterHeight = skills.offsetHeight;
    let windowHeight = this.innerHeight;
    let windowScrollTop = window.pageYOffset;
    if (windowScrollTop + 210  > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
        let allSkills = document.querySelectorAll(".skill-box .progress  span");
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        })
    }
}



let gallery = document.querySelectorAll(".gallery img");

gallery.forEach(img => {
    img.addEventListener("click", (e) => {
        let overlay = document.createElement("div");
        overlay.className = 'popup-overlay';
        document.body.appendChild(overlay);
        let popupBox = document.createElement("div");
        popupBox.className = 'popup-box';
        let popupImage = document.createElement("img");
        popupImage.src = img.src;
        popupBox.appendChild(popupImage);
        document.body.appendChild(popupBox);
        if (img.alt !== "") {
            let imgHeading = document.createElement('h3');
            imgHeading.className = "heading"
            let imgText = document.createTextNode(img.alt);
            imgHeading.appendChild(imgText);
            popupBox.prepend(imgHeading);

            let closeButton = document.createElement("span");
            let closeButtonText = document.createTextNode("X");
            closeButton.appendChild(closeButtonText);
            closeButton.className = "close-btn";
            popupBox.prepend(closeButton);
        } else {
            let imgHeading = document.createElement('h3');
            imgHeading.className = "heading"
            let imgText = document.createTextNode("Gallery Image");
            imgHeading.appendChild(imgText);
            popupBox.prepend(imgHeading);

            let closeButton = document.createElement("span");
            let closeButtonText = document.createTextNode("X");
            closeButton.appendChild(closeButtonText);
            closeButton.className = "close-btn";
            popupBox.prepend(closeButton);

        };
    });
});
document.addEventListener("click", (e) => {
    if (e.target.className === "close-btn") {
        e.target.parentNode.remove();
        document.querySelector(".popup-overlay").remove();
    };
});



















function handleActive(ev) {
    // remove active  class from all children
    ev.target.parentElement.querySelectorAll(".active").forEach(el => {
        el.classList.remove("active");
    })
    // add active class to the clicked li 
    ev.target.classList.add("active");
};







const allBullets = document.querySelectorAll(".nav-bullets .bullets");
const allLinks = document.querySelectorAll(".links a");
function scrollToSomewher(elements) {
    elements.forEach(ele=> {
        ele.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth"
            })
        })
    })
}
scrollToSomewher(allBullets);
scrollToSomewher(allLinks)








let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletContainer = document.querySelector(".nav-bullets");
let bulletsLocalItem = localStorage.getItem("bullets-option");


if (bulletsLocalItem !== null) {
    bulletsSpan.forEach(span => {
        span.classList.remove("active");
    });
    if (bulletsLocalItem === "block") {
        document.querySelector(".bullets-option .yes").classList.add("active");
        bulletContainer.style.display = "block";
    } else {
        document.querySelector(".bullets-option .no").classList.add("active");
        bulletContainer.style.display = "none";
    }
}
bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        if (span.dataset.display === "show") {
            bulletContainer.style.display = "block";
            localStorage.setItem("bullets-option", "block");
        } else {
            bulletContainer.style.display = "none";
            localStorage.setItem("bullets-option", "none");
        }
        handleActive(e);
    });
});































// reset options
document.querySelector(".reset-options").onclick = function(){
    localStorage.clear();  
    window.location.reload();
}




// responsive menu 
let toggleBtn = document.querySelector(".toggle-menu");
let TLinks = document.querySelector(".links");
toggleBtn.onclick = function (e) {
    // stop propagation
    e.stopPropagation();
    this.classList.toggle("menu-active");
    TLinks.classList.toggle("open")
};
// click anywhere outside menu and toggle btn
document.addEventListener("click", (e) => {
    if (e.target !== toggleBtn && e.target !== TLinks) {
        if (TLinks.classList.contains("open")) {
            toggleBtn.classList.toggle("menu-active");
            TLinks.classList.toggle("open")
        }
    }
});
// stop propagation on menu 
TLinks.onclick = function (e) {
    e.stopPropagation();
}