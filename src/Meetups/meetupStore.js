import {writable} from 'svelte/store';

const meetups = writable([{
    id: 'm1',
    title: 'First MeetUp',
    subtitle: 'This is a first meetup',
    description: 'Lets meet at the beach',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1024px-Stadtbild_M%C3%BCnchen.jpg',
    address: 'Obere Str. 57',
    contactEmail: 'qM9iU@example.com',
    isFavorite: false,
    },
    {
    id: 'm2',
    title: 'Second MeetUp',
    subtitle: 'This is a second meetup',
    description: 'Lets meet at the park',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1024px-Stadtbild_M%C3%BCnchen.jpg',
    address: 'Obere Str. 57',
    contactEmail: 'qM9iU@example.com',
    isFavorite: false,
    }
]);

const customMeetupStore = {
    subscribe: meetups.subscribe,
    addMeetup: (meetupData) => {
        const newMeetup = {
            ...meetupData,
            id: Math.random().toString(),
            isFavorite: false
        }
        meetups.update((items) => {
            return[newMeetup, ...items]
        })
    },
    updateMeetup: (id, meetupData) => {
        meetups.update(items => {
            const meetupIndex = items.findIndex(i => i.id === id);
            const updatedMeetup = {...items[meetupIndex], ...meetupData};
            const updatedMeetups = [...items]
            updatedMeetups[meetupIndex] = updatedMeetup;
            return updatedMeetups;
        })
    },
    removeMeetup: id => {
        meetups.update(items => {
            return items.filter(i => i.id !== id);
        })
    },
    toggleFavourite: id => {
        meetups.update(items => {
            const updatedMeetup = { ...items.find(m => m.id === id)};
            updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
            const meetupIndex = items.findIndex(m => m.id === id);
            const updatedMeetups = [...items];
            updatedMeetups[meetupIndex] = updatedMeetup;
            return updatedMeetups;    
        })
    }

}


export default customMeetupStore;
