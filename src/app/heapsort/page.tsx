'use client'

import { JSX, useEffect, useState } from "react"
import { AlgoStep, HeapSortInput, HeapSortSwapStep } from "../types/types"
import { heapsortCode } from "../codeStrings"
import * as motion from "motion/react-client"
import React from "react"

export default function HeapSortPage() {

    const [swapSteps, setSwapSteps] = useState<HeapSortSwapStep[]>([])
    const [steps, setSteps] = useState<AlgoStep[]>([])
    const [allFrames, setAllFrames] = useState<JSX.Element[]>([])
    // 15 elements max would fit in svg frame
    const [inputArray, setInputArray] = useState<number[]>([7, 4, 3, 9, 1, 2])
    // const inputArray = [7, 4, 3, 9, 1, 2, 7, 4, 3, 9, 1, 2, 7, 4, 3]
    const [selectedFrame, setSelectedFrame] = useState<JSX.Element>()
    const [selectedFrameIdx, setSelectedFrameIdx] = useState<number>()
    const [currArray, setCurrArray] = useState<number[]>(inputArray)
    const [nodes, setNodes] = useState<JSX.Element[]>([])
    const [branches, setBranches] = useState<JSX.Element[]>([])
    const [userInput, setUserInput] = useState("")
    const [error, setError] = useState("")

    const fetchHeapSort = async (input: number[]) => {
        const response = await fetch('/api/heapsort', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ array: input })
        })
        const { swapSteps, steps } = await response.json()
        setSwapSteps(swapSteps)
        setSteps(steps)
    }

    // iterate thru steps, generate frames that stop just before each swap
    const generateFrames = (steps: AlgoStep[]) => {
        const frames: JSX.Element[] = []
        let currFrame: JSX.Element[] = []
        let nextLine = 0

        for (const step of steps) {
            nextLine = nextLine + 1

            console.log("step", step)
            console.log("nextLine", nextLine)
            console.log("currFrame", [...currFrame])
            console.log("frames", [...frames])

            if (step.line < nextLine)
                nextLine = step.line
            while (step.line > nextLine) { // just add code string if step doesn't go here
                const heapsortLine = heapsortCode.find((i) => i.stepNum === nextLine)
                console.log("heapsortLine", heapsortLine)
                console.log("currFrame push ", heapsortLine?.codeStr)
                currFrame.push(
                    <li key={frames.length * 100 + currFrame.length} style={{ paddingLeft: `${(heapsortLine?.indents ?? 0) * 20}px` }}>
                        {heapsortLine?.stepNum}{heapsortLine?.codeStr}
                    </li>)
                nextLine = nextLine + 1
            }

            const heapsortLine = heapsortCode.find((i) => i.stepNum === step.line)
            console.log("heapsortLine", heapsortLine)
            if (step.transformedValue && step.transformedValue.length > 0) {
                console.log("frames push", [...currFrame])
                frames.push(
                    <ul key={frames.length}>
                        {[...currFrame]}
                    </ul>
                )
                currFrame = []
            }

            console.log("currFrame push ", heapsortLine?.codeStr, step.assignedValue, step.transformedValue, !step.assignedValue && !step.transformedValue && '•')
            currFrame.push(
                <li key={frames.length * 100 + currFrame.length} style={{ paddingLeft: `${(heapsortLine?.indents ?? 0) * 20}px` }}>
                    {heapsortLine?.stepNum}{heapsortLine?.codeStr}
                    <span className="text-red-500 ml-2">{step.assignedValue}</span>
                    <span className="text-red-500 ml-2">{step.transformedValue?.join(", ")}</span>
                    <span className="text-red-500 ml-2">{!step.assignedValue && !step.transformedValue && '•'}</span>
                </li>
            )

        }
        // push last frame
        console.log("frames push", [...currFrame])
        frames.push(
            <ul key={frames.length}>
                {[...currFrame]}
            </ul>
        )

        console.log("Generated frames:", [...frames])
        setAllFrames(frames)
    }

    useEffect(() => {
        fetchHeapSort(inputArray)
    }, [inputArray])

    useEffect(() => {
        if (steps.length > 0) {
            generateFrames(steps);
        }
    }, [steps])

    // Tree rendering
    const treeWidth = 700
    const levelHeight = 100

    useEffect(() => {

        const makeTree = (currArr: number[], swappedIdx1?: number, swappedIdx2?: number) => {

            const calculatePosition = (index: number, level: number) => {
                const x = (treeWidth / (2 ** level)) * (index + 0.5) - 23;
                const y = levelHeight * level + 30; // add top margin to prevent cutoff
                return { x, y };
            }

            // tree nodes and branches
            const nodes: JSX.Element[] = []
            const branches: JSX.Element[] = []

            let i = 0
            console.log("currArr", currArr)
            for (const num of currArr) {
                const level = Math.floor(Math.log2(i + 1))
                const index = i - Math.pow(2, level) + 1
                // console.log(`i:${i} level:${level} index:${index}}`)
                const { x, y } = calculatePosition(index, level);
                nodes.push(
                    // <circle key={`${level}-${index}`} cx={x} cy={y} r={20} fill="blue" />
                    // TODO: get motion animation to work
                    <motion.circle
                        key={`${level}-${index}`}
                        cx={x}
                        cy={y}
                        r={20}
                        fill={i === swappedIdx1 || i === swappedIdx2 ? "red" : "blue"}
                        layout // Enable layout animations
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                )
                nodes.push(
                    // <text
                    //     key={`text-${level}-${index}`}
                    //     x={x}
                    //     y={y + 5}
                    //     textAnchor="middle"
                    //     fill="white"
                    //     fontSize="12"
                    // >
                    //     {num}
                    // </text>
                    <motion.text
                        key={`text-${level}-${index}`}
                        x={x}
                        y={y + 5}
                        textAnchor="middle"
                        fill="white"
                        fontSize="12"
                        layout // Enable layout animations
                    >
                        {num}
                    </motion.text>
                )

                // add branch from child to parent
                const parentIdx = Math.floor((i - 1) / 2)
                if (parentIdx >= 0) {
                    const parentLevel = Math.floor(Math.log2(parentIdx + 1));
                    const parentIndex = parentIdx - Math.pow(2, parentLevel) + 1;
                    const { x: parentX, y: parentY } = calculatePosition(parentIndex, parentLevel);

                    branches.push(
                        // <line
                        //     key={`branch-${level}-${index}`}
                        //     x1={x}
                        //     y1={y}
                        //     x2={parentX}
                        //     y2={parentY}
                        //     stroke="blue"
                        // />
                        <motion.line
                            key={`branch-${level}-${index}`}
                            x1={x}
                            y1={y}
                            x2={parentX}
                            y2={parentY}
                            stroke="blue"
                            layout // Enable layout animations
                        />
                    )
                }
                i = i + 1
            }
            setNodes(nodes)
            setBranches(branches)
        }

        console.log("allFrames", allFrames)
        console.log("swapSteps", swapSteps)

        if (selectedFrameIdx === 0) {
            makeTree(inputArray)
        }

        else if (swapSteps.length > 0 && selectedFrameIdx && swapSteps[selectedFrameIdx - 1]) {
            const swapStep = swapSteps[selectedFrameIdx - 1]
            // console.log("selectedFrameIdx", selectedFrameIdx)
            // console.log("selectedFrame", selectedFrame)
            // console.log("swapStep", swapStep)

            if (swapStep) {
                // swap
                const { inputArr, index1, index2 } = swapStep
                const currArr = [...inputArr]
                const temp = currArr[index1]
                currArr[index1] = currArr[index2]
                currArr[index2] = temp
                setCurrArray(currArr)

                makeTree(currArr, index1, index2)
            }
        }
    }, [swapSteps, selectedFrame])

    useEffect(() => {
        console.log("nodes", nodes)
    }, [nodes])

    useEffect(() => {
        setCurrArray(userInput.trim().split(/\s+/).map(Number))
    }, [userInput])


    return (
        <div className="m-5">
            Heap sort page

            {/* array input, limit to 15 elements max, preformat for user so only numbers need to be entered */}
            <div>
                <label htmlFor="arrayInput" className="block text-sm font-medium text-gray-700">
                    Enter up to 15 numbers separated by spaces:
                </label>
                <input
                    id="arrayInput"
                    type="text"
                    value={userInput}
                    onChange={(e) => {
                        const value = e.target.value;
                        setUserInput(value);

                        // Validate input
                        const numbers = value.trim().split(/\s+/).map(Number);
                        if (numbers.some(isNaN)) {
                            setError("Input must contain only numbers separated by spaces.");
                        } else if (numbers.length > 15) {
                            setError("You can only enter up to 15 numbers.");
                        } else {
                            setError("");
                            setInputArray(numbers); // Update inputArray state
                        }
                    }}
                    placeholder="e.g., 7 4 3 9 1 2"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            <div className="flex gap-2 justify-center text-left">
                <div>
                    <ul>
                        <h3>Standard in-place implementation</h3>
                        {heapsortCode.map((line, idx) => (
                            <li key={idx} style={{ paddingLeft: `${line.indents * 20}px` }}>
                                {line.stepNum}{line.codeStr}
                                {/* {steps.find((i) => i.line === 1)?.assignedValue} */}
                            </li>
                        ))}
                        <p>notation:</p>
                        <ul>
                            <li>start: start index of heap</li>
                            <li>end: end index of heap (non-inclusive)</li>
                            <li>node indices: iLeftChild(i) = 2 * i + 1, iRightChild(i) = 2 * i + 2, iParent(i) = floor((i−1) / 2)</li>
                        </ul>
                        <p className="mt-2 text-sm">(pseudocode from https://en.wikipedia.org/wiki/Heapsort#Standard_implementation)</p>
                    </ul>
                    <svg width={treeWidth} height={levelHeight * 5} className="border p-5 mt-4">
                        {branches}
                        {nodes}
                    </svg>
                </div>

                <div>
                    <div>input: {inputArray.join(", ")}</div>
                    {/* {allFrames.map((frame, idx) => (
                        <div key={idx}>
                            <h3>Frame {idx + 1}</h3>
                            {frame}
                        </div>
                    ))} */}

                    {allFrames.map((frame, idx) => (
                        <motion.li
                            key={idx}
                            animate={{
                                backgroundColor:
                                    frame === selectedFrame ? "#eee" : "#eee0",
                            }}
                            // style={tab}
                            // if frame contains "swap", update currArray state so we can show it
                            onClick={() => { setSelectedFrame(frame); setSelectedFrameIdx(idx) }}
                        >
                            {idx}
                            {frame === selectedFrame ? (
                                <motion.div
                                    // style={underline}
                                    layoutId="underline"
                                    id="underline"
                                />
                            ) : null}
                            {/* <div key={idx}>
                            <h3>Frame {idx + 1}</h3>
                            {frame}
                        </div> */}
                        </motion.li>
                    ))}

                    <motion.div
                        // key={selectedFrame ? selectedFrame.label : "empty"}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    // style={icon}
                    >
                        {selectedFrame ? selectedFrame : ""}
                    </motion.div>
                </div>

                {/* show all steps */}
                {/* <ul>
                    {steps.map((step, idx) => (
                        <li key={idx}>{JSON.stringify(step)}</li>
                    ))}
                </ul> */}

            </div>
        </div>
    )
}
