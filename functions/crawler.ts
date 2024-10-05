import axios from 'axios';
// @ts-ignore
import cheerio from 'react-native-cheerio';

export interface Calendar {
    date: string;
    day: string;
    details: string;
}

export interface Notice {
    date: string;
    title: string;
    link: string;
}

export const fetchCalendarData = async () => {
    const url = 'https://www.uiu.ac.bd/academics/calendar/';
    let data: any[] = [];

    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        const calendarTable = $('.calender-table').eq(1).find('table tbody tr');

        calendarTable.each((index: Number, element: Calendar) => {
            const date = $(element).find('td').eq(0).text().trim();
            const day = $(element).find('td').eq(1).text().trim();
            const details = $(element).find('td').eq(2).text().trim();

            data.push({
                date,
                day,
                details: details.replace(/\s*\n\s*/g, '\n').trim(), // Removing extra spaces and newlines
            });
        });

        return data;
    } catch (error) {
        console.error('Error fetching calendar data:', error);
        return { error: 'Failed to retrieve the calendar data.' };
    }
};

// Scraping notice data
export const fetchNoticeData = async () => {
    const url = 'https://www.uiu.ac.bd/notice/';
    let data: any[] = [];

    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        const noticeGrid = $('#notice-container .notice');

        noticeGrid.each((index: Number, element: Notice) => {
            const date = $(element).find('.date').text().trim();
            const title = $(element).find('a').text().trim();
            const link = $(element).find('a').attr('href');

            data.push({
                date,
                title,
                link,
            });
        });

        return data;
    } catch (error) {
        console.error('Error fetching notices data:', error);
        return { error: 'Failed to retrieve the notice data.' };
    }
};
