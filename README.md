# img-editor-api

Express js app for `img-editor` lib

This api exposes `addFrame` function of `img-editor` lib

## Example

File field name is: `file`

```bash
curl --location --request POST 'http://<domain-name>/api/frame' \
--form 'file=@"/test.jpg"'
```

Returns a `json` that contains the edited image as a buffer

```json
{
  "result": {
    "data": [
      {
        "type": "Buffer",
        "data": [
          /* img buffer */
        ]
      }
    ],
    "successful": 1,
    "failed": 0,
    "errors": []
  }
}
```

```js
//...
const result = await addFrameApi(); // the api call

fs.writeFile("OutputImage.png", result.data[0]);
```
