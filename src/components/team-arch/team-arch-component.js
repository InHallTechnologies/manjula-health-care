import React from 'react';
import './team.arch.styles.scss';
import { CgProfile } from 'react-icons/cg'

const TeamArch = ({team}) => {
    return(
        <div className='team-arch-container'>
        {
            team.profilePictureUrl
            ?
            <img className='profile-pic' src={team.profilePictureUrl} alt={team.name} />
            :
            <CgProfile className='profile-pic' color='#444' />
        }
            
            <p className='name'>{team.name.toUpperCase()}</p>
            <p className='designation'>{team.jobTitle.toUpperCase()=== "OTHER"? team.otherJobTitle.toUpperCase():team.jobTitle.toUpperCase()}</p>
        </div>
    )
}

export default TeamArch;