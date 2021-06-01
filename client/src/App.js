import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
//import AddCalendar from './directories/AddCal';
import Home from './directories/Home';
import Invite from './directories/Invite';
import Login from './directories/LogIn';
import SignUp from './directories/SignUp';
import Calendar from './CalEven/Calendar';


class App extends React.Component {//newly created function
    
    constructor(props) {
        super(props);
        this.state = {apiResponse:""};
    }
   
    callAPI() {
        fetch("http://localhost:9000") //fetch from backend
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res })); //get the response from page
    }

    componentWillMount() {
        this.callAPI();
    }


  render(){
    return(
      <Router>
        <div className="App">
          <NavBar />
          <div className="content">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <SignUp />
              </Route>
              <Route exact path="/create">
                <Calendar />
              </Route>
              <Route exact path="/invite">
                <Invite />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
      /*<div>
        <div>
          <link to ="/Home/" style={{color:'black'}}>
            <div>Home</div>
          </link>
          <link to ="/LogIn/" style={{color:'black'}}>
            <div>Login</div>
          </link>
          <link to ="/Calendar/" style={{color:'black'}}>
            <div>Creat events</div>
          </link>
        </div>
      </div>*/
    );
  }
}

export default App;
