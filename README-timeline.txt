# Timeline.json Guidelines

## Overview
The `timeline.json` file contains the life events displayed on the memorial website. Editing this file allows you to add, remove, or modify events without changing any code.

## Format
The file has the following structure:
```json
{
  "events": [
    {
      "date": "YYYY or descriptive period",
      "title": "Event title",
      "description": "Detailed description of the event"
    },
    ...more events...
  ]
}
```

## Guidelines
1. Keep events in chronological order
2. Use consistent date formatting (e.g., "1940s", "1960", "June 7, 1947")
3. Keep descriptions concise but meaningful
4. Make sure the JSON format remains valid (commas between events, proper quotes, etc.)

## How to Add or Modify Events
1. Open `timeline.json` in any text editor
2. Add new events or modify existing ones following the format above
3. Save the file
4. The website will automatically update with your changes

## Example Event
```json
{
  "date": "June 7, 1947",
  "title": "Birth of Vudimudi Deena Suseela Rani",
  "description": "Born in Andhra Pradesh, India, beginning a life of grace and devotion."
}
``` 