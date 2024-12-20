"use client";

import React, { useState, useEffect } from "react";
import { DateSelectArg, EventClickArg } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MdOutlineDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FaDownload, FaEye } from "react-icons/fa";
interface CustomEventApi {
  extendedProps?: string;
  id: number | string;
  title: string;
  description: string;
  start: string;
  end: string;
  attendees: string | null;
  status: string | null;
  comment: string | null;
  score: Record<string, number>;
  link: string;
  userDetails: {
    id: number;
    candidateFirstName: string;
    candidateLastName: string;
    candidateEmail: string;
    handledBy: string;
    jobTitle: string;
  };
}
const transformedData: CustomEventApi[] = [
  {
    id: 1,
    title: "1st Round",
    description: "1st Round",
    start: "2024-12-20T12:00:00+05:30",
    end: "2024-12-20T12:40:00+05:30",
    attendees: null,
    status: null,
    comment: null,
    score: { P: 8 },
    link: "http://www.hhh.com",
    userDetails: {
      id: 1,
      candidateFirstName: "mohan",
      candidateLastName: "raj",
      candidateEmail: "mohanrajk@dataterrain.com",
      handledBy: "Vinodhini HR",
      jobTitle: "django developer",
    },
  },
  {
    id: 2,
    title: "Test",
    description: "Test",
    start: "2024-12-29T18:00:00+05:30",
    end: "2024-12-29T18:40:00+05:30",
    attendees: null,
    status: null,
    comment: null,
    score: { p: 7 },
    link: "http://www.hhh.com",
    userDetails: {
      id: 1,
      candidateFirstName: "mohan",
      candidateLastName: "raj",
      candidateEmail: "mohanrajk@dataterrain.com",
      handledBy: "Vinodhini HR",
      jobTitle: "django developer",
    },
  },
  {
    id: 3,
    title: "2nd Round",
    description: "2nd Round",
    start: "2024-12-29T20:00:00+05:30",
    end: "2024-12-29T21:00:00+05:30",
    attendees: null,
    status: null,
    comment: null,
    score: { o: 6 },
    link: "http://www.hhh.com",
    userDetails: {
      id: 1,
      candidateFirstName: "mohan",
      candidateLastName: "raj",
      candidateEmail: "mohanrajk@dataterrain.com",
      handledBy: "Vinodhini HR",
      jobTitle: "django developer",
    },
  },
  {
    id: 4,
    title: "Final Round",
    description: "Final Round",
    start: "2024-12-20T12:00:00+05:30",
    end: "2024-12-20T12:40:00+05:30",
    attendees: null,
    status: null,
    comment: null,
    score: { P: 8 },
    link: "http://www.hhh.com",
    userDetails: {
      id: 1,
      candidateFirstName: "mohan",
      candidateLastName: "raj",
      candidateEmail: "mohanrajk@dataterrain.com",
      handledBy: "Vinodhini HR",
      jobTitle: "django developer",
    },
  },
  {
    id: 5,
    title: "Tech Round",
    description: "Tech Round",
    start: "2024-12-20T12:00:00+05:30",
    end: "2024-12-20T12:40:00+05:30",
    attendees: null,
    status: null,
    comment: null,
    score: { o: 6 },
    link: "http://www.hhh.com",
    userDetails: {
      id: 1,
      candidateFirstName: "mohan",
      candidateLastName: "raj",
      candidateEmail: "mohanrajk@dataterrain.com",
      handledBy: "Vinodhini HR",
      jobTitle: "ReactJS developer",
    },
  },
];

const Calendar: React.FC = () => {
  const [currentEvents, setCurrentEvents] = useState<CustomEventApi[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CustomEventApi | null>(
    null
  );
  const [activeEventId, setActiveEventId] = useState<string | number | null>(
    null
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedEvents = localStorage.getItem("events");
      if (savedEvents) {
        setCurrentEvents(JSON.parse(savedEvents));
      } else {
        setCurrentEvents(transformedData);
        window.location.reload();
      }
    }
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("events", JSON.stringify(currentEvents));
    }
  }, [currentEvents]);

  const handleDateClick = (selected: DateSelectArg) => {
    setSelectedDate(selected);
    //  setIsDialogOpen(true);
    console.log(selectedDate);
  };

  // const handleDeleteEventClick = () => {
  //   if (selectedEvent) {
  //     if (
  //       window.confirm(
  //         `Are you sure you want to delete the event "${selectedEvent.title}"?`
  //       )
  //     ) {
  //       //selectedEvent.remove(); // Removes event from FullCalendar
  //       // Also remove the event from the state
  //       setCurrentEvents((prevEvents) =>
  //         prevEvents.filter((e) => e.id !== selectedEvent.id)
  //       );
  //     }
  //     setIsDialogOpen(false);
  //   }
  // };

  const handleEventClick = (selected: EventClickArg) => {
    const event = selected.event;
    const customEvent: CustomEventApi = {
      id: event.id,
      title: event.title || "",
      description: event.extendedProps?.description || "",
      start: event.start?.toISOString() || "",
      end: event.end?.toISOString() || "",
      attendees: event.extendedProps?.attendees || null,
      status: event.extendedProps?.status || null,
      comment: event.extendedProps?.comment || null,
      score: event.extendedProps?.score || {},
      link: event.extendedProps?.link || "",
      userDetails: event.extendedProps?.userDetails || {
        id: 0,
        candidateFirstName: "",
        candidateLastName: "",
        candidateEmail: "",
        handledBy: "",
        jobTitle: "",
      },
    };
    setActiveEventId(selected.event.id);
    setSelectedEvent(customEvent);
    setIsDialogOpen(true);
  };

  // const handleCloseDialog = () => {
  //   setIsDialogOpen(false);
  //   setActiveEventId(null);
  // };

  // const handleAddEvent = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (newEventTitle && selectedDate) {
  //     const calendarApi = selectedDate.view.calendar; // Get the calendar API instance.
  //     calendarApi.unselect(); // Unselect the date range.

  //     const newEvent = {
  //       id: `${selectedDate.start.toISOString()}-${newEventTitle}`,
  //       title: newEventTitle,
  //       start: selectedDate.start,
  //       end: selectedDate.end,
  //       allDay: selectedDate.allDay,
  //     };

  //     calendarApi.addEvent(newEvent);
  //     handleCloseDialog();
  //   }
  // };

  return (
    <div>
      <div className="flex w-full px-10 justify-start items-start gap-8">
        <div className="w-full mt-8">
          <FullCalendar
            height={"85vh"}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} // Initialize calendar with required plugins.
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={1}
            select={handleDateClick}
            // eventClick={handleEventClick} // Handle clicking on events (e.g., to delete them).
            // eventsSet={(events) => setCurrentEvents(events)} // Update state with current events whenever they change.
            initialEvents={
              typeof window !== "undefined"
                ? JSON.parse(localStorage.getItem("events") || "[]")
                : []
            }
            eventClick={handleEventClick}
            eventContent={(arg) => {
              const { event } = arg;

              const { id, title, start, end, extendedProps } = event;
              const isActive = event.id === activeEventId; // Check if the event is active

              return (
                <div
                  style={{
                    backgroundColor: isActive ? "#d1eefd" : "",
                  }}
                  className={`fc-event-content p-2  ${
                    isActive ? "active-event" : ""
                  }`}
                  id={id}
                >
                  <div className="flex justify-between items-center">
                    <p>{extendedProps.userDetails.jobTitle}</p>
                    <div className="flex justify-between items-center">
                      <button>
                        <CiEdit />
                      </button>
                      <button
                        className="text-red-500"
                        // onClick={handleDeleteEventClick}
                      >
                        <MdOutlineDelete />
                      </button>
                    </div>
                  </div>
                  <div className="text-xs">
                    {title} <span className="px-1"> | </span>
                    <span>
                      Interviewer : {extendedProps.userDetails.handledBy}
                    </span>
                  </div>
                  <div className="text-xs">
                    {/* <span> Date : {formatDate(start)}</span> */}
                    {/* <span className="pl-2"> | </span> */}
                    <span>
                      Time:
                      {formatTimeRange(start, end)}
                    </span>
                  </div>
                </div>
              );
            }}
          />
        </div>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>

        <DialogContent>
          {selectedEvent && (
            <div className="flex w-full ind-popover">
              {/* Left Section */}
              <div className="w-6/12 text-sm border-r-2">
                <p>
                  Interviewer with:{" "}
                  {selectedEvent?.userDetails?.candidateFirstName}{" "}
                  {selectedEvent?.userDetails?.candidateLastName}
                </p>
                <p>Position: {selectedEvent?.userDetails?.jobTitle}</p>
                <p>Created By: -</p>
                <p>Interview Date: {formatDate(selectedEvent.start)}</p>
                <p>
                  Interview Time:{" "}
                  {formatTimeRange(selectedEvent.start, selectedEvent.end)}
                </p>
                <p>Interview Via: Google Meet</p>

                {/* Resume Button */}

                <button className="files-button mb-2">
                  Resume.docx
                  <span className="flex ml-2 gap-2">
                    <FaEye /> <FaDownload />
                  </span>
                </button>

                {/* Aadhar Card Button */}

                <button className="files-button">
                  Aadhar Card
                  <span className="flex ml-2 gap-2">
                    <FaEye /> <FaDownload />
                  </span>
                </button>
              </div>

              {/* Right Section */}
              <div className="flex flex-col w-6/12 items-center justify-center">
                <div className="border-2 mb-2 rounded-sm">
                  {/* <SiGooglemeet size={"4em"} /> */}
                  <img src="gmeet_logo.png" alt=" " className="gmeet_img" />
                </div>
                <a
                  target="_blank"
                  href={`${selectedEvent.extendedProps?.link}`}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Join
                </a>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      ;
    </div>
  );
  function formatDate(timestampString: string | number | Date) {
    const dateObject = new Date(timestampString);
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    return `${day} ${getMonthName(month)} ${year}`;
  }
  function getMonthName(monthNumber: number) {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return monthNames[monthNumber - 1];
  }
  function formatTimeRange(
    startTimeStr: string | number | Date | null,
    endTimeStr: string | number | Date | null
  ) {
    if (!startTimeStr || !endTimeStr) return "";
    const startTime = new Date(startTimeStr);
    const endTime = new Date(endTimeStr);

    const startTimeFormatted = startTime.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    const endTimeFormatted = endTime.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return `${startTimeFormatted} - ${endTimeFormatted}`;
  }
};

export default Calendar;
