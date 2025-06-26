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
    { stepNum: 10, indents: 2, codeStr: "while iLeftChild(root) < end do    (sift down operation to maintain heap)" },
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


export const AStarCode: CodeLine[] = [
    { stepNum: 0, indents: 0, codeStr: "function A_Star(start, goal, h)" },
    { stepNum: 1, indents: 1, codeStr: "openSet := {start}" },
    { stepNum: 2, indents: 1, codeStr: "cameFrom := an empty map" },
    { stepNum: 3, indents: 1, codeStr: "gScore := map with default value of Infinity" },
    { stepNum: 4, indents: 1, codeStr: "gScore[start] := 0" },
    { stepNum: 5, indents: 1, codeStr: "fScore := map with default value of Infinity" },
    { stepNum: 6, indents: 1, codeStr: "fScore[start] := h(start)" },
    { stepNum: 7, indents: 1, codeStr: "while openSet is not empty" },
    { stepNum: 8, indents: 2, codeStr: "current := the node in openSet having the lowest fScore[] value" },
    { stepNum: 9, indents: 2, codeStr: "if current = goal" },
    { stepNum: 10, indents: 3, codeStr: "return reconstruct_path(cameFrom, current)" },
    { stepNum: 11, indents: 2, codeStr: "openSet.Remove(current)" },
    { stepNum: 12, indents: 2, codeStr: "for each neighbor of current" },
    { stepNum: 13, indents: 3, codeStr: "tentative_gScore := gScore[current] + d(current, neighbor)" },
    { stepNum: 14, indents: 3, codeStr: "if tentative_gScore < gScore[neighbor]" },
    { stepNum: 15, indents: 4, codeStr: "cameFrom[neighbor] := current" },
    { stepNum: 16, indents: 4, codeStr: "gScore[neighbor] := tentative_gScore" },
    { stepNum: 17, indents: 4, codeStr: "fScore[neighbor] := tentative_gScore + h(neighbor)" },
    { stepNum: 18, indents: 4, codeStr: "if neighbor not in openSet" },
    { stepNum: 19, indents: 4, codeStr: "openSet.add(neighbor)" },
    { stepNum: 20, indents: 1, codeStr: "return failure" }
]