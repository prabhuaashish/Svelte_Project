<script>
    import { createEventDispatcher } from "svelte";
    import {scale} from "svelte/transition";
    import {flip} from "svelte/animate";
    import Meetupitem from "./Meetupitem.svelte"
    import MeetupsFilter from "./MeetupsFilter.svelte";
    import Button from "../UI/Button.svelte";
    export let meetups;

    const dispatch = createEventDispatcher();

    let favsOnly = false;
    $: filteredMeetups = favsOnly ? meetups.filter(m => m.isFavorite) : meetups;
    function setFilter(event){
        favsOnly = event.detail ===1;
    }
</script>

<style>
    #meetups {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 1rem;
        margin-top: 5rem;
    }

    #meetup-controls {
        margin: 1rem;
        display: flex;
        justify-content: space-between;
        
    }

    #no-meetups {
        margin: 1rem;
    }

    @media (min-width: 768px) {
        #meetups {
            grid-template-columns: repeat(2, 1fr);
        }
    }
</style>
<section id='meetup-controls'>
    <MeetupsFilter on:select={setFilter}/>

    <Button on:click={() => dispatch('add')}>New Meetup</Button>

</section>
{#if filteredMeetups.length === 0}
    <p id="no-meetups">No meetups found</p>
{/if}
<section id = "meetups">
    {#each filteredMeetups as meetup (meetup.id)}
        <div transition:scale animate:flip={{duration:500}} >

            <Meetupitem id = {meetup.id}
            title={meetup.title} 
            subtitle={meetup.subtitle} 
            description={meetup.description} 
            imageUrl={meetup.imageUrl} 
            address={meetup.address} 
            contactEmail={meetup.contactEmail}
            isFav= {meetup.isFavorite} 
            on:showdetails
            on:edit
            />
        </div>
    {/each}
</section>
    