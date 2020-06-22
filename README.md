# **Documentation**
All of the following are clickable to scroll to the wanted documentation.

**Important**
- [**Codeline**](#codeline)
- [**Actions**](#actions)
- [**Build**](#build)
- [**Misc**](#misc)

**Variable Items**
- [Variable](#variable)
- [Location](#location)
- [Particle](#particle)
- [Potion](#potion)
- [Sound](#sound)

**IF / Repeat**
- [IF](#if)
- [Repeat](#repeat)


# **IMPORTANT**
### **codeLine**
The codeline is the main object that keeps track of all of the blocks you have setup. This is what your code should ideally start with. **This is required to make your code.** You should keep in mind that when you are done with your codeline, you can finish it using the [build()](#build) method.

**Constructor**
```js
new codeLine(blockType, eventName)
```

- blockType - The type of block being placed, **`event` = Player Event, `entity_event` = Entity Event**
- eventname - The name of the event you are looking for.

Like said above, blockType accepts either **event**, or **entity_event** right now. It does not support process/functions. If you want to make a function, use a codeblock and replace the beginning block once its in-game.

**Example**
```js
new codeLine("event", "Join") // a new codeline, starting with the Player Event JOIN.
.playerAction("SendMessage", "hi %default!")
.playerAction("EnableFlight")
.build(); // it is VERY important that your code finishes with a codeLine build() method.
```

### **Actions/Setvar**
All block actions/setvar are setup the same way. They all work using the `action type`, and then the chest paramaters. You can use `playerEvent`, `gameEvent`, and `setVar`.

**Usage**
```js
<codeLine>.playerAction("SendMessage", "Hello there!", "This supports numbers aswell", 22, 19);

<codeLine>.gameAction("CancelEvent");

// You can also use all DF variable items as items inside of the paramaters.
const joins = new Variable("joins", "saved");

<codeline>.setVar("+=", joins)
.playerAction("SendMessage", "Hello %default! You joined at position" + joins);

```


# **Variable Items**
### **Number/Text**
Number / Text Numbers and Text variables are automatically parsed from normal strings/numbers.
In a situation where you need to create an advanced Number, use the _Num_ constructor. 

**more info/support for Num soon**
##
### **Variable**

Represents a diamond fire variable item. Can be constructed by using the new keyword.

 **Constructor** **optional*
 ```js
 new Variable(name, *type);
 ```

 - name - The variables item name.
 - *type** - Type of variable (default: "unsaved") (unsaved, saved, local)
 
Variables have 3 states. "saved", "unsaved", and "local". If none is given, it will default to "unsaved", like it does in the server.
##

### **Location**
 Represents a location in game. Can be constructed using the new keyword. 
 
 **Constructor** **optional*
  ```js
new Location(x, *y, *z, *pitch, *yaw)
  ```
  
  Locations are relevant to plot location. Meaning (0, 0) is the (center?) of your plot. 
  
  Example:

```js
const loc = new Location(45.5, 0, 22.5);
new codeLine("event", "Join")
.playerAction("Teleport", loc)
.build();
```
##
### **Particle**
 Represents a particle item in game. Can be constructed using the "new" keyword. 
 
 **Constructor**
```js
new Particle(type);
```

 - type - The particle effect.

 Additional content may come in the future. 

Example:

```js
new codeLine("event", "Join")
.playerAction("GiveItem", new Particle("Cloud"))
.build();
```
##
### **Potion**

Represents a potion item. Can be constructed using the "new" keyword.

**Constructor** **optional*
```js
new Potion(effect, length, *amplifier)
```
 - effect - The potion effect name,
 - length - The length of the potion effect (in seconds),
 - *amplifier** - The potion amplifier (default: 1).

Amplifier is optional. For a full list of effects, look at the wiki, or use DFVisual or something.

Example:
```js
const pot = new Potion("Strength", 60, 2);
new codeLine("Event", "Jump")
.playerAction("GiveEffect", pot)
.build();
```
##
### **Sound**
Represents a sound item. Can be constructed using the "new" keyword.

 **Constructor** **optional*
 ```js
new Sound(noise, *pitch, *yaw);
  ```
 - noise - The sound that is represented,
 - *pitch** - The pitch the sound is at (default: 1.0)
 - *vol** - The volume the sound is at (default: 1.0)
 Pitch and volume are both optional parameters. Neither are required.
 
 Example:
```js
new codeLine("event", "Join")
.playerEvent("PlaySound", new Sound("Pling"))
.playerEvent("SendMessage", "%default has joined!")
.target("All Players")
.build();
```
##

# IF blocks / Repeat

### **Repeat** 

Works the same as IFs. Will return the codeline object to continue stacking methods. 

```js
repeat(action, item, item, line => {});` 
```

 - action - String action (Adjacent, Foreber, Multiple, Grid, While, Range, ForEach),
 - item - Items that will be placed in the chest *(not an array, place as many as you want)*,
 - line - A function that is called. The function is called with the object your stacking method is on.

 Example:

```js
new codeLine("event", "Join")
.repeat("Multiple", 20, line => {
    line.playerAction("SendMessage", "Hello");
}).build();
```


##
### Misc
## build
build is a very important method. It is called once you are done with your codeline to mark it as completed. Your code **WILL** error if you do not finish it with a `.build()`.

**Example**
```js
new codeLine('event', 'Join')
.playerAction("SendMessage", "You joined a game, yay")
.build();
```

Notice how the build is called. This is very important, without the build method at the end, your code will not read correctly.
##
## target
The target method sets the most recent codeblocks target. It is used to target a specific group of players.

**Example**
```js
<codeLine>
.playerAction("SendMessage", "This message will be sent to everyone!")
.target("All Players")
```
