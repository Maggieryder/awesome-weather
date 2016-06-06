import React, {Component} from 'react'
import { connect } from 'react-redux'
import Bootstrap, { Modal } from 'react-bootstrap';
import { toggleModal } from '../../actions/index'

class ModalInstance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open:false
    }
  }
  componentWillMount(){
    this.setState({open:this.props.modal.modalOpen})
  }
  toggleModal = () => {
    this.props.toggleModal(null)
  }
  render(){
    let { modalOpen, modalContent} = this.props.modal
    console.log('modalOpen', this.props.modal)
    return (
      <Modal show={this.state.open} onHide={this.toggleModal}>
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

function mapStateToProps({ modal }){
  return { modal }
}

export default connect(mapStateToProps, { toggleModal })(ModalInstance)
