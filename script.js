const update_chart = () => {
    console.log("[UPDATE_CHART]");
}

const reset_chart = () => {
    console.log("[RESET_CHART]");

    // gather the date for later
    let date_text = document.getElementById("start").value;
    console.log(date_text);
    if (!date_text) {
        alert("Please enter your ChoreChart start date.");
        return;
    }


    // populate the people array
    const find_people = () => {
        console.log("[FIND_PEOPLE]");
        let people_input = document.getElementById("name_input").value;
        if (!people_input) {
            alert("Please enter the names of the people in your house/apartment.");
            return null;
        }

        let people_arr = people_input.split('\n');
        if (people_arr.length == 1) {
            alert("It looks like you will be doing all the chores, so you don't really need a website for it.");;
            return null;
        } 
        return people_arr;
    }

    let people = find_people();
    if (!people) return;
    let num_people = people.length;

    // populate the chore array
    const find_chores = () => {
        console.log("[FIND_CHORES]");
        let chore_input = document.getElementById("chore_input").value;
        if (!chore_input) {
            alert("Please enter the chores you would like completed.");
            return null;
        }

        let chore_arr = chore_input.split('\n');
        return chore_arr;
    }

    let chores = find_chores();
    if (!chores) return;

    // edge cases for number -> +111 -111 2e2
    let dur_text = document.getElementById("dur").value;
    if (!dur_text) {
        alert("Please enter how long you would like to keep each set of chores.");
        return;
    }

    const find_offset = (date, dur, cycles) => {
        const start_date = new Date(date);
        const start_num = start_date.valueOf();
        const today_num = Date.now();
        let difference = Math.floor((today_num - start_num) / (1000 * 60 * 60 * 24));
        console.log(difference, difference / dur);
        return Math.floor(difference / dur) % cycles;
    }
    
    const offset = find_offset(date_text, Math.floor(dur_text), num_people);
    console.log(offset);

    update_chart();
}


update_chart();