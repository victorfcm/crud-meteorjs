import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';

import './task.js';
import './body.html';

Template.body.helpers({
    tasks() {
        return Tasks.find({}, {sort: {createdAt: -1}});
    },
});

Template.body.events({
    'submit .new-task'(event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        const text = target.text.value;

        // Insert a task into the collection
        Tasks.insert({
            text,
            createdAt: new Date(), // current time
        });

        // Clear form
        target.text.value = '';
    },

    'submit .edit-task'(event) {
        // Prevent default browser form submit
        event.preventDefault();

        const target = event.target;
        const text = target.text.value;

        Tasks.update(this._id, {
            $set: { text: text },
        });
    }
});