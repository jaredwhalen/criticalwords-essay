# criticalwords-essay

Download the data: https://raw.githubusercontent.com/jaredwhalen/criticalwords-essay/master/data/critical-role-s2-transcript-data-cleaned.csv

[This data is published under an [Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0) license](https://creativecommons.org/licenses/by-nc-sa/4.0/)]


# Tools
I used R for the data scraping, cleaning and formatting. The essay is built with D3.js on a graphics rig heavily inspired by [The Pudding](https://pudding.cool/).

The episode transcriptions are stored in a MongoDB Atlas database and accessed via a Heroku application.




# Methodology
The transcription data for this story was scraped from the [Critical Role Wiki](https://jaredwhalen.github.io/criticalwords-essay/%E2%80%99https://criticalrole.fandom.com/wiki/Transcripts%E2%80%99). I grouped all non-core cast members and multi-person lines as ‘other’ and standardized the names used. I only included dialogue from after the opening theme.

# Credits:

Research, Design/Development and Illustrations by [Jared Whalen](https://jaredwhalen.com/)
