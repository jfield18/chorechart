const reset_chart = () => {
  // gather the date for later
  let date_text = document.getElementById("start").value;
  if (!date_text) {
    alert("Please enter your ChoreChart start date.");
    return;
  }

  /* find_chores
   *
   * Populates the people into an array with each bucket being the person in string form.
   *
   * Returns the array of all people.
   *
   * Expects:
   *    people to be entered by the user -- Check Runtime Error
   *
   */
  const find_people = () => {
    let people_input = document.getElementById("name_input").value;
    if (!people_input) {
      alert("Please enter the names of the people in your house/apartment.");
      return null;
    }

    let people_arr = people_input.split("\n");
    if (people_arr.length == 1) {
      alert(
        "It looks like you will be doing all the chores, so you don't really need a website for it."
      );
      return null;
    }
    return people_arr;
  };

  let people = find_people();
  if (!people) return;
  let num_people = people.length;

  /* find_chores
   *
   * Populates the chores into an array with buckets for each person containing
   * an array of all their chores in string form.
   *
   * Returns an array of arrays of chores or null if there are no chores.
   *
   * Expects:
   *    chores to be entered by the user -- Check Runtime Error
   *
   */
  const find_chores = () => {
    let chore_input = document.getElementById("chore_input").value;
    if (!chore_input) {
      alert("Please enter the chores you would like completed.");
      return null;
    }

    let chore_expanded = chore_input.split("\n");

    let chore_arr = new Array(num_people).fill("");

    chore_expanded.forEach((elem, index) => {
      if (index < num_people) {
        chore_arr[index % num_people] = elem;
      } else {
        chore_arr[index % num_people] += "\n" + elem;
      }
    });

    chore_arr.forEach((elem, index) => {
      chore_arr[index] = elem.split("\n");
    });

    return chore_arr;
  };

  let chores = find_chores();
  if (!chores) return;

  // find duration from dom
  let dur_text = document.getElementById("dur").value;
  if (!dur_text || dur_text <= 0) {
    alert("Please enter how long you would like to keep each set of chores.");
    return;
  }

  /* find_offset
   *
   * Finds the appropriate offset for the current day based upon the starting date
   * and the duration of each cycle. This offset represents which iteration of the
   * total chores each person is receiving. In other words, the offset (zero-indexed)
   * is the kth time chores have swapped.
   *
   * Parameters:
   *    date: the starting date for the chore chart
   *    dur: the duration one keeps the same chore
   *    cycles: the number of possible cycles or the point at which things reset
   *
   * Returns the offset.
   *
   * Expects:
   *    date to be a string in mm-dd-yyyy form -- Unchecked Runtime Error
   *    dur to be a positive integer -- Uncheck Runtime Error
   *    cycles to be a positive integer -- Uncheck Runtime Error
   *
   */
  const find_offset = (date, dur, cycles) => {
    const start_date = new Date(date);
    const start_num = start_date.valueOf();
    const today_num = Date.now();
    let difference = Math.floor(
      (today_num - start_num) / (1000 * 60 * 60 * 24)
    );
    return Math.floor(difference / dur) % cycles;
  };

  const offset = find_offset(date_text, Math.floor(dur_text), num_people);

  let modules = "";

  /*
      This section populates chore modules for each person.
      This is what the html should look like for a person with n chores assigned:
          
      <div class='chore-module'>
          <div class="cm_img">
              <img class="test2" src="./images/[person name].jpg"></img>
          </div>
          <div class="cm_text">
              <h3>[person name]</h3>
              <ul>
                  <li>[Chore 1]</li>
                  <li>[Chore ...]</li>
                  <li>[Chore n]</li>
              </ul>
          </div>
      </div>
  */
  people.forEach((elem, index) => {
    modules +=
      "<div class='chore-module'><div class='cm_img'><img class='test2' src='./images/";
    modules += elem;
    modules += ".jpg'></img></div><div class='cm_text'><h3>";
    modules += elem;
    modules += "</h3><ul>";
    chores[index].forEach((chore_elem) => {
      modules += "<li>" + chore_elem + "</li>";
    });
    modules += "</ul></div></div>";
  });

  // place the chore modules in the dashboard
  document.getElementById("choreCon").innerHTML = modules;
};
