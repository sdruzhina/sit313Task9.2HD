import React from 'react';
import './PageFooter.css'
import { Container, Segment, Form, Input, Grid, Button, Image } from 'semantic-ui-react'

function PageFooter() {
  return (
    <div>
        <Segment
          inverted
          vertical
          huge
          padded='very'
        >
          <Container>
            <Grid>
            <div className='footer-flexbox'>
              <div className='footer-group'>
                <div className='footer-text'>
                  Newsletter Sign
                </div>
                <Form>
                  <Form.Group inline>
                    <Form.Field>
                      <Input placeholder='Enter your email' name='email' />
                    </Form.Field>
                    <Button type='submit'>Submit</Button>
                  </Form.Group>
                </Form>
              </div>
              <div class='social'>
                <div className='footer-text'>
                  Connect us
                </div>
                <Image src='/images/facebook.png' />
                <Image src='/images/twitter.png' />
                <Image src='/images/instagram.png' />
              </div>
            </div>
            </Grid>
          </Container>
      </Segment>
    </div>
  );
}

export default PageFooter;
