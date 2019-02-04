// UI vars
const uiAbout = document.querySelector('#about');
const uiExperienceList = document.querySelector('#experienceList');
const uiSkills = document.querySelector('#skills');
const uiEducation = document.querySelector('#education');
const uiInterests = document.querySelector('#interests');

// data
let experienceList = [];

// REST URLS
const EXPERIENCE_URL = "data/experience.json";

// add event listeners
addEventListeners();

function addEventListeners() {
  // DOM load event
  document.addEventListener('DOMContentLoaded', init);
}

function init() {
  loadExperience();
  fillExperience();
}

function loadExperience() {
  var request = new XMLHttpRequest();
  request.open("GET", EXPERIENCE_URL, false);
  request.send(null)
  experienceList = JSON.parse(request.responseText);
}

function fillExperience() {
  experienceList.forEach(function (experience) {
    createExperienceDiv(experience);
  })
}

// create UI ---------------------------------------------------------------
function createExperienceDiv(experience) {
  const experienceDiv = document.createElement('div');
  experienceDiv.className = 'resume-item d-flex flex-column flex-md-row mb-5';
  // div 1 - job info
  const div1 = document.createElement('div');
  div1.className = 'resume-content mr-auto';
  // company name
  const h3 = document.createElement('h3');
  h3.className = 'mb-0';
  if (experience.site) {
    const link = document.createElement('a');
    link.href = experience.site;
    link.target = '_blank';
    link.appendChild(document.createTextNode(experience.company));
    h3.appendChild(link);
  } else {
    h3.appendChild(document.createTextNode(experience.company));
  }
  div1.appendChild(h3);
  // title
  const div3 = document.createElement('div');
  div3.className = 'subheading mb-2';
  div3.appendChild(document.createTextNode(experience.job_title));
  div1.appendChild(div3);
  // responsibilities
  const ul = document.createElement('ul');
  ul.className = 'mb-2';
  experience.responsibilities.forEach(function (item) {
    const li = document.createElement('li');
    li.innerHTML = item;
    ul.appendChild(li);
  });
  div1.appendChild(ul);
  // technologies
  div1.appendChild(document.createTextNode(experience.technologies.join(', ')));
  experienceDiv.appendChild(div1);
  // div 2 - dates
  const div2 = document.createElement('div');
  const span = document.createElement('span');
  span.className = 'text-primary';
  span.appendChild(document.createTextNode(experience.start_date + ' - ' + experience.end_date));
  div2.appendChild(span);
  experienceDiv.appendChild(div2);

  uiExperienceList.appendChild(experienceDiv);
}