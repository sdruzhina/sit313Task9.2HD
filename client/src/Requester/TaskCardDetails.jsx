import React from 'react';
import { Grid, Card, Image } from 'semantic-ui-react' 
import TaskResults from './TaskResults'

function TaskCardDetails(props) {

  // Show the image once it's uploaded
  const renderImage = () => {
    if (props.setup.filename) {
      return(
        <Image src={props.setup.filename} size='small' className='task-image'/>
      );
    }
    return null;
  }

  return(
    <Card.Content>
      <div className='flex-content'>
        {renderImage()}
          <div className='container'>
            <Grid>
              <Grid.Column floated='left' width={4}>
                <Card.Description className='description'>{props.description}</Card.Description>
              </Grid.Column>
              <Grid.Column width={6} floated='left'>
                <TaskResults 
                  response={props.response}
                /> 
              </Grid.Column>
            </Grid>
        </div>
      </div>
    </Card.Content>
  );
}

export default TaskCardDetails;
