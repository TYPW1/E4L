# How to launch locally the back-end


## Prerequisites

1. MySQL version 8.0.21 (Ensure that it is running) #changes to mysql 8.0.35

2. Java version 1.8

3. Gradle version 6.7.1

- **Note:**  to install gradle, comprehensive guides are available for both [Windows/Mac](https://docs.gradle.org/current/userguide/installation.html#linux_installation) and [Linux](https://linuxhint.com/installing_gradle_ubuntu/)
   


## Source code
- Download and unzip the provided source code that corresponds to the back-end of the web application.



## Project setup

1. Specify database location and credentials in config file:
 **src/main/java/resources/application.properties**
 
Providing the following information: 

  ```
  spring.datasource.url= jdbc:mysql://localhost:3306/e4l
  spring.datasource.username= root
  spring.datasource.password= 12345678 
  ```
-  **Note:** Give your own username and password
  
2. Create the database named “e4l” in MySQL and check whether the MySQL server is ON. In your terminal, execute the following command:

```
  mysql -u root -p
  create database e4l;
```

- **Note:** Use same password as indicated above in point 1

##  Running backend

1. Next, navigate to the backend directory.

```
   appfolder/lu.uni.e4l.platform.api.dev
```

2. Execute the following commands in the terminal:

```
    gradle wrapper
    chmod +x gradlew
    ./gradlew clean
    ./gradlew build
    ./gradlew bootRun
```

- **Note:**  every time you make a change, you have to build and run the server again so that the corresponding changes are applied.
  




## Project funtionalities

- From the front-end, the questionnaire is first fetched with the API URI- “/questionnaire” using a GET call

- On selecting the answer for any question, a POST api request is made to “/calculate/energyConsumption” to get the energy consumed for that selected answer

- Once the user finishes the request, a POST request is sent to “/session” along with all selected answers. There, the answers are all stored in the server. It then sends a session ID which is the key to retrieve the same session again

- To retrieve the result for the session, a GET request is made to “/calculate/session/{sessionId}” with proper session ID

- For sending mail in “Contact Us” form, a POST request is made to “/send” along with all the data

## Configuration parameters
Configuration options are specified in **src/main/java/resources/application.properties** file  

- `spring.jpa.hibernate.ddl-auto`  
Specifies DB initialisation strategy: update (tries to update the existing schema), create (on each launch drops the existing schema and creates a new one)  
More information [HERE](https://docs.spring.io/spring-boot/docs/current/reference/html/howto-database-initialization.html)

- `jwt.secret`  
Secret key to sign jwtokens.  
Note: If the application runs with multiple instances (vertical scaling), each instance should have the same key to avoid authorization issues.  

- `jwt.expiration-time`  
Validity time of a jwtoken in ms (1000 ms = 1 second).

- `signature.key`  
Secret key to sign objects (id of a result).  
Note: If the application runs with multiple instances (vertical scaling), each instance should have the same key.  

- `admin.email` and `admin.password`
The admin user credentials. The only way to create an admin user.  

- `resources.static.url`
The public URL of a static resources (images, pdfs)  

More info on spring config [HERE](https://docs.spring.io/spring-boot/docs/current/reference/html/howto-properties-and-configuration.html)

