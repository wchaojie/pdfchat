"use client"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { Box, Button } from "@mui/material"
import {
  AreaHighlight,
  Content,
  Highlight,
  IHighlight,
  NewHighlight,
  PdfHighlighter,
  PdfLoader,
  Popup,
  ScaledPosition,
} from "react-pdf-highlighter"

import { Sidebar } from "@/sections/Sidebar"
import { Spinner } from "@/sections/Spinner"

import { testHighlights as _testHighlights } from "../test-highlights" // 测试数据
import "@/style/App.css"
import "@/style/style.css"

const testHighlights: Record<string, Array<IHighlight>> = _testHighlights

const getNextId = () => String(Math.random()).slice(2)

// 哈希中解析id
const parseIdFromHash = () => {
  document.location.hash.slice("#highlight-".length)
}

// 重制hash
const resetHash = () => {
  document.location.hash = ""
}

// 高亮弹出窗
const HighlightPopup = ({ comment }: { comment: { text: string; emoji: string } }) =>
  comment.text ? (
    <div className="Highlight__popup">
      {comment.emoji} {comment.text}
    </div>
  ) : null

// ------------------------------------------------------------------

export default function PdfChat() {
  const searchParams = new URLSearchParams(document.location.search)
  const url = searchParams.get("pdf") || "" // pdf url

  const [highlights, setHighlights] = useState<IHighlight[]>(
    testHighlights[url] ? [...testHighlights[url]] : []
  )

  // 重制高亮
  const resetHighlights = () => {
    setHighlights([])
  }

  // 切换pdf文档
  // const toggleDocument = () => {
  //   const newUrl = url === PRIMARY_PDF_URL ? SECONDARY_PDF_URL : PRIMARY_PDF_URL;
  //   setUrl(newUrl);
  //   setHighlights(testHighlights[newUrl] ? [...testHighlights[newUrl]] : []);
  // };

  const scrollViewerTo = useRef((highlight: IHighlight) => {
    console.log(highlight)
    // Implement scrolling logic here
  })

  // 根据ID获取高亮
  const getHighlightById = (id: string) => {
    return highlights.find(highlight => highlight.id === id)
  }

  // 滚动到高亮位置
  const scrollToHighlightFromHash = useCallback(() => {
    const highlight = getHighlightById(parseIdFromHash())
    if (highlight) {
      scrollViewerTo.current(highlight)
    }
  }, [])

  // 触发滚动高亮位置
  useEffect(() => {
    window.addEventListener("hashchange", scrollToHighlightFromHash, false)
    return () => {
      window.removeEventListener("hashchange", scrollToHighlightFromHash, false)
    }
  }, [scrollToHighlightFromHash])

  // 增加高亮
  const addHighlight = (highlight: NewHighlight) => {
    console.log("Saving highlight", highlight)
    setHighlights(prevHighlights => [{ ...highlight, id: getNextId() }, ...prevHighlights])
  }

  // 更新高亮
  const updateHighlight = (
    highlightId: string,
    position: Partial<ScaledPosition>,
    content: Partial<Content>
  ) => {
    console.log("Updating highlight", highlightId, position, content)
    setHighlights(prevHighlights =>
      prevHighlights.map(h => {
        const { id, position: originalPosition, content: originalContent, ...rest } = h
        return id === highlightId
          ? {
              id,
              position: { ...originalPosition, ...position },
              content: { ...originalContent, ...content },
              ...rest,
            }
          : h
      })
    )
  }

  // 选择完成后显示添加高亮
  const selectionFinished = (position, content, hideTipAndSelection, transformSelection) => {
    return (
      <Button
        variant="contained"
        onOpen={transformSelection} // 开启选择
        onClick={() => {
          addHighlight({ content, position, comment: { text: content.text, emoji: "" } })
          hideTipAndSelection()
        }}
      >
        Add Highlight
      </Button>
    )
  }

  // 选择高亮
  const highlightTransform = (
    highlight,
    index,
    setTip,
    hideTip,
    viewportToScaled,
    screenshot,
    isScrolledTo
  ) => {
    const isTextHighlight = !highlight.content?.image

    const component = isTextHighlight ? (
      <Highlight
        isScrolledTo={isScrolledTo}
        position={highlight.position}
        comment={highlight.comment}
      />
    ) : (
      // 区域高亮显示
      <AreaHighlight
        isScrolledTo={isScrolledTo}
        highlight={highlight}
        onChange={boundingRect => {
          updateHighlight(
            highlight.id,
            { boundingRect: viewportToScaled(boundingRect) },
            { image: screenshot(boundingRect) }
          )
        }}
      />
    )

    return (
      <Popup
        popupContent={<HighlightPopup {...highlight} />}
        // onMouseOver={popupContent => setTip(highlight, highlight => popupContent)}
        onMouseOver={popupContent => setTip(highlight, () => popupContent)}
        onMouseOut={hideTip}
        key={index}
      >
        {component}
      </Popup>
    )
  }

  return (
    <Box className="App" sx={{ display: "flex", height: "100vh" }}>
      {/*PDF*/}
      <Box height={"100vh"} width={"75vw"} position={"relative"}>
        <PdfLoader url={url} beforeLoad={<Spinner />}>
          {pdfDocument => (
            <PdfHighlighter
              pdfDocument={pdfDocument}
              enableAreaSelection={event => event.altKey}
              onScrollChange={resetHash}
              scrollRef={scrollTo => {
                scrollViewerTo.current = scrollTo
                scrollToHighlightFromHash()
              }}
              onSelectionFinished={selectionFinished} // 选择完成后
              highlightTransform={highlightTransform} // 选择高亮
              highlights={highlights} // 高亮位置信息
            />
          )}
        </PdfLoader>
      </Box>
      {/*侧边栏*/}
      <Sidebar
        highlights={highlights}
        resetHighlights={resetHighlights}
        // toggleDocument={toggleDocument}
      />
    </Box>
  )
}
