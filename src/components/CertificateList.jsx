import React, { useState, useEffect } from "react";
import { Icon, Table, Button, Header, Modal, Message, Segment, Dimmer, Loader, Image } from "semantic-ui-react";
import axios from "axios";
import CreateCertificate from "./CreateCertificate";
import ViewCertificate from "./ViewCertificate";
import Config from "../config/config";

function exampleReducer(state, action) {
  switch (action.type) {
    case "close":
      return { open: false };
    case "open":
      return { open: true, size: action.size, id: action.id };
    default:
      throw new Error("Unsupported action...");
  }
}

const CertificateList = () => {
  const [certificates, setCertificates] = useState([]);
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  });
  const { open, size, id } = state;
  const [deleteCertificateId, setDeleteCertificateId] = useState("");
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentModalId, setCurrentModalId] = useState(null);
  const [successMessage, setSuccessMessage] = useState(''); 
  const [error, setError] = useState(null);

  useEffect(() => {
    getCertificatesList();
  }, [successMessage]);

  const getCertificatesList = async () => {
    try {
      const response = await axios.get(`${Config.API_URL}/list`);
      setCertificates(response.data.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching certificates. Please try again.");
      console.error("Error fetching certificates:", error.message);
      setLoading(false);
    }
  };

  const deleteCertificate = async (deleteCertificateId) => {
    try {
      await axios.delete(`${Config.API_URL}/delete/${deleteCertificateId}`);
      setCertificates(
        certificates.filter((cert) => cert.id !== deleteCertificateId)
      );
      setDeleteCertificateId("");
      setShowNotification(true);
      setFeedback("Certificate Deleted Successfully.");
      dispatch({ type: "close" });
      setCurrentModalId(null);
    } catch (error) {
      console.error("Error deleting certificate:", error.message);
      setFeedback("Error deleting certificate. Please try again.");
    }
  };

  const handleDeleteClick = (id) => {
    dispatch({ type: "open", size: "mini", id });
    setDeleteItemId(id);
    setDeleteModal(true);
    setCurrentModalId(id);
  };

  const closeNotification = () => {
    setShowNotification(false);
  };

  const handleCertificateCreate = () => {
    setSuccessMessage('Certificate created successfully.');
    setTimeout(() => {
      setSuccessMessage('');
    }, Config.MESSAGE_HIDE_DURATION);
  };

  useEffect(() => {
    if (showNotification) {
      const timeoutId = setTimeout(() => {
        closeNotification();
      }, Config.MESSAGE_HIDE_DURATION); 

      return () => {
        clearTimeout(timeoutId); 
      };
    }
  }, [showNotification]);

  return (
    <div>
      <Header as="h2" icon textAlign="center">
        <Icon name="file alternate" circular />
        <Header.Content>
          Simplified Certificate Management System
        </Header.Content>
      </Header>

      <CreateCertificate childFunction = {getCertificatesList} handleCertificateCreate={handleCertificateCreate}/>
      
      {showNotification && (
        <Message
          success
          onDismiss={closeNotification}
          header={feedback}
          content=""
        />
      )}

      {successMessage && (
        <Message
          success
          onDismiss={() => setSuccessMessage('')}
          header={successMessage}
          content=""
        />
      )}

      {error && (
        <Message negative>
          <Message.Header>Error</Message.Header>
          <p>{error}</p>
        </Message>
      )}

      {loading ? (
        <Segment>
          <Dimmer active={loading} inverted>
            <Loader size="large">Loading</Loader>
          </Dimmer>
          <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
        </Segment>
      ) : (
        <div style={{ height: '500px', overflowY: 'scroll', marginTop: '20px' }}>
          <Table striped >
            <Table.Header style={{ position: 'sticky', top: 0, background: 'white' }}>
              <Table.Row>
                <Table.HeaderCell>Sr.</Table.HeaderCell>
                <Table.HeaderCell>Certificate Name</Table.HeaderCell>
                <Table.HeaderCell>Category</Table.HeaderCell>
                <Table.HeaderCell>Issued To</Table.HeaderCell>
                <Table.HeaderCell>Issued On</Table.HeaderCell>
                <Table.HeaderCell>Issued By</Table.HeaderCell>
                <Table.HeaderCell>Expiration Date</Table.HeaderCell>
                <Table.HeaderCell>View</Table.HeaderCell>
                <Table.HeaderCell>Delete</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body style={{ overflowY: 'scroll', height: '450px' }}>
              {certificates.length > 0 && certificates.map((data, index) => {
                  return (
                    <Table.Row key={index}>
                      <Table.Cell>{index + 1}.</Table.Cell>
                      <Table.Cell>{data.name}</Table.Cell>
                      <Table.Cell>{data.category}</Table.Cell>
                      <Table.Cell>{data.issued_to}</Table.Cell>
                      <Table.Cell>{data.issued_on}</Table.Cell>
                      <Table.Cell>{data.issuer}</Table.Cell>
                      <Table.Cell>{data.expiration_date}</Table.Cell>
                      <Table.Cell>
                        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
                        <ViewCertificate certificateData = {data}/>
                      </Table.Cell>
                      <Table.Cell>
                        <Button
                          color="red"
                          onClick={() => handleDeleteClick(data.id)}
                          icon
                          labelPosition="left"
                        >
                          <Icon name="delete" />
                          Delete
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
            </Table.Body>
          </Table>
        </div>
      )}

      <Modal
        size={size}
        open={deleteModal && currentModalId === id}
        onClose={() => dispatch({ type: "close" })}
      >
        <Modal.Header>Delete Certificate</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete certificate ?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => dispatch({ type: "close" })}>
            No
          </Button>
          <Button positive onClick={() => deleteCertificate(deleteItemId)}>
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default CertificateList;