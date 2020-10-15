import React, { useState, useEffect } from 'react';
import { Header, Form, Image } from 'semantic-ui-react';

function TaskSetupImage(props) {

  // Set up the question for the worker
  const [image, setImage] = useState(
    props.type === 'IMAGE' ? props.setup : {filename: ''}
  );

  // Force update parent state wneh image is uploaded
  useEffect(() => { props.onTaskDetailsChange({name: 'setup', value: {filename: image.filename}}); }, [image])

  // Upload handler
  const uploadImage = (event) => {
    const files = event.target.files
    const formData = new FormData()
    formData.append('myFile', files[0])
  
    fetch('/image-upload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(response => {
      console.log(response)
      setImage({filename: response.path});
    })
    .catch(error => {
      console.error(error)
    })
  }

  return (
    <div>
      <Header inverted block color='grey'>Task Setup - Image Processing</Header>
      <Form className='form-container'>
      <Form.Field>
          This task will require the worker to tag objects in the uploaded image.
        </Form.Field>
        {image.filename 
          ? <Image src={image.filename} size='medium' /> 
          : <Form.Group inline>
              <Form.Field>
                <label className='label'>Image</label>
                <input type='file' id='imageUpload' accept='.gif,.jpg,.jpeg,.png' onChange={uploadImage}></input>
              </Form.Field>
            </Form.Group>
        }
      </Form>
      
    </div>
  );
}

export default TaskSetupImage;
