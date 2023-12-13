import React, { useState } from "react";
import { Icon, Button, Modal, Image, List } from "semantic-ui-react";

const ViewCertificate = (props) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      size='tiny'
      trigger={
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Button color="teal" icon labelPosition="left">
            <Icon name="arrows alternate" />
            View
          </Button>
        </div>
      }
    >
      <Modal.Header>View Certificate</Modal.Header>
      <Modal.Content image scrolling>
      <Image
          size='medium'
          style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }}
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVNKYcxf3D_uYDsQSrHMaGQcr0hh9cQR79FQ&usqp=CAU'
          circular
        />
        <Modal.Description>
            <List>                
                <List.Item style={{ marginBottom: '10px' }}>
                    <List.Icon name="user" />
                    <List.Content>{props.certificateData["issued_to"]}</List.Content>
                </List.Item>
                <List.Item style={{ marginBottom: '10px' }}>
                    <List.Icon name="clipboard" />
                    <List.Content>{props.certificateData["name"]}</List.Content>
                </List.Item>
                <List.Item style={{ marginBottom: '10px' }}>
                    <List.Icon name="tag" />
                    <List.Content>{props.certificateData["category"]}</List.Content>
                </List.Item>
                <List.Item style={{ marginBottom: '10px' }}>
                    <List.Icon name="marker" />
                    <List.Content>{props.certificateData["issuer"]}</List.Content>
                </List.Item>
                <List.Item style={{ marginBottom: '10px' }}>
                    <List.Icon name="calendar alternate" />
                    <List.Content>{props.certificateData["issued_on"]}</List.Content>
                </List.Item>
                <List.Item style={{ marginBottom: '10px' }}>
                    <List.Icon name="calendar alternate outline" />
                    <List.Content>{props.certificateData["expiration_date"]}</List.Content>
                </List.Item>
            </List>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
      <Button
          content="Yep, that's Fine"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};

export default ViewCertificate;
