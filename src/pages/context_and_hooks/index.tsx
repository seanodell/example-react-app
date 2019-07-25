import * as React from "react";
import {useContext} from "react";
import * as ReactDOM from "react-dom";

import {PermissionsProvider, PermissionsContext} from '../../contexts/PermissionsContext';

export function Page() {
  let permissions = useContext(PermissionsContext);

  let groups = permissions.groups.map(group =>
    <li><a href={group}>{group}</a></li>
  );

  return <div>
    {groups}      
    </div>
  ;
}

const application = document.getElementById("application");
application ? ReactDOM.render(<PermissionsProvider><Page /></PermissionsProvider>, application) : false;
