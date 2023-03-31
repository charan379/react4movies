import React from 'react'

const Progress_bar = ({ bgcolor, progress, height }) => {

    const Parentdiv = {
        height: height,
        width: '100%',
        backgroundColor: '#DFDFDF',
        borderRadius: 30,
        margin: '5px 5px 2px 5px'
    }

    const Childdiv = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: bgcolor,
        borderRadius: 30,
        textAlign: 'right',
        lineHeight: '20px'
    }

    const progresstext = {
        padding: 10,
        color: progress < 5 ? '#000' : '#FFF',
        fontWeight: 700,
        fontSize: '16px',
    }

    return (
        <div style={Parentdiv}>
            <div style={Childdiv}>
                <span style={progresstext}>{`${progress}%`}</span>
            </div>
        </div>
    )
}

export default Progress_bar;
