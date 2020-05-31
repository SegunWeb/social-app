import React, {useEffect, useState} from 'react'


const ProfileStatusWithHooks = (props) =>  {

    const [editMode, setEditMode] = useState(false);
    const [editStatus, newStatus] = useState(props.status);

    useEffect(() => {
        newStatus(props.status)
    }, [props.status]);


    const activateMode = () => {
          setEditMode(true)
    };
    const outMode = () => {
        setEditMode(false);
        props.updateStatus(editStatus);
    };
    const onStatusChange = (e) => {
        newStatus(e.currentTarget.value);
    };

    return (
        <div>
            {!editMode &&
                <div><span onDoubleClick={activateMode} >{props.status || "no status"}</span></div>
            }
            {editMode &&
            <div>
                <input autoFocus
                       onBlur={outMode}
                       value={editStatus}
                       onChange={onStatusChange}
                />
            </div>
            }
        </div>
    );
};

export default ProfileStatusWithHooks;