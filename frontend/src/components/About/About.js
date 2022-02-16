import { React, Component } from 'react'
import { Card } from 'react-bootstrap';
import { faculty } from './Faculty'
import './About.css'

export default function About() {

  return (<>
  <h6 className='text-center'>The CSE Lab is located in Woolf Hall, room 221</h6>
  <div id='location-info'>
    <img src='/woolf.png' />
  </div>

  <h6 className='text-center'>Faculty</h6>
  <div id='faculty-box'>
    { faculty.map( person => (
    <Card className='faculty-card'>
      <img src={ person.imgref } />
      <p>
        <a target='_blank' href={ person.link }>{ person.name }</a><br/>
        { person.email }
      </p>
    </Card>
    ))}
  </div>

  <h6 className='text-center'>CSE Lab Policy</h6>
  <div id='policy'>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque sodales ut etiam sit amet nisl purus. Sed velit dignissim sodales ut. Metus aliquam eleifend mi in nulla posuere sollicitudin. Aliquet porttitor lacus luctus accumsan tortor posuere ac ut. Sit amet aliquam id diam maecenas ultricies mi eget mauris. Neque convallis a cras semper auctor neque vitae. Eros in cursus turpis massa tincidunt dui ut. Laoreet non curabitur gravida arcu ac tortor dignissim convallis. Vitae aliquet nec ullamcorper sit amet risus nullam eget felis. Sollicitudin tempor id eu nisl. Laoreet non curabitur gravida arcu ac. Nulla facilisi nullam vehicula ipsum a arcu cursus. Gravida quis blandit turpis cursus in. Vel eros donec ac odio tempor orci. Arcu felis bibendum ut tristique et egestas. Semper auctor neque vitae tempus. Volutpat diam ut venenatis tellus in. Ligula ullamcorper malesuada proin libero nunc consequat interdum. Quisque non tellus orci ac auctor augue mauris augue.</p>
  <p>Non diam phasellus vestibulum lorem sed. Est lorem ipsum dolor sit amet consectetur adipiscing. Proin fermentum leo vel orci. Enim facilisis gravida neque convallis. Lorem sed risus ultricies tristique. Vitae tortor condimentum lacinia quis vel eros donec ac odio. Maecenas ultricies mi eget mauris pharetra et ultrices neque ornare. Cursus risus at ultrices mi. Adipiscing at in tellus integer feugiat. Sed velit dignissim sodales ut eu sem integer vitae justo. Eget egestas purus viverra accumsan in nisl. Imperdiet nulla malesuada pellentesque elit eget gravida cum sociis natoque. Velit scelerisque in dictum non consectetur.</p>
  </div>

  </>);
}