
import { Highlight } from "prism-react-renderer";

export const CodeBlock = ({ codeToHighlight }: { codeToHighlight: string }) => {
  return <Highlight
    code={codeToHighlight}
    language="js"
  >
    {({ style, tokens, getLineProps, getTokenProps }) => (
      <pre style={style}>
        {tokens.map((line, i) => (
          <div key={i} {...getLineProps({ line })}>
            <span>{i + 1}</span>&nbsp;
            {line.map((token, key) => (
              <span key={key} {...getTokenProps({ token })} />
            ))}
          </div>
        ))}
      </pre>
    )}
  </Highlight>;
}