import React, { useEffect, useState } from 'react';
import './signup.styles.scss';
import { CgProfile } from 'react-icons/cg'
import { auth, database, storage } from '../../firebase/firebase-handler';
import InputComponent from '../../components/input/input.component';
import SAMPLE_USER from '../../enteties/sampleUser';
import { VscLoading } from 'react-icons/vsc';
import { BsUpload } from 'react-icons/bs';
import { CgFileDocument } from 'react-icons/cg';
import { AiOutlineLogout } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import { RiTeamLine } from 'react-icons/ri';
import { AiOutlinePause } from 'react-icons/ai';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import VerifyEmail from '../../components/verify-email/verify-email.component';

const SignupScreen = () => {
    const [sampleFormEntity, setSampleFormEntity] = useState(SAMPLE_USER);
    const [showAditonalOptional, setShowAditionalOptional] = useState(false);
    const [skillSet, setSkillSet] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploadingPicture, setUploadingPicture] = useState(false)
    const [resumeUplading, setResumeUploading] = useState(false);
    const [firebaseUser, setFirebaseUser] = useState(auth.currentUser);
    const history = useHistory();
    const [fetching, setFetching] = useState(true);
    const [isEmailVerified, setIsEmailVerified] = useState(true);


    useEffect(() => {
        
        
        if (firebaseUser.emailVerified){
            setIsEmailVerified(true);
        }else{
            setIsEmailVerified(false);
            firebaseUser.sendEmailVerification();
           
        }

        setSampleFormEntity({...sampleFormEntity, emailId:firebaseUser.email});
        database.ref("SIGNUP_REQUESTS").child(firebaseUser.uid).on('value', (dataSnapshot) => {
            if (dataSnapshot.exists()){
                var USER = dataSnapshot.val();
                if (!USER.skill){
                    USER.skill = [];
                }
                setSampleFormEntity(USER);
                
            }
            setFetching(false)
        })
    }, [])

    useEffect(() => {
        if (sampleFormEntity){
          switch(sampleFormEntity.speciality){
            case "Dentist":{
              setSkillSet(["Communication","Patience","A thorough and methodical approach","Ability to work long hours, often under pressure","Manual dexterity","Teamwork skills"]);
              break;
            }
            case "Gynecologist/Obstetrician":{
              setSkillSet(["Management of a wide variety of conditions"]);
              break;
            }
      
    
            case "Dietitian/Nutrition":{
              setSkillSet(["Team-working skills","Keen interest in the impact of diet on health","Good interpersonal skills","Communication skills","An understanding of science","Able to motivate others"]);
              break;
            }
      
    
            case "Physiotherapist":{
              setSkillSet(["Focuses on the complete diagnosis","Medical management","Rehabilitation of individuals of all ages with neuromusculoskeletal disorders and associated disabilities"]);
              break;
            }
            
            case "General Surgeon": {
              setSkillSet(["Specialist knowledge","Good communication skills","A bright, eager mind","Extensive experience","Emotional resilience","Leadership skills"]);
              break;
            }
    
            case "Orthopedist":{
              setSkillSet(["Specialist knowledge","Rehabilitation","Surgery to restore normal function"]);
              break;
            }
    
            case "General Physician":{
              setSkillSet(["Ability to work long hours, often under pressure","Good practical skills","Ability to solve problems","Decision-making","Leadership","Management skills","Communication skills","Analytical ability"]);
              break;
            }
    
            case "Pediatrician":{
              setSkillSet(["Health promotion","Prevention","Detection","Treatment of physical, behavioral, mental/emotional, environmental, and social issues that affect children"]);
              break;
            }
            case "Gastroenterologist":{
              setSkillSet(["Procedure-oriented","Prowess and the ability to analyze problems","Analyze large data",]);
              break;
            }
      
            default:{
              setSkillSet(["Communication","Patience","A thorough and methodical approach","Ability to work long hours, often under pressure","Manual dexterity","Teamwork skills"]);
            }
          }
        }
        
      }, [sampleFormEntity.speciality])
    
     const handleSubmit = async () => {

        if (sampleFormEntity.name === ""){
            alert("Please enter name");
            return;
        }

        if (sampleFormEntity.profilePictureUrl === ""){
            alert("Please upload your profile picture");
            return
        }

        setLoading(true);
        await firebaseUser.updateProfile({
            displayName: sampleFormEntity.name
        })
        await database.ref("SIGNUP_REQUESTS").child(firebaseUser.uid).set({...sampleFormEntity, UID: firebaseUser.uid});
        setLoading(false);
        history.push('meet-team', {type:"SHOW_REAL"})
        alert("Profile Saved");
     } 

     const handleProfilePictureClicked = () => {
        const fileUpload = document.createElement("input");
        fileUpload.type = 'file';
        fileUpload.accept="image/*"
        fileUpload.click();
        fileUpload.onchange= async (event) => {
            const fileList = event.target.files;
            setUploadingPicture(true);
            const URLSnapshot = await storage.ref("PROFILE_PICTURE").child(firebaseUser.uid).put(fileList[0]);
            setSampleFormEntity({...sampleFormEntity, profilePictureUrl: await URLSnapshot.ref.getDownloadURL()})
            setUploadingPicture(false);
            
        }
     }

     const handleResumeUpload = () => {
        const resumeUpload = document.createElement('input');
        resumeUpload.type='file';
        resumeUpload.click();
        resumeUpload.onchange = async (event) => {
            const fileList = event.target.files;
            setResumeUploading(true);
            const URLSnapshot = await storage.ref("RESUME").child(firebaseUser.uid).put(fileList[0]);
            setSampleFormEntity({...sampleFormEntity, resumeUrl:await URLSnapshot.ref.getDownloadURL(), resumeDocumentName: fileList[0].name})
            setResumeUploading(false);
        }
     }

     const handleChangeCheckBox = (event) => {
        var {skill} = sampleFormEntity;
        if (event.target.checked){
            console.log("YES")
            skill.push(event.target.name)
            
        }else{
            console.log("NO")
            skill = skill.filter((item) => {
                return event.target.name !== item
            })
        }
        setSampleFormEntity({...sampleFormEntity, skill:skill})
        console.log(skill)
         
         
    }

    if (!isEmailVerified){
        return(
            <VerifyEmail />
        )
    }
    
    return(
        <div className='signup-container'>
            <div className='status-bar-container'>

                {
                    fetching
                    ?
                    <AiOutlineLoading3Quarters lassName='enter-details-label' />
                    :
                    <p className='enter-details-label'>{` ${sampleFormEntity.name?"Hello "+sampleFormEntity.name:"Create your profile"}`}</p>
                }
                
                
                <div className='title-bar-container'>
                <div className='profile-details meet-team' onClick={() => {history.push('meet-team', {type:"SHOW_REAL"})}}>
                    <RiTeamLine className='profile-icon' color="#444" size={23} />
                    <p className='email-text'>Meet the Team</p>
                    {/* <AiOutlinePause className='profile-icon' color="#bababa" size={23} style={{marginRight:10, cursor:'default'}} />    */}
                </div>

               
                
                <div className='profile-details'>
                    <CgProfile className='profile-icon' color="#444" size={23} />
                    <p className='email-text'>{sampleFormEntity.emailId}</p>
                    <AiOutlineLogout className='profile-icon' color="#444" size={23} onClick={() => {auth.signOut(); history.replace("onboard")}} />
                </div>
                </div>
                
            </div>

           

            <div className='form-container'>
                <div className='picture-details details-section'>
                    {
                        !sampleFormEntity.profilePictureUrl
                        ?
                        <div className='profile-picture-container' onClick={handleProfilePictureClicked}>
                            {
                                !uploadingPicture
                                ?
                                <CgProfile className='profile-icon' color="#444" size={90} />
                                :
                                <VscLoading className='profile-icon' color="#444" size={90} />
                            }
                            
                            <p>{!uploadingPicture?'Click to upload profile picture':"Updating picture"}</p>
                        </div>
                        :
                        <div className='profile-picture-container' onClick={handleProfilePictureClicked}>
                            <img className='profile-icon' src={sampleFormEntity.profilePictureUrl} alt='profile' />
                            <p>{uploadingPicture?'Uploading picture':'Click to change profile picture'}</p>
                        </div>
                    }
                </div>

                <p className='section-title'>Personal Details</p>
                <div className='personal-details details-section'>
                    <InputComponent value={sampleFormEntity.name} onChange={(event) => {setSampleFormEntity({...sampleFormEntity, name:event.target.value})}} tag="Name" style={{marginLeft:30, marginRight:30}}  />
                    <InputComponent value={sampleFormEntity.phoneNumber} onChange={(event) => {setSampleFormEntity({...sampleFormEntity, phoneNumber:event.target.value})}} tag="Phone number" placeholder="+91"  style={{marginLeft:30, marginRight:30}} />
                    <InputComponent tag="Email id" type='email' value={sampleFormEntity.emailId} style={{marginLeft:30, marginRight:30}} />
                </div>

                <p className='section-title personal-details-label'>Professional Details</p>
                <div className='work-details details-section'>
                   
                    <InputComponent value={sampleFormEntity.experience} onChange={(event) => {setSampleFormEntity({...sampleFormEntity, experience:event.target.value})}}  tag="Experience" style={{marginLeft:30, marginRight:30}}  />
                    <InputComponent value={sampleFormEntity.education} onChange={(event) => {setSampleFormEntity({...sampleFormEntity, education:event.target.value})}}  tag="Education" style={{marginLeft:30, marginRight:30}}   />
                    <InputComponent tag="Job title" viewType="DROP_DOWN" value={sampleFormEntity.jobTitle} onChange={(event) => {setSampleFormEntity({...sampleFormEntity, jobTitle:event.target.value})}} items={["Content Writer","ML Developer","Psychology/Mental Health Awareness","IT Developer","Psychology Counselor","Doctor", "Psychology Content Writer","Psychologist","Psychiatrist","Social Counselor","Mental Health Nurse","Student Mental Health Nurse","Community Mental health Counselor","Other"]} style={{marginLeft:30, marginRight:30}} />
                    {
                        sampleFormEntity.jobTitle === "Other"
                        ?
                        <InputComponent value={sampleFormEntity.otherJobTitle} onChange={(event) => {setSampleFormEntity({...sampleFormEntity, otherJobTitle:event.target.value})}} tag="Enter job title" style={{marginLeft:30, marginRight:30}} />
                        :
                        null
                    }
                    <InputComponent value={sampleFormEntity.otherTitle} onChange={(event) => {setSampleFormEntity({...sampleFormEntity, otherTitle:event.target.value})}} tag="Other job title (Optional)" style={{marginLeft:30, marginRight:30}}/>
                    
                    {
                       !sampleFormEntity.resumeUrl
                       ?
                       <div className='upload-resume' style={{marginLeft:30, marginRight:30}} onClick={handleResumeUpload}>
                            {
                                resumeUplading
                                ?
                                <VscLoading className='profile-icon' color="#72b198" size={24} />
                                :
                                <BsUpload className='resume-icon' color="#72b198" size={25} />
                            }
                            
                            <p className='resume-label'>{resumeUplading?"Uploading Resume":'Upload Resume'}</p>
                        </div>
                        :
                        <div className='upload-resume' style={{marginLeft:30, marginRight:30}} onClick={handleResumeUpload} >
                            {/* {
                                resumeUplading
                                ?
                                <VscLoading className='profile-icon' color="#72b198" size={24} />
                                :
                                <CgFileDocument className='resume-icon' color="#72b198" size={25} />
                            } */}
                            <CgFileDocument className='resume-icon' color="#72b198" size={25} />
                            <p className='resume-label'>{resumeUplading?"Uploading Resume":sampleFormEntity.resumeDocumentName}</p>
                        </div>
                    }

                    
                </div>

                <div className='additional-details-selector-container'>
                    <input className='additional-details-box' type='checkbox' onChange={(event) => {event.target.checked?setShowAditionalOptional(true):setShowAditionalOptional(false)}}   />
                    <p className='additional-details-label' >Add more professional details</p>
                </div>
                
                {
                    showAditonalOptional
                    ?
                    <div className='additional-details details-section'>
                        <p className='section-title additional-details-label'>Additional Details</p>
                        <InputComponent viewType="DROP_DOWN" items={["PY","PYS","Dr","Therapist","Counselor","Personal Care Giver"]}  onChange={(event) => {setSampleFormEntity({...sampleFormEntity, prefix:event.target.value})}}  value={sampleFormEntity.prefix}  tag="Prefix" style={{marginLeft:30, marginRight:30}}  />
                        <InputComponent viewType="DROP_DOWN" items={["Dentist","Gynecologist/Obstetrician","Dietitian/Nutrition","Physiotherapist","General Surgeon","Orthopedist","General Physician","Pediatrician","Gastroenterologist"]}  onChange={(event) => {setSampleFormEntity({...sampleFormEntity, speciality:event.target.value})}}  value={sampleFormEntity.speciality} tag="Speciality" style={{marginLeft:30, marginRight:30}}  />
                        <InputComponent viewType="CHECK_BOXES" items={skillSet} onChange={handleChangeCheckBox} value={sampleFormEntity.skill} tag="Skills" style={{marginLeft:30, marginRight:30}}  />
                        <InputComponent value={sampleFormEntity.hospitalName} onChange={(event) => {setSampleFormEntity({...sampleFormEntity, hospitalName:event.target.value})}} tag="Current Hospital Name" style={{marginLeft:30, marginRight:30}} />
                        <InputComponent value={sampleFormEntity.hospitalAddress} onChange={(event) => {setSampleFormEntity({...sampleFormEntity, hospitalAddress:event.target.value})}} tag="Current Hospital Address" style={{marginLeft:30, marginRight:30}} />
                        <InputComponent value={sampleFormEntity.hospitalCity} onChange={(event) => {setSampleFormEntity({...sampleFormEntity, hospitalCity:event.target.value})}} tag="Current Hospital City" style={{marginLeft:30, marginRight:30}} />
                        <InputComponent value={sampleFormEntity.hospitalState} onChange={(event) => {setSampleFormEntity({...sampleFormEntity, hospitalState:event.target.value})}} tag="Current Hospital State" style={{marginLeft:30, marginRight:30}} />
                    </div>
                    :
                    null
                }
                
                {
                    loading
                    ?
                    <div className='submit-button submit-profile'>
                        <VscLoading color="white" size={23} />
                    </div>
                    :
                    <button className='submit-button submit-profile' onClick={handleSubmit} >Save profile</button>
                }

                

              
               
              

            </div>

        </div>
    )
}

export default SignupScreen;