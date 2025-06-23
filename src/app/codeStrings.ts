import { CodeLine } from "./types/types"

export const heapsortCode: CodeLine[] = [
    { stepNum: 0, indents: 0, codeStr: "procedure heapsort(a, count) is" },
    //   { stepNum: 1, indents: 1, codeStr: "    input: an unordered array a of length count" },
    { stepNum: 1, indents: 1, codeStr: "start ← floor(count/2)" },
    { stepNum: 2, indents: 1, codeStr: "end ← count" },
    { stepNum: 3, indents: 1, codeStr: "while end > 1 do" },
    { stepNum: 4, indents: 2, codeStr: "if start > 0 then    (Heap construction)" },
    { stepNum: 5, indents: 3, codeStr: "start ← start − 1" },
    { stepNum: 6, indents: 2, codeStr: "else    (Heap extraction)" },
    { stepNum: 7, indents: 3, codeStr: "end ← end − 1" },
    { stepNum: 8, indents: 3, codeStr: "swap(a[end], a[0])" },
    //   { codeStr: "        (The following is siftDown(a, start, end))" },
    { stepNum: 9, indents: 2, codeStr: "root ← start" },
    { stepNum: 10, indents: 2, codeStr: "while iLeftChild(root) < end do" },
    { stepNum: 11, indents: 3, codeStr: "child ← iLeftChild(root)" },
    //   { codeStr: "            (If there is a right child and that child is greater)" },
    { stepNum: 12, indents: 3, codeStr: "if child+1 < end and a[child] < a[child+1] then" },
    { stepNum: 13, indents: 4, codeStr: "child ← child + 1" },
    { stepNum: 14, indents: 3, codeStr: "if a[root] < a[child] then" },
    { stepNum: 15, indents: 4, codeStr: "swap(a[root], a[child])" },
    { stepNum: 16, indents: 4, codeStr: "root ← child    (repeat to continue sifting down the child now)" },
    { stepNum: 17, indents: 3, codeStr: "else" },
    { stepNum: 18, indents: 4, codeStr: " break    (return to outer loop)" }
]
