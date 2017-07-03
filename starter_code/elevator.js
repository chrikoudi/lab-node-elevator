class Elevator {
  constructor(){
    this.floor = 0;
    this.MINFLOOR = 0;
    this.MAXFLOOR = 10;
    this.direction = 'up';
    this.requests = [];
    this.waitingList = [];
    this.passengers = [];
    this.intervalId = undefined;
  }

  start() {

    this.intervalId = setInterval(this.update(), 1000);

  }

  stop() {
    clearInterval(this.intervalId);
  }


  update() {
    let direction = this.direction;
    let floor = this.floor;

    if(this.requests.length === 0) {
      this.stop();
    }

    switch (direction) {
      case "up":
        this.requests.map((person, index) => {
        if (person.floor === floor) {
          this._passengersEnter(person.floor);
          this._passengersLeave(person.floor);
        }
        if (person.floor > this.MAXFLOOR) {
          this.MAXFLOOR = person.floor;
        }
        if (person.floor < this.MINFLOOR) {
          this.MINFLOOR = person.floor;
        }
        });

        this.floorUp();
        break;

     case "down":
        this.requests.map((person, index) => {
          if (person.floor === floor) {
           this._passengersEnter(person.floor);
           this._passengersLeave(person.floor);
           }
          if (person.floor < this.MINFLOOR) {
            this.MINFLOOR = person.floor;
          }
          if (person.floor > this.MAXFLOOR) {
            this.MAXFLOOR = person.floor;
          }
        });

        this.floorDown();
        break;

      }

        if (floor < this.MINFLOOR) {
          this.direction = "up";
        } else if (floor > this.MAXFLOOR) {
          this.direction = "down";
          }


    this.log(direction, floor);

  }



  _passengersEnter(floor) {
    this.waitingList.map( (person, index) => {
      if (person.originFloor === floor) {
        this.passengers.push(person);
        this.waitingList.splice(index, 1);
        this.requests.shift();
        this.requests.push(person.destinationFloor);
        console.log(`${person.name} has entered the elevator`);
      }
    })
  }


  _passengersLeave(floor) {
    this.passengers.map( (person, index) => {
      if (person.destinationFloor === floor) {
        this.passengers.splice(index,1);
        this.requests.shift();
        console.log(`${person.name} has left the elevator`);
      }



    })


  }


  floorUp() {
    if (this.floor < this.MAXFLOOR) {
    this.floor += 1;
    }
    return this.floor;
  }


  floorDown() {
    if (this.floor > this.MINFLOOR) {
      this.floor -= 1;
    }
    return this.floor;
  }


  call(person) {
    this.waitingList.push(person);
    this.requests.push(person.originFloor);
  }


  log(direction, floor) {
    console.log(`Direction: ${direction} | Floor: ${floor}`);
      }

}

module.exports = Elevator;
