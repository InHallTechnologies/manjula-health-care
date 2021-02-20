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
    reviewed:false
}   
export default SAMPLE_USER;