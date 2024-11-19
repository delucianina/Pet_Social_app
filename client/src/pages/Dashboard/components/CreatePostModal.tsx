// ---------------------------------- IMPORTS
import { useState } from 'react';
import { Button, Form, Modal, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';

import { GET_POST_FOR_PET } from '../../../graphql/queries';
import { CREATE_POST } from '../../../graphql/mutations';
import { Pet } from '../../../interfaces';



// ---------------------- DECLARATIONS AND INTERFACES 
const initialFormData = {
  title: '',
  body: '',
  errorMessage: ''
};

interface ModalProps {
  selectedPet: Pet | null;
  showCreatePostModal: boolean;
  setShowCreatePostModal: React.Dispatch<React.SetStateAction<boolean>>;
}




// ------------------------------- DECLARE THE FUNCTION 
function CreatePostModal({
  selectedPet,
  showCreatePostModal,
  setShowCreatePostModal
}: ModalProps) {
  const [formData, setFormData] = useState(initialFormData);
  const [createPost] = useMutation(CREATE_POST, {
    refetchQueries: [{
        query: GET_POST_FOR_PET,
    variables: {
        petId: selectedPet?._id
    }
}]
  });

  const handleModalClose = () => setShowCreatePostModal(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async () => {
    try {
      await createPost({
        variables: {
          ...formData,
          pet: selectedPet?._id
        }
      });

      handleModalClose();
    } catch (error: any) {
      setFormData({
        ...formData,
        errorMessage: error.message
      });
    }
  }

  return (
    <Modal show={showCreatePostModal} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create post for {selectedPet?.name}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
      
      {/* ----- ERROR MESSAGE ----- */}
      {formData.errorMessage && <Alert variant="danger">
        {formData.errorMessage}</Alert>}
      
      <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              value={formData.title}
              type="text"
              placeholder="Enter the title of your post"
              autoFocus
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Enter the post details</Form.Label>
            <Form.Control
              name="body"
              value={formData.body}
              onChange={handleInputChange}
              as="textarea"
              rows={3}
              placeholder="Type your details" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Add Post
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreatePostModal;