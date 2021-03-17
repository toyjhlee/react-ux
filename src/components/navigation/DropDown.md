### DropDown

```js
import React, {useState} from 'react'
import DropDown from './DropDown'
;<DropDown label="OPEN MENU">
  <DropDown.Item
    onClick={() => {
      alert(1)
    }}
  >
    Action
  </DropDown.Item>
  <DropDown.Item>Another action</DropDown.Item>
  <DropDown.Item active={true}>BB</DropDown.Item>
</DropDown>
```

```js
<select>
  <option>1</option>
  <option>2</option>
  <option>3</option>
</select>
```
