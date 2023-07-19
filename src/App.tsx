import {
  FunctionReflex,
  Package,
  Reflex,
} from "@keneanung/iron-realms-nexus-typings";
import { useState } from "react";
import "./App.css";
import { Tree } from "react-arborist";
import { convertPackage } from "@keneanung/nexus-simplified-scripting-converter";

const defaultReflex: FunctionReflex = {
  type: "function",
  enabled: true,
  id: 2,
  code: "foo",
  name: "bar",
};

const defaultPackage: Package = {
  id: 1,
  name: "Default Package",
  description: "Please use the button above to load your package",
  enabled: true,
  items: [defaultReflex],
  type: "group",
};

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

const convert = (pkgToConvert: Package) => {
  const conversionPackage = structuredClone(pkgToConvert);
  convertPackage(conversionPackage);
  return conversionPackage;
}

let nextId = 0;
const addIds = (reflex: Reflex) => {
  reflex.id = nextId++;
  if(reflex.type === 'group'){
    for (const item of reflex.items) {
      addIds(item)
    }
  }
}

function App() {
  const [pkg, setPkg] = useState<Package>(defaultPackage);
  const convertedPkg = convert(pkg);
  const [originalActiveReflex, setOriginalActiveReflex] =
    useState<Reflex>(defaultReflex);
  const [convertedActiveReflex, setConvertedActiveReflex] = useState<Reflex>(
    convertedPkg.items[0],
  );

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
    const pkg = JSON.parse(fileContent) as Package;
    console.log(pkg);
    addIds(pkg)
    setPkg(pkg);
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <input
          type="file"
          id="file"
          accept=".nxs"
          onChange={fileChangeCallback}
        />
      </div>
      <div style={{ display: "flex" }}>
        <Tree
          data={[pkg]}
          childrenAccessor={"items"}
          idAccessor={(d) => d.id.toString()}
          onSelect={(e) => {
            const item = e[0]?.data;
            if (!item) return;
            setOriginalActiveReflex(item);
            setConvertedActiveReflex(
              findReflexById(item.id, convertedPkg) ?? defaultReflex,
            );
          }}
          selection={convertedActiveReflex.id.toString()}
        />
        <div>Original {originalActiveReflex?.name || "undefiend"}</div>
      </div>
      <div style={{ display: "flex" }}>
        <Tree
          data={[convertedPkg]}
          childrenAccessor={"items"}
          idAccessor={(d) => d.id.toString()}
          onSelect={(e) => {
            const item = e[0]?.data;
            if (!item) return;
            setConvertedActiveReflex(item);
            setOriginalActiveReflex(
              findReflexById(item.id, pkg) ?? defaultReflex,
            );
          }}
        />
        <div>Converted {convertedActiveReflex?.name || "undefiend"}</div>
      </div>
    </>
  );
}

export default App;
