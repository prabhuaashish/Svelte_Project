<script>
    import customMeetupStore from "./meetupStore.js"
    import { createEventDispatcher } from "svelte";
    import TextInput from "../UI/TextInput.svelte";
    import Button from "../UI/Button.svelte";
    import Modal from "../UI/Modal.svelte";
    import {isEmpty} from "../helpers/validation.js";

    const dispatch = createEventDispatcher();

    export let id = null;

    
    let title = '';
    let subtitle = '';
    let description = '';
    let imageUrl = '';
    let address = '';
    let contactEmail = '';
    
    if (id) {
        const unsubscribe = customMeetupStore.subscribe(items => {
            const selectedMeetup = items.find(i => i.id === id);
            title = selectedMeetup.title;
            subtitle = selectedMeetup.subtitle;
            description = selectedMeetup.description;
            imageUrl = selectedMeetup.imageUrl;
            address = selectedMeetup.address;
            contactEmail = selectedMeetup.contactEmail;
        })
        unsubscribe();
    }
    
    $: titleValid = !isEmpty(title);
    $: subtitleValid = !isEmpty(subtitle);
    $: descriptionValid = !isEmpty(description);
    $: imageUrlValid = !isEmpty(imageUrl);
    $: addressValid = !isEmpty(address);
    $: contactEmailValid = !isEmpty(contactEmail);
    $: formIsValid = titleValid && subtitleValid && descriptionValid && imageUrlValid && addressValid && contactEmailValid;

    function submitForm() {
        const meetupData = {
            title: title,
            subtitle: subtitle,
            description: description,
            imageUrl: imageUrl,
            address: address,
            contactEmail: contactEmail,
        };

        if (id) {
            fetch(`https://svelte-project-8d391-default-rtdb.firebaseio.com/meetups/${id}.json`, {
                method: 'PATCH', 
                body: JSON.stringify(meetupData),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                if(!res.ok){
                    throw new Error('an error occured');
                }
                customMeetupStore.updateMeetup(id, meetupData);
            }).catch(err => {
                console.log(err);
            })
        }else{
            fetch("https://svelte-project-8d391-default-rtdb.firebaseio.com/meetups.json", {
                method: 'POST',
                body: JSON.stringify({...meetupData, isFavourite: false}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                if(!res.ok){
                    throw new Error('an error occured');
                }
                return res.json();
            })
            .then(data => {
                customMeetupStore.addMeetup({...meetupData, isFavourite:false, id: data.name});
            })
            .catch(err => {
                console.log(err);
            })      
        }
        dispatch('save');
    }
    function cancel() {
        dispatch('cancel');
    }
    function deleteMeetup() {
        fetch(`https://svelte-project-8d391-default-rtdb.firebaseio.com/meetups/${id}.json`, {
            method: 'DELETE'
        }).then(res => {
            if(!res.ok){
                throw new Error('An error occured');
            }
        }).catch(err => {
            
        })
        customMeetupStore.removeMeetup(id);
        dispatch('save');
    }

</script>

<style>
    form {
        width: 100%;
    }
</style>
<Modal title="Edit Meetup" on:cancel>
    <form on:submit|preventDefault={submitForm}>
        <TextInput 
            id="title" 
            label="Title" 
            value = {title} 
            valid = {titleValid}
            validityMessage="Please enter a valid Title"
            on:input={event => title = event.target.value}/>
        <TextInput 
            id="subtitle" 
            label="Subtitle" 
            value = {subtitle} 
            valid = {subtitleValid}
            validityMessage="Please enter a valid Subtitle" 
            on:input={event => subtitle = event.target.value}/>
        <TextInput 
            id="description" 
            label="Description" 
            controlType="textarea"
            value = {description} 
            valid = {descriptionValid}
            validityMessage="Please enter a valid Description"  
            on:input={event => description = event.target.value}/>
        <TextInput 
            id="imageUrl" 
            label="Image Url" 
            value = {imageUrl} 
            valid = {imageUrlValid}
            validityMessage="Please enter a valid Image Url"
            on:input={event => imageUrl = event.target.value}/>
        <TextInput 
            id="address" 
            label="Address" 
            value = {address} 
            valid = {addressValid}
            validityMessage="Please enter a valid Address"
            on:input={event => address = event.target.value}/>
        <TextInput 
            id="contactEmail" 
            label="Contact Email" 
            type="email"
            value = {contactEmail} 
            valid = {contactEmailValid}
            validityMessage="Please enter a valid Contact Email"
            on:input={event => contactEmail = event.target.value}/>
        <Button type="button" mode = "outline" on:click={cancel} slot="footer" >Cancel</Button>
        <Button type="submit" slot="footer" disabled={!formIsValid}>Save</Button>
        {#if id}
            <Button type="button" on:click={deleteMeetup}>Delete</Button>
            
        {/if}    
    </form>
</Modal>