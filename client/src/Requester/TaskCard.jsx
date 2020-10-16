import React, { useState } from 'react';
import Moment from 'moment';
import { Grid, Card, Label, Image } from 'semantic-ui-react' 
import TaskCardDetails from './TaskCardDetails'
import './TaskCard.css';

function TaskCard(props) {
  // State for expanding the card
  const [expanded, setExpanded] = useState(false);
  const expand = () => {
    setExpanded(!expanded);
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
      {expanded 
      ? <TaskCardDetails 
        description = {props.description}
        setup = {props.setup}
        response = {props.response} 
        /> 
      : null}
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
