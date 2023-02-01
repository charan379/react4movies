const noSidebar = [/^\/viwe.{0,}/,/^\/login.{0,}/,/^\/test.{0,}/]


const math = noSidebar.some(pattren => pattren.test("/login/sdfdsf/sdfdsf"))
console.log(math)