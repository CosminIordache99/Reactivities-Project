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
    const {loadingProfile,loadprofile,profile} = profileStore

    useEffect(() => {
        if(username)
            loadprofile(username);
    },[loadprofile, username])

    if(loadingProfile) return <LoadingComponent content="Loading profile ..." />

    return (
        <Segment>
            <Grid.Column width={16}>
            {profile &&
                <>
                <ProfileHeader profile={profile} />
                <ProfileContent profile={profile} />
                </>
            }
            </Grid.Column>
        </Segment>
    )
})