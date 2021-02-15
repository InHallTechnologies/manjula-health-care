import { useContext, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Context, { Provider } from './context/context';
import { auth } from './firebase/firebase-handler';
import HomePage from './home/home.component';
import CaseStudiesDetails from './pages/case-studies-details/case-studies-details.component';
import CaseStudies from './pages/case-studies/case-studies.component';
import LoginScreen from './pages/login/login.component';
import QuestionnaireScreen from './pages/questionnaire/questionnaire.component';
import { VscLoading } from 'react-icons/vsc';
import CONTEXT_TYPES from './context/contectType';
import ReportScreen from './pages/report/report.component';
import DoctorsOnboard from './pages/doctors-onboard/doctors-onboard.component';
import LandingPage from './pages/landing-page/landing-page.component';
import SignupScreen from './pages/signup/signup.component';
import MeetTheTeam from './pages/meet-the-team/meet-the-team.component';

const App = props => {

  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [globalState, dispatchForGlobalState] = useContext(Context);
  
  useEffect( () => { 
       (() => {
        auth.onAuthStateChanged((user) => { 
          if (user){
            dispatchForGlobalState({type:CONTEXT_TYPES.setUser, payload:{
              name:user.displayName,
              emailId:user.email
            }})
          }else{
            dispatchForGlobalState({type:CONTEXT_TYPES.setUser, payload:null})
          }
          setLoading(false);
        })
       })() 
  }, []);

  if (loading){
    return(
      <div style={{width:"100vw", height:'100vh', backgroundColor:'white', margin:0, display:'flex', justifyContent:'center', alignItems:'center'}}>
        <VscLoading color="#72b198" size="90"  />
      </div>
    )

  }

 
  return (
    <div className="App">
      <Switch>
        <Route path='/' exact component={LandingPage} /> 
        <Route path='/care' exact component={HomePage}/>
        <Route path='/case-studies' exact component={CaseStudies} />
        <Route path='/case-studies/:id' component={CaseStudiesDetails} />
        <Route path='/questionnaire' component={QuestionnaireScreen} />
        <Route path={'/login'} component={LoginScreen} />
        <Route path={'/reports'} component={ReportScreen} />
        <Route path={'/onboard'} component={DoctorsOnboard}/>
        <Route path={'/signup'}  component={SignupScreen} />
        <Route path={'/meet-team'}  component={MeetTheTeam} />
      </Switch>
    </div>
  );
}

export default () => {
  return(
    <Provider>
      <App />
    </Provider>
  )
};
