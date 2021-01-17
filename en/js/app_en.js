import {buildUISections} from '../../shared/js/ui_builder.js'

const urls = {
    personalInfo: "../data/personalInfo_en.json",
    experience: "../data/experience_en.json",
    skills: "../data/skills.json",
    hobby: "../data/hobby_en.json"
}

let isEnglish = true

buildUISections(urls, isEnglish)