import { getDate, getTime } from "../firebase/getTimeAndDate";

const SAMPLE_USER = {
    emailId:"",
    name:'',
    phoneNumber:'',
    experience:'',
    education:"",
    jobTitle:'',
    otherJobTitle:'',
    otherTitle:'',
    profilePictureUrl:'',
    resumeUrl:'',
    resumeDocumentName:'',
    UID:'',
    onboardDate:getDate(),
    onboardTime:getTime(),
    prefix:'',
    speciality:'',
    skill:[],
    hospitalName:'',
    hospitalCity:'',
    hospitalState:'',
    hospitalAddress:'',
}   
export default SAMPLE_USER;