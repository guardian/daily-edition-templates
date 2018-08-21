# daily-edition-templates

The Guardian Daily Edition frontend repo.

## Technology

**Node.js**
**Sass**
**grunt**

## Setup
* Clone the repo `git clone https://github.com/guardian/daily-edition-templates.git`
* Install Node.js dependencies by running `npm install`
* Run `grunt` to complie and run
* That's it! visit http://localhost:8000 (+ /[name of the template]) from your browser

## Templates
These are the templates for the articles in the Daily Edition.
The 'finals' folder contains templates which will not run locally but are used on the Octopus system with CAPI.

All the other html templates will run locally and will give you an example of how each template should look.

- **Standard news template** (standard-article-pillar). To see an example of how this template looks go to `/news.html` or `/sport.html`
- **Feature template** (feature-pillar). To see an example of how this template looks go to`/feature.html
- **Feature Recipe template** (feature-recipe-pillar). To see an example of how this template looks go to`/feature-recipe.html`
- **Feature Review template** (feature-review-pillar). To see an example of how this template looks go to `feature-review.html`
- **Comment template** (comment-pillar, opinion-pillar). To see an example of how this template looks go to `/comment-sport.html`.
- **Interview template** (interview-pillar). To see an example of how this template looks go to `/interview.html`.
- **Immersive template**, aka 'The Long read'(immersive-pillar). To see an example of how this template looks go to `/immersive.html`.
- **Cartoon template** (cartoon-pillar). To see an example of how this template looks go to `/cartoon.html`.

## Sass files

### Base
- Has all the base sass files inclusing variables for colours, typography, spacing, reset and rules (which are the multiline according to the pillar).
- There is also a file called `pillars.scss` - this file facilitate the change of coulour by pillar using sass variables and a function that iterates on the colour palette which checks what pillar that template belongs to and gives the whole page a colour accoding to the pillar's name (news, opinion, sport, arts, lifestyle, cartoon)

### scss folder
The rest of the folder contains files that are either common to all templates or unique to specific templates.


## See it live on Octopus
http://octquerydev.dmz.gnl/dailypreview.html
