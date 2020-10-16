import React, { Fragment, useState } from 'react';
import Moment from 'moment';
import { Header, Progress } from 'semantic-ui-react' 
import './TaskResults.css';

// Bar Colours
const colours = ['red', 'yellow', 'green', 'blue', 'purple', 'teal', 'brown', 'grey'];

// Render result bars
const renderBars = (response) => {
  if (response && response.result) {
    return(
      response.result.images[0].classifiers[0].classes.map((classifier, index) => 
      <Progress 
        key={index}
        percent={(classifier.score * 100).toFixed(2)}
        size='tiny'
        color={colours[index]}
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
      {renderBars(props.response)}
    </Fragment>
  );
}

export default TaskResults;
