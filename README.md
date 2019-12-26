# hello-graphql-express
Basic graphql with database persistent
At the current time, prisma can only be started locally with Docker
Therefore this demo project use demo prisma for persistent

#HOW TO
1. npm i --g prisma
2. when there are changes to datamodel.prisma, run prisma deploy
 - FYI: https://www.howtographql.com/graphql-js/4-adding-a-database/
3. 'prisma generate' for generating the prisma-client
4. node hello.js
5. check the sample query file

# INFO
- The generated prisma-client is written in typescript
- <img alt="Architect of Prisma" src="./architecture.png" /> 

