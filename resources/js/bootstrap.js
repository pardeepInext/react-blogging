window._ = require('lodash');



/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

import Echo from 'laravel-echo'
window.Pusher = require('pusher-js');
import axios from './axios';
let token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
let id = JSON.parse(localStorage.getItem('user')).id;
if (typeof token === "string") {

    window.Echo = new Echo({
        broadcaster: 'pusher',
        key: process.env.MIX_PUSHER_APP_KEY,
        cluster: process.env.MIX_PUSHER_APP_CLUSTER,
        forceTLS: true,
        // auth: {
        //     headers: {
        //         Authorization: 'Bearer ' + token
        //     },
        // }
        authorizer: (channel, options) => {
            return {
                authorize: (socketId, callback) => {
                    axios.post('/broadcasting/auth', {
                        socket_id: socketId,
                        channel_name: channel.name
                    }, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                        .then(response => {
                            callback(false, response.data);
                        })
                        .catch(error => {
                            callback(true, error);
                        });
                }
            };
        },
    });
} else {
    window.Echo = null;
}

