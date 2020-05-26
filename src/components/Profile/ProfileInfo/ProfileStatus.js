import React, {Component} from 'react'
import s from './ProfileInfo.module.css';


class ProfileStatus extends Component {

    state = {
       editMode: false
    };

    toggleEditMode = () => {
      this.setState({
         editMode: !this.state.editMode
      })
    };

    render() {
        return (
            <div>
                { !this.state.editMode
                    ? <div><span onDoubleClick={this.toggleEditMode}>{this.props.status}</span></div>
                    : <div>
                        <input type="text" autoFocus onBlur={this.toggleEditMode} value={this.props.status}/>
                      </div>
                }
            </div>
        );
    }
};

export default ProfileStatus;