<script>
    import Meetupitem from "./Meetupitem.svelte";
    export let meetups;
</script>

<style>
    section {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 1rem;
        margin-top: 5rem;
    }

    @media (min-width: 768px) {
        section {
            grid-template-columns: repeat(2, 1fr);
        }
    }
</style>


<section id = "meetups">
    {#each meetups as meetup}
    <Meetupitem id = {meetup.id}
                title={meetup.title} 
                subtitle={meetup.subtitle} 
                description={meetup.description} 
                imageUrl={meetup.imageUrl} 
                address={meetup.address} 
                contactEmail={meetup.contactEmail}
                isFav= {meetup.isFavorite} 
                on:showdetails
                />
    {/each}
</section>
    