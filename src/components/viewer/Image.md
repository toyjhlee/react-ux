#### object-fit 을 지원하지 않는 browser 에서는 background 로 처리

### use object-fit

```js
import React, {useState} from 'react'
import styled from 'styled-components'
import * as mockImg from '../../mock/mockImg'
import Image from './Image'
const Box = styled.article`
  width: 100px;
  height: 100px;
  border: 1px solid #333;
  margin-right: 10px;
`
const Contents = styled.div`
  display: flex;
`
;(() => {
  return (
    <>
      <Contents>
        {['contain', 'cover', 'cover'].map(name => {
          return (
            <dl>
              <dt>{name}</dt>
              <dd>
                <Box>
                  <Image url={mockImg.vertical} type={name} />
                </Box>
              </dd>
            </dl>
          )
        })}
      </Contents>

      <Contents>
        {['contain', 'cover', 'cover'].map(name => {
          return (
            <dl>
              <dt>{name}</dt>
              <dd>
                <Box>
                  <Image url={mockImg.horizontal} type={name} />
                </Box>
              </dd>
            </dl>
          )
        })}
      </Contents>
    </>
  )
})()
```

### not using object-fit

```js
import React, {useState} from 'react'
import styled from 'styled-components'
import * as mockImg from '../../mock/mockImg'
import Image from './Image'
const Contents = styled.div`
  display: flex;

  dl {
    margin-right: 10px;
  }
  dd {
    width: 100px;
    height: 100px;
    border: 1px solid #333;
  }
`
;(() => {
  return (
    <>
      <Contents>
        {['contain', 'cover', 'cover'].map(name => {
          return (
            <dl>
              <dt>{name}</dt>
              <dd>
                <Image
                  url={mockImg.vertical}
                  type={name}
                  disabledObjectFit={true}
                />
              </dd>
            </dl>
          )
        })}
      </Contents>
      <Contents>
        {['contain', 'cover', 'cover'].map(name => {
          return (
            <dl>
              <dt>{name}</dt>
              <dd>
                <objectfit src={mockImg.vertical} />
              </dd>
            </dl>
          )
        })}
      </Contents>
      <Contents>
        {['contain', 'cover', 'cover'].map(name => {
          return (
            <dl>
              <dt>{name}</dt>
              <dd>
                <Image
                  url={mockImg.horizontal}
                  type={name}
                  disabledObjectFit={true}
                />
              </dd>
            </dl>
          )
        })}
      </Contents>
    </>
  )
})()
```
