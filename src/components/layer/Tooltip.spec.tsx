import {render, fireEvent} from '@testing-library/react'
import React from 'react'

import Tooltip from './Tooltip'

// import {createStore} from 'redux'

// import {testRender, setImageFile} from '../../editor/components/render/testUtils.js'

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeRender(): R
    }
  }
}

expect.extend({
  toBeRender(actual: Function): any {
    let isError = false
    try {
      actual()
    } catch (e: any) {
      isError = true
    }

    // expect(() => getByText('Tooltip text')).toThrow(
    //     'Unable to find an element with the text: Tooltip text. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.',
    // )

    const message = 'not render'
    const pass = !isError
    return {
      message,
      pass,
    }
  },
})

const getInit = (props: any = {}) => {
  const renderResult = render(
    <Tooltip data-tip="Tooltip text" {...props}>
      show tooltip
    </Tooltip>,
  )
  const container: any = renderResult.container
  const getByText: any = renderResult.getByText

  return {
    container,
    getByText,
  }
}

describe('Tooltip', () => {
  beforeEach(() => {})

  it('default', () => {
    const {container, getByText} = getInit()

    expect(() => getByText('show tooltip')).toBeRender()
    expect(() => getByText('Tooltip text')).not.toBeRender()

    const mouseenter = new MouseEvent('mouseenter', {
      bubbles: false,
      cancelable: false,
    })

    fireEvent.mouseEnter(container.firstChild)
    expect(() => getByText('Tooltip text')).toBeRender()
    fireEvent.mouseLeave(container.firstChild)

    expect(() => getByText('Tooltip text')).not.toBeRender()

    fireEvent(container, mouseenter)
  })

  it('isShow', () => {
    const {container, getByText} = getInit({isShow: true})

    expect(() => getByText('Tooltip text')).toBeRender()
    fireEvent.mouseEnter(container.firstChild)
    expect(() => getByText('Tooltip text')).toBeRender()
    fireEvent.mouseLeave(container.firstChild)
    expect(() => getByText('Tooltip text')).toBeRender()
  })

  it('clickable', () => {
    const {container, getByText} = getInit({clickable: true})

    expect(() => getByText('Tooltip text')).not.toBeRender()

    fireEvent.click(container.firstChild)

    expect(() => getByText('Tooltip text')).toBeRender()

    fireEvent.click(container.firstChild)
    expect(() => getByText('Tooltip text')).not.toBeRender()
  })
})
