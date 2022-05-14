import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddItemForm from './AddItemForm';
import itemService from '../services/list'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

const KeepMountedModal = ({ open, handleOpen, handleClose, itemAdded, setItemAdded }) =>  {

const handleSubmit = async (values) => {
    const { userId, title, body } = values
    if (userId && title && body) {
      const item = {
        userId: Number(userId),
        title,
        body
      }
      try {
        await itemService.create(item)
        setItemAdded(!itemAdded)
        handleClose()
      } catch (error) {
        console.error(error.message)
      }
    }
  }

  return (
    <div>
      <Button variant='contained' color="secondary" onClick={handleOpen}>Add item</Button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Enter item info
          </Typography>
          <AddItemForm onSubmit={handleSubmit} onCancel={handleClose}/>
        </Box>
      </Modal>
    </div>
  );
}

export default KeepMountedModal
