// fetch('http://openapi.programming-hero.com/api/course/curriculum')
//   .then(response => response.json())
//   .then(data => data);
const milestonesData = JSON.parse(data).data;
console.log(milestonesData);



// load course milestones Data..........
function loadMilestone() {
  const milestones = document.querySelector(".milestones");
  milestones.innerHTML = `${milestonesData
    .map((milestone) => {
      return `<div class="milestone border-b" id="${milestone._id}">
        <div class="flex">
          <div class="checkbox"><input type="checkbox" onclick="doneMilestone(this,${
            milestone._id
          })"/></div>
          <div onclick = openMilestone(this,${milestone._id})>
            <p>
            ${milestone.name}
              <span><i class="fas fa-chevron-down"></i></span>
            </p>
          </div>
        </div>
        <div class="hidden_panel">
          ${milestone.modules
            .map((module) => {
              return ` <div class="module border-b">
              <p>${module.name}</p>
            </div>`;
            })
            .join("")}
        </div>
      </div>`;
    })
    .join("")}`;
}



// openMilestone function.........
function openMilestone(milestoneElement, id) {
  const currentPanel = milestoneElement.parentNode.nextElementSibling;
  const showPanel = document.querySelector(".show");
  const showActive = document.querySelector(".active");
  if (!currentPanel.classList.contains("active") && showActive) {
    showActive.classList.remove("active");
  }
  milestoneElement.classList.toggle("active");
  if (!currentPanel.classList.contains("show") && showPanel) {
    showPanel.classList.remove("show");
  }
  currentPanel.classList.toggle("show");

  showMilestone(id);
}


// showMilestone................
function showMilestone(id) {
  const milestoneImage = document.querySelector(".milestoneImage");
  milestoneImage.style.opacity = "0";
  milestoneImage.src = milestonesData[id].image;
  const milestoneTitle = document.querySelector(".title");
  milestoneTitle.innerText = milestonesData[id].name;
  const milestoneDescription = document.querySelector(".details");
  milestoneDescription.innerText = milestonesData[id].description;
}



// animation milestone image.............
const milestoneImage = document.querySelector(".milestoneImage");
milestoneImage.onload = function () {
  this.style.opacity = "1";
};



// doneList with sort...................
function doneMilestone(checkbox, id) {
  const doneList = document.querySelector(".doneList");
  const milestoneList = document.querySelector(".milestones");
  const item = document.getElementById(id);
  if (checkbox.checked) {
    milestoneList.removeChild(item);
    doneList.appendChild(item);
  } else {
    doneList.removeChild(item);
    milestoneList.appendChild(item);
    const nodeSort = milestoneList.childNodes;
    let nodeArr = Array.from(nodeSort);
    // console.log(nodeArr);
    nodeArr.sort((a, b) => {
      return parseInt(a.id) - parseInt(b.id);
    });

    nodeArr.map((a) => {
      let item = document.getElementById(a.id);
      milestoneList.appendChild(item);
    });
  }
}



// main function call...............
loadMilestone();
