<script>
    import meetups from "./Meetups/meetupStore.js";
    import Header from "./UI/Header.svelte";
    import MeetupGrid from "./Meetups/MeetupGrid.svelte";
    import TextInput from "./UI/TextInput.svelte";
    import Button from "./UI/Button.svelte";
    import EditMeetup from "./Meetups/EditMeetup.svelte";
    import MeetupDetail from "./Meetups/MeetupDetail.svelte";

    let loadedMeetups = meetups;
    
    let editMode;
    let page = 'overview';
    let pageData = {};

    function addMeetup(event) {
        editMode = null;
    }
    function showDetails(event) {
        page = 'details';
        pageData.id = event.detail;
    }
    function closeDetails(){
        page = 'overview';
        pageData = {};
    }

</script>

<style>
    main {
        margin-top: 5rem;
    }
    .meetup-button {
        margin: 1rem;
        text-align: right;
    }

</style>

<Header />

<main>
    {#if page === 'overview'}
        <div class="meetup-button">
            <Button on:click={() => editMode = 'add'}>New Meetup</Button>
        </div>
        {#if editMode === 'add'}
            <EditMeetup on:save={addMeetup} on:cancel={() => editMode = null}/>
        {/if}
        <MeetupGrid meetups={$loadedMeetups} on:showdetails={showDetails} />
    {:else}
        <MeetupDetail id={pageData.id} on:close={closeDetails} />
    {/if}
</main>
