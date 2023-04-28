import React from 'react'
import { useTheme } from 'hooks';

const Logger = ({ logs, title }) => {

    const { theme } = useTheme();

    const reversedLogs = [...logs].reverse(); // create a reversed copy of the logs array

    return (
        <div className={`logger ${theme}`}>
            <div className={`logger-header ${theme}`}>
                <span className={`logger-title ${theme}`}>{title}</span>
            </div>
            <div className="logger-body">
                {reversedLogs?.map((log, index) => {
                    return (
                        <p key={`${index}`} className={`logger-line ${theme}`}>
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

export { Logger }