import * as React from "react";
import {useState, createContext} from "react";

export interface Permissions {
  groups?: string[];
}

export const PermissionsContext = createContext<Permissions>(undefined);

export function PermissionsProvider(props: React.PropsWithChildren<{}>) {
  const [permissions, setPermissions] = useState({
    groups: ["user", "admin"],
  });

  return <PermissionsContext.Provider value={permissions}>
    {props.children}
  </PermissionsContext.Provider>
}
