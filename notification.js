import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const NOTIFICATION_KEY = '@Udacicards:notifications';

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
            .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
    return {
        title: '🐷 quiz time!',
        body: 'Accept the challenge?',
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export function setLocalNotification(){
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then(data => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status })=>{
                        if(status === 'granted'){
                            Notifications.cancelAllScheduledNotificationsAsync();

                            let tmr = new Date();
                            tmr.setDate(tmr.getDate() + 1);
                            tmr.setHours(20);
                            tmr.setMinutes(0);

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tmr,
                                    repeat: 'day',
                                }
                            )

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}