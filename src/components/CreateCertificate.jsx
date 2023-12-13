import React, { useState } from "react";
import { Icon, Button, Modal, Form, } from "semantic-ui-react";
import axios from "axios";
import Config from '../config/config';

const CreateCertificate = (props) => {
  const [open, setOpen] = React.useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    issuer: '',
    issued_to: '',
    issued_on: '',
    expiration_date: '',
  });

  const [errors, setErrors] = useState({
    name: false,
    category: false,
    issuer: false,
    issued_to: false,
    issued_on: false,
    expiration_date: false,
  });

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const handleSubmit = async () => {
    const validationErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        validationErrors[key] = true;
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
        const response = await axios.post(`${Config.API_URL}/add-new`, formData);
        setOpen(false);
        setSuccessMessage('Certificate Created Successfully.');
        await props.childFunction();
        props.handleCertificateCreate();

        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
  
        setFormData({
            name: '',
            category: '',
            issuer: '',
            issued_to: '',
            issued_on: '',
            expiration_date: '',
        });
      } catch (error) {
        console.error('Error submitting form:', error.message);
      }
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Button color="green" icon labelPosition="left">
            <Icon name="plus" />
            Add New
          </Button>
        </div>
      }
    >
      <Modal.Header>Add New Certificate</Modal.Header>
      <Modal.Content image scrolling>
        <Modal.Description>
          <Form>
          <Form.Input
            error={errors.name && { content: 'Please enter certificate name', pointing: 'below' }}
            fluid
            label="Certificate Name"
            placeholder="Certificate Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <Form.Input
            error={errors.category && { content: 'Please enter certificate category', pointing: 'below' }}
            fluid
            label="Certificate Category"
            placeholder="Certificate Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
          <Form.Input
            error={errors.issuer && { content: 'Please enter issuer name', pointing: 'below' }}
            fluid
            label="Certificate Issuer name"
            placeholder="Certificate Issuer name"
            name="issuer"
            value={formData.issuer}
            onChange={handleChange}
          />
          <Form.Input
            error={errors.issued_to && { content: 'Please enter issued to', pointing: 'below' }}
            fluid
            label="Certificate Issued to"
            placeholder="Certificate Issued to"
            name="issued_to"
            value={formData.issued_to}
            onChange={handleChange}
          />
          <Form.Input
            error={errors.issued_on && { content: 'Please enter issued on', pointing: 'below' }}
            fluid
            type="date"
            label="Certificate Issued on"
            placeholder="Issued on"
            name="issued_on"
            value={formData.issued_on}
            onChange={handleChange}
          />
          <Form.Input
            error={errors.expiration_date && { content: 'Please enter expiration date', pointing: 'below' }}
            fluid
            type="date"
            label="Certificate Expiration date"
            placeholder="Certificate Expiration date"
            name="expiration_date"
            value={formData.expiration_date}
            onChange={handleChange}
          />
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
      <Button secondary onClick={() => setOpen(false)}>
          Close
        </Button>
        <Button primary onClick={handleSubmit}> 
          Save <Icon name="chevron right" />
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default CreateCertificate;
