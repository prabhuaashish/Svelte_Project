<script>
    import meetups from "./meetupStore.js";
    import { createEventDispatcher } from "svelte";
    import TextInput from "../UI/TextInput.svelte";
    import Button from "../UI/Button.svelte";
    import Modal from "../UI/Modal.svelte";
    import {isEmpty} from "../helpers/validation.js";

    const dispatch = createEventDispatcher();

    let title = '';
    let subtitle = '';
    let description = '';
    let imageUrl = '';
    let address = '';
    let contactEmail = '';


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
        meetups.addMeetup(meetupData);
        dispatch('save');
    }
    function cancel() {
        dispatch('cancel');
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
            bindvalue = {description} 
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
    </form>
</Modal>