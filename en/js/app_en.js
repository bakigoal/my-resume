import {build} from '../../shared/js/ui_builder.js';

const urls = {};
urls.personalInfo = "../data/personalInfo_en.json";
urls.experience = "../data/experience_en.json";
let isEnglish = true;

build(urls, isEnglish);