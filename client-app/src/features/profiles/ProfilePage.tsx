import { Grid, Segment } from "semantic-ui-react";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import { useParams } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";

export default observer( function ProfilePage () {
    const {username} = useParams<{username: string}>();
    const {profileStore} = useStore();
    const {loadingProfile,loadprofile,profile, setActiveTab} = profileStore

    useEffect(() => {
        if(username) loadprofile(username);
        return () => {
            setActiveTab(0);
        }
    },[loadprofile, username])

    if(loadingProfile) return <LoadingComponent content="Loading profile ..." />

    if (!profile) return <h2>Problem loading profile</h2>

    return (
        <Grid>
            <Grid.Column width='16'>
                <ProfileHeader profile={profile}/>
                <ProfileContent profile={profile} />
            </Grid.Column>
        </Grid>
    )
})