"use client"
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Box, CircularProgress } from "@mui/material"
import { AreaHighlight, Highlight, Popup } from "react-pdf-highlighter";
import {
  PdfHighlighter,
  PdfLoader,
  Tip,
  Content,
  IHighlight,
  NewHighlight,
  ScaledPosition,
} from "react-pdf-highlighter";

import { Sidebar } from "@/sections/Sidebar";
import { Spinner } from "@/sections/Spinner";

import { testHighlights as _testHighlights } from "../test-highlights";

import "@/style/App.css";
import "@/style/style.css";

const testHighlights: Record<string, Array<IHighlight>> = _testHighlights;

const getNextId = () => String(Math.random()).slice(2);

// 哈希中解析id
const parseIdFromHash = () => {
  document.location.hash.slice("#highlight-".length);
}

// 重制hash
const resetHash = () => {
  document.location.hash = "";
};

// 高亮弹出窗
const HighlightPopup = ({ comment }: {
  comment: { text: string; emoji: string };
}) =>
  comment.text ? (
    <div className="Highlight__popup">
      {comment.emoji} {comment.text}
    </div>
  ) : null;

const searchParams = new URLSearchParams(document.location.search);

// ------------------------------------------------------------------

export default function PdfChat() {
  const url = searchParams.get("pdf") || ""; // pdf url

  const [highlights, setHighlights] = useState<IHighlight[]>(
    testHighlights[url] ? [...testHighlights[url]] : [],
  );

  // 重制高亮
  const resetHighlights = () => {
    setHighlights([]);
  };

  // 切换pdf文档
  // const toggleDocument = () => {
  //   const newUrl = url === PRIMARY_PDF_URL ? SECONDARY_PDF_URL : PRIMARY_PDF_URL;
  //   setUrl(newUrl);
  //   setHighlights(testHighlights[newUrl] ? [...testHighlights[newUrl]] : []);
  // };

  const scrollViewerTo = useRef((highlight: IHighlight) => {
    // Implement scrolling logic here
  });

  // 滚动到高亮位置
  const scrollToHighlightFromHash = useCallback(() => {
    const highlight = getHighlightById(parseIdFromHash());
    if (highlight) {
      scrollViewerTo.current(highlight);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("hashchange", scrollToHighlightFromHash, false);
    return () => {
      window.removeEventListener(
        "hashchange",
        scrollToHighlightFromHash,
        false,
      );
    };
  }, [scrollToHighlightFromHash]);

  const getHighlightById = (id: string) => {
    return highlights.find((highlight) => highlight.id === id);
  };

  const addHighlight = (highlight: NewHighlight) => {
    console.log("Saving highlight", highlight);
    setHighlights((prevHighlights) => [
      { ...highlight, id: getNextId() },
      ...prevHighlights,
    ]);
  };

  const updateHighlight = (
    highlightId: string,
    position: Partial<ScaledPosition>,
    content: Partial<Content>,
  ) => {
    console.log("Updating highlight", highlightId, position, content);
    setHighlights((prevHighlights) =>
      prevHighlights.map((h) => {
        const {
          id,
          position: originalPosition,
          content: originalContent,
          ...rest
        } = h;
        return id === highlightId
          ? {
            id,
            position: { ...originalPosition, ...position },
            content: { ...originalContent, ...content },
            ...rest,
          }
          : h;
      }),
    );
  };

  return (
    <Box className="App" sx={{ display: "flex", height: "100vh" }}>
      <Box
        height={"100vh"}
        width={"75vw"}
        position={"relative"}
      >
        <PdfLoader url={url} beforeLoad={<Spinner />}>
          {(pdfDocument) => (
            <PdfHighlighter
              pdfDocument={pdfDocument}
              enableAreaSelection={(event) => event.altKey}
              onScrollChange={resetHash}
              scrollRef={(scrollTo) => {
                scrollViewerTo.current = scrollTo;
                scrollToHighlightFromHash();
              }}
              // 选择完成
              onSelectionFinished={(
                position,
                content,
                hideTipAndSelection,
                transformSelection,
              ) => (
                <Tip
                  onOpen={transformSelection}
                  onConfirm={(comment) => {
                    addHighlight({ content, position, comment });
                    hideTipAndSelection();
                  }}
                />
              )}
              // 高亮转换
              highlightTransform={(
                highlight,
                index,
                setTip,
                hideTip,
                viewportToScaled,
                screenshot,
                isScrolledTo,
              ) => {
                const isTextHighlight = !highlight.content?.image;
                const component = isTextHighlight ? (
                  <Highlight
                    isScrolledTo={isScrolledTo}
                    position={highlight.position}
                    comment={highlight.comment}
                  />
                ) : (
                  <AreaHighlight
                    isScrolledTo={isScrolledTo}
                    highlight={highlight}
                    onChange={(boundingRect) => {
                      updateHighlight(
                        highlight.id,
                        { boundingRect: viewportToScaled(boundingRect) },
                        { image: screenshot(boundingRect) },
                      );
                    }}
                  />
                );

                return (
                  <Popup
                    popupContent={<HighlightPopup {...highlight} />}
                    onMouseOver={(popupContent) =>
                      setTip(highlight, (highlight) => popupContent)
                    }
                    onMouseOut={hideTip}
                    key={index}
                  >
                    {component}
                  </Popup>
                );
              }}
              highlights={highlights}
            />
          )}
        </PdfLoader>
      </Box>
      <Sidebar
        highlights={highlights}
        resetHighlights={resetHighlights}
        // toggleDocument={toggleDocument}
      />
    </Box>
  );
}
