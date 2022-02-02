# Treasure Hunter

# Summary

* **1)** [Installation](#1-installation)
* **2)** [Execution](#2-execution)
* **3)** [Rules](#3-rules)

# 1) Installation

* **1)** Install `node`, follow [official Node.js website](https://nodejs.org/) instructions depending of your OS.

* **2)** Install [git](https://git-scm.com/) throught the website or using your OS package manager.

* **3)** Install `yarn` using the following command ```npm -g install yarn```

* **4)** Install dependencies using the following command ```yarn install```

# 2) Execution

#### `yarn start [OPTIONS]`

Runs the script using the following options :

* **--map=file** File containing the input map.

* **--output=file** Output File containing the output map. If not set, the output map will be render on the console

# 3) Rules

Your map must follow the following format:

* **1)** Define map size : `C - [WIDTH] - [HEIGHT]`
* **2)** Define mountains' position : `M - [X] - [Y]`
* **3)** Define treasures' position : `T - [X] - [Y] - [NB_TREASURES]`
* **4)** Define adventurer : `A - [NAME] - [X] - [Y] - [ORIENTATION] - [MOVES]`

The available `ORIENTATION` values are :

* **N** North
* **S** South
* **E** East
* **O** West

The available `MOVE` values are :

* **A** Go forward
* **G** Turn left
* **D** Turn right

`MOVES` is a sequence of `MOVE` without any charater between each `MOVE`.
Example: `AAGAGAADA`

During the simulation, All adventurers will move one after the other in the declarative order of the input file.
If something block the adventurers, this one won't move.