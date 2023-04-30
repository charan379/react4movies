import './styles/terminal.style.css';
import React from 'react'
import { useTheme } from 'hooks';

const Terminal = ({ logs, title }) => {

    const { theme } = useTheme();

    const reversedLogs = [...logs].reverse(); // create a reversed copy of the logs array

    return (
        <div className={`terminal ${theme}`}>
            <div className={`terminal-header ${theme}`}>
                <span className={`terminal-title ${theme}`}>{title}</span>
            </div>
            <div className="terminal-body">
                {reversedLogs?.map((log, index) => {
                    return (
                        <p key={`${index}`} className={`terminal-line ${theme}`}>
                            {log?.name && `${log.name}`}
                            {log?.status && ` - ${log.status}`}
                            {log?.error && ` : ${log.error}`}
                        </p>
                    )
                })}

            </div>
        </div>
    )
}

export { Terminal }