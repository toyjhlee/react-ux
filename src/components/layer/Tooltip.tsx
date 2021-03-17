import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

// https://www.npmjs.com/package/react-tooltip
const Wrap = styled.div`
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.15);

  position: absolute;
`

const Inner = styled.div`
  padding: 10px;
`

interface TooltipProps {
  isShow: boolean
  clickable: boolean
  'data-tip': string
  children: React.ReactNode
  onClick: () => void
}

Tooltip.defaultProps = {
  isShow: false,
  clickable: false,
  onClick: () => {},
}

function Tooltip(props: TooltipProps) {
  const [parentEl, setParentEl] = useState<HTMLSpanElement>()
  const [tooptipEl, setTooptipEl] = useState<HTMLDivElement>()
  const [visible, setVisible] = useState<boolean>(false)

  const [style, setStyle] = useState<any>({})

  const onMouseEnter = () => {
    if (props.clickable === true) return
    setVisible(true)
  }

  const onmouseleave = () => {
    if (props.clickable === true) return
    setVisible(false)
  }

  const onClick = (e: React.MouseEvent) => {
    if (props.clickable === false) return
    e.stopPropagation()
    setVisible(!visible)
  }

  const onClickClose = () => {
    setVisible(false)
  }

  useEffect(() => {
    if (tooptipEl === undefined || parentEl === undefined) return
    const parentRect = parentEl.getBoundingClientRect()
    const tooltipRect = tooptipEl.getBoundingClientRect()

    let marginLeft

    // TOP CENTER
    marginLeft = (parentRect.width - tooltipRect.width) / 2

    setStyle({
      marginLeft,
      marginTop: (tooltipRect.height + parentRect.height) * -1,
    })
  }, [props.isShow, visible, tooptipEl])

  useEffect(() => {
    if (props.clickable === false || visible === false) {
      return
    }

    document.addEventListener('click', onClickClose)

    return () => {
      document.removeEventListener('click', onClickClose)
    }
  }, [props.clickable, visible])

  return (
    <span
      onMouseEnter={() => onMouseEnter()}
      onMouseLeave={() => onmouseleave()}
      onClick={onClick}
      ref={el => {
        if (!el) return
        setParentEl(el)
      }}
    >
      {props.children}
      {props.isShow || visible ? (
        <Wrap
          ref={el => {
            if (!el) return
            setTooptipEl(el)
          }}
          style={{...style}}
        >
          <Inner>{props['data-tip']}</Inner>
        </Wrap>
      ) : (
        ''
      )}
    </span>
  )
}

export default Tooltip
