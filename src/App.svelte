<script>
    import meetups from "./Meetups/meetupStore.js";
    import Header from "./UI/Header.svelte";
    import MeetupGrid from "./Meetups/MeetupGrid.svelte";
    import TextInput from "./UI/TextInput.svelte";
    import Button from "./UI/Button.svelte";
    import EditMeetup from "./Meetups/EditMeetup.svelte";
    import MeetupDetail from "./Meetups/MeetupDetail.svelte";
    import LoadingSpinner from "./UI/LoadingSpinner.svelte";

    let loadedMeetups = meetups;
    
    let editMode;
    let editedId;
    let page = 'overview';
    let pageData = {};
    let isLoading = true;

    fetch("https://svelte-project-8d391-default-rtdb.firebaseio.com/meetups.json")
    .then(res => {
        if(!res.ok){
            throw new Error('Failed to fetch');
        }
        return res.json();
    })
    .then(data => {
        const loadedMeetups = [];
        for (const key in data){
            loadedMeetups.push({
                ...data[key],
                id: key
            })
        }
        setTimeout(() => {
            isLoading = false;
            meetups.setMeetups(loadedMeetups.reverse());           
        }, 100);
    })
    .catch(err => {
        isLoading = false;
        console.log(err);
    });

    function savedMeetup(event) {
        editMode = null;
        editedId = null;
    }
    function cancelEvent(){
        editMode = null;
        editedId = null;
    }
    function showDetails(event) {
        page = 'details';
        pageData.id = event.detail;
    }
    function closeDetails(){
        page = 'overview';
        pageData = {};
    }
    function startEdit(event){
        editMode = 'edit';
        editedId =  event.detail;
    }

</script>

<style>
    main {
        margin-top: 5rem;
    }

</style>

<Header />

<main>
    {#if page === 'overview'}
        {#if editMode === 'edit'}
            <EditMeetup id={editedId} on:save={savedMeetup} on:cancel={cancelEvent}/>
        {/if}
        {#if isLoading}
            <LoadingSpinner/>
        {:else}       
        <MeetupGrid meetups={$loadedMeetups} 
            on:showdetails={showDetails} 
            on:edit={startEdit}
            on:add = {() => editMode = 'edit'}/>
        {/if}
    {:else}
        <MeetupDetail id={pageData.id} on:close={closeDetails} />
    {/if}
</main>
