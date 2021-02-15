import React, { useState, useEffect, useRef } from 'react';
import './meet-the-team.styles.scss';
import { IoArrowBack } from 'react-icons/io5';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle, IoIosArrowForward } from 'react-icons/io'
import { useHistory } from 'react-router-dom';
import { database } from '../../firebase/firebase-handler';
import TeamArch from '../../components/team-arch/team-arch-component';

const MeetTheTeam = () => {
    const [category, setCategory] = useState(["All","Content Writer","ML Developer","Psychology/Mental Health Awareness","IT Developer","Psychology Counselors","Doctors", "Psychology Content Writer","Psychologist","Psychiatrist","Social Counselor","Mental Health Nurse","Student Mental Health Nurse","Community Mental health Counselor"])
    // const majorCategories = ["Content Writer","ML Developer","Psychology/Mental Health Awareness","IT Developer","Psychology Counselors","Doctors", "Psychology Content Writer","Psychologist","Psychiatrist","Social Counselor","Mental Health Nurse","Student Mental Health Nurse","Community Mental health Counselor"];
    const [selectedTab, setSelectedTab] = useState("All");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [nothingToShow, setNothingToShow] = useState(false);
    const [loading, setLoading] = useState(true);
    const history = useHistory()
    const categoryRef = useRef()

    useEffect(() => {
        database.ref("SIGNUP_REQUESTS").once('value', (dataSnapshot) => {
            const users = [];
            setLoading(true);
            setNothingToShow(false);
            if (dataSnapshot.exists()){
                for (const key in dataSnapshot.val()) {
                    const USER = dataSnapshot.child(key).val();
                    
                    if (selectedTab === "All"){
                        users.push(USER);
                    }
                    else if (selectedTab !== 'All' && category.includes(selectedTab)){
                        if (USER.speciality === selectedTab){
                            users.push(USER);
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
        })
    }, [selectedTab]);

    const handleScrollIcon = (direction) => {
        if (direction === "RIGHT"){
            categoryRef.current.scrollBy(100,0);
        }else{
            categoryRef.current.scrollBy(-100,0);
        }
    }

    
    return(
        <div className='meet-the-team-container'>
            <div className='title-bar-container'>
                <IoArrowBack className='back-button' color="#444" size={24} onClick={() => {history.goBack()}}  />
                <p className='meet-team-label'>Meet The Team</p>
            </div>

            <p className='selected-team'>{selectedTab}</p>
            
            <div className='category-scroll-bar'>
                <IoIosArrowDropleftCircle className='arrow-button'  color="#444" size={44} onClick={() =>{handleScrollIcon("LEFT")}} />
                <div className='categories-container' ref={categoryRef}>
                {
                    category.map((item) => {
                        return(
                            <div onClick={() => {setSelectedTab(item)}} className={`category-content ${selectedTab === item? "selected":''}`}>
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
                        return <TeamArch team={item} />
                    })
                }      
            </div>
        </div>
    )
}

export default MeetTheTeam;