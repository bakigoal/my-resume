// UI vars
const uiAbout = document.querySelector('#about');
const uiExperience = document.querySelector('#experience');
const uiSkills = document.querySelector('#skills');
const uiEducation = document.querySelector('#education');
const uiInterests = document.querySelector('#interests');

// data
let experienceList = [];
let personalInfo = {};

// REST URLS
const EXPERIENCE_URL = "data/experience.json";
const PERSONAL_INFO_URL = "data/personalInfo.json";

init();

function init() {
  loadData();

  fillExperience();
  fillPersonalInfo();
}

// LOADING JSON ----------------------------------------------------------

function loadData() {
  personalInfo = loadJson(PERSONAL_INFO_URL);
  experienceList = loadJson(EXPERIENCE_URL);
}

function loadJson(url) {
  let request = new XMLHttpRequest();
  request.open('GET', url, false);
  request.send(null)
  return JSON.parse(request.responseText);
}

// CREATING UI -----------------------------------------------------------

function fillPersonalInfo() { // UI using innerHtml and ``
  let socialList = '<ul class="list-inline list-social-icons mb-0">';
  personalInfo.socialLinks.forEach(function (social) {
    socialList += `
      <li class="list-inline-item">
        <a href="${social.url}" target="_blank">
          <span class="fa-stack fa-lg">
            <i class="fa fa-circle fa-stack-2x"></i>
            <i class="fa ${social.faIconClass} fa-stack-1x fa-inverse"></i>
          </span>
        </a>
      </li>
    `;
  });
  socialList += '</ul>';

  uiAbout.innerHTML = `
  <div class="my-auto">
    <h1 class="mb-0">${personalInfo.firstName}
      <span class="text-primary">${personalInfo.lastName}</span>
    </h1>
    <div class="subheading mb-5">
      ${personalInfo.title}
    </div>
    <div>${personalInfo.addressText}</div>
    <div>${personalInfo.phone}</div>
    <div>
      <a href="mailto:${personalInfo.email}">${personalInfo.email}</a>
    </div>
    ${socialList}
  </div>
  `;
}

function fillExperience() { // UI using DOM manipulation
  const div = document.createElement('div');
  div.className = 'my-auto';
  const experienceLabel = document.createElement('h2');
  experienceLabel.className = 'mb-5';
  experienceLabel.innerText = 'Опыт работы';
  div.appendChild(experienceLabel);

  experienceList.forEach(function (experience) {

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
    div2.className = 'text-md-right';
    const span = document.createElement('span');
    span.className = 'text-primary';
    span.appendChild(document.createTextNode(experience.start_date + ' - ' + experience.end_date));
    div2.appendChild(span);
    experienceDiv.appendChild(div2);

    div.appendChild(experienceDiv);
  });
  uiExperience.appendChild(div);
}