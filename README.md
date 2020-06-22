
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
 `new Variable(name, *type);` 
 

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
