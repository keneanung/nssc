import { Package, Reflex } from "@keneanung/iron-realms-nexus-typings";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { TreeView, TreeItem } from '@mui/lab';
import { ExpandMore, ChevronRight } from '@mui/icons-material';
import { ReflexView } from "./Reflexes";
import React from "react";

const renderTree = (reflex: Reflex) => {
  return (
    <TreeItem key={reflex.id} nodeId={reflex.id.toString()} label={reflex.name}>
      {
        reflex.type === 'group' ? reflex.items.map(item => renderTree(item)) : null
      }
    </TreeItem>
  )
}

export const ReflexTreeView = ({ pkg, setActiveId, activeId }: { pkg: Package, setActiveId: (newId: number) => void, activeId: number }) => {
  return (
    <Grid spacing={2} sx={{ height: '40vh' }} container>
      <Grid xs={2}>
        <TreeView aria-label="rich object"
          defaultCollapseIcon={<ExpandMore />}
          defaultExpanded={['0']}
          defaultExpandIcon={<ChevronRight />}
          onNodeSelect={(_e: React.SyntheticEvent, id: string) => {
            setActiveId(parseInt(id))
          }}
          selected={activeId.toString()}>
          {renderTree(pkg)}
        </TreeView>
      </Grid>
      <Grid xs={10}>
        <ReflexView activeId={activeId} pkg={pkg} />
      </Grid>
    </Grid >
  )
}