import React, {ReactElement, useEffect, useState} from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
  position: relative;
  display: inline-block;
`

const Button = styled.button`
  border: none;
  border: 1px solid #dcdcdc;
  &:focus {
    border: 1px solid red;
  }
`

// 이 Component 의 UX 는 다음을 참고한다 https://material-ui.com/components/menus/
// tab 으로 상위 Button 가능
// 상위 Button 에서 클릭 시 option open
// option open 시 상하 이동 키로 이동 가능
// option 에 focus 가 있을 시 enter 로 선택 가능 -> 상위 Button 에 선택된 항목 설정
// option enter, click 시 focus 는 상위 Button 으로 이동
// option 은 tab 으로 이동 못 함 // 하는 버전을 하나 더 만들자

const MenuList = styled.ul`
  border-radius: 2px;
  border: 1px solid #dcdcdc;
  position: absolute;
  z-index: 1;

  left: 0;
  top: 100%;

  background-color: #fff;

  &[aria-hidden='true'] {
    display: none;
  }

  max-width: 200px;
`

interface MenuItemProps {
  active?: boolean
}

const Item = styled.li<MenuItemProps>`
  display: block;
  padding: 0.78571429rem 1.14285714rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &[aria-selected='true'] {
    color: red;
  }

  cursor: pointer;
  white-space: nowrap;
`

// interface IItem {
//   text: string
//   value?: number
//   key?: string
// }

interface DropDownProps {
  label: string
  children: React.ReactNode
}

DropDown.defaultProps = {
  menuList: [],
}

function DropDown(props: DropDownProps) {
  const {label, children} = props
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [focusIndex, setFocusIndex] = useState<number>(-1)

  const [childLength, setChildLength] = useState<number>(
    React.Children.toArray(children).length,
  )

  useEffect(() => {
    setChildLength(React.Children.toArray(children).length)
  }, [children])

  useEffect(() => {
    if (isOpen === false) {
      setFocusIndex(-1)
    }
  }, [isOpen])

  const onKeydown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      return
    }
    e.preventDefault()
    if (e.key === 'Enter') {
      if (isOpen === false) {
        setIsOpen(true)
        return
      }

      if (focusIndex === -1 && isOpen) {
        setIsOpen(false)
        return
      }

      const child: any = React.Children.toArray(children)[focusIndex]
      setIsOpen(false)
      child.props.onClick && child.props.onClick()
    }

    if (e.key === 'ArrowUp') {
      setFocusIndex(Math.max(-1, focusIndex - 1))
    }
    if (e.key === 'ArrowDown') {
      setFocusIndex(Math.min(childLength - 1, focusIndex + 1))
    }
  }

  const contents: ReactElement[] = []
  React.Children.forEach(children, (child: ReactElement, index) => {
    contents.push(
      React.cloneElement(child, {
        contents: {child},
        key: index,
        'aria-selected': child.props.active || index === focusIndex,
        onClick: () => {
          setIsOpen(false)

          child.props.onClick && child.props.onClick()
        },
      }),
    )
  })

  return (
    <Wrap onKeyDown={e => onKeydown(e)}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        onFocus={() => {
          //   setIsOpen(true)
        }}
        onBlur={() => {
          setIsOpen(false)
        }}
      >
        {label}
      </Button>
      <MenuList aria-hidden={!isOpen} data-testid={'menulist'}>
        {contents}
      </MenuList>
    </Wrap>
  )
}

DropDown.Item = Item

export default DropDown
