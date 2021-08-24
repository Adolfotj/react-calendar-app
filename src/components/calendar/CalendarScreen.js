import React, { useState } from 'react'
import moment from 'moment';

import { Navbar } from '../ui/Navbar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { messages } from '../../helpers/calendar-message-es';
import { CalendarEvent } from './CalendarEvent';
import { ModalCalendar } from './ModalCalendar';
import { useDispatch, useSelector } from 'react-redux';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { uiOpenModal } from '../../redux/actions/ui';
import { eventClearActiveEvent, eventSetActive } from '../../redux/actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

const localizer = momentLocalizer(moment);


export const CalendarScreen = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar );

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');


    const onDoubleClick = (e) => {
        dispatch(uiOpenModal());
    }
    
    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    }

    const onSelectEvent = (e) => {
        dispatch(eventSetActive(e));
    }

    const onSelectSlot = (e) => {
        dispatch( eventClearActiveEvent() );
    }

    const eventStyleGetter = ( event, start, end, isSelected ) => {
        
        const style = {
            backgroundColor: '#367CF7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }


        return {
            style
        }
    };



    return (
        <div className="calendar-screen">
            <Navbar />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={ eventStyleGetter }
                style={{ height: 500 }}
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelectEvent }
                onView={ onViewChange }
                onSelectSlot={ onSelectSlot }
                selectable={ true }
                view={ lastView }
                components={{
                    event: CalendarEvent
                }}
            />

            <AddNewFab />

            {
                (activeEvent) && <DeleteEventFab />
            }

            <ModalCalendar />
        </div>
    )
}
