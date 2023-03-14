import React, { useState } from 'react'
import ReactSlider from 'react-slider';

const Test1 = () => {
    const [ageRange, setAgeRange] = useState([8, 18]);

    const handleAgeRangeChange = (newRange) => {
        setAgeRange(newRange);
    };

    return (
        <div style={{ width: "50vw" }}>
            <ReactSlider
                className="horizontal-slider"
                thumbClassName="example-thumb"
                trackClassName="example-track"
                defaultValue={[8, 18]}
                max={26}
                min={2}
                minDistance={5}
                renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                onChange={(value, index) => setAgeRange(value)}
            />

            <hr />

            Start: {ageRange[0]}
            <br />
            End: {ageRange[1]}
        </div>
    )
}

export default Test1