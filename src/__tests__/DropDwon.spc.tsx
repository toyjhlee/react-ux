import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import React from 'react'
import renderer from 'react-test-renderer'

import DropDown from '../components/navigation/DropDown'

describe('DropDown', () => {
  let container: any
  let menulist: any
  let firstItem: any
  let activeItem: any
  let openButton: any

  let onClick: any
  beforeEach(() => {
    onClick = jest.fn()
    container = render(
      <DropDown label="OPEN MENU">
        <DropDown.Item onClick={onClick}>Action</DropDown.Item>
        <DropDown.Item>Another action</DropDown.Item>
        <DropDown.Item active={true}>Active Item</DropDown.Item>
        <DropDown.Item>Something</DropDown.Item>
      </DropDown>,
    )

    openButton = container.getByText('OPEN MENU')
    menulist = container.queryByTestId('menulist')
    firstItem = document.querySelector('li:first-child')
    activeItem = document.querySelector('li:nth-child(3)')
  })

  test('default', () => {
    expect(menulist).toHaveStyle('display: none;')
    expect(firstItem).not.toHaveStyle('color: red')
    expect(activeItem).toHaveStyle('color: red')
  })

  test('keyDown open', () => {
    openButton.focus()
    fireEvent.keyDown(openButton, {key: 'Enter'})
    expect(menulist).toHaveStyle('display: block')
    fireEvent.keyDown(openButton, {key: 'ArrowDown'})

    expect(firstItem).toHaveStyle('color: red')
    expect(activeItem).toHaveStyle('color: red')

    fireEvent.keyDown(openButton, {key: 'Enter'})

    expect(onClick).toBeCalledTimes(1)
    expect(menulist).toHaveStyle('display: none')

    fireEvent.keyDown(openButton, {key: 'Enter'})

    // 닫힌 상태에서는 onClick 이 호출되는게 아니다
    // 닫힌 상태에서는 열려야 한다
    expect(onClick).toBeCalledTimes(1)
    expect(menulist).toHaveStyle('display: block')
  })

  test('keyDown Move', () => {
    openButton.focus()
    fireEvent.keyDown(openButton, {key: 'Enter'})
    expect(menulist).toHaveStyle('display: block')

    fireEvent.keyDown(openButton, {key: 'ArrowUp'})

    fireEvent.keyDown(openButton, {key: 'ArrowDown'})
    expect(document.querySelector('li:nth-child(1)')).toHaveStyle('color: red')
    fireEvent.keyDown(openButton, {key: 'ArrowDown'})
    expect(document.querySelector('li:nth-child(2)')).toHaveStyle('color: red')
    fireEvent.keyDown(openButton, {key: 'ArrowDown'})
    expect(document.querySelector('li:nth-child(3)')).toHaveStyle('color: red')
    fireEvent.keyDown(openButton, {key: 'ArrowDown'})
    expect(document.querySelector('li:nth-child(4)')).toHaveStyle('color: red')
    fireEvent.keyDown(openButton, {key: 'ArrowDown'})
    expect(document.querySelector('li:nth-child(4)')).toHaveStyle('color: red')
  })

  test('enter', () => {
    openButton.focus()

    fireEvent.keyDown(openButton, {key: 'Enter'})
    expect(menulist).toHaveStyle('display: block')

    fireEvent.keyDown(openButton, {key: 'Enter'})
    expect(menulist).toHaveStyle('display: none')
  })

  test('tab', () => {
    openButton.focus()
    fireEvent.keyDown(openButton, {key: 'Enter'})
    expect(menulist).toHaveStyle('display: block')

    openButton.blur()
    fireEvent.keyDown(openButton, {key: 'Tab'})
    expect(menulist).toHaveStyle('display: none')
  })

  test('click open', () => {
    fireEvent.click(openButton)
    expect(menulist).toHaveStyle('display: block')
    fireEvent.click(firstItem)
    expect(onClick).toBeCalledTimes(1)
    expect(menulist).toHaveStyle('display: none')
  })
})

describe('DropDown', () => {
  test('snapshot', () => {
    const component = renderer.create(
      <DropDown label="OPEN MENU">
        <DropDown.Item onClick={() => {}}>Action</DropDown.Item>
        <DropDown.Item>Another action</DropDown.Item>
        <DropDown.Item active={true}>Active Item</DropDown.Item>
        <DropDown.Item>Something</DropDown.Item>
      </DropDown>,
    )

    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
