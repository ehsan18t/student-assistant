import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CalendarWidget from "@/components/CalendarWidget";


const HomeScreen: React.FC<any> = () => {
    const [data, setData] = useState({
        "calendar": [
            {
                "date": "May 27 – 29, 2024",
                "day": "Mon – Wed",
                "details": "Course Advising & Registration"
            },
            {
                "date": "May 29, 2024",
                "day": "Wed",
                "details": "Last day of Course Advising & Registration without Fine\nLast day to drop course(s) with 100% adjustable refund only"
            },
            {
                "date": "May 31, 2024",
                "day": "Fri",
                "details": "Classes Begin"
            },
            {
                "date": "Jun 07, 2024",
                "day": "Fri",
                "details": "Orientation Program: All Undergraduate & Graduate Programs at 4:00 PM"
            },
            {
                "date": "Jun 09, 2024",
                "day": "Sun",
                "details": "Last day to apply for Grade Change of a course (if any) of Spring 2024 Trimester.\nNote: No application will be considered after the deadline"
            },
            {
                "date": "Jun 12, 2024",
                "day": "Wed",
                "details": "Last day of Course Advising & Registration with a Fine of Tk. 1,000/-"
            },
            {
                "date": "Jun 13 – 21, 2024",
                "day": "Thu – Fri",
                "details": "Holiday: *Eid-ul-Azha"
            },
            {
                "date": "Jun 24, 2024",
                "day": "Mon",
                "details": "Last day of Grade Submission of Incomplete Grades of Spring 2024 Trimester by concerned Department/Program Office"
            },
            {
                "date": "Jun 25, 2024",
                "day": "Tue",
                "details": "1st installment: A fine of Tk. 1,000 will be imposed if 40% of the remaining Tuition and Trimester fee (After the payment of Tk. 15,000 at the time of registration) is not paid within this date"
            },
            {
                "date": "Jul 16, 2024",
                "day": "Tue",
                "details": "2nd installment: 70% of the remaining Tuition and Trimester Fee (After the payment of Tk. 15,000 at the time of registration). No late fine for this Trimester."
            },
            {
                "date": "Jul 17, 2024",
                "day": "Wed",
                "details": "Holiday: *Ashura"
            },
            {
                "date": "Aug 26, 2024",
                "day": "Mon",
                "details": "Holiday: Janmashtami"
            },
            {
                "date": "Sep 1, 2024",
                "day": "Sun",
                "details": "On-campus Classes resume"
            },
            {
                "date": "Sep 11, 2024",
                "day": "Wed",
                "details": "Last Day of Course Withdrawal"
            },
            {
                "date": "Sep 15, 2024",
                "day": "Sun",
                "details": "Last day of Trimester drop with 100% refund on special consideration"
            },
            {
                "date": "Sep 16, 2024",
                "day": "Mon",
                "details": "Holiday: *Eid-e- Miladunnabi"
            },
            {
                "date": "Oct 9, 2024",
                "day": "Wed",
                "details": "3rd installment: Remaining Tuition and Trimester fee.  No late fine for the Trimester."
            },
            {
                "date": "Oct 10 – 16, 2024",
                "day": "Thu – Wed",
                "details": "Holiday: Study Break and Durga Puja.\nOffices will be closed only on October 13, 2024 (Sunday)."
            },
            {
                "date": "October 18 – 26, 2024",
                "day": "Fri – Sat",
                "details": "Final Exam"
            },
            {
                "date": "October 28, 2024",
                "day": "Mon",
                "details": "Last day of Grade Submission (including Self-Study)"
            }
        ]
    });

    return (
      <View style={{ paddingTop: 40, margin: 10}}>
          <CalendarWidget calendar={data?.calendar} />
      </View>
  );
};

export default HomeScreen;
