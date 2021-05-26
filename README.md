The Website uses three different services:

* auth-service
* post-service
* TBD

The auth-service allows users to create accounts and creates sessions using cookies which stores the currently logged-in user's information. Has middlewares that allow the user that prevents logged in users from accessing certain resources

The post-service allows users to retrieve posts and create posts. Posts created are linked with the user through getting the current logged-in user's information in the cookies.  