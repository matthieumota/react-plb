import { useState } from 'react'

type CounterProps = {
    initialValue?: number
    maxValue?: number
}

function Counter({
    initialValue = 0,
    maxValue = Infinity,
}: CounterProps) {
    const [value, setValue] = useState(initialValue)

    const handleIncrement = (step: number = 1) => {
        setValue(value + step)
    }

    return (
        <div>
            <button onClick={() => handleIncrement(-1)} disabled={value === 0}>
                -
            </button>
            {value}
            {value < maxValue && <button onClick={() => handleIncrement(1)}>
                +
            </button>}
        </div>
    )
}

export default Counter
