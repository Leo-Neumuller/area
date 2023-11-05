<!-- Generator: Widdershins v4.0.1 -->

<h1 id="area-api">AREA-API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="area-api-default">Default</h1>

## Root

<a id="opIdroot__get"></a>

> Code samples

```shell
# You can also use wget
curl -X GET / \
  -H 'Accept: application/json'

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /`

> Example responses

> 200 Response

```json
null
```

<h3 id="root-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successful Response|Inline|

<h3 id="root-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## About

<a id="opIdabout_about_json_get"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /about.json \
  -H 'Accept: application/json'

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/about.json',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /about.json`

About

> Example responses

> 200 Response

```json
{
  "client": {
    "host": "string"
  },
  "server": {
    "current_time": 0,
    "services": [
      {
        "name": "string",
        "actions": [
          {
            "name": "string",
            "description": "string"
          }
        ],
        "reactions": [
          {
            "name": "string",
            "description": "string"
          }
        ]
      }
    ]
  }
}
```

<h3 id="about-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|About|[About](#schemaabout)|

<aside class="success">
This operation does not require authentication
</aside>

## Client apk

<a id="opIdclient_client_apk_get"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /client.apk

```

```javascript

fetch('/client.apk',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /client.apk`

Client apk

<h3 id="client-apk-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Client|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="area-api-user">User</h1>

## Create user

<a id="opIdcreateUser_user_signup_post"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /user/signup \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```javascript
const inputBody = '{
  "email": "test@test.com",
  "name": "Test",
  "password": "Test1234",
  "surname": "Test"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/user/signup',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /user/signup`

Create user

> Body parameter

```json
{
  "email": "test@test.com",
  "name": "Test",
  "password": "Test1234",
  "surname": "Test"
}
```

<h3 id="create-user-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[UserCreate](#schemausercreate)|true|none|
|» email|body|string|true|none|
|» password|body|string|true|none|
|» surname|body|string|true|none|
|» name|body|string|true|none|

> Example responses

> 201 Response

```json
{
  "access_token": "string"
}
```

> 400 Response

```json
{
  "detail": "string"
}
```

> 401 Response

```json
{
  "detail": "string"
}
```

> 409 Response

```json
{
  "detail": "string"
}
```

<h3 id="create-user-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|User created|[UserToken](#schemausertoken)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Issue when creating authorization token|None|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|Conflict|None|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<h3 id="create-user-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Login user

<a id="opIdloginUser_user_login_post"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /user/login \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```javascript
const inputBody = '{
  "email": "test@test.com",
  "password": "Test1234"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/user/login',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /user/login`

Login user

> Body parameter

```json
{
  "email": "test@test.com",
  "password": "Test1234"
}
```

<h3 id="login-user-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[UserLogin](#schemauserlogin)|true|none|
|» email|body|string|true|none|
|» password|body|string|true|none|

> Example responses

> 200 Response

```json
{
  "access_token": "string"
}
```

> 400 Response

```json
{
  "detail": "string"
}
```

<h3 id="login-user-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|User logged|[UserToken](#schemausertoken)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<h3 id="login-user-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Get user

<a id="opIdgetUser_user_me_get"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /user/me \
  -H 'Accept: application/json' \
  -H 'access-token: string'

```

```javascript

const headers = {
  'Accept':'application/json',
  'access-token':'string'
};

fetch('/user/me',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /user/me`

Get user

<h3 id="get-user-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|access-token|header|string|false|none|

> Example responses

> 200 Response

```json
{
  "email": "test@test.com",
  "id": 1,
  "name": "Test",
  "surname": "Test"
}
```

> 401 Response

```json
{
  "detail": "string"
}
```

<h3 id="get-user-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|User|[UserMe](#schemauserme)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<h3 id="get-user-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="area-api-services">Services</h1>

## Services

<a id="opIdget_services_with_oauth_services_services_oauth_get"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /services/services/oauth \
  -H 'Accept: application/json' \
  -H 'access-token: string'

```

```javascript

const headers = {
  'Accept':'application/json',
  'access-token':'string'
};

fetch('/services/services/oauth',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /services/services/oauth`

Get services

<h3 id="services-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|access-token|header|string|false|none|

> Example responses

> 200 Response

```json
[
  "string"
]
```

> 401 Response

```json
{
  "detail": "string"
}
```

<h3 id="services-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Services|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<h3 id="services-responseschema">Response Schema</h3>

Status Code **200**

*Response Get Services With Oauth Services Services Oauth Get*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|Response Get Services With Oauth Services Services Oauth Get|[string]|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## Get action or reaction input schema

<a id="opIdget_action_or_reaction_services_metadata__areaId__get"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /services/metadata/{areaId} \
  -H 'Accept: application/json' \
  -H 'access-token: string'

```

```javascript

const headers = {
  'Accept':'application/json',
  'access-token':'string'
};

fetch('/services/metadata/{areaId}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /services/metadata/{areaId}`

Get action or reaction input schema

<h3 id="get-action-or-reaction-input-schema-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|areaId|path|string|true|none|
|access-token|header|string|false|none|

> Example responses

> 200 Response

```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "type": "action",
  "inputsData": [],
  "outputsData": []
}
```

> 401 Response

```json
{
  "detail": "string"
}
```

> 404 Response

```json
{
  "detail": "string"
}
```

<h3 id="get-action-or-reaction-input-schema-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Action or reaction schema|[ServiceMetadataSend](#schemaservicemetadatasend)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Service not found|None|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<h3 id="get-action-or-reaction-input-schema-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Authorization URL

<a id="opIdauthorize_url_services__service__authorize_url_get"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /services/{service}/authorize_url?redirect=string&end_redirect=string \
  -H 'Accept: application/json' \
  -H 'access-token: string'

```

```javascript

const headers = {
  'Accept':'application/json',
  'access-token':'string'
};

fetch('/services/{service}/authorize_url?redirect=string&end_redirect=string',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /services/{service}/authorize_url`

Get authorization url

<h3 id="authorization-url-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|service|path|string|true|none|
|redirect|query|string|true|none|
|end_redirect|query|string|true|none|
|access-token|header|string|false|none|

> Example responses

> 200 Response

```json
{
  "url": "https://accounts.google.com/o/oauth2/auth?response_type=???&client_id=???&redirect_uri=???&scope=???&state=???&access_type=???&include_granted_scopes=???"
}
```

> 401 Response

```json
{
  "detail": "string"
}
```

> 404 Response

```json
{
  "detail": "string"
}
```

> 409 Response

```json
{
  "detail": "string"
}
```

<h3 id="authorization-url-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Authorization URL|[AuthorizationUrl](#schemaauthorizationurl)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Service not found|None|
|409|[Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8)|Service already exist|None|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<h3 id="authorization-url-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Authorize

<a id="opIdauthorize_services__service__authorize_get"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /services/{service}/authorize \
  -H 'Accept: application/json'

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/services/{service}/authorize',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /services/{service}/authorize`

Authorize

<h3 id="authorize-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|service|path|string|true|none|
|state|query|string|false|none|
|code|query|string|false|none|
|scope|query|string|false|none|
|error|query|string|false|none|

> Example responses

> 200 Response

```json
null
```

<h3 id="authorize-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Authorize|Inline|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<h3 id="authorize-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Is connected

<a id="opIdis_connected_services__service__is_connected_get"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /services/{service}/is_connected \
  -H 'Accept: application/json' \
  -H 'access-token: string'

```

```javascript

const headers = {
  'Accept':'application/json',
  'access-token':'string'
};

fetch('/services/{service}/is_connected',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /services/{service}/is_connected`

Is connected

<h3 id="is-connected-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|service|path|string|true|none|
|access-token|header|string|false|none|

> Example responses

> 200 Response

```json
null
```

<h3 id="is-connected-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Is connected|Inline|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<h3 id="is-connected-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Disconnect

<a id="opIddisconnect_services__service__disconnect_get"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /services/{service}/disconnect \
  -H 'Accept: application/json' \
  -H 'access-token: string'

```

```javascript

const headers = {
  'Accept':'application/json',
  'access-token':'string'
};

fetch('/services/{service}/disconnect',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /services/{service}/disconnect`

Disconnect

<h3 id="disconnect-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|service|path|string|true|none|
|access-token|header|string|false|none|

> Example responses

> 200 Response

```json
null
```

<h3 id="disconnect-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Disconnect|Inline|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<h3 id="disconnect-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Get all actions or reactions

<a id="opIdget_actions_or_reactions_services__service___serviceType__get"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /services/{service}/{serviceType} \
  -H 'Accept: application/json' \
  -H 'access-token: string'

```

```javascript

const headers = {
  'Accept':'application/json',
  'access-token':'string'
};

fetch('/services/{service}/{serviceType}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /services/{service}/{serviceType}`

Get all actions or reactions

<h3 id="get-all-actions-or-reactions-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|service|path|string|true|none|
|serviceType|path|[ServiceType](#schemaservicetype)|true|none|
|access-token|header|string|false|none|

#### Enumerated Values

|Parameter|Value|
|---|---|
|serviceType|action|
|serviceType|reaction|

> Example responses

> 200 Response

```json
[
  {
    "description": "???",
    "id": "???",
    "name": "???"
  }
]
```

> 401 Response

```json
{
  "detail": "string"
}
```

> 404 Response

```json
{
  "detail": "string"
}
```

<h3 id="get-all-actions-or-reactions-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|List of actions or reactions|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Service not found|None|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<h3 id="get-all-actions-or-reactions-responseschema">Response Schema</h3>

Status Code **200**

*Response Get Actions Or Reactions Services  Service   Servicetype  Get*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|Response Get Actions Or Reactions Services  Service   Servicetype  Get|[[AREADataSmall](#schemaareadatasmall)]|false|none|none|
|» AREADataSmall|[AREADataSmall](#schemaareadatasmall)|false|none|none|
|»» id|string|true|none|none|
|»» name|string|true|none|none|
|»» description|string|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## Test action or reaction

<a id="opIdtest_action_or_reaction_services_test_post"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /services/test \
  -H 'Accept: application/json' \
  -H 'access-token: string'

```

```javascript

const headers = {
  'Accept':'application/json',
  'access-token':'string'
};

fetch('/services/test',
{
  method: 'POST',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /services/test`

Test action or reaction

<h3 id="test-action-or-reaction-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|access-token|header|string|false|none|

> Example responses

> 200 Response

```json
null
```

> 401 Response

```json
{
  "detail": "string"
}
```

> 404 Response

```json
{
  "detail": "string"
}
```

<h3 id="test-action-or-reaction-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Test action or reaction|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Service not found|None|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<h3 id="test-action-or-reaction-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="area-api-flux">Flux</h1>

## Create/Modify flux

<a id="opIdcreate_flux_flux_post"></a>

> Code samples

```shell
# You can also use wget
curl -X POST /flux \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'access-token: string'

```

```javascript
const inputBody = '{
  "id": 0,
  "name": "string",
  "description": "string",
  "nodes": [
    {
      "id": "string",
      "numberInputs": 0,
      "numberOutputs": 0,
      "service": "string",
      "subService": "string",
      "subServiceId": "string",
      "inputDataFromSubServiceId": "string",
      "inputsData": [],
      "prevPosition": {
        "x": 0,
        "y": 0
      },
      "currPosition": {
        "x": 0,
        "y": 0
      },
      "type": "string",
      "inputEdgeIds": [
        "string"
      ],
      "outputEdgeIds": [
        "string"
      ],
      "title": "string",
      "img": "string"
    }
  ],
  "edges": [
    {
      "id": "string",
      "nodeStartId": "string",
      "nodeEndId": "string",
      "inputIndex": 0,
      "outputIndex": 0,
      "prevStartPos": {
        "x": 0,
        "y": 0
      },
      "currStartPos": {
        "x": 0,
        "y": 0
      },
      "prevEndPos": {
        "x": 0,
        "y": 0
      },
      "currEndPos": {
        "x": 0,
        "y": 0
      }
    }
  ]
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'access-token':'string'
};

fetch('/flux',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /flux`

Create/Modify flux

> Body parameter

```json
{
  "id": 0,
  "name": "string",
  "description": "string",
  "nodes": [
    {
      "id": "string",
      "numberInputs": 0,
      "numberOutputs": 0,
      "service": "string",
      "subService": "string",
      "subServiceId": "string",
      "inputDataFromSubServiceId": "string",
      "inputsData": [],
      "prevPosition": {
        "x": 0,
        "y": 0
      },
      "currPosition": {
        "x": 0,
        "y": 0
      },
      "type": "string",
      "inputEdgeIds": [
        "string"
      ],
      "outputEdgeIds": [
        "string"
      ],
      "title": "string",
      "img": "string"
    }
  ],
  "edges": [
    {
      "id": "string",
      "nodeStartId": "string",
      "nodeEndId": "string",
      "inputIndex": 0,
      "outputIndex": 0,
      "prevStartPos": {
        "x": 0,
        "y": 0
      },
      "currStartPos": {
        "x": 0,
        "y": 0
      },
      "prevEndPos": {
        "x": 0,
        "y": 0
      },
      "currEndPos": {
        "x": 0,
        "y": 0
      }
    }
  ]
}
```

<h3 id="create/modify-flux-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|verify|query|boolean|false|none|
|access-token|header|string|false|none|
|body|body|[FluxCreateOrModify-Input](#schemafluxcreateormodify-input)|true|none|
|» id|body|any|false|none|
|»» *anonymous*|body|integer|false|none|
|»» *anonymous*|body|null|false|none|
|» name|body|string|true|none|
|» description|body|string|true|none|
|» nodes|body|[[FluxNode-Input](#schemafluxnode-input)]|true|[Flux Node Model]|
|»» FluxNode|body|[FluxNode-Input](#schemafluxnode-input)|false|Flux Node Model|
|»»» id|body|string|true|none|
|»»» numberInputs|body|any|true|none|
|»»»» *anonymous*|body|integer|false|none|
|»»»» *anonymous*|body|string|false|none|
|»»» numberOutputs|body|any|true|none|
|»»»» *anonymous*|body|integer|false|none|
|»»»» *anonymous*|body|string|false|none|
|»»» service|body|any|false|none|
|»»»» *anonymous*|body|string|false|none|
|»»»» *anonymous*|body|null|false|none|
|»»» subService|body|any|false|none|
|»»»» *anonymous*|body|string|false|none|
|»»»» *anonymous*|body|null|false|none|
|»»» subServiceId|body|any|false|none|
|»»»» *anonymous*|body|string|false|none|
|»»»» *anonymous*|body|null|false|none|
|»»» inputDataFromSubServiceId|body|any|false|none|
|»»»» *anonymous*|body|string|false|none|
|»»»» *anonymous*|body|null|false|none|
|»»» inputsData|body|any|false|none|
|»»»» *anonymous*|body|[[FluxInputData-Input](#schemafluxinputdata-input)]|false|[Flux Input Data Model]|
|»»»»» FluxInputData|body|[FluxInputData-Input](#schemafluxinputdata-input)|false|Flux Input Data Model|
|»»»»»» id|body|string|true|none|
|»»»»»» name|body|string|true|none|
|»»»»»» data|body|[string]|true|none|
|»»»»»» inputType|body|string|true|none|
|»»»»»» type|body|string|true|none|
|»»»»»» required|body|boolean|true|none|
|»»»»»» value|body|any|false|none|
|»»»»»»» *anonymous*|body|any|false|none|
|»»»»»»» *anonymous*|body|null|false|none|
|»»»» *anonymous*|body|null|false|none|
|»»» prevPosition|body|[FluxPos](#schemafluxpos)|true|Flux Position Model|
|»»»» x|body|number|true|none|
|»»»» y|body|number|true|none|
|»»» currPosition|body|[FluxPos](#schemafluxpos)|true|Flux Position Model|
|»»» type|body|string|true|none|
|»»» inputEdgeIds|body|[string]|true|none|
|»»» outputEdgeIds|body|[string]|true|none|
|»»» title|body|string|true|none|
|»»» img|body|string|true|none|
|» edges|body|[[FluxEdge](#schemafluxedge)]|true|[Flux Edge Model]|
|»» FluxEdge|body|[FluxEdge](#schemafluxedge)|false|Flux Edge Model|
|»»» id|body|string|true|none|
|»»» nodeStartId|body|string|true|none|
|»»» nodeEndId|body|string|true|none|
|»»» inputIndex|body|integer|true|none|
|»»» outputIndex|body|integer|true|none|
|»»» prevStartPos|body|[FluxPos](#schemafluxpos)|true|Flux Position Model|
|»»» currStartPos|body|[FluxPos](#schemafluxpos)|true|Flux Position Model|
|»»» prevEndPos|body|[FluxPos](#schemafluxpos)|true|Flux Position Model|
|»»» currEndPos|body|[FluxPos](#schemafluxpos)|true|Flux Position Model|

> Example responses

> 201 Response

```json
{
  "id": 0
}
```

> 400 Response

```json
{
  "detail": "string"
}
```

> 401 Response

```json
{
  "detail": "string"
}
```

<h3 id="create/modify-flux-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Flux|[FluxSend](#schemafluxsend)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad Request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<h3 id="create/modify-flux-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Delete flux

<a id="opIddelete_flux_flux__fluxId__delete"></a>

> Code samples

```shell
# You can also use wget
curl -X DELETE /flux/{fluxId} \
  -H 'Accept: application/json' \
  -H 'access-token: string'

```

```javascript

const headers = {
  'Accept':'application/json',
  'access-token':'string'
};

fetch('/flux/{fluxId}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`DELETE /flux/{fluxId}`

Delete flux

<h3 id="delete-flux-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|fluxId|path|integer|true|none|
|access-token|header|string|false|none|

> Example responses

> 200 Response

```json
{
  "id": 0
}
```

> 401 Response

```json
{
  "detail": "string"
}
```

> 404 Response

```json
{
  "detail": "string"
}
```

<h3 id="delete-flux-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Flux|[FluxSend](#schemafluxsend)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Flux not found|None|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<h3 id="delete-flux-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Get flux

<a id="opIdget_flux_flux__fluxId__get"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /flux/{fluxId} \
  -H 'Accept: application/json' \
  -H 'access-token: string'

```

```javascript

const headers = {
  'Accept':'application/json',
  'access-token':'string'
};

fetch('/flux/{fluxId}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /flux/{fluxId}`

Get flux

<h3 id="get-flux-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|fluxId|path|integer|true|none|
|access-token|header|string|false|none|

> Example responses

> 200 Response

```json
{
  "id": 0,
  "name": "string",
  "description": "string",
  "nodes": [
    {
      "id": "string",
      "numberInputs": 0,
      "numberOutputs": 0,
      "service": "string",
      "subService": "string",
      "subServiceId": "string",
      "inputDataFromSubServiceId": "string",
      "inputsData": [],
      "prevPosition": {
        "x": 0,
        "y": 0
      },
      "currPosition": {
        "x": 0,
        "y": 0
      },
      "type": "string",
      "inputEdgeIds": [
        "string"
      ],
      "outputEdgeIds": [
        "string"
      ],
      "title": "string",
      "img": "string"
    }
  ],
  "edges": [
    {
      "id": "string",
      "nodeStartId": "string",
      "nodeEndId": "string",
      "inputIndex": 0,
      "outputIndex": 0,
      "prevStartPos": {
        "x": 0,
        "y": 0
      },
      "currStartPos": {
        "x": 0,
        "y": 0
      },
      "prevEndPos": {
        "x": 0,
        "y": 0
      },
      "currEndPos": {
        "x": 0,
        "y": 0
      }
    }
  ]
}
```

> 401 Response

```json
{
  "detail": "string"
}
```

> 404 Response

```json
{
  "detail": "string"
}
```

<h3 id="get-flux-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Flux|[FluxCreateOrModify-Output](#schemafluxcreateormodify-output)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Flux not found|None|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<h3 id="get-flux-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Toggle active flux

<a id="opIdtoggle_flux_flux__fluxId__patch"></a>

> Code samples

```shell
# You can also use wget
curl -X PATCH /flux/{fluxId} \
  -H 'Accept: application/json' \
  -H 'access-token: string'

```

```javascript

const headers = {
  'Accept':'application/json',
  'access-token':'string'
};

fetch('/flux/{fluxId}',
{
  method: 'PATCH',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`PATCH /flux/{fluxId}`

Toggle active flux

<h3 id="toggle-active-flux-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|fluxId|path|integer|true|none|
|access-token|header|string|false|none|

> Example responses

> 200 Response

```json
{
  "id": 0,
  "active": true
}
```

> 401 Response

```json
{
  "detail": "string"
}
```

> 404 Response

```json
{
  "detail": "string"
}
```

<h3 id="toggle-active-flux-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Toggle works|[FluxToggleSend](#schemafluxtogglesend)|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Flux not found|None|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<h3 id="toggle-active-flux-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Get all fluxs

<a id="opIdget_fluxs_flux_fluxs_get"></a>

> Code samples

```shell
# You can also use wget
curl -X GET /flux/fluxs \
  -H 'Accept: application/json' \
  -H 'access-token: string'

```

```javascript

const headers = {
  'Accept':'application/json',
  'access-token':'string'
};

fetch('/flux/fluxs',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /flux/fluxs`

Get all fluxs

<h3 id="get-all-fluxs-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|access-token|header|string|false|none|

> Example responses

> 200 Response

```json
[
  {
    "id": 0,
    "name": "string",
    "description": "string",
    "active": true,
    "reaction": "string",
    "action": "string"
  }
]
```

> 401 Response

```json
{
  "detail": "string"
}
```

<h3 id="get-all-fluxs-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|List of fluxs|Inline|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|
|422|[Unprocessable Entity](https://tools.ietf.org/html/rfc2518#section-10.3)|Validation Error|[HTTPValidationError](#schemahttpvalidationerror)|

<h3 id="get-all-fluxs-responseschema">Response Schema</h3>

Status Code **200**

*Response Get Fluxs Flux Fluxs Get*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|Response Get Fluxs Flux Fluxs Get|[[FluxBasicData](#schemafluxbasicdata)]|false|none|[Flux Basic Data Model]|
|» FluxBasicData|[FluxBasicData](#schemafluxbasicdata)|false|none|Flux Basic Data Model|
|»» id|integer|true|none|none|
|»» name|string|true|none|none|
|»» description|string|true|none|none|
|»» active|boolean|true|none|none|
|»» reaction|string|true|none|none|
|»» action|string|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_AREADataSmall">AREADataSmall</h2>
<!-- backwards compatibility -->
<a id="schemaareadatasmall"></a>
<a id="schema_AREADataSmall"></a>
<a id="tocSareadatasmall"></a>
<a id="tocsareadatasmall"></a>

```json
{
  "description": "???",
  "id": "???",
  "name": "???"
}

```

AREADataSmall

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|true|none|none|
|name|string|true|none|none|
|description|string|true|none|none|

<h2 id="tocS_About">About</h2>
<!-- backwards compatibility -->
<a id="schemaabout"></a>
<a id="schema_About"></a>
<a id="tocSabout"></a>
<a id="tocsabout"></a>

```json
{
  "client": {
    "host": "string"
  },
  "server": {
    "current_time": 0,
    "services": [
      {
        "name": "string",
        "actions": [
          {
            "name": "string",
            "description": "string"
          }
        ],
        "reactions": [
          {
            "name": "string",
            "description": "string"
          }
        ]
      }
    ]
  }
}

```

About

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|client|[Client](#schemaclient)|true|none|none|
|server|[Server](#schemaserver)|true|none|none|

<h2 id="tocS_Action">Action</h2>
<!-- backwards compatibility -->
<a id="schemaaction"></a>
<a id="schema_Action"></a>
<a id="tocSaction"></a>
<a id="tocsaction"></a>

```json
{
  "name": "string",
  "description": "string"
}

```

Action

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|none|
|description|string|true|none|none|

<h2 id="tocS_AuthorizationUrl">AuthorizationUrl</h2>
<!-- backwards compatibility -->
<a id="schemaauthorizationurl"></a>
<a id="schema_AuthorizationUrl"></a>
<a id="tocSauthorizationurl"></a>
<a id="tocsauthorizationurl"></a>

```json
{
  "url": "https://accounts.google.com/o/oauth2/auth?response_type=???&client_id=???&redirect_uri=???&scope=???&state=???&access_type=???&include_granted_scopes=???"
}

```

AuthorizationUrl

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|url|string|true|none|none|

<h2 id="tocS_Client">Client</h2>
<!-- backwards compatibility -->
<a id="schemaclient"></a>
<a id="schema_Client"></a>
<a id="tocSclient"></a>
<a id="tocsclient"></a>

```json
{
  "host": "string"
}

```

Client

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|host|string|true|none|none|

<h2 id="tocS_DataConfigurationType">DataConfigurationType</h2>
<!-- backwards compatibility -->
<a id="schemadataconfigurationtype"></a>
<a id="schema_DataConfigurationType"></a>
<a id="tocSdataconfigurationtype"></a>
<a id="tocsdataconfigurationtype"></a>

```json
"text"

```

DataConfigurationType

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|DataConfigurationType|string|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|DataConfigurationType|text|
|DataConfigurationType|number|
|DataConfigurationType|textMultiline|
|DataConfigurationType|select|
|DataConfigurationType|checkbox|
|DataConfigurationType|date|

<h2 id="tocS_FluxBasicData">FluxBasicData</h2>
<!-- backwards compatibility -->
<a id="schemafluxbasicdata"></a>
<a id="schema_FluxBasicData"></a>
<a id="tocSfluxbasicdata"></a>
<a id="tocsfluxbasicdata"></a>

```json
{
  "id": 0,
  "name": "string",
  "description": "string",
  "active": true,
  "reaction": "string",
  "action": "string"
}

```

FluxBasicData

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|none|
|name|string|true|none|none|
|description|string|true|none|none|
|active|boolean|true|none|none|
|reaction|string|true|none|none|
|action|string|true|none|none|

<h2 id="tocS_FluxCreateOrModify-Input">FluxCreateOrModify-Input</h2>
<!-- backwards compatibility -->
<a id="schemafluxcreateormodify-input"></a>
<a id="schema_FluxCreateOrModify-Input"></a>
<a id="tocSfluxcreateormodify-input"></a>
<a id="tocsfluxcreateormodify-input"></a>

```json
{
  "id": 0,
  "name": "string",
  "description": "string",
  "nodes": [
    {
      "id": "string",
      "numberInputs": 0,
      "numberOutputs": 0,
      "service": "string",
      "subService": "string",
      "subServiceId": "string",
      "inputDataFromSubServiceId": "string",
      "inputsData": [],
      "prevPosition": {
        "x": 0,
        "y": 0
      },
      "currPosition": {
        "x": 0,
        "y": 0
      },
      "type": "string",
      "inputEdgeIds": [
        "string"
      ],
      "outputEdgeIds": [
        "string"
      ],
      "title": "string",
      "img": "string"
    }
  ],
  "edges": [
    {
      "id": "string",
      "nodeStartId": "string",
      "nodeEndId": "string",
      "inputIndex": 0,
      "outputIndex": 0,
      "prevStartPos": {
        "x": 0,
        "y": 0
      },
      "currStartPos": {
        "x": 0,
        "y": 0
      },
      "prevEndPos": {
        "x": 0,
        "y": 0
      },
      "currEndPos": {
        "x": 0,
        "y": 0
      }
    }
  ]
}

```

FluxCreateOrModify

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|none|
|description|string|true|none|none|
|nodes|[[FluxNode-Input](#schemafluxnode-input)]|true|none|[Flux Node Model]|
|edges|[[FluxEdge](#schemafluxedge)]|true|none|[Flux Edge Model]|

<h2 id="tocS_FluxCreateOrModify-Output">FluxCreateOrModify-Output</h2>
<!-- backwards compatibility -->
<a id="schemafluxcreateormodify-output"></a>
<a id="schema_FluxCreateOrModify-Output"></a>
<a id="tocSfluxcreateormodify-output"></a>
<a id="tocsfluxcreateormodify-output"></a>

```json
{
  "id": 0,
  "name": "string",
  "description": "string",
  "nodes": [
    {
      "id": "string",
      "numberInputs": 0,
      "numberOutputs": 0,
      "service": "string",
      "subService": "string",
      "subServiceId": "string",
      "inputDataFromSubServiceId": "string",
      "inputsData": [],
      "prevPosition": {
        "x": 0,
        "y": 0
      },
      "currPosition": {
        "x": 0,
        "y": 0
      },
      "type": "string",
      "inputEdgeIds": [
        "string"
      ],
      "outputEdgeIds": [
        "string"
      ],
      "title": "string",
      "img": "string"
    }
  ],
  "edges": [
    {
      "id": "string",
      "nodeStartId": "string",
      "nodeEndId": "string",
      "inputIndex": 0,
      "outputIndex": 0,
      "prevStartPos": {
        "x": 0,
        "y": 0
      },
      "currStartPos": {
        "x": 0,
        "y": 0
      },
      "prevEndPos": {
        "x": 0,
        "y": 0
      },
      "currEndPos": {
        "x": 0,
        "y": 0
      }
    }
  ]
}

```

FluxCreateOrModify

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|any|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|none|
|description|string|true|none|none|
|nodes|[[FluxNode-Output](#schemafluxnode-output)]|true|none|[Flux Node Model]|
|edges|[[FluxEdge](#schemafluxedge)]|true|none|[Flux Edge Model]|

<h2 id="tocS_FluxEdge">FluxEdge</h2>
<!-- backwards compatibility -->
<a id="schemafluxedge"></a>
<a id="schema_FluxEdge"></a>
<a id="tocSfluxedge"></a>
<a id="tocsfluxedge"></a>

```json
{
  "id": "string",
  "nodeStartId": "string",
  "nodeEndId": "string",
  "inputIndex": 0,
  "outputIndex": 0,
  "prevStartPos": {
    "x": 0,
    "y": 0
  },
  "currStartPos": {
    "x": 0,
    "y": 0
  },
  "prevEndPos": {
    "x": 0,
    "y": 0
  },
  "currEndPos": {
    "x": 0,
    "y": 0
  }
}

```

FluxEdge

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|true|none|none|
|nodeStartId|string|true|none|none|
|nodeEndId|string|true|none|none|
|inputIndex|integer|true|none|none|
|outputIndex|integer|true|none|none|
|prevStartPos|[FluxPos](#schemafluxpos)|true|none|Flux Position Model|
|currStartPos|[FluxPos](#schemafluxpos)|true|none|Flux Position Model|
|prevEndPos|[FluxPos](#schemafluxpos)|true|none|Flux Position Model|
|currEndPos|[FluxPos](#schemafluxpos)|true|none|Flux Position Model|

<h2 id="tocS_FluxInputData-Input">FluxInputData-Input</h2>
<!-- backwards compatibility -->
<a id="schemafluxinputdata-input"></a>
<a id="schema_FluxInputData-Input"></a>
<a id="tocSfluxinputdata-input"></a>
<a id="tocsfluxinputdata-input"></a>

```json
{
  "id": "string",
  "name": "string",
  "data": [
    "string"
  ],
  "inputType": "string",
  "type": "string",
  "required": true,
  "value": {}
}

```

FluxInputData

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|true|none|none|
|name|string|true|none|none|
|data|[string]|true|none|none|
|inputType|string|true|none|none|
|type|string|true|none|none|
|required|boolean|true|none|none|
|value|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|any|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

<h2 id="tocS_FluxInputData-Output">FluxInputData-Output</h2>
<!-- backwards compatibility -->
<a id="schemafluxinputdata-output"></a>
<a id="schema_FluxInputData-Output"></a>
<a id="tocSfluxinputdata-output"></a>
<a id="tocsfluxinputdata-output"></a>

```json
{
  "id": "string",
  "name": "string",
  "data": [
    "string"
  ],
  "inputType": "string",
  "type": "string",
  "required": true,
  "value": {}
}

```

FluxInputData

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|true|none|none|
|name|string|true|none|none|
|data|[string]|true|none|none|
|inputType|string|true|none|none|
|type|string|true|none|none|
|required|boolean|true|none|none|
|value|any|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|any|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

<h2 id="tocS_FluxNode-Input">FluxNode-Input</h2>
<!-- backwards compatibility -->
<a id="schemafluxnode-input"></a>
<a id="schema_FluxNode-Input"></a>
<a id="tocSfluxnode-input"></a>
<a id="tocsfluxnode-input"></a>

```json
{
  "id": "string",
  "numberInputs": 0,
  "numberOutputs": 0,
  "service": "string",
  "subService": "string",
  "subServiceId": "string",
  "inputDataFromSubServiceId": "string",
  "inputsData": [],
  "prevPosition": {
    "x": 0,
    "y": 0
  },
  "currPosition": {
    "x": 0,
    "y": 0
  },
  "type": "string",
  "inputEdgeIds": [
    "string"
  ],
  "outputEdgeIds": [
    "string"
  ],
  "title": "string",
  "img": "string"
}

```

FluxNode

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|true|none|none|
|numberInputs|any|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|numberOutputs|any|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|service|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|subService|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|subServiceId|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|inputDataFromSubServiceId|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|inputsData|any|false|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[[FluxInputData-Input](#schemafluxinputdata-input)]|false|none|[Flux Input Data Model]|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|prevPosition|[FluxPos](#schemafluxpos)|true|none|Flux Position Model|
|currPosition|[FluxPos](#schemafluxpos)|true|none|Flux Position Model|
|type|string|true|none|none|
|inputEdgeIds|[string]|true|none|none|
|outputEdgeIds|[string]|true|none|none|
|title|string|true|none|none|
|img|string|true|none|none|

<h2 id="tocS_FluxNode-Output">FluxNode-Output</h2>
<!-- backwards compatibility -->
<a id="schemafluxnode-output"></a>
<a id="schema_FluxNode-Output"></a>
<a id="tocSfluxnode-output"></a>
<a id="tocsfluxnode-output"></a>

```json
{
  "id": "string",
  "numberInputs": 0,
  "numberOutputs": 0,
  "service": "string",
  "subService": "string",
  "subServiceId": "string",
  "inputDataFromSubServiceId": "string",
  "inputsData": [],
  "prevPosition": {
    "x": 0,
    "y": 0
  },
  "currPosition": {
    "x": 0,
    "y": 0
  },
  "type": "string",
  "inputEdgeIds": [
    "string"
  ],
  "outputEdgeIds": [
    "string"
  ],
  "title": "string",
  "img": "string"
}

```

FluxNode

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|true|none|none|
|numberInputs|any|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|numberOutputs|any|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|service|any|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|subService|any|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|subServiceId|any|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|inputDataFromSubServiceId|any|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|inputsData|any|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|[[FluxInputData-Output](#schemafluxinputdata-output)]|false|none|[Flux Input Data Model]|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|prevPosition|[FluxPos](#schemafluxpos)|true|none|Flux Position Model|
|currPosition|[FluxPos](#schemafluxpos)|true|none|Flux Position Model|
|type|string|true|none|none|
|inputEdgeIds|[string]|true|none|none|
|outputEdgeIds|[string]|true|none|none|
|title|string|true|none|none|
|img|string|true|none|none|

<h2 id="tocS_FluxPos">FluxPos</h2>
<!-- backwards compatibility -->
<a id="schemafluxpos"></a>
<a id="schema_FluxPos"></a>
<a id="tocSfluxpos"></a>
<a id="tocsfluxpos"></a>

```json
{
  "x": 0,
  "y": 0
}

```

FluxPos

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|x|number|true|none|none|
|y|number|true|none|none|

<h2 id="tocS_FluxSend">FluxSend</h2>
<!-- backwards compatibility -->
<a id="schemafluxsend"></a>
<a id="schema_FluxSend"></a>
<a id="tocSfluxsend"></a>
<a id="tocsfluxsend"></a>

```json
{
  "id": 0
}

```

FluxSend

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|none|

<h2 id="tocS_FluxToggleSend">FluxToggleSend</h2>
<!-- backwards compatibility -->
<a id="schemafluxtogglesend"></a>
<a id="schema_FluxToggleSend"></a>
<a id="tocSfluxtogglesend"></a>
<a id="tocsfluxtogglesend"></a>

```json
{
  "id": 0,
  "active": true
}

```

FluxToggleSend

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|none|
|active|boolean|true|none|none|

<h2 id="tocS_HTTPValidationError">HTTPValidationError</h2>
<!-- backwards compatibility -->
<a id="schemahttpvalidationerror"></a>
<a id="schema_HTTPValidationError"></a>
<a id="tocShttpvalidationerror"></a>
<a id="tocshttpvalidationerror"></a>

```json
{
  "detail": [
    {
      "loc": [
        "string"
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}

```

HTTPValidationError

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|detail|[[ValidationError](#schemavalidationerror)]|false|none|none|

<h2 id="tocS_Reaction">Reaction</h2>
<!-- backwards compatibility -->
<a id="schemareaction"></a>
<a id="schema_Reaction"></a>
<a id="tocSreaction"></a>
<a id="tocsreaction"></a>

```json
{
  "name": "string",
  "description": "string"
}

```

Reaction

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|none|
|description|string|true|none|none|

<h2 id="tocS_Server">Server</h2>
<!-- backwards compatibility -->
<a id="schemaserver"></a>
<a id="schema_Server"></a>
<a id="tocSserver"></a>
<a id="tocsserver"></a>

```json
{
  "current_time": 0,
  "services": [
    {
      "name": "string",
      "actions": [
        {
          "name": "string",
          "description": "string"
        }
      ],
      "reactions": [
        {
          "name": "string",
          "description": "string"
        }
      ]
    }
  ]
}

```

Server

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|current_time|integer|true|none|none|
|services|[[Service](#schemaservice)]|true|none|none|

<h2 id="tocS_Service">Service</h2>
<!-- backwards compatibility -->
<a id="schemaservice"></a>
<a id="schema_Service"></a>
<a id="tocSservice"></a>
<a id="tocsservice"></a>

```json
{
  "name": "string",
  "actions": [
    {
      "name": "string",
      "description": "string"
    }
  ],
  "reactions": [
    {
      "name": "string",
      "description": "string"
    }
  ]
}

```

Service

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|none|
|actions|[[Action](#schemaaction)]|true|none|none|
|reactions|[[Reaction](#schemareaction)]|true|none|none|

<h2 id="tocS_ServiceMetadataSend">ServiceMetadataSend</h2>
<!-- backwards compatibility -->
<a id="schemaservicemetadatasend"></a>
<a id="schema_ServiceMetadataSend"></a>
<a id="tocSservicemetadatasend"></a>
<a id="tocsservicemetadatasend"></a>

```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "type": "action",
  "inputsData": [],
  "outputsData": []
}

```

ServiceMetadataSend

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|any|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|null|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|none|
|description|string|true|none|none|
|type|[ServiceType](#schemaservicetype)|true|none|none|
|inputsData|[[inputData](#schemainputdata)]|true|none|none|
|outputsData|[[outputData](#schemaoutputdata)]|true|none|none|

<h2 id="tocS_ServiceType">ServiceType</h2>
<!-- backwards compatibility -->
<a id="schemaservicetype"></a>
<a id="schema_ServiceType"></a>
<a id="tocSservicetype"></a>
<a id="tocsservicetype"></a>

```json
"action"

```

ServiceType

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ServiceType|string|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|ServiceType|action|
|ServiceType|reaction|

<h2 id="tocS_ServicesType">ServicesType</h2>
<!-- backwards compatibility -->
<a id="schemaservicestype"></a>
<a id="schema_ServicesType"></a>
<a id="tocSservicestype"></a>
<a id="tocsservicestype"></a>

```json
{
  "action": [
    "string"
  ],
  "reaction": [
    "string"
  ]
}

```

ServicesType

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|action|[string]|true|none|none|
|reaction|[string]|true|none|none|

<h2 id="tocS_UserCreate">UserCreate</h2>
<!-- backwards compatibility -->
<a id="schemausercreate"></a>
<a id="schema_UserCreate"></a>
<a id="tocSusercreate"></a>
<a id="tocsusercreate"></a>

```json
{
  "email": "test@test.com",
  "name": "Test",
  "password": "Test1234",
  "surname": "Test"
}

```

UserCreate

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|email|string|true|none|none|
|password|string|true|none|none|
|surname|string|true|none|none|
|name|string|true|none|none|

<h2 id="tocS_UserLogin">UserLogin</h2>
<!-- backwards compatibility -->
<a id="schemauserlogin"></a>
<a id="schema_UserLogin"></a>
<a id="tocSuserlogin"></a>
<a id="tocsuserlogin"></a>

```json
{
  "email": "test@test.com",
  "password": "Test1234"
}

```

UserLogin

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|email|string|true|none|none|
|password|string|true|none|none|

<h2 id="tocS_UserMe">UserMe</h2>
<!-- backwards compatibility -->
<a id="schemauserme"></a>
<a id="schema_UserMe"></a>
<a id="tocSuserme"></a>
<a id="tocsuserme"></a>

```json
{
  "email": "test@test.com",
  "id": 1,
  "name": "Test",
  "surname": "Test"
}

```

UserMe

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|none|
|email|string|true|none|none|
|surname|string|true|none|none|
|name|string|true|none|none|

<h2 id="tocS_UserToken">UserToken</h2>
<!-- backwards compatibility -->
<a id="schemausertoken"></a>
<a id="schema_UserToken"></a>
<a id="tocSusertoken"></a>
<a id="tocsusertoken"></a>

```json
{
  "access_token": "string"
}

```

UserToken

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|access_token|string|true|none|none|

<h2 id="tocS_ValidationError">ValidationError</h2>
<!-- backwards compatibility -->
<a id="schemavalidationerror"></a>
<a id="schema_ValidationError"></a>
<a id="tocSvalidationerror"></a>
<a id="tocsvalidationerror"></a>

```json
{
  "loc": [
    "string"
  ],
  "msg": "string",
  "type": "string"
}

```

ValidationError

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|loc|[anyOf]|true|none|none|

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|string|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» *anonymous*|integer|false|none|none|

continued

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|msg|string|true|none|none|
|type|string|true|none|none|

<h2 id="tocS_inputData">inputData</h2>
<!-- backwards compatibility -->
<a id="schemainputdata"></a>
<a id="schema_inputData"></a>
<a id="tocSinputdata"></a>
<a id="tocsinputdata"></a>

```json
{
  "id": "string",
  "name": "string",
  "inputType": "text",
  "type": "string",
  "required": false,
  "data": []
}

```

inputData

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|true|none|none|
|name|string|true|none|none|
|inputType|[DataConfigurationType](#schemadataconfigurationtype)|true|none|none|
|type|string|true|none|none|
|required|boolean|true|none|none|
|data|[string]|true|none|none|

<h2 id="tocS_outputData">outputData</h2>
<!-- backwards compatibility -->
<a id="schemaoutputdata"></a>
<a id="schema_outputData"></a>
<a id="tocSoutputdata"></a>
<a id="tocsoutputdata"></a>

```json
{
  "id": "string",
  "name": "string",
  "type": "string"
}

```

outputData

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|true|none|none|
|name|string|true|none|none|
|type|string|true|none|none|

