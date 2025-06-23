export type HeapSortInput = {
    array: number[]
}

export type AlgoStep = {
    // code: string, // can store this constant somewhere else
    line: number,
    // assignment, vs action vs comparison
    assignedValue?: number,
    transformedValue?: number[]
}

export type HeapSortSwapStep = {
    index1: number,
    index2: number,
    inputArr: number[],
}

export type CodeLine = {
    stepNum: number,
    indents: number, // how many tabs
    codeStr: string
}
