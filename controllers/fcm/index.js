var FCM = require('fcm-node');
var serverKey = process.env.FCM_KEY; //put your server key here
var fcm = new FCM(serverKey);

module.exports = fcm

// fcm.send(message, function(err, response){
//     if (err) {
//         console.log("Something has gone wrong!");
//     } else {
//         console.log("Successfully sent with response: ", response);
//     }
// });



// var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
//     to: 'dI7FxbOyQWa74s62ImZ94z:APA91bFvbDzpoUlhcuNw8qIJdoEiK_ZfucF7PDLgqb_QfRBk33VhvMPlmhfCZekDpcvDewPf7k3cE72kU2iVmXM7WYlHvzjquKC2m0Bd-asIamN_2TTc6SmpUZBLz7z5m3nC2CMwUDDV', 
//     //collapse_key: 'your_collapse_key',
    
//     notification: {
//         title: '븅신새끼야', 
//         body: '나가죽어라' 
//     },
    
//     data: {  //you can send only notification or only data(or include both)
//         my_key: 'my value',
//         my_another_key: 'my another value'
//     }
// };