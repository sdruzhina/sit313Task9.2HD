import React, { useState } from 'react';
import Moment from 'moment';
import { Button, Grid, Card, Icon, Image } from 'semantic-ui-react' 
import './TaskCard.css';

function TaskCard(props) {
  // State for expanding the card
  const [expanded, setExpanded] = useState(false);
  const expand = () => {
    setExpanded(!expanded);
  }

  // Handle task deletion
  const deleteTask = (e, data) => {
    console.log(data);
    props.onDelete(data.name);
  }

  // Show the image if the task is of the image processing type
  const renderImage = () => {
    if (props.type === 'IMAGE' && props.setup.filename) {
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
                <Card.Meta>Number of workers required: {props.numberWorkers}</Card.Meta>
                <Card.Meta>Master workers: {props.master ? 'YES' : 'NO'}</Card.Meta>
              </div>
            <Button 
              floated='right' 
              color='red' 
              name={props.id}
              onClick={deleteTask}
            >Delete</Button>
          </div>
        </div>
      </Card.Content>
    );
  }

  return (
    <Card fluid color='violet'>
      <Card.Content onClick={expand} className='clickable'>
        <Grid>
          <Grid.Column floated='left' width={10}>
            <Card.Header className='card-header'>{props.title}</Card.Header>
          </Grid.Column>
          <Grid.Column floated='right' width={2} className='align-right'>
            <Card.Meta>                  
              {(props.type.toLowerCase()).replace(/^.{1}/g, props.type[0].toUpperCase()) + ' Task'}
            </Card.Meta>
          </Grid.Column>
        </Grid>
      </Card.Content>
      {expanded ? renderDetails() : null}
      <Card.Content extra>
        <Grid>
          <Grid.Column floated='left' width={10}>
            <Icon name='dollar' />{props.reward}
          </Grid.Column>
          <Grid.Column floated='right' width={2} className='align-right'>
            <Card.Meta>                  
              <Icon name='clock' style={{marginRight: '10px' }} />{Moment(Date.parse(props.expiry)).format('DD MMM')}
            </Card.Meta>
          </Grid.Column>
        </Grid>
      </Card.Content>
    </Card>
  );
}

export default TaskCard;
