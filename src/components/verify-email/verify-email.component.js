import React from 'react';
import './verify-email.styles.scss';
import illustration from '../../assets/sendmail.svg'
import { auth } from '../../firebase/firebase-handler';
import { RiMailSendLine } from 'react-icons/ri';
import { FiRefreshCcw } from 'react-icons/fi';
import { useHistory } from 'react-router';

const VerifyEmail = () => {
    const { currentUser } = auth;
    const history = useHistory();

    const handleResendEmail = async () =>{
        var actionCodeSettings = {
            // URL you want to redirect back to. The domain (www.example.com) for this
            // URL must be in the authorized domains list in the Firebase Console.
            url: 'http://localhost:3000/signup',
            // This must be true.
            handleCodeInApp: true,
          };
        await currentUser.sendEmailVerification();
        alert("Verification email sent again");
    }

    const handleGoBack = async () =>{
        await auth.signOut();
        history.replace("onboard")
    }

    if (!currentUser){
        return(
            <div>
                
            </div>
        )
    }

    return(
        <div className='verify-email-container'>

            <p className='thank-you-label'>Thank you for registering!</p>
            
            <img className='mail-illustration' src={illustration} alt='mail sent'/>
            <p className='verify-label'>Verify your email address</p>
            <p className='mail-info-label' >Please click on the link that has just been sent to email <span className='user-email'>{currentUser.email?currentUser.email:''}</span> account to verify your email and click on refresh.</p>

            <div className='control-container'>
            <div className='resend-button' onClick={handleResendEmail}>
                <RiMailSendLine size="23" color='#222' />
                <p className='button-text'>Resend Email</p>
            </div>
            <div className='resend-button reload' onClick={() =>{window.location.reload()}}>
                <FiRefreshCcw size="23" color='white' />
                <p className='button-text'>Refresh</p>
            </div>
            </div>

            <div className='go-back-button' onClick={handleGoBack} >
                <p className='button-text'>Login with a different email</p>
            </div>

        </div>
    )
}

export default VerifyEmail