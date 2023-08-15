import {
  FunctionReflex,
  Package,
  Reflex,
} from "@keneanung/iron-realms-nexus-typings";
import { useState, useMemo } from "react";
import "./App.css";
import { convertPackage } from "@keneanung/nexus-simplified-scripting-converter";
import { fileSave } from "browser-fs-access";
import { ReflexTreeView } from "./Components/ReflexTreeView";
import { Button, useMediaQuery, createTheme, ThemeProvider, CssBaseline } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

const defaultReflex: FunctionReflex = {
  type: "function",
  enabled: true,
  id: 1,
  code: "foo",
  name: "bar",
};

const defaultPackage: Package = {
  id: 0,
  name: "Default Package",
  description: "Please use the button above to load your package",
  enabled: true,
  items: [defaultReflex],
  type: "group",
};

const convert = (pkgToConvert: Package) => {
  const conversionPackage = structuredClone(pkgToConvert);
  convertPackage(conversionPackage);
  return conversionPackage;
}

let nextId = 0;
const addIds = (reflex: Reflex) => {
  reflex.id = nextId++;
  if (reflex.type === 'group') {
    for (const item of reflex.items) {
      addIds(item)
    }
  }
}

const typeToAction = (pkg: any) => {
  if (pkg.actions) {
    for (const action of pkg.actions) {
      if (action.type) {
        action.action = action.type
      }
    }
  } else if (pkg.items) {
    for (const item of pkg.items) {
      typeToAction(item);
    }
  }
}

function App() {
  const [pkg, setPkg] = useState<Package>(defaultPackage);
  const convertedPkg = convert(pkg);
  const [activeId, setActiveId] = useState(0);

  const fileChangeCallback = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.currentTarget.files;
    if (!files || !files[0]) {
      console.log("got no file");
      return;
    }
    const file = files[0];
    const fileContent = await file.text();
    const pkg = JSON.parse(fileContent);
    typeToAction(pkg);
    console.log(pkg);
    nextId = 0;
    addIds(pkg)
    setPkg(pkg as Package);
    setActiveId(0);
  };

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container columns={2} columnSpacing={2} rowSpacing={2} sx={{ height: '100%' }}>
        <Grid>
          <Button
            variant="contained"
            component="label"
          >
            Load package to convert
            <input
              type="file"
              id="file"
              accept=".nxs"
              onChange={fileChangeCallback}
              style={{ paddingRight: '20px' }}
              hidden
            />
          </Button>
        </Grid>
        <Grid>
          <Button
            variant="contained"
            component="label"
            onClick={() => {
              const file = new Blob([JSON.stringify(convertedPkg)], {
                type: "application/json",
              })
              fileSave(
                file,
                {
                  extensions: [".nxs"],
                  startIn: 'downloads',
                  fileName: `${convertedPkg.name}.nxs`
                }
              )
            }}
          >
            Save converted package
          </Button>
        </Grid>
        <Grid xs={2}>
          <ReflexTreeView activeId={activeId} pkg={pkg} setActiveId={setActiveId} />
        </Grid>
        <Grid xs={2}>
          <ReflexTreeView activeId={activeId} pkg={convertedPkg} setActiveId={setActiveId} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
