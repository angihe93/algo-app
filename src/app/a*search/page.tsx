'use client'

import { useEffect, useState } from "react"
import { AStarAlgoStep, AStarInput, AStarInputGraph } from "../types/types"
import { AStarCode } from "../codeStrings"

export default function AStarSearchPage() {

    const [steps, setSteps] = useState<AStarAlgoStep[]>([])

    const inputGraph = {
        coordinates: {
            "t": { x: 10, y: -10 },
            "c": { x: 6, y: -10 },
            "e": { x: 10, y: -8 },
            "b": { x: 10 - 2 / Math.sqrt(2), y: -10 + 2 / Math.sqrt(2) },
            "a": { x: 10 - 2 / Math.sqrt(2) * 2, y: -10 + 2 / Math.sqrt(2) * 2 },
            "s": { x: 10 - 2 / Math.sqrt(2) * 2, y: -10 + 2 / Math.sqrt(2) * 2 + 1.5 },
            "d": { x: 10 - 2 / Math.sqrt(2) * 2 + 2, y: -10 + 2 / Math.sqrt(2) * 2 + 1.5 }
        },
        edges: {
            "s": [
                { name: "a", coordinate: { x: 10 - 2 / Math.sqrt(2) * 2, y: -10 + 2 / Math.sqrt(2) * 2 } },
                { name: "d", coordinate: { x: 10 - 2 / Math.sqrt(2) * 2 + 2, y: -10 + 2 / Math.sqrt(2) * 2 + 1.5 } }
            ],
            "a": [
                { name: "s", coordinate: { x: 10 - 2 / Math.sqrt(2) * 2, y: -10 + 2 / Math.sqrt(2) * 2 + 1.5 } },
                { name: "b", coordinate: { x: 10 - 2 / Math.sqrt(2), y: -10 + 2 / Math.sqrt(2) } }
            ],
            "b": [
                { name: "a", coordinate: { x: 10 - 2 / Math.sqrt(2) * 2, y: -10 + 2 / Math.sqrt(2) * 2 } },
                { name: "c", coordinate: { x: 6, y: -10 } }
            ],
            "c": [
                { name: "b", coordinate: { x: 10 - 2 / Math.sqrt(2), y: -10 + 2 / Math.sqrt(2) } },
                { name: "t", coordinate: { x: 10, y: -10 } }
            ],
            "t": [
                { name: "c", coordinate: { x: 6, y: -10 } },
                { name: "e", coordinate: { x: 10, y: -8 } }
            ],
            "e": [
                { name: "t", coordinate: { x: 10, y: -10 } },
                { name: "d", coordinate: { x: 10 - 2 / Math.sqrt(2) * 2 + 2, y: -10 + 2 / Math.sqrt(2) * 2 + 1.5 } }
            ],
            "d": [
                { name: "s", coordinate: { x: 10 - 2 / Math.sqrt(2) * 2, y: -10 + 2 / Math.sqrt(2) * 2 + 1.5 } },
                { name: "e", coordinate: { x: 10, y: -8 } }
            ]
        }
    }
    const inputStart = { name: "s", coordinate: { x: 10 - 2 / Math.sqrt(2) * 2, y: -10 + 2 / Math.sqrt(2) * 2 + 1.5 } }
    const inputGoal = { name: "t", coordinate: { x: 10, y: -10 } }

    const fetchAStar = async ({ graph, start, goal }: AStarInput) => {
        const response = await fetch('/api/a-star', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ graph, start, goal })
        })
        const { steps } = await response.json()
        // setSwapSteps(swapSteps)
        setSteps(steps)
    }

    useEffect(() => {
        fetchAStar({ graph: inputGraph, start: inputStart, goal: inputGoal })
    }, [])


    return (
        <div className="m-5">
            A* page
            {AStarCode.map((line, idx) => (
                <li key={idx} style={{ paddingLeft: `${line.indents * 20}px` }}>
                    {line.stepNum}{line.codeStr}
                    {/* {steps.find((i) => i.line === 1)?.assignedValue} */}
                </li>
            ))}
            <div className="flex gap-2 justify-center text-left">

                {/* show all steps */}
                <ul>
                    {steps.map((step, idx) => (
                        <li key={idx}>{JSON.stringify(step)}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
