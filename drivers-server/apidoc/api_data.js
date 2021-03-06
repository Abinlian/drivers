define({ "api": [
  {
    "type": "post",
    "url": "/api/login",
    "title": "login",
    "group": "session",
    "version": "0.0.1",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password_hash",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "RequestExample",
          "content": "/api/login",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "OK",
          "content": "{\n    \"status\": ,\n    \"message\": \"success\",\n    \"time\": \"2017-02-20T12:09:26.412Z\",\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "UNKNOW_ERROR",
          "content": "{\n    \"status\": ,\n    \"message\": \"XX错误\",\n    \"time\": \"2017-02-20T12:09:26.412Z\",\n    \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "INVALID_ARGUMENT",
          "content": "{\n    \"status\": ,\n    \"message\": \"XX错误\",\n    \"time\": \"2017-02-20T12:09:26.412Z\",\n    \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "USERNAME_NOT_EXISTS",
          "content": "{\n    \"status\": ,\n    \"message\": \"XX错误\",\n    \"time\": \"2017-02-20T12:09:26.412Z\",\n    \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "INCORRECT_PASSWORD",
          "content": "{\n    \"status\": ,\n    \"message\": \"XX错误\",\n    \"time\": \"2017-02-20T12:09:26.412Z\",\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/app.js",
    "groupTitle": "session",
    "name": "PostApiLogin"
  },
  {
    "type": "post",
    "url": "/api/logout",
    "title": "logout",
    "group": "session",
    "version": "0.0.1",
    "parameter": {
      "examples": [
        {
          "title": "RequestExample",
          "content": "/api/logout",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "OK",
          "content": "{\n    \"status\": ,\n    \"message\": \"success\",\n    \"time\": \"2017-02-20T12:09:26.412Z\",\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "UNKNOW_ERROR",
          "content": "{\n    \"status\": ,\n    \"message\": \"XX错误\",\n    \"time\": \"2017-02-20T12:09:26.412Z\",\n    \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "NO_SESSION",
          "content": "{\n    \"status\": ,\n    \"message\": \"XX错误\",\n    \"time\": \"2017-02-20T12:09:26.412Z\",\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/app.js",
    "groupTitle": "session",
    "name": "PostApiLogout"
  },
  {
    "type": "post",
    "url": "/api/users",
    "title": "注册用户",
    "name": "____",
    "group": "user",
    "version": "0.0.1",
    "parameter": {
      "examples": [
        {
          "title": "RequestExample",
          "content": "/api/users",
          "type": "json"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password_hash",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "OK",
          "content": "{\n    \"status\": ,\n    \"message\": \"success\",\n    \"time\": \"2017-02-20T12:09:26.412Z\",\n    \"data\": {\n        insert_id: 999\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "UNKNOW_ERROR",
          "content": "{\n    \"status\": ,\n    \"message\": \"XX错误\",\n    \"time\": \"2017-02-20T12:09:26.412Z\",\n    \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "INVALID_ARGUMENT",
          "content": "{\n    \"status\": ,\n    \"message\": \"XX错误\",\n    \"time\": \"2017-02-20T12:09:26.412Z\",\n    \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "USERNAME_ALREADY_EXISTS",
          "content": "{\n    \"status\": ,\n    \"message\": \"XX错误\",\n    \"time\": \"2017-02-20T12:09:26.412Z\",\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/routes/user.router.js",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/api/users/:id",
    "title": "获取用户详细信息",
    "name": "________",
    "group": "user",
    "version": "0.0.1",
    "parameter": {
      "examples": [
        {
          "title": "RequestExample",
          "content": "/api/users/20",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "OK",
          "content": "{\n    \"status\": ,\n    \"message\": \"success\",\n    \"time\": \"2017-02-20T12:09:26.412Z\",\n    \"data\":\n        {\n\n        }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "UNKNOW_ERROR",
          "content": "{\n    \"status\": ,\n    \"message\": \"XX错误\",\n    \"time\": \"2017-02-20T12:09:26.412Z\",\n    \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "NO_SESSION",
          "content": "{\n    \"status\": ,\n    \"message\": \"XX错误\",\n    \"time\": \"2017-02-20T12:09:26.412Z\",\n    \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "NO_PERMISSION",
          "content": "{\n    \"status\": ,\n    \"message\": \"XX错误\",\n    \"time\": \"2017-02-20T12:09:26.412Z\",\n    \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "INVALID_ARGUMENT",
          "content": "{\n    \"status\": ,\n    \"message\": \"XX错误\",\n    \"time\": \"2017-02-20T12:09:26.412Z\",\n    \"data\": null\n}",
          "type": "json"
        },
        {
          "title": "USER_NOT_EXIST",
          "content": "{\n    \"status\": ,\n    \"message\": \"XX错误\",\n    \"time\": \"2017-02-20T12:09:26.412Z\",\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/api/routes/user.router.js",
    "groupTitle": "user"
  }
] });
