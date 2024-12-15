# React Question

## 1. useCallback ใช้ทำอะไร
  `useCallback` เป็น Hook ใน React ที่ใช้ "จดจำ" ฟังก์ชัน โดยจะทำการ Cache ไว้ในหน่วยความจำแคช (Cache Memory) โดยจะคืนค่าฟังก์ชันเดิมกลับมาในการ re-render และเมื่อค่าของ dependencies มีการเปลี่ยนแปลง

  `useCallback` มีประโยชน์มากเมื่อเราต้องส่งฟังก์ชันไปยัง component ลูก เพื่อป้องกันการสร้างฟังก์ชันใหม่โดยไม่จำเป็นและลดการ re-render ของ component ลูกที่ไม่จำเป็น
 
 ## ตัวอย่างการใช้งาน
```js
import React, { useState, useCallback } from 'react';

function ParentComponent() {
  const [count, setCount] = useState(0);

  // ใช้ useCallback เพื่อจดจำฟังก์ชัน handleClick ซึ่งจะถูกสร้างใหม่เมื่อค่า count เปลี่ยนเท่านั้น
  const handleClick = useCallback(() => {
    console.log(`Count: ${count}`);
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <ChildComponent onClick={handleClick} />
    </div>
  );
}

const ChildComponent = (({ onClick }) => {
  console.log('Child Component render');
  return <button onClick={onClick}>Click me!</button>;
});

```
ในตัวอย่างนี้:
* `useCallback` ทำให้ฟังก์ชัน handleClick ถูกสร้างใหม่เฉพาะเมื่อค่า count เปลี่ยนเท่านั้น
* `ChildComponent` จะ re-render ก็ต่อเมื่อค่า onClick ที่ส่งผ่าน props เปลี่ยน ลดการ re-render ที่ไม่จำเป็น


## 2. Unit Test สำหรับ UserProfile Component

ใน src/components/UserProfile ได้มีการเตรียม component ที่ใช้ในการทำ unit test ไว้แล้ว

#### ขั้นตอนหลังจากการ Clone Project

1. ติดตั้ง dependencies:
```js
npm install
```

2. รัน unit test
```js
npm run test
```

3. รัน test coverage
```js
npm run cov
```



_Github Repository เป็นส่วนหนึ่งของ Assessment ในการสมัครเข้าทำงาน ตำแหน่ง Full Stack Developer_