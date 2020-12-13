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

  console.log("I AM HERE")
  return (
    <div className="App">
      <Switch>
        <Route path='/' exact component={HomePage}/>
        <Route path='/case-studies' exact component={CaseStudies} />
        <Route path='/case-studies/:id' component={CaseStudiesDetails} />
        <Route path='/questionnaire' component={QuestionnaireScreen} />
        <Route path={'/login'} component={LoginScreen} />
        <Route path={'/reports'} component={ReportScreen} />
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
