import React, { Fragment } from 'react';
import { Header, Progress } from 'semantic-ui-react' 

// Bar Colours
const colours = ['purple', 'blue', 'green', 'yellow', 'red', 'brown', 'teal'];

// Render result bars
const renderBars = (response) => {
  if (response && response.result) {
    return(
      response.result.images[0].classifiers[0].classes.map((classifier, index) => 
      <Progress 
        key={index}
        percent={(classifier.score * 100).toFixed(2)}
        size='tiny'
        color={index < colours.length ? colours[index] : colours[index % colours.length]}
      >
        {classifier.class.toLowerCase() + ': ' + (classifier.score * 100).toFixed(2)}% 
      </Progress>
    ));
  }
  return null;
}

function TaskResults(props) {

  return (
    <Fragment>
      <Header as='h3'>Result</Header>
      {props.response ? renderBars(props.response) : <p>Result not available yet...</p>}
    </Fragment>
  );
}

export default TaskResults;
