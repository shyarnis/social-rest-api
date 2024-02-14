# Social Rest API

This Backend API is developed by using Node.js, Express, and MongoDB

## API Reference

#### Post Controller

| HTTP                          | Access    | Description              |
| :---------------------------- | :-------- | :----------------------- |
| `GET /api/posts/:id`          | `Public`  | Get a post.              |
| `POST /api/posts/`            | `Private` | Create a post.           |
| `PUT /api/posts/:id`          | `Private` | Update a post.           |
| `DELETE /api/posts/:id`       | `Private` | Delete a post.           |
| `PUT /api/posts/:id/like`     | `Public`  | Like/ Dislike a post.    |
| `GET /api/posts/timeline/all` | `Public`  | Get all timpeline posts. |

#### User Controller

| HTTP                          | Access    | Description      |
| :---------------------------- | :-------- | :--------------- |
| `GET /api/user/:id`           | `Public`  | Get a user.      |
| `PUT /api/posts/:id`          | `Private` | Update a user.   |
| `DELETE /api/users/:id`       | `Private` | Delete a user.   |
| `PUT /api/posts/:id/follow`   | `Private` | Follow a user.   |
| `PUT /api/posts/:id/unfollow` | `Private` | Unfollow a user. |

#### Authorization Controller

| HTTP                     | Access   | Description      |
| :----------------------- | :------- | :--------------- |
| `GET /api/auth/register` | `Public` | Register a user. |
| `POST /api/auth/login`   | `Public` | Login a user.    |
