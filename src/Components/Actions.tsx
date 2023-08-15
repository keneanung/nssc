import { Action } from "@keneanung/iron-realms-nexus-typings";
import { TextField } from "@mui/material";


export const renderAction = (action: Action) => <TextField value={action.action} />