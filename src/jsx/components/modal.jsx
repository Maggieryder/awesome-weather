import React, { Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap';
import { toggleModal } from '../../actions/index'

class ModalInstance extends Component {
  constructor(props) {
    super(props);
  }
  toggleModal = () => {
    this.props.onClose(this.props.modal.modalContent.lastLocation || 'autoip')
    this.props.toggleModal(null)
  }
  render(){
    let { modalOpen, modalContent } = this.props.modal
    //console.log('modalContent', modalContent)
    return (
      <Modal show={modalOpen} bsSize="small" onHide={this.toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalContent ? modalContent.title : null }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalContent ? modalContent.body : null }
        </Modal.Body>
      </Modal>
    );
  }
}

ModalInstance.propTypes = {
  onClose: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  modal: PropTypes.shape({
    modalContent: PropTypes.object,
    modalOpen: PropTypes.bool.isRequired
  })
}

function mapStateToProps({ modal }){
  return { modal }
}

export default connect(mapStateToProps, { toggleModal })(ModalInstance)
