import { Route, Switch } from 'react-router-dom';


import './App.css';
import HomePage from './home/home.component';
import CaseStudiesDetails from './pages/case-studies-details/case-studies-details.component';
import CaseStudies from './pages/case-studies/case-studies.component';
import QuestionnaireScreen from './pages/questionnaire/questionnaire.component';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/' exact component={HomePage}/>
        <Route path='/case-studies' exact component={CaseStudies} />
        <Route path='/case-studies/:id' component={CaseStudiesDetails} />
        <Route path='/questionnaire' component={QuestionnaireScreen} />
      </Switch>
    </div>
  );
}

export default App;
