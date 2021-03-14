import React, { useState, useEffect, useRef } from 'react';
import './meet-the-team.styles.scss';
import { IoArrowBack } from 'react-icons/io5';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle, IoIosArrowForward } from 'react-icons/io'
import { useHistory } from 'react-router-dom';
import { database } from '../../firebase/firebase-handler';
import TeamArch from '../../components/team-arch/team-arch-component';
import { AiOutlinePause } from 'react-icons/ai';
import { BsPause } from 'react-icons/bs';
import firebase from 'firebase';
import SAMPLE_USER from '../../enteties/sampleUser';
import usha from '../../assets/usha.jpg';
import rahul from '../../assets/rahul.jpg'
import iAmNext from '../../assets/user.png';


const MeetTheTeam = ({location}) => {
   
    
    const [category, setCategory] = useState([])
    // const majorCategories = ["Content Writer","ML Developer","Psychology/Mental Health Awareness","IT Developer","Psychology Counselors","Doctors", "Psychology Content Writer","Psychologist","Psychiatrist","Social Counselor","Mental Health Nurse","Student Mental Health Nurse","Community Mental health Counselor"];
    const [selectedTab, setSelectedTab] = useState("All");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [nothingToShow, setNothingToShow] = useState(false);
    const [loading, setLoading] = useState(true);
    const history = useHistory()
    const categoryRef = useRef();
    const [firebaseUser, setFirebaseUser] = useState(firebase.auth().currentUser);

    useEffect(() => {
        if (selectedTab === "My Profile"){
            return;
        }

        var list = []
        if(firebaseUser && firebaseUser.email === "admin@admin.com"){
            list = ["All","Team","Content Writer","ML Developer","Psychology/Mental Health Awareness","IT Developer","Psychology Counselor","Doctor", "Psychology Content Writer","Psychologist","Psychiatrist","Social Counselor","Mental Health Nurse","Student Mental Health Nurse","Community Mental health Counselor"];
        }else{
            list = ["All","Content Writer","ML Developer","Psychology/Mental Health Awareness","IT Developer","Psychology Counselor","Doctor", "Psychology Content Writer","Psychologist","Psychiatrist","Social Counselor","Mental Health Nurse","Student Mental Health Nurse","Community Mental health Counselor"];            
        }
        setCategory(list)

        
        database.ref("SIGNUP_REQUESTS").once('value', (dataSnapshot) => {
            const users = [];
            setLoading(true);
            setNothingToShow(false);
            
           if (location.state){ 
                if (dataSnapshot.exists()){
                    for (const key in dataSnapshot.val()) {
                        const USER = dataSnapshot.child(key).val();
                        
                        if (selectedTab === "All"){
                            if (USER.reviewed){
                            users.push(USER);
                            }
                        }
                        else if (selectedTab === "Team"){
                            if (!USER.reviewed){
                                users.push(USER);
                            }
                        }
                        else if (selectedTab !== 'All' && category.includes(selectedTab)){
                            if (USER.jobTitle === selectedTab){
                                if (USER.reviewed){
                                    users.push(USER);
                                }
                               
                            }
                        }
                        
                    }
                   
                    if (users.length === 0){
                        setNothingToShow(true);
                       
                    }else{
                        setLoading(false)
                        
                    }
                    setSelectedUsers(users);
                   
                }
            }else {
                const DUMMY1 = {...SAMPLE_USER, name:"Usha",jobTitle:"Psychology Counselor", profilePictureUrl: usha };
                const DUMMY2 = {...SAMPLE_USER, name:"Rahul",jobTitle:"IT Developer", profilePictureUrl: rahul };
                const DUMMY3 = {...SAMPLE_USER, name:"Your Profile",jobTitle:"Passionate Personality", profilePictureUrl: iAmNext };
                
                setSelectedUsers([DUMMY1, DUMMY2, DUMMY3])
                setLoading(false)

            }
            
        })
    }, [selectedTab]);

    const handleScrollIcon = (direction) => {
        if (direction === "RIGHT"){
            categoryRef.current.scrollBy(100,0);
        }else{
            categoryRef.current.scrollBy(-100,0);
        }
    }

    const handleYourProfile = () => {
        
        database.ref("SIGNUP_REQUESTS").child(firebaseUser.uid).once('value', (dataSnapshot) => {
            const users = [];
            setLoading(true);
            setNothingToShow(false);
            setSelectedTab("My Profile");
            if (dataSnapshot.exists()){
                
                const USER = dataSnapshot.val();
                users.push(USER);

                setSelectedUsers(users);
                setLoading(false);
            }

        
           
            
        })
    }

    
    return(
        <div className='meet-the-team-container'>
            <div className='title-bar-container'>
                <IoArrowBack className='back-button' color="#444" size={24} onClick={() => {history.goBack()}}  />
                <p className='meet-team-label' onClick={() => {setSelectedTab("All")}} >Meet The Team</p>

                {
                    firebaseUser
                    &&
                    <BsPause className='back-button' color="#444" size={24} onClick={() => {history.goBack()}}  />
                }

                {
                    firebaseUser
                    &&
                    <p className='your-profile-label' onClick={handleYourProfile} >My Profile</p>
                }
                
                
            </div>

            <p className='selected-team'>{selectedTab}</p>
            
            <div className='category-scroll-bar'>
                <IoIosArrowDropleftCircle className='arrow-button'  color="#444" size={44} onClick={() =>{handleScrollIcon("LEFT")}} />
                <div className='categories-container' ref={categoryRef}>
                {
                    category.map((item, index) => {
                        return(
                            <div key={index.toString()} onClick={() => {setSelectedTab(item)}} className={`category-content ${selectedTab === item? "selected":''}`}>
                                <p className='category-name'>{item}</p>
                            </div>
                        )
                    })
                }
                </div>
                <IoIosArrowDroprightCircle className='arrow-button' color="#444" size={44} onClick={() =>{handleScrollIcon("RIGHT")}} />
            </div>

            <div className='team-holder'>
                {
                    loading
                    ?
                    <p className='loading-label' >{nothingToShow?"Nothing to show":"Loading"}</p>
                    :
                    selectedUsers.map((item) => {
                        return <TeamArch key={item.UID} team={item} />
                    })
                }      
            </div>
        </div>
    )
}

export default MeetTheTeam;