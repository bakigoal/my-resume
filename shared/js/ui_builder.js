export function buildUISections(urls) {
    loadJson(urls.personalInfo).then(fillPersonalInfo)
    loadJson(urls.experience).then(fillExperience)
    loadJson(urls.skills).then(fillSkills)
    loadJson(urls.hobby).then(fillHobby)
}

// UI vars
const uiAbout = document.querySelector('#about')
const uiExperience = document.querySelector('#experience')
const uiSkills = document.querySelector('#skills')
const uiEducation = document.querySelector('#education')
const uiHobby = document.querySelector('#hobby')

function loadJson(url) {
    return new Promise(resolve => {
        let request = new XMLHttpRequest()
        request.open('GET', url, true)
        request.onload = function () {
            if (this.status === 200) {
                resolve(JSON.parse(this.responseText))
            }
        }
        request.send()
    })
}

// CREATING UI -----------------------------------------------------------

function fillPersonalInfo(personalInfo) { // UI using innerHtml and ``
    let socialList = '<ul class="list-inline list-social-icons mb-0">'
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
    `
    })
    socialList += '</ul>'

    uiAbout.innerHTML = `
  <div class="my-auto">
    <h1 class="mb-0">${personalInfo.firstName}
      <span class="text-primary">${personalInfo.lastName}</span>
    </h1>
    <div class="subheading mb-5">
      ${personalInfo.title}
    </div>
    <div class="mb-5">
      ${personalInfo.about}
    </div>
    <div>${personalInfo.addressText}</div>
    <div>${personalInfo.phone}</div>
    <div>
      <a href="mailto:${personalInfo.email}">${personalInfo.email}</a>
    </div>
    ${socialList}
  </div>
  `
}

function fillExperience(experience) { // UI using DOM manipulation
    const div = document.createElement('div')
    div.className = 'my-auto'
    const experienceLabel = document.createElement('h2')
    experienceLabel.className = 'mb-5'
    experienceLabel.innerText = experience.title
    div.appendChild(experienceLabel)

    experience.experienceList.forEach(function (experience) {

        const experienceDiv = document.createElement('div')
        experienceDiv.className = 'resume-item d-flex flex-column flex-md-row mb-5'
        // div 1 - job info
        const jobInfoDiv = document.createElement('div')
        jobInfoDiv.className = 'resume-content mr-auto'
        // company name
        const h3 = document.createElement('h3')
        h3.className = 'mb-0'
        if (experience.site) {
            const link = document.createElement('a')
            link.href = experience.site
            link.target = '_blank'
            link.appendChild(document.createTextNode(experience.company))
            h3.appendChild(link)
        } else {
            h3.appendChild(document.createTextNode(experience.company))
        }
        jobInfoDiv.appendChild(h3)
        // title
        const titleDiv = document.createElement('div')
        titleDiv.className = 'subheading mb-2'
        titleDiv.appendChild(document.createTextNode(experience.job_title))
        jobInfoDiv.appendChild(titleDiv)

        // projects
        experience.projects.forEach(function (project) {
            // name
            if (project.name) {
                let projectName = document.createElement('h6')
                projectName.className = 'mt-2'
                projectName.appendChild(document.createTextNode(project.name))
                jobInfoDiv.appendChild(projectName)
            }
            // responsibilities
            const ul = document.createElement('ul')
            ul.className = 'mb-2 mt-2'
            project.responsibilities.forEach(function (item) {
                const li = document.createElement('li')
                li.innerHTML = item
                ul.appendChild(li)
            })
            jobInfoDiv.appendChild(ul)
            // technologies
            jobInfoDiv.appendChild(document.createTextNode(project.technologies.join(', ')))
            experienceDiv.appendChild(jobInfoDiv)
        })

        // div 2 - dates
        const dateDiv = document.createElement('div')
        dateDiv.className = 'text-md-right'
        const span = document.createElement('span')
        span.className = 'text-primary'
        span.appendChild(document.createTextNode(experience.start_date + ' - ' + experience.end_date))
        dateDiv.appendChild(span)
        experienceDiv.appendChild(dateDiv)

        div.appendChild(experienceDiv)
    })
    uiExperience.appendChild(div)
}

function fillSkills(skills) {
    // div icons
    let iconsList = '<ul class="list-inline list-icons">'
    skills.icons.forEach(icon => {
        iconsList += `
            <li class="list-inline-item">
                <i class="devicons devicons-${icon}" ></i>
            </li>
        `
    })
    iconsList += '</ul>'

    // skills
    let skillsList = '<ul class="fa-ul mb-0">'
    skills.skills.forEach(skill => {
        skillsList += `
            <li>
                <i class="fa-li fa fa-check"></i> <b>${skill.title}:</b> ${skill.values.join(', ')} 
            </li> 
        `
        skill.title
        skill.values
    })
    skillsList += '</ul>'

    // whole section
    uiSkills.innerHTML = `
        <div class="my-auto">
            <h2 class="mb-5">Skills</h2>
            ${iconsList}
            ${skillsList}
        </div>
    `
}

function fillHobby(hobbies) {
    let hobbyList = ''
    hobbies.values.forEach(hobby => {
        hobbyList += `
            <p>${hobby}</p>
        `
    })
    hobbyList += '</ul>'

    uiHobby.innerHTML = `
        <div class="my-auto">
            <h2 class="mb-5">${hobbies.title}</h2>
            ${hobbyList}
        </div>
    `
}
