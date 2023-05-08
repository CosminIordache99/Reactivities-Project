import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import {Container} from 'semantic-ui-react'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

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
      : setActivities([...activities, activity]); //if we not
      setEditMode(false)
      setSelectedActivity(activity);
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
           />
        </Container>
    </Fragment>
  );
}

export default App;
