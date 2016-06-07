import React, {Component} from 'react'
import { connect } from 'react-redux'
import Bootstrap, { Modal } from 'react-bootstrap';
import { toggleModal, modal } from '../../actions/index'

class ModalInstance extends Component {
  constructor(props) {
    super(props);
  }
  toggleModal = () => {
    this.props.onClose('autoip')
    this.props.toggleModal(null)
  }
  render(){
    let { modalOpen, modalContent } = this.props.modal
    console.log('modalContent', modalContent)
    let style = {
      //color:'#333'
    }
    return (
      <Modal show={modalOpen} onHide={this.toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title style={style}>{modalContent ? modalContent.title : null }</Modal.Title>
        </Modal.Header>
        <Modal.Body style={style}>
          {modalContent ? modalContent.body : null }
        </Modal.Body>
      </Modal>
    );
  }
}

function mapStateToProps({ modal }){
  return { modal }
}

export default connect(mapStateToProps, { toggleModal })(ModalInstance)
