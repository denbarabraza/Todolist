import React, {ChangeEvent, FC, memo, useState} from 'react';


type SuperEditbleSpanPropsType = {
    title: string
    callback: (upValue: string) => void
}

export const SuperEditbleSpan: FC<SuperEditbleSpanPropsType> = memo((
    {
        title,
        callback
    }) => {
    console.log('SuperEditbleSpan rendering')
    const [edit, setEdit] = useState(false)
    const [upValue, setValue] = useState(title)

    const setUpTitle = () => {
        callback(upValue)
    }

    const onDoubleClickHandler = () => {
        setEdit(!edit)
        edit && setUpTitle()
    }

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    return (
        edit
            ? <input
                value={upValue}
                onChange={onChangeInputHandler}
                onBlur={onDoubleClickHandler}
                autoFocus
            />
            : <span onDoubleClick={onDoubleClickHandler}>{title}</span>
    );
});

