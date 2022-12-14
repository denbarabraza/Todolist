import React, {ChangeEvent, useState} from 'react';

type SuperEditSpanPropsType = {
    title: string
    callback: (upTitle: string) => void
}

export const SuperEditSpan: React.FC<SuperEditSpanPropsType> = (
    {
        title,
        callback
    }) => {

    const [edit, setEdit] = useState(false)
    const [upValue, setUpValue] = useState(title)

    const setTitle = () => {
        callback(upValue)
    }

    const onDoubleClickHandler = () => {
        setEdit(!edit)
        !edit && setTitle()
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUpValue(e.currentTarget.value)
    }

    return (
        edit
            ? <input
                value={upValue}
                onChange={onChangeHandler}
                onBlur={onDoubleClickHandler}
                autoFocus
            />
            : <span onDoubleClick={onDoubleClickHandler}>
                {upValue}
            </span>
    );
};
