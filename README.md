# **Documentation**

# **Brackets**
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

# **Variable Items**


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
### **Variable**

Represents a diamond fire variable item. Can be constructed by using the new keyword.

 **Constructor** **optional*
 ```js
 new Variable(name, *type);
 ```

 - name - The variables item name.
 - *type** - Type of variable (default: "unsaved") (unsaved, saved, local)
 
Variables have 3 states. "saved", "unsaved", and "local". If none is given, it will default to "unsaved", like it does in the server.
  
   Example:
```js
const totalJoins = new Variable("totalJoins", "saved");

new codeLine("event", "Join")
.setVar("+=", totalJoins)
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
### **Number/Text**
Number / Text Numbers and Text variables are automatically parsed from normal strings/numbers.
In a situation where you need to create an advanced Number, use the _Num_ constructor. 

**more info/support for Num soon**
##


