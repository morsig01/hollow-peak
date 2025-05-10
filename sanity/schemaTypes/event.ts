export default {
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    {   
        name: "title", 
        type: "string", 
        title: "Event Title" 
    },
    { 
        name: "date", 
        type: "datetime", 
        title: "Date & Time" },
    { 
        name: "location", 
        type: "string", 
        title: "Location" 
    },
    { 
        name: "description", 
        type: "text", 
        title: "Description" 
    },
    { 
        name: "registrationLink", 
        type: "url", 
        title: "Registration Link" 
    },
    {
        name: "startDate",
        type: "datetime",
        title: "Start Showing Event",
        description: "When should this event start appearing on the website?",
      },
      {
        name: "endDate",
        type: "datetime",
        title: "Stop Showing Event",
        description: "When should this event stop appearing (leave empty for no end)?",
      },
  ],
};
