import React, {ChangeEvent, useState} from 'react';

export type EditableSpanPropsType = {
    title: string
    callback: (uptitle: string) => void
}

const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {

    const [edit, setEdit] = useState(false)
    const [uptitle, setUpTitle] = useState(props.title)

    const addUpdateTitle=()=>{
        props.callback(uptitle)

    }

    const onDoubleClickHandler = () => {
        setEdit(!edit)
        edit && addUpdateTitle()
    }
    const onChangeHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        setUpTitle(e.currentTarget.value)
    }


    return (
        edit ?
            <input
                value={uptitle}
                onBlur={onDoubleClickHandler}
                onChange={onChangeHandler}
                autoFocus
            />
            : <span
                onDoubleClick={onDoubleClickHandler}
            >
                {props.title}
        </span>
    );
};

export default EditableSpan;