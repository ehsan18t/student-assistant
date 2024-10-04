import PushNotification from 'react-native-push-notification';

class NotificationService {
  configure() {
    PushNotification.configure({
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }

  // Schedules a notification to be sent at a specific date
  scheduleNotification(title: string, message: string, date: Date) {
    PushNotification.localNotificationSchedule({
      title: title,
      message: message,
      date: date,
      allowWhileIdle: true,
    });
  }

  // Schedules a recurring weekly notification
  scheduleRecurringNotification(title: string, message: string, dayIndex: number, time: string) {
    const [hours, minutes] = time.split(':').map(Number);
    const now = new Date();
    
    // Set the next occurrence date based on the dayIndex
    const nextOccurrence = new Date(now.setDate(now.getDate() + ((dayIndex - now.getDay() + 7) % 7)));
    nextOccurrence.setHours(hours);
    nextOccurrence.setMinutes(minutes);
    nextOccurrence.setSeconds(0);
    
    // Schedule the notification with weekly recurrence
    PushNotification.localNotificationSchedule({
      title: title,
      message: message,
      date: nextOccurrence,
      allowWhileIdle: true,
      repeatType: 'week', // Set the repeat type to weekly
      // You can add other options here like channelId, sound, etc.
    });
  }
}

export const notificationService = new NotificationService();
