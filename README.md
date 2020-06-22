## **Potion**

Represents a potion item. Can be constructed using the "new" keyword.

**Constructor** **optional*

    new Potion(effect, length, *amplifier)

 - effect - The potion effect name,
 - length - The length of the potion effect (in seconds),
 - *amplifier** - The potion amplifier (default: 1).

Amplifier is optional. For a full list of effects, look at the wiki, or use DFVisual or something.

Example

    const pot = new Potion("Strength", 60, 2);
    new codeLine("Event", "Jump")
    .playerAction("GiveEffect", pot)
    .build();
