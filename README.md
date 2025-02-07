# yatdl



## Yet Another ToDo List (YATDL)

Your team will work on this TODO list project for the first three sprints to gain some experience with the SCRUM development process, with gitlab, and with deployment.


## Developing with Docker

The project is set up as 3 separate docker containers (front end, back end, database).  You will need to [have docker installed](https://www.docker.com/products/docker-desktop/) and set up your development environment so that you can attach to a docker container and develop without having to constantly restart the container.

The Docker project provides a [list of IDEs that have docker extensions](https://www.docker.com/products/ide/)

## Build Tools

Gradle is the build tool used for the spring boot portions of this project.  You can use gradle on the command line to perform build and testing tasks.  You can also use it from within your IDE.    Windows users, you will need to make sure that line endings are set to be LF rather than the windows standard of CRLF.   You can set this in most editors.

Your team must choose a build tool to use with typescript.   ESBuild is one of the recommended ones but you may choose a different one as long as the whole team uses the same tool.


## Branching and Merging

  Pushes to the main branch are disabled.  Developers should make a branch for the issue they are working on and merge the branch when the issue is complete.  Merged branches may be deleted.  A code review is required in order to merge a branch.

  The code review can be minimal for the first sprint.  During the second sprint you will focus more on code reviews.


## Testing

Unit testing is required for sprints two and three.  As you add features, you must also add tests.



##  Deploy

You will deploy this project on your group's server.   Sprints will be graded from the version on the server.  You may not use the server for development.  It is deployment only.   


1. Make sure your project compiles, builds and runs with docker compose
1. There are two docker compose files in the project. For deployment use the one that has deploy in the name.
1. Edit the deployment compose file to ensure that the ngnix proxy has the correct configuration for your server and not the devedify server.
1. Edit the configuration file for the ngnix proxy in the swag folder.  You will need to edit the server name.
1. Create a deployment branch in your git repo and merge the working, deployable version of your code to that branch.
1. Log in to your assigned server
    - groupname.socs.uoguelph.ca
    - ssh to server
    - make sure you have the vpn running or are on campus
    - username is `socs`
    - the password was sent to your team in your private channel
1. On your server, create an ssh key pair
    - `ssh-keygen -t ed25519`
    - hit enter to skip creating a passphrase
    - hit enter to accept default save location and filenames
    - copy the generated key
        - `cat ~/.ssh/id_ed25519.pub`
        - copy the output to your clipboard
1. Create an deploy token in gitlab
    - navigate to the project (not the group)
    - go to settings|repository
    - scroll down to the `deploy keys` section
    - add a new key
        - the name doesn't matter
        - paste in the copied key
        - do not grant write permission
        - click add key    
1. clone your repo onto your assigned server
    - use ssh to clone, not https
    - the deploy key will take care of authentication. do not use your own username/password
    - check out the deployment branch
    - `sudo docker compose -f <name of deployment yaml file> up -d`
1. Connect to your service
    - https://<yourgroupname>.socs.uoguelph.ca
    - you will get the security risk message, just accept it for the moment
    - check the operations of your program to make sure it is all working
1. Remove staging flag
    - if the program is working correctly, take it down with
        - `sudo docker compose -f <name of deployment yaml file> down`
    - edit the production compose file to change `staging = true` to `staging = false`
    - restart the service
        - `sudo docker compose -f <name of deployment yaml file> up -d`
        - ngnix will automatically get a certificate from letsencrypt that will allow for warning-free https interactions
        - it might take a few minutes.  be patient



