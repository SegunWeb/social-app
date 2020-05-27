import React, {Component} from 'react'


class ProfileStatus extends Component {

    state = {
       editMode: false,
        status: this.props.status
    };

    toggleEditMode = () => {
      this.setState({
         editMode: !this.state.editMode
      });
        this.props.updateStatus(this.state.status);
    };

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    };

    render() {
        return (
            <div>
                { !this.state.editMode
                    ? <div><span onDoubleClick={this.toggleEditMode}>{this.props.status || "no status"}</span></div>
                    : <div>
                        <input autoFocus
                               onBlur={this.toggleEditMode}
                               value={this.state.status}
                                onChange={this.onStatusChange}
                        />
                      </div>
                }
            </div>
        );
    }
};

export default ProfileStatus;