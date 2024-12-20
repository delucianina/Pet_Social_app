// ------------------------------------------- IMPORTS
import { Button, Modal } from 'react-bootstrap';
import { useQuery } from '@apollo/client';

import { GET_POST_FOR_PET } from '../../../graphql/queries';
import { Pet, Post } from '../../../interfaces';


interface ModalProps {
    showPostsModal: boolean;
    setShowPostsModal: React.Dispatch<React.SetStateAction<boolean>>;
    selectedPet: Pet | null;
}

 


// ------------------------------ DECLARE THE FUNCTION 
function ViewPostsModal({
    showPostsModal,
    setShowPostsModal,
    selectedPet
}: ModalProps) {

    // LOCAL DECLARATIONS INSIDE FUNCTION
    const {data: postData} = useQuery(GET_POST_FOR_PET, {
        variables: {
            petId: selectedPet?._id
        }
    });
    const handleModalClose = () => setShowPostsModal(false);

    // CHECKPOINT LOOKING TO SEE IF ITS WORKING 
    if (postData) {
        console.log(postData);
    }


    // THE RETURN STATEMENT 
    return (
        <Modal show={showPostsModal} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Posts for {selectedPet?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {postData && postData.getPostsForPet.map((post: Post) => (
            <article key={post._id}>
                <h5>{post.title}</h5>
                <p>{post.body}</p>
            </article>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    )
}

export default ViewPostsModal;