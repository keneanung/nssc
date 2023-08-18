import { Action, ButtonAction, CommandAction, DisableAction, DisablemeAction, EnableAction, FunctionAction, GagAction, GotoAction, HighlightAction, IfAction, LabelAction, LinkifyAction, NotificationAction, NotifyAction, RepeatAction, RewriteAction, ScriptAction, SoundAction, StopAction, VariableAction, WaitAction, WaitForAction } from "@keneanung/iron-realms-nexus-typings";
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
    case "enable":
      return <EnableActionView action={action} />;
    case "function":
      return <FunctionActionView action={action} />;
    case "gag":
      return <GagActionView action={action} />;
    case "goto":
      return <GotoActionView action={action} />;
    case "highlight":
      return <HighlightActionView action={action} />;
    case "if":
      return <IfActionView action={action} />;
    case "label":
      return <LabelActionView action={action} />;
    case "linkify":
      return <LinkifyActionView action={action} />;
    case "notification":
      return <NotificationActionView action={action} />;
    case "notify":
      return <NotifyActionView action={action} />;
    case "repeat":
      return <RepeatActionView action={action} />;
    case "rewrite":
      return <RewriteActionView action={action} />;
    case "sound":
      return <SoundActionView action={action} />;
    case "stop":
      return <StopActionView action={action} />;
    case "variable":
      return <VariableActionView action={action} />;
    case "wait":
      return <WaitActionView action={action} />;
    case "waitfor":
      return <WaitForActionView action={action} />;
    default:
        // if any action is not handled action won't be never and thus you will get compile time error
        const _exhaustiveCheck: never = action;
        console.log("will throw type (compile time) error if any category is not handled by switch case", _exhaustiveCheck);
        return null;
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

const EnableActionView = ({ action }: { action: EnableAction }) => {
  return (
    <BaseActionView action={action}>
      <TextField label='What to enable' variant="outlined" value={action.name} />
      <TextField label='Type of reflex to enable' variant="outlined" value={action.type} />
    </BaseActionView>
  );
}

const FunctionActionView = ({ action }: { action: FunctionAction }) => {
  return (
    <BaseActionView action={action}>
      <TextField label='Target function' variant="outlined" value={action.fn} />
    </BaseActionView>
  );
}

const GagActionView = ({ action }: { action: GagAction }) => {
  return (
    <BaseActionView action={action} />
  );
}

const GotoActionView = ({ action }: { action: GotoAction }) => {
  return (
    <BaseActionView action={action}>
      <TextField label='Target' variant="outlined" value={action.label} />
    </BaseActionView>
  );
}

const HighlightActionView = ({ action }: { action: HighlightAction }) => {
  return (
    <BaseActionView action={action}>
      <TextField label='Highlight type' variant="outlined" value={action.highlight} />
      <TextField label='No of backref to highlight' variant="outlined" value={action.highlight_backref} />
      <TextField label='Highlight Foreground Colour' variant="outlined" value={action.highlight_fg} />
      <TextField label='Highlight Background Colour' variant="outlined" value={action.highlight_bg} />
    </BaseActionView>
  );
}

const IfActionView = ({ action }: { action: IfAction }) => {
  return (
    <BaseActionView action={action}>
      <FormControlLabel disabled control={<Checkbox checked={action["cond-cs"]} />} label='prefix suffix' />
      <TextField label='Condition modification' variant="outlined" value={action["cond-mod"]} />
      <TextField label='Condition check' variant="outlined" value={action["cond-op"]} />
      <TextField label='Data source 1 for condition' variant="outlined" value={action["cond-type1"]} />
      <TextField label='Data 1 for condition' variant="outlined" value={action["cond-val1"]} />
      <TextField label='Data source 2 for condition' variant="outlined" value={action["cond-type2"]} />
      <TextField label='Data 2 for condition' variant="outlined" value={action["cond-val2"]} />
      <TextField label='Action if condition is true' variant="outlined" value={action.dothen} />
      <TextField label='Jump target if condition is true' variant="outlined" value={action.dothenlabel} />
      <TextField label='Action if condition is false' variant="outlined" value={action.doelse} />
      <TextField label='Jump target if condition is false' variant="outlined" value={action.doelselabel} />
    </BaseActionView>
  );
}

const LabelActionView = ({ action }: { action: LabelAction }) => {
  return (
    <BaseActionView action={action}>
      <TextField label='Name' variant="outlined" value={action.label} />
    </BaseActionView>
  );
}

const LinkifyActionView = ({ action }: { action: LinkifyAction }) => {
  return (
    <BaseActionView action={action}>
      <TextField label='What to linkify' variant="outlined" value={action.linkify} />
      <TextField label='Backref to linkify' variant="outlined" value={action.linkify_backref} />
      <TextField label='Link colour' variant="outlined" value={action.linkify_color} />
      <TextField label='Command type' variant="outlined" value={action.linkify_command_type} />
      <TextField label='Command to run' variant="outlined" value={action.linkify_command} />
      <TextField label='Text type' variant="outlined" value={action.linkify_text_type} />
      <TextField label='Text to use' variant="outlined" value={action.linkify_text} />
    </BaseActionView>
  );
}

const NotificationActionView = ({ action }: { action: NotificationAction }) => {
  return (
    <BaseActionView action={action}>
      <TextField label='Window title' variant="outlined" value={action.heading} />
      <TextField label='Notification text' variant="outlined" value={action.text} />
    </BaseActionView>
  );
}

const NotifyActionView = ({ action }: { action: NotifyAction }) => {
  return (
    <BaseActionView action={action}>
      <TextField label='Text to display' variant="outlined" value={action.notice} />
      <TextField label='Foreground colour' variant="outlined" value={action.notice_fg} />
      <TextField label='Background colour' variant="outlined" value={action.notice_bg} />
    </BaseActionView>
  );
}

const RepeatActionView = ({ action }: { action: RepeatAction }) => {
  return (
    <BaseActionView action={action}>
      <FormControlLabel disabled control={<Checkbox checked={action["cond-cs"]} />} label='prefix suffix' />
      <TextField label='Condition modification' variant="outlined" value={action["cond-mod"]} />
      <TextField label='Condition check' variant="outlined" value={action["cond-op"]} />
      <TextField label='Data source 1 for condition' variant="outlined" value={action["cond-type1"]} />
      <TextField label='Data 1 for condition' variant="outlined" value={action["cond-val1"]} />
      <TextField label='Data source 2 for condition' variant="outlined" value={action["cond-type2"]} />
      <TextField label='Data 2 for condition' variant="outlined" value={action["cond-val2"]} />
      <TextField label='Loop mode' variant="outlined" value={action.mode} />
      <TextField label='Loop end label' variant="outlined" value={action.label} />
    </BaseActionView>
  );
}

const RewriteActionView = ({ action }: { action: RewriteAction }) => {
  return (
    <BaseActionView action={action}>
      <TextField label='What to rewrite' variant="outlined" value={action.rewrite} />
      <TextField label='Backref to rewrite' variant="outlined" value={action.rewrite_backref} />
      <TextField label='New text colour' variant="outlined" value={action.rewrite_fg} />
      <TextField label='New text background colour' variant="outlined" value={action.rewrite_bg} />
      <TextField label='Colour type' variant="outlined" value={action.rewrite_colors} />
      <TextField label='Text type' variant="outlined" value={action.rewrite_text_type} />
      <TextField label='Text to use' variant="outlined" value={action.rewrite_text} />
    </BaseActionView>
  );
}

const SoundActionView = ({ action }: { action: SoundAction }) => {
  return (
    <BaseActionView action={action}>
      <TextField label='Sound to play' variant="outlined" value={action.sound} />
    </BaseActionView>
  );
}

const StopActionView = ({ action }: { action: StopAction }) => {
  return (
    <BaseActionView action={action} />
  );
}

const VariableActionView = ({ action }: { action: VariableAction }) => {
  return (
    <BaseActionView action={action}>
      <TextField label='Variable to update' variant="outlined" value={action.varname} />
      <TextField label='Update operation' variant="outlined" value={action.op} />
      <TextField label='Value source' variant="outlined" value={action.valtype} />
      <TextField label='Value' variant="outlined" value={action.value} />
    </BaseActionView>
  );
}

const WaitActionView = ({ action }: { action: WaitAction }) => {
  return (
    <BaseActionView action={action}>
      <TextField label='Seconds to wait' variant="outlined" value={action.seconds} />
      <TextField label='Milliseconds to wait' variant="outlined" value={action.milliseconds} />
    </BaseActionView>
  );
}

const WaitForActionView = ({ action }: { action: WaitForAction }) => {
  return (
    <BaseActionView action={action}>
      <TextField label='match type' variant="outlined" value={action.matching} />
      <TextField label='text' variant="outlined" value={action.text} />
      <FormControlLabel disabled control={<Checkbox checked={action.case_sensitive} />} label='Match uppercase/lowercase exactly' />
      <FormControlLabel disabled control={<Checkbox checked={action.whole_words} />} label='Match whole words only' />
      <TextField label='expire after' variant="outlined" value={action.expire} />
    </BaseActionView>
  );
}