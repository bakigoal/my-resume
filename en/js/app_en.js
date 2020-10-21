// UI vars
const uiAbout = document.querySelector('#about');
const uiExperience = document.querySelector('#experience');
const uiSkills = document.querySelector('#skills');
const uiEducation = document.querySelector('#education');
const uiInterests = document.querySelector('#interests');

// REST URLS
const EXPERIENCE_URL = "data/experience_en.json";
const PERSONAL_INFO_URL = "data/personalInfo_en.json";

init();

function init() {
    loadData();
}

// LOADING JSON ----------------------------------------------------------

function loadData() {
    loadJson(PERSONAL_INFO_URL, fillPersonalInfo);
    loadJson(EXPERIENCE_URL, fillExperience);
}

function loadJson(url, success) {
    let request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function () {
        if (this.status === 200) {
            success(JSON.parse(this.responseText));
        }
    }
    request.send();
}

// CREATING UI -----------------------------------------------------------

function fillPersonalInfo(personalInfo) { // UI using innerHtml and ``
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

function fillExperience(experienceList) { // UI using DOM manipulation
    const div = document.createElement('div');
    div.className = 'my-auto';
    const experienceLabel = document.createElement('h2');
    experienceLabel.className = 'mb-5';
    experienceLabel.innerText = 'Experience';
    div.appendChild(experienceLabel);

    experienceList.forEach(function (experience) {

        const experienceDiv = document.createElement('div');
        experienceDiv.className = 'resume-item d-flex flex-column flex-md-row mb-5';
        // div 1 - job info
        const jobInfoDiv = document.createElement('div');
        jobInfoDiv.className = 'resume-content mr-auto';
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
        jobInfoDiv.appendChild(h3);
        // title
        const titleDiv = document.createElement('div');
        titleDiv.className = 'subheading mb-2';
        titleDiv.appendChild(document.createTextNode(experience.job_title));
        jobInfoDiv.appendChild(titleDiv);

        // projects
        experience.projects.forEach(function (project) {
            // name
            if (project.name) {
                let projectName = document.createElement('h6');
                projectName.className = 'mt-2';
                projectName.appendChild(document.createTextNode(project.name));
                jobInfoDiv.appendChild(projectName);
            }
            // responsibilities
            const ul = document.createElement('ul');
            ul.className = 'mb-2 mt-2';
            project.responsibilities.forEach(function (item) {
                const li = document.createElement('li');
                li.innerHTML = item;
                ul.appendChild(li);
            });
            jobInfoDiv.appendChild(ul);
            // technologies
            jobInfoDiv.appendChild(document.createTextNode(project.technologies.join(', ')));
            experienceDiv.appendChild(jobInfoDiv);
        });

        // div 2 - dates
        const dateDiv = document.createElement('div');
        dateDiv.className = 'text-md-right';
        const span = document.createElement('span');
        span.className = 'text-primary';
        span.appendChild(document.createTextNode(experience.start_date + ' - ' + experience.end_date));
        dateDiv.appendChild(span);
        experienceDiv.appendChild(dateDiv);

        div.appendChild(experienceDiv);
    });
    uiExperience.appendChild(div);
}