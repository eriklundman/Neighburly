# Neighburly

# Install Ionic CLI with npm:
$ npm install -g @ionic/cli

## Run serve:
$ ionic serve

### When the server is running, visit the following page:
http://localhost:8100/login 

#### How to navigate in the repository:

The tabs and the nested pages are all found in the folder "pages", except from the file help.tsx 
that contains the code for the tab named "Helps" and is imported to helpTab.tsx.
The components that we import to the tabs and the nested pages are found in the folder "components".
The file firebaseConfig.ts contains the configuration of the database and many functions fetching and storing data to the database. These were all exported so we could use them in different components and pages where we needed them.