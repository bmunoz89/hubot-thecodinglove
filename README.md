[![npm version](https://badge.fury.io/js/hubot-thecodinglove.svg)](https://badge.fury.io/js/hubot-thecodinglove)
[![Downloads](https://img.shields.io/npm/dt/hubot-thecodinglove.svg)](https://www.npmjs.com/package/hubot-thecodinglove)
[![Build Status](https://travis-ci.org/bmunoz89/hubot-thecodinglove.svg?branch=master)](https://travis-ci.org/bmunoz89/hubot-thecodinglove)
[![dependency status](https://david-dm.org/bmunoz89/hubot-thecodinglove.svg)](https://david-dm.org/bmunoz89/hubot-thecodinglove)
[![devDependency status](https://david-dm.org/bmunoz89/hubot-thecodinglove/dev-status.svg)](https://david-dm.org/bmunoz89/hubot-thecodinglove)

[![NPM](https://nodei.co/npm/hubot-thecodinglove.png)](https://npmjs.org/package/hubot-thecodinglove)

# hubot-thecodinglove

Display meme from \"The coding love <http://thecodinglove.com>\"

See [`index.js`](index.js) for full documentation.

## Installation

In hubot project repo, run:

`npm install hubot-thecodinglove --save`

Then add **hubot-thecodinglove** to your `external-scripts.json`:

```json
[
  "hubot-thecodinglove"
]
```

## Sample Interaction

```
user>> hubot codinglove
hubot>> Searching in thecodinglove...
hubot>> How my boss thinks software development works…
hubot>> http://tclhost.com/4UPe44O.gif
```

## Configuration

Set environment variables like these examples below.

Default:

```bash
export HUBOT_CODINGLOVE_SEARCH_TEXT="Searching text"
export HUBOT_CODINGLOVE_ERROR_TEXT="thecodinglove.com"
export HUBOT_CODINGLOVE_ERROR_IMG="http://tclhost.com/cn91mK3.gif"
export HUBOT_CODING_LOVE_SUCCESS_TEMPLATE=">{text}\n{image_src}"
export HUBOT_CODING_LOVE_ERROR_TEMPLATE=">{text}\n{image_src}"
```

Or if you want to disable the searching text message use:

```bash
export HUBOT_CODINGLOVE_SEARCH_TEXT="disabled"
```

```
user>> hubot codinglove
hubot>> How my boss thinks software development works…
hubot>> http://tclhost.com/4UPe44O.gif
```

You can also customize texts:

```bash
export HUBOT_CODINGLOVE_SEARCH_TEXT="disabled"
export HUBOT_CODINGLOVE_ERROR_TEXT="thecodinglove 💣😱"
export HUBOT_CODINGLOVE_ERROR_IMG="don't show this message"
export HUBOT_CODING_LOVE_ERROR_TEMPLATE="😧 {text}"
```

```
user>> hubot codinglove
hubot>> 😧 thecodinglove 💣😱
```

```bash
export HUBOT_CODINGLOVE_SEARCH_TEXT="disabled"
export HUBOT_CODING_LOVE_SUCCESS_TEMPLATE="codinglove: {text} {image_src}"
```

```
user>> hubot codinglove
hubot>> codinglove: How my boss thinks software development works… http://tclhost.com/4UPe44O.gif
```

## NPM Module

https://www.npmjs.com/package/hubot-thecodinglove
