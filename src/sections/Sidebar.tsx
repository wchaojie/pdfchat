import type { IHighlight } from "react-pdf-highlighter"
import { Button, Stack, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { useState } from "react"

const updateHash = (highlight: IHighlight) => {
  document.location.hash = `highlight-${highlight.id}`
}

interface SidebarProps {
  highlights: Array<IHighlight>
  resetHighlights: () => void
  // toggleDocument: () => void
}

export function Sidebar({ highlights, resetHighlights }: SidebarProps) {
  const [alignment, setAlignment] = useState("note")
  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment)
  }

  return (
    <div className="sidebar" style={{ width: "25vw" }}>
      <Stack m={2} direction={"row"} justifyContent={"center"} alignItems={"center"}>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
          fullWidth
        >
          <ToggleButton value="note">Note</ToggleButton>
          <ToggleButton value="chat">Chat</ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      {alignment === "note" && (
        <>
          <ul className="sidebar__highlights">
            {highlights.map((highlight, index) => (
              <li
                // biome-ignore lint/suspicious/noArrayIndexKey: This is an example app
                key={index}
                className="sidebar__highlight"
                onClick={() => {
                  updateHash(highlight)
                }}
              >
                <div>
                  {/*<strong>{highlight.comment.text}</strong>*/}
                  {highlight.content.text ? (
                    <blockquote style={{ marginTop: "0.5rem" }}>
                      {`${highlight.content.text.slice(0, 90).trim()}…`}
                    </blockquote>
                  ) : null}
                  {highlight.content.image ? (
                    <div className="highlight__image" style={{ marginTop: "0.5rem" }}>
                      <img src={highlight.content.image} alt={"Screenshot"} />
                    </div>
                  ) : null}
                </div>
                <div className="highlight__location">Page {highlight.position.pageNumber}</div>
              </li>
            ))}
          </ul>
          {highlights.length > 0 ? (
            <Stack my={2} alignItems={"center"}>
              <Button variant="contained" onClick={resetHighlights}>
                Reset
              </Button>
            </Stack>
          ) : null}
        </>
      )}
      {alignment === "chat" && <Chat />}
    </div>
  )
}

const Chat = () => {
  return (
    <Stack mx={1} height={"90vh"} justifyContent={"end"}>
      <Stack width={1}>
        <TextField fullWidth rows={3} multiline />
      </Stack>
    </Stack>
  )
}
