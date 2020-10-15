import React, { useState } from 'react';
import Moment from 'moment';
import { Grid, Card, Label, Image } from 'semantic-ui-react' 
import './TaskCard.css';

function TaskCard(props) {
  // State for expanding the card
  const [expanded, setExpanded] = useState(false);
  const expand = () => {
    setExpanded(!expanded);
  }

  // Show the image once it's uploaded
  const renderImage = () => {
    if (props.setup.filename) {
      return(
        <Image src={props.setup.filename} size='small' className='task-image'/>
      );
    }
    return null;
  }

  // The part of the task card which is hidden and expands on click
  const renderDetails = ()  => {
    return(
      <Card.Content>
        <div className='flex-content'>
          {renderImage()}
            <div className='container'>
              <div>
                <Card.Description className='description'>{props.description}</Card.Description>
              </div>
          </div>
        </div>
      </Card.Content>
    );
  }

  // Determine label colour based on task status
  const labelColour = () => {
    switch (props.status) {
      case 'NEW':
        return 'blue';
      case 'PROCESSING':
        return 'orange';
      case 'COMPLETED':
        return 'green';
      default:
        return 'grey';
    }
  }

  return (
    <Card fluid color='blue'>
      <Card.Content onClick={expand} className='clickable'>
        <Grid>
          <Grid.Column floated='left' width={9}>
            <Card.Header className='card-header'>{props.title}</Card.Header>
          </Grid.Column>
          <Grid.Column floated='right' width={3} className='align-right'>
            <Card.Meta>                  
              Created: {Moment(Date.parse(props.createdAt)).format('DD MMM HH:mm:SS')}
            </Card.Meta>
          </Grid.Column>
        </Grid>
      </Card.Content>
      {expanded ? renderDetails() : null}
      <Card.Content extra>
        <Grid>
          <Grid.Column floated='left' width={10}>
            <Label color={labelColour()}>{props.status}</Label>
          </Grid.Column>
        </Grid>
      </Card.Content>
    </Card>
  );
}

export default TaskCard;
