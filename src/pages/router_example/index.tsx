import * as React from "react";
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import * as ReactDOM from "react-dom";

import { Profile } from "../../components/Profile";

export function Page() {
  return (
    <Router>
      <div>
        <h3>Router Example</h3>
        <li><a href={'/pages/'}>Simple Link to Home</a></li>

        <h4>React Router URL Parameters Example</h4>
        <li><Link to={'/profile/admin1'}>Profile of admin1</Link></li>
        <li><Link to={'/profile/user1'}>Profile of user1</Link></li>

        <Route path='/profile/:username' component={Profile} />
      </div>
    </Router>);
}

const application = document.getElementById("application");
application ? ReactDOM.render(<Page />, application) : false;
