import questionsList from "../components/questions/questionList"
import { getDate, getTime } from "../firebase/getTimeAndDate"

var questionnaireArchive = {}

questionsList.forEach((question) => {
    questionnaireArchive[question.question] = ""
})

const SAMPLE_FORM_ENTRY = {
    entryId:"",
    name:"",
    emailId:"",
    userId:"",
    date:getDate(),
    time:getTime(),
    audioFile:"",
    videoFile:"",
    snapshots:[],
    comment:"",
    mediaMetaData:{
        videoDuration:"",
        videoSize:"",
        audioSize:"",    
    } ,

    questionnaire:questionnaireArchive
}

export default SAMPLE_FORM_ENTRY