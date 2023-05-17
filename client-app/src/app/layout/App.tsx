import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import {Container} from 'semantic-ui-react'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';

function App() {

  const [activities,setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined >(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect( ()=> {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
    .then(response =>{
      setActivities(response.data);
    })
  },[] )

  function handleSelectedActivity(id: string){
    setSelectedActivity(activities.find(x=> x.id === id));
  }

  function handleCancelSelectedActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string ){
    id ? handleSelectedActivity(id) : handleCancelSelectedActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity){
    activity.id 
      ? setActivities([...activities.filter(x => x.id !== activity.id), activity]) // if we have an activity
      : setActivities([...activities, {...activity, id: uuid()}]); //if we not
      setEditMode(false)
      setSelectedActivity(activity);
  }

  function handleDeleteActivity (id: string) {
    setActivities([...activities.filter(x => x.id !== id)])
  }

  return (
    <Fragment>
        <NavBar openForm={handleFormOpen}/>
        <Container style={{marginTop: '7em'}}>
          <ActivityDashboard
           activities={activities}
           selectedActivity={selectedActivity}
           selectActivity={handleSelectedActivity}
           cancelSelectActivity={handleCancelSelectedActivity}
           editMode={editMode}
           openForm={handleFormOpen}
           closeForm={handleFormClose}
           createOrEdit={handleCreateOrEditActivity}
           deleteActivity={handleDeleteActivity}
           />
        </Container>
    </Fragment>
  );
}

export default App;
