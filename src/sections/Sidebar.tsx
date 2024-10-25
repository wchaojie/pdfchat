import type { IHighlight } from "react-pdf-highlighter";
import { Button } from "@mui/material"

const updateHash = (highlight: IHighlight) => {
  document.location.hash = `highlight-${highlight.id}`;
};

declare const APP_VERSION: string;

interface SidebarProps {
  highlights: Array<IHighlight>;
  resetHighlights: () => void;
  // toggleDocument: () => void;
}

export function Sidebar({
  highlights,
  resetHighlights,
}: SidebarProps) {
  return (
    <div className="sidebar" style={{ width: "25vw" }}>
      <ul className="sidebar__highlights">
        {highlights.map((highlight, index) => (
          <li
            // biome-ignore lint/suspicious/noArrayIndexKey: This is an example app
            key={index}
            className="sidebar__highlight"
            onClick={() => {
              updateHash(highlight);
            }}
          >
            <div>
              <strong>{highlight.comment.text}</strong>
              {highlight.content.text ? (
                <blockquote style={{ marginTop: "0.5rem" }}>
                  {`${highlight.content.text.slice(0, 90).trim()}…`}
                </blockquote>
              ) : null}
              {highlight.content.image ? (
                <div
                  className="highlight__image"
                  style={{ marginTop: "0.5rem" }}
                >
                  <img src={highlight.content.image} alt={"Screenshot"} />
                </div>
              ) : null}
            </div>
            <div className="highlight__location">
              Page {highlight.position.pageNumber}
            </div>
          </li>
        ))}
      </ul>
      <div style={{ padding: "1rem" }}>
        {/*<button type="button" onClick={toggleDocument}>*/}
        {/*  Toggle PDF document*/}
        {/*</button>*/}
      </div>
      {highlights.length > 0 ? (
        // <div style={{ padding: "1rem" }}>
        //   <button type="button" onClick={resetHighlights}>
        //     Reset highlights
        //   </button>
        // </div>
        <Button variant="contained">Reset</Button>
      ) : null}
    </div>
  );
}
