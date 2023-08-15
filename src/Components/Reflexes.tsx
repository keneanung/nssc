import { Group, Package, Reflex, FunctionReflex, Alias, Keybind, Trigger, Event } from "@keneanung/iron-realms-nexus-typings";
import { ReactNode } from "react";
import { Card, Typography, Checkbox, FormControlLabel, Stack, TextField } from '@mui/material'
import { CodeBlock } from "./CodeBlock";
import { renderAction } from "./Actions";

export const ReflexView = ({ activeId, pkg }: { activeId: number, pkg: Package }) => {
  return (
    renderReflex(findReflexById(activeId, pkg))
  )
}

const findReflexById = (id: number, reflex: Reflex): Reflex | undefined => {
  if (reflex.id === id) {
    return reflex;
  }
  if (reflex.type === "group") {
    for (const reflexChild of reflex.items) {
      const found = findReflexById(id, reflexChild);
      if (found) {
        return found;
      }
    }
  }
  return undefined;
};

const renderReflex = (reflex?: Reflex) => {
  if (!reflex) {
    return "Reflex not found";
  }
  switch (reflex.type) {
    case "group":
      return <ReflexGroupView reflex={reflex} />
    case "function":
      return <FunctionView reflex={reflex} />
    case "keybind":
      return <KeybindView reflex={reflex} />
    case "alias":
      return <AliasView reflex={reflex} />
    case "trigger":
      return <TriggerView reflex={reflex} />
    case "event":
      return <EventView reflex={reflex} />
    default:
      break;
  }
}

const BaseReflexView = ({ reflex, children }: { reflex: Reflex, children?: ReactNode }) => {
  return (
    <Card variant='outlined' sx={{ width: '100%', overflow: 'auto' }}>
      <Stack spacing={2}>
        <Typography color="text.secondary">{reflex.name}</Typography>
        <FormControlLabel disabled control={<Checkbox checked={reflex.enabled} />} label='enabled' />
        {children}
      </Stack>
    </Card>
  )
}

const ReflexGroupView = ({ reflex }: { reflex: Group | Package }) => {
  return (
    <BaseReflexView reflex={reflex}>
      {reflex.id === 0 ? <TextField value={(reflex as Package).description} multiline /> : null}
    </BaseReflexView>
  )
}

const FunctionView = ({ reflex }: { reflex: FunctionReflex }) => {
  return (
    <BaseReflexView reflex={reflex}>
      <CodeBlock codeToHighlight={reflex.code} />
    </BaseReflexView>
  )
}

const KeybindView = ({ reflex }: { reflex: Keybind }) => {
  return (
    <BaseReflexView reflex={reflex}>
      <Stack direction='row' spacing={2}>
        <TextField label='key' variant="outlined" value={reflex.key} />
        <FormControlLabel disabled control={<Checkbox checked={reflex.key_shift} />} label='shift' />
        <FormControlLabel disabled control={<Checkbox checked={reflex.key_ctrl} />} label='ctrl' />
        <FormControlLabel disabled control={<Checkbox checked={reflex.key_alt} />} label='alt' />
      </Stack>
      <Stack>
        {reflex.actions.map(renderAction)}
      </Stack>
    </BaseReflexView>
  )
}

const AliasView = ({ reflex }: { reflex: Alias }) => {
  return (
    <BaseReflexView reflex={reflex}>
      <Stack direction='row' spacing={2}>
        <TextField label='match type' variant="outlined" value={reflex.matching} />
        <TextField label='text' variant="outlined" value={reflex.text} />
        <FormControlLabel disabled control={<Checkbox checked={reflex.case_sensitive} />} label='case sensitive' />
        <FormControlLabel disabled control={<Checkbox checked={reflex.prefix_suffix} />} label='prefix suffix' />
        <FormControlLabel disabled control={<Checkbox checked={reflex.whole_words} />} label='whole words' />
      </Stack>
      <Stack>
        {reflex.actions.map(renderAction)}
      </Stack>
    </BaseReflexView>
  )
}

const TriggerView = ({ reflex }: { reflex: Trigger }) => {
  return (
    <BaseReflexView reflex={reflex}>
      <Stack direction='row' spacing={2}>
        <TextField label='match type' variant="outlined" value={reflex.matching} />
        <TextField label='text' variant="outlined" value={reflex.text} />
        <FormControlLabel disabled control={<Checkbox checked={reflex.case_sensitive} />} label='case sensitive' />
        <FormControlLabel disabled control={<Checkbox checked={reflex.whole_words} />} label='whole words' />
      </Stack>
      <Stack>
        {reflex.actions.map(renderAction)}
      </Stack>
    </BaseReflexView>
  )
}

const EventView = ({ reflex }: { reflex: Event }) => {
  return (
    <BaseReflexView reflex={reflex}>
      <Stack direction='row' spacing={2}>
        <TextField label='event type' variant="outlined" value={reflex.evtype} />
        <TextField label='event subtype' variant="outlined" value={reflex.evsubtype} />
      </Stack>
      <Stack>
        {reflex.actions.map(renderAction)}
      </Stack>
    </BaseReflexView>
  )
}
