import React from "react";
import "./Modal.css";

export default class Modal extends React.Component {
  state = {
    isOpen: false
  };

  render() {
    return (
      <>
        <button onClick={() => this.setState({ isOpen: true })}>
          Open Modal
        </button>
        {this.state.isOpen && (
          <div className="modal">
            <div className="modal-body">
              <h1>Titile</h1>
              <p>lorem</p>
              <button onClick={() => this.setState({ isOpen: false })}>
                Close Modal
              </button>
            </div>
          </div>
        )}
      </>
    );
  }
}
