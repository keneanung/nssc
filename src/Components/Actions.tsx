import { Action, ButtonAction, CommandAction, DisableAction, DisablemeAction, ScriptAction } from "@keneanung/iron-realms-nexus-typings";
import { Card, Checkbox, FormControlLabel, Stack, TextField, Typography } from "@mui/material";
import { ReactNode } from "react";
import { CodeBlock } from "./CodeBlock";


export const renderAction = (action: Action) => {
  switch (action.action) {
    case "script":
      return <ScriptActionView action={action} />;
    case "command":
      return <CommandActionView action={action} />;
    case "disableme":
      return <DisableMeActionView action={action} />;
    case "button":
      return <ButtonActionView action={action} />;
    case "disable":
      return <DisableActionView action={action} />;
    default:
      return <TextField value={action.action} />
  }
}

const BaseActionView = ({ action, children }: { action: Action, children?: ReactNode }) => {
  return (
    <Card variant='outlined' sx={{ width: '100%', overflow: 'auto' }}>
      <Stack spacing={2}>
        <Typography color="text.secondary">{action.action}</Typography>
        {children}
      </Stack>
    </Card>
  )
}

const ScriptActionView = ({ action }: { action: ScriptAction }) => {
  return (
    <BaseActionView action={action}>
      <CodeBlock codeToHighlight={action.script} />
    </BaseActionView>
  );
};

const CommandActionView = ({ action }: { action: CommandAction }) => {
  return (
    <BaseActionView action={action}>
      <FormControlLabel disabled control={<Checkbox checked={action.prefix_suffix} />} label='prefix suffix' />
        <TextField label='command' variant="outlined" value={action.command} />
    </BaseActionView>
  );
};

const DisableMeActionView = ({ action }: { action: DisablemeAction }) => {
  return (
    <BaseActionView action={action} />
  );
};

const ButtonActionView = ({ action }: { action: ButtonAction }) => {
  return (
    <BaseActionView action={action}>
      <TextField label='Button to change' variant="outlined" value={action.buttonid} />
      <TextField label='What to change' variant="outlined" value={action.buttonaction} />
      <TextField label='New command to send' variant="outlined" value={action.command} />
      <TextField label='New button label' variant="outlined" value={action.label} />
    </BaseActionView>
  );
};

const DisableActionView = ({ action }: { action: DisableAction }) => {
  return (
    <BaseActionView action={action}>
      <TextField label='What to disable' variant="outlined" value={action.name} />
      <TextField label='Type of reflex to disable' variant="outlined" value={action.type} />
    </BaseActionView>
  );
}