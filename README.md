[![Pixaven](media/readme-header.png "Pixaven: GPU-powered Image Processing Platform")](https://www.pixaven.com)

<p align="center">
Pixaven is a modern, GPU-powered image processing API.<br>We transform, enhance, adjust, crop, stylize, filter and watermark your images with blazing speed.
</p>

---
<p align="center">
<strong>The official Node integration for the Pixaven API.</strong><br>
<br>
<img src="https://img.shields.io/npm/v/pixaven?style=flat&color=success"/>
<img src="https://img.shields.io/node/v/pixaven?style=flat&color=success"/>
<img src="https://img.shields.io/snyk/vulnerabilities/npm/pixaven?style=flat&color=success"/>
<img src="https://img.shields.io/npm/l/bull?style=flat&color=success"/>
<img src="https://img.shields.io/github/issues-raw/pixaven/pixaven-node?style=flat&color=success"/>
<img src="https://img.shields.io/twitter/follow/pixaven?label=Follow%20Us&style=flat&color=success&logo=twitter"/>
</p>

---

### Documentation
See the [Pixaven API docs](https://docs.pixaven.com/).


### Installation
```bash
$ npm install pixaven --save
```

### Quick examples
Pixaven API enables you to provide your images for processing in two ways - by uploading them directly to the API ([Image Upload](https://docs.pixaven.com/requests/image-upload)) or by providing a publicly available image URL ([Image Fetch](https://docs.pixaven.com/requests/image-fetch)).

You may also choose your preferred [response method](https://docs.pixaven.com/introduction#choosing-response-method-and-format) on a per-request basis. By default, the Pixaven API will return a [JSON response](https://docs.pixaven.com/responses/json-response-format) consisting of rich metadata pertaining to input and output images. Additonally, you can use [binary responses](https://docs.pixaven.com/responses/binary-responses). When enabled, the API will respond with a full binary representation of the resulting (output) image. This Node module exposes two convenience methods for interacting with binary responses - `.toFile()` and `.toBuffer()`.

#### Image upload
Here is a quick example of uploading a local file for processing. It calls `.toJSON()` at a final step and instructs the API to return a JSON response.

```js
const Pixaven = require("pixaven");

// Specify your Pixaven API Key in the constructor
const pix = new Pixaven("your-api-key");

// Upload an image from disk, resize it to 100 x 75,
// automatically enhance, and adjust sharpness parameter
pix
    .upload("path/to/input.jpg")
    .resize({
        width: 100,
        height: 75
    })
    .auto({
        enhance: true
    })
    .adjust({
        unsharp: 10
    })
    .toJSON((err, meta) => {
        if (err) {
            return console.log(err);
        }

        // You'll find the full JSON metadata within the `meta` object
        if (meta.success) {
            console.log(meta.output.url);
        } else {
            console.log(meta.message);
        }
    });
```

#### Image fetch
If you already have your source visuals publicly available online, we recommend using Image Fetch by default. That way you only have to send a JSON payload containing image URL and processing steps. This method is also much faster than uploading a full binary representation of the image.

```js
const Pixaven = require("pixaven");

// Specify your Pixaven API Key in the constructor
const pix = new Pixaven("your-api-key");

// Provide a publicly available image URL with `.fetch()` method,
// apply Gaussian blur using PNG as the output format.
// We'll also use `.toFile()` method and stream the output image to disk
pix
    .fetch("https://www.website.com/image.jpg")
    .filter({
        blur: {
            mode: "gaussian",
            value: 10
        }
    })
    .output({
        format: "png"
    })
    .toFile("path/to/output.jpg", (err, meta) => {
        if (err) {
            return console.log(err);
        }

        // You'll find the full JSON metadata within the `meta` object
        if (meta.success) {
            console.log(meta.output.url);
        } else {
            console.log(meta.message);
        }
    });
```

### License
This software is distributed under the MIT License. See the [LICENSE](LICENSE) file for more information.

<p align="center"><br><br><a href="https://www.pixaven.com"><img src="media/logo-mono-light.png" alt="Pixaven" width="165" height="42"/></a></p>