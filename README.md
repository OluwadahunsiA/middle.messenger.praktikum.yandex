This is a chat app built without any frameworks.

In order have a full experience of the app, you will need to sign up. A successful sign up will automatically lead you to the chat page of the app. On this page, you can search for users by their logins and start chatting with them.

A persistent connection, with a ping interval of 4 seconds, is enabled by using Websocket protocol.

This project uses TypeScript and linters and it is a single page application. 

The Block class that each page extends can be found in the core folder. 

This app is deployed on yandex cloud and can be found here <a href="https://bba2e3lduugvnivs5ce8.containers.yandexcloud.net/">"https://bba2e3lduugvnivs5ce8.containers.yandexcloud.net/</a>

In order to start the project locally:

npm install

npm run build

npm run dev

or

To run the project on port 3000 of the local host:
npm run start
