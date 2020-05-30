import React, {useState} from 'react'


const ProfileStatusWithHooks = (props) =>  {

    const [editMode, setEditMode] = useState(false);
    const [editStatus, newStatus] = useState(props.status);
    const activateMode = () => {
          setEditMode(true)
    };
    const outMode = () => {
        setEditMode(false)
    };
    const onStatusChange = (e) => {
        newStatus(e.currentTarget.value);
        props.updateStatus(editStatus);
    };

    return (
        <div>
            {!editMode &&
                <div><span onDoubleClick={activateMode} >{props.status || "no status"} test</span></div>
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