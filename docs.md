<a name="module_EnsightenAPI"></a>

## EnsightenAPI
Library for making requests to the ensighten API

**Author:** Rob Barns-Graham <rob.barns-graham@hearst.co.uk>  

* [EnsightenAPI](#module_EnsightenAPI)
    * [~authenticate(auth)](#module_EnsightenAPI..authenticate) ⇒ <code>Promise</code>
    * [~get(space, deployment)](#module_EnsightenAPI..get) ⇒ <code>Promise</code>
    * [~update(space, deployment, data)](#module_EnsightenAPI..update) ⇒ <code>Promise</code>

<a name="module_EnsightenAPI..authenticate"></a>

### EnsightenAPI~authenticate(auth) ⇒ <code>Promise</code>
Authenticate request

**Kind**: inner method of <code>[EnsightenAPI](#module_EnsightenAPI)</code>  
**Returns**: <code>Promise</code> - Resolves with access token, rejects with error message  

| Param | Type | Description |
| --- | --- | --- |
| auth | <code>String</code> | Base64 encoded authentication details 'mycompany:joe:mypassword' |

<a name="module_EnsightenAPI..get"></a>

### EnsightenAPI~get(space, deployment) ⇒ <code>Promise</code>
Get a deployment

**Kind**: inner method of <code>[EnsightenAPI](#module_EnsightenAPI)</code>  
**Returns**: <code>Promise</code> - Resolves with JSON object of deployment data, rejects with error message.  

| Param | Type | Description |
| --- | --- | --- |
| space | <code>Number</code> | Space ID |
| deployment | <code>Number</code> | Deployment ID |

<a name="module_EnsightenAPI..update"></a>

### EnsightenAPI~update(space, deployment, data) ⇒ <code>Promise</code>
Update a deployment

**Kind**: inner method of <code>[EnsightenAPI](#module_EnsightenAPI)</code>  
**Returns**: <code>Promise</code> - Resolves with status code, rejects with error message.  

| Param | Type | Description |
| --- | --- | --- |
| space | <code>Number</code> | Space ID |
| deployment | <code>Number</code> | Deployment ID |
| data | <code>Object</code> | Updated Ensighten deployment object |

