<script>
    import {createEventDispatcher} from "svelte";
    import meetups from "./meetupStore.js";
    import Button from "../UI/Button.svelte";
    import Badge from '../UI/Badge.svelte';
    export let id, title, subtitle, description, 
            imageUrl, address, contactEmail, isFav;

    function togglefavorite() {
        meetups.toggleFavourite(id);
    }

    const dispatch = createEventDispatcher();

</script>

<style>
    article {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
        border-radius: 5px;
        background: white;
        margin: 1rem;
        padding: 1rem;
    }
    header, .content ,footer {
        padding: 1rem;
    }
    .image {
        width: 100%;
        height: 14rem;
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    h1 {
        font-size: 1.25rem;
        margin: 0.5rem 0;
    }
    p {
        font-size: 1.25rem;
        margin: 0.5rem 0;
    }
    div{
        text-align: right;
    }
    /* a{
        color: black;
        text-decoration: none;
    } */
    .content {
        height: 4rem;
        
    }

</style>

<article>
    <header>
        <h1>
            {title} 
            {#if isFav}
            <Badge>Favorited</Badge>
            {/if}
        </h1>
        <h2>{subtitle}</h2>
    </header>
    <div class="image">
        <img src="{imageUrl}" alt="{title}">
    </div>
    <div class="content">
        <p>{description}</p>
    </div>
    <footer>
        <p>{address}</p>
        <Button href="mailto:{contactEmail}">Contact</Button>
        <Button type="button" on:click={() => dispatch('showdetails', id)}>Show Details</Button>
        <Button mode="outline" buttoncolor={isFav ? null : 'success'} 
            type="button" 
            on:click="{togglefavorite}">
                {isFav? "Unfavorite" : "Favorite"}
            </Button>
        
    </footer>
</article>