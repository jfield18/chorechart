# CHORE CHART

## Current Status
This is currently in development and not functional. When functionality is finished, this will be updated.

## Inpsiration && Basic Details
This is a rather silly project I decided to make for my roommates. Rather than a excel spreadsheet or a whiteboard, why not spend some time developing a website to keep track of who does what chores when. The idea is simple: enter the names of the people, the chores needed to be completed, and the amount of time you'd like the pairings to be stable. Each person will have a little section and the chores within it will rotate. This website is pretty bare-bones, front-end only, just html, css, and javascript. It is intended to be run locally as the implementation alters the html file as the program is run rather than using a backend.

## Usage
To use, type the names of all roommates in the first input section separated by a return (no commas or other punctuation). Then, type all the chores you'd like completed in the second input section again separated by spaces. Then, add the duration of your choice to the last section as an integer. Then, click reset. Reset will wipe all previous names and chores and store all the data entered. Reload the page to recalculate the chores.

## Implementation
When entered, a html element that is not on display will store the names of people and chores. On reload, the following operation is completed: 
1. From the stored names, populate an array of the people names.
2. Calculate which rotation we are on and assign each chore a bucket in a chores array with the offset of the zero-indexed rotation number. 
3. Map over the two arrays to populate the chore_module elements to place in the dashboard.
