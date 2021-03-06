import firebase from 'firebase/app';
import 'firebase/functions';

export const manageStripeSubscription = (id) => {
    const manageSub = firebase.functions().httpsCallable('createStripePortal')
    const postData = JSON.stringify({ id: id })
    manageSub(postData)
        .then(res => res.data.body)
        .then((link) => {
            link = link.replace(/"/g,"");
            window.location.href = link;
        })
        .catch(function (err) {
            console.log('error', err)
        })
};
