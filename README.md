# FlagThis
A Discord bot that lets community members flag messages for moderation to review.
## Features
* Automated actions using the `/action` command
  * `/action add` To add an automated action triggered when a message is flagged a certain number of times
    * Delete the message, timeout, kick, or ban the user, or give the user a role
    * All actions support logging with an optional `log-channel` parameter
  * `/action list` To list all actions
    * Actions are sorted by lest to greatest number of flags, with the sort order determining its ID
  * `/action remove` To remove an action
* Simply right click on a message to flag it or view the message's flags
