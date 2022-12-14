
import test from 'tape'
import { set, reset } from 'mockdate'
import AvaibilitiesClass from '../../../../modules/AvaibilitiesClass.js'

test(`expect set avaibility on 13 december with default hours and minutes`, (t) => {
	// Given
    const startDate = new Date(2030, 11, 13, 9)
    const endDate = new Date(2030, 11, 13, 9)
    const fromHour = 8
    const fromMinute = 0
    const toHour = 18
    const toMinute = 0
	const a = new AvaibilitiesClass({startDate, endDate})

    const dateStartExpected = new Date(2030, 11, 13, 8)
    const dateEndExpected = new Date(2030, 11, 13, 18)

    // When
	const resp = a.addAvaibilities({fromHour, fromMinute, toHour, toMinute})

	// Then
	t.deepEquals(resp[0].startInterval.getTime(), dateStartExpected.getTime());
	t.deepEquals(resp[0].endInterval, dateEndExpected);
	t.end();
});

test(`expect set avaibility on 13 and 14 december with default hours and minutes`, (t) => {
	// Given
    const startDate = new Date(2030, 11, 13, 8)
    const endDate = new Date(2030, 11, 14, 18)
    const fromHour = 8
    const fromMinute = 0
    const toHour = 18
    const toMinute = 0
	const a = new AvaibilitiesClass({recurrent: true, startDate, endDate})

    const dateStartExpected = new Date(2030, 11, 13, 8)
    const dateEndExpected = new Date(2030, 11, 14, 18)

    // When
	const resp = a.addAvaibilities({fromHour, fromMinute, toHour, toMinute})

    // Then
	t.deepEquals(resp[0].startInterval, dateStartExpected);
	t.deepEquals(resp[resp.length-1].endInterval, dateEndExpected);
	t.end();
});

test(`expect set avaibility from 13 to 15 december from 8:30 to 17:30`, (t) => {
	// Given
    const startDate = new Date(2030, 11, 13, 8, 30)
    const endDate = new Date(2030, 11, 15, 17, 30)
    const fromHour = 8
    const fromMinute = 30
    const toHour = 17
    const toMinute = 30
	const a = new AvaibilitiesClass({recurrent: true, startDate, endDate})

    const dateStartExpected = new Date(2030, 11, 13, 8, 30)
    const dateEndExpected = new Date(2030, 11, 15, 17, 30)

    // When
	const resp = a.addAvaibilities({fromHour, fromMinute, toHour, toMinute})

	// Then
	t.deepEquals(resp[0].startInterval, dateStartExpected);
	t.deepEquals(resp[resp.length-1].endInterval, dateEndExpected);
	t.end();
});

test(`expect set customers day wanted on 13 of december`, (t) => {
	// Given
    const startDate = new Date(2030, 11, 13)
    const endDate = new Date(2030, 11, 13)
    const fromHour = 8
    const fromMinute = 30
    const toHour = 17
    const toMinute = 30
	const a = new AvaibilitiesClass({recurrent: true, startDate, endDate})

    const dateStartExpected = new Date(2030, 11, 13)
    const dateEndExpected = new Date(2030, 11, 13)

    // When
	const resp = a.getCustomerDays({fromHour, fromMinute, toHour, toMinute})

	// Then
	t.deepEquals(resp[0].startInterval, dateStartExpected);
	t.deepEquals(resp[resp.length-1].endInterval, dateEndExpected);
	t.end();
});

test(`expect set customers day wanted from 13 to 15 of december`, (t) => {
	// Given
    const startDate = new Date(2030, 11, 13)
    const endDate = new Date(2030, 11, 15)
    const fromHour = 8
    const fromMinute = 30
    const toHour = 17
    const toMinute = 30
	const a = new AvaibilitiesClass({recurrent: true, startDate, endDate})

    const dateStartExpected = new Date(2030, 11, 13)
    const dateEndExpected = new Date(2030, 11, 15)

    // When
	const resp = a.getCustomerDays({fromHour, fromMinute, toHour, toMinute})

	// Then
	t.deepEquals(resp[0].startInterval, dateStartExpected);
	t.deepEquals(resp[resp.length-1].endInterval, dateEndExpected);
	t.end();
});

test(`expect matching days between company and customer on 14 of december`, (t) => {
	// Given
    const companyDates = [
        {
          startInterval: new Date(2030, 11, 14, 8),
          endInterval: new Date(2030, 11, 14, 18)
        }
    ]
    const customerDates = [
        {
            startInterval: new Date(2030, 11, 14),
            endInterval: new Date(2030, 11, 14)
        }
    ]
	const a = new AvaibilitiesClass({customerDates, companyDates})

    const dateStartExpected = new Date(2030, 11, 14, 8)
    const dateEndExpected = new Date(2030, 11, 14, 18)

    // When
	const resp = a.getMatchingDays()

	// Then
	t.deepEquals(resp[0].startInterval, dateStartExpected);
	t.deepEquals(resp[resp.length-1].endInterval, dateEndExpected);
	t.end();
});

test(`expect matching days between company from 10 to 20 of december and customer from 13 to 14 of december`, (t) => {
	// Given
    const companyDates = [
        {
          startInterval: new Date(2030, 11, 14, 8),
          endInterval: new Date(2030, 11, 14, 18)
        },
        {
          startInterval: new Date(2030, 11, 15, 8),
          endInterval: new Date(2030, 11, 15, 18)
        },
        {
          startInterval: new Date(2030, 11, 16, 8),
          endInterval: new Date(2030, 11, 16, 18)
        },
        {
          startInterval: new Date(2030, 11, 17, 8),
          endInterval: new Date(2030, 11, 17, 18)
        },
        {
          startInterval: new Date(2030, 11, 18, 8),
          endInterval: new Date(2030, 11, 18, 18)
        },
        {
          startInterval: new Date(2030, 11, 19, 8),
          endInterval: new Date(2030, 11, 19, 18)
        },
        {
          startInterval: new Date(2030, 11, 20, 8),
          endInterval: new Date(2030, 11, 20, 18)
        }
    ]
    const customerDates = [
        {
            startInterval: new Date(2030, 11, 14),
            endInterval: new Date(2030, 11, 14)
        },
        {
            startInterval: new Date(2030, 11, 15),
            endInterval: new Date(2030, 11, 15)
        }
    ]
	const a = new AvaibilitiesClass({customerDates, companyDates})

    const dateStartExpected = new Date(2030, 11, 14, 8)
    const dateEndExpected = new Date(2030, 11, 15, 18)

    // When
	const resp = a.getMatchingDays()
	// Then
	t.deepEquals(resp[0].startInterval, dateStartExpected);
	t.deepEquals(resp[resp.length-1].endInterval, dateEndExpected);
	t.end();
});


test(`expect tickets from 13 to 14 of december`, (t) => {
	// Given
    const companyDates = [
        {
          startInterval: new Date(2030, 11, 13, 8),
          endInterval: new Date(2030, 11, 13, 18)
        },
        {
          startInterval: new Date(2030, 11, 14, 8),
          endInterval: new Date(2030, 11, 14, 18)
        },
    ]
    const customerDates = [
        {
            startInterval: new Date(2030, 11, 13),
            endInterval: new Date(2030, 11, 13)
        },
        {
            startInterval: new Date(2030, 11, 14),
            endInterval: new Date(2030, 11, 14)
        }
    ]
	const a = new AvaibilitiesClass({customerDates, companyDates})

    const firstTicketDate = new Date(2030, 11, 13, 8)
    const secondTicketDate = new Date(2030, 11, 13, 8, 30)
    const beforeLastTicketDate = new Date(2030, 11, 14, 17)
    const lastTicketDate = new Date(2030, 11, 14, 17, 30)

    // When
	const resp = a.checkForAvaibilities(companyDates)

	// Then
    t.deepEquals(resp[0].dateStart, firstTicketDate)
    t.deepEquals(resp[1].dateStart, secondTicketDate)
    t.deepEquals(resp[resp.length-2].dateStart, beforeLastTicketDate)
    t.deepEquals(resp[resp.length-1].dateStart, lastTicketDate)
	t.end();
});


test(`expect tickets from 13 to 14 of december with company dates ending at 30 minutes`, (t) => {
	// Given
    const companyDates = [
        {
          startInterval: new Date(2030, 11, 13, 8, 30),
          endInterval: new Date(2030, 11, 13, 18, 30)
        },
        {
          startInterval: new Date(2030, 11, 14, 8, 30),
          endInterval: new Date(2030, 11, 14, 18, 30)
        },
    ]
    const customerDates = [
        {
            startInterval: new Date(2030, 11, 13),
            endInterval: new Date(2030, 11, 13)
        },
        {
            startInterval: new Date(2030, 11, 14),
            endInterval: new Date(2030, 11, 14)
        }
    ]
	const a = new AvaibilitiesClass({customerDates, companyDates})

    const firstTicketDate = new Date(2030, 11, 13, 8, 30)
    const secondTicketDate = new Date(2030, 11, 13, 9)
    const beforeLastTicketDate = new Date(2030, 11, 14, 17, 30)
    const lastTicketDate = new Date(2030, 11, 14, 18)

    // When
	const resp = a.checkForAvaibilities(companyDates)

	// Then
    t.deepEquals(resp[0].dateStart, firstTicketDate)
    t.deepEquals(resp[1].dateStart, secondTicketDate)
    t.deepEquals(resp[resp.length-2].dateStart, beforeLastTicketDate)
    t.deepEquals(resp[resp.length-1].dateStart, lastTicketDate)
	t.end();
});

test(`expect tickets from 13 to 14 of december with company dates from 14 to 20 ending at 30 minutes`, (t) => {
	// Given
    const companyDates = [
        {
          startInterval: new Date(2030, 11, 14, 8, 30),
          endInterval: new Date(2030, 11, 14, 18, 30)
        },
        {
          startInterval: new Date(2030, 11, 15, 8, 30),
          endInterval: new Date(2030, 11, 15, 18, 30)
        },
        {
          startInterval: new Date(2030, 11, 16, 8, 30),
          endInterval: new Date(2030, 11, 16, 18, 30)
        },
        {
          startInterval: new Date(2030, 11, 17, 8, 30),
          endInterval: new Date(2030, 11, 17, 18, 30)
        },
        {
          startInterval: new Date(2030, 11, 18, 8, 30),
          endInterval: new Date(2030, 11, 18, 18, 30)
        },
        {
          startInterval: new Date(2030, 11, 19, 8, 30),
          endInterval: new Date(2030, 11, 19, 18, 30)
        },
        {
          startInterval: new Date(2030, 11, 20, 8, 30),
          endInterval: new Date(2030, 11, 20, 18, 30)
        }
    ]
    const customerDates = [
        {
            startInterval: new Date(2030, 11, 13),
            endInterval: new Date(2030, 11, 13)
        },
        {
            startInterval: new Date(2030, 11, 14),
            endInterval: new Date(2030, 11, 14)
        }
    ]
	const a = new AvaibilitiesClass({customerDates, companyDates})

    const firstTicketDate = new Date(2030, 11, 14, 8, 30)
    const secondTicketDate = new Date(2030, 11, 14, 9)
    const beforeLastTicketDate = new Date(2030, 11, 14, 17, 30)
    const lastTicketDate = new Date(2030, 11, 14, 18)

    // When
	const resp = a.checkForAvaibilities(companyDates)
	// Then
    t.deepEquals(resp[0].dateStart, firstTicketDate)
    t.deepEquals(resp[1].dateStart, secondTicketDate)
    t.deepEquals(resp[resp.length-2].dateStart, beforeLastTicketDate)
    t.deepEquals(resp[resp.length-1].dateStart, lastTicketDate)
	t.end();
});

test(`expect to by a ticket and remove this ticket from tickets`, (t) => {
    // Given
    let tickets = [
        {
            dateStart: new Date(2030, 11, 13, 8),
            dateEnd: new Date(2030, 11, 13, 8, 30)
        },
        {
            dateStart: new Date(2030, 11, 13, 9),
            dateEnd: new Date(2030, 11, 13, 9, 30)
        },
        {
            dateStart: new Date(2030, 11, 13, 10),
            dateEnd: new Date(2030, 11, 13, 10, 30)
        },
    ]
    // prevent tickets modified in memory
    let initialTickets = [...tickets]
    const a = new AvaibilitiesClass({tickets})
    // When
    const resp = a.byTicket(0)
    // Then
    t.deepEquals(resp[0].dateStart, initialTickets[1].dateStart)
    t.end();
});

test(`expect to by a ticket, do a new search and not find this ticket in tickets`, (t) => {
    // Given
    let tickets = [
        {
            dateStart: new Date(2030, 11, 13, 8),
            dateEnd: new Date(2030, 11, 13, 8, 30)
        },
        {
            dateStart: new Date(2030, 11, 13, 8, 30),
            dateEnd: new Date(2030, 11, 13, 9)
        },
        {
            dateStart: new Date(2030, 11, 13, 9),
            dateEnd: new Date(2030, 11, 13, 9, 30)
        },
    ]
    // prevent tickets modified in memory
    let initialTickets = [...tickets]

    const a = new AvaibilitiesClass({tickets})
    // When
    const resp = a.byTicket(0)
    // Then
    t.deepEquals(resp[0].dateStart, initialTickets[1].dateStart)

    // Given
    const bookedTickets = [
        {
            dateStart: new Date(2030, 11, 13, 8),
            dateEnd: new Date(2030, 11, 13, 8, 30)
        }
    ]
    const companyDates = [
        {
          startInterval: new Date(2030, 11, 13, 8),
          endInterval: new Date(2030, 11, 13, 18)
        },
        {
          startInterval: new Date(2030, 11, 14, 8),
          endInterval: new Date(2030, 11, 14, 18)
        },
    ]
    const customerDates = [
        {
            startInterval: new Date(2030, 11, 13),
            endInterval: new Date(2030, 11, 13)
        },
        {
            startInterval: new Date(2030, 11, 14),
            endInterval: new Date(2030, 11, 14)
        }
    ]
	const av = new AvaibilitiesClass({customerDates, companyDates, bookedTickets})

    const firstTicketDate = new Date(2030, 11, 13, 8, 30)

    // When
	const r = av.checkForAvaibilities(companyDates)

	// Then
    t.deepEquals(r[0].dateStart, firstTicketDate)

    t.end();
});