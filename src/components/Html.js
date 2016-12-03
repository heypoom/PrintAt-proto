import React, {PropTypes} from "react"

import {SEGMENT_API_KEY} from "../constants"
import {IS_PROD} from "../constants/util"

function Html({title, description, style, script, vendors, children, state}) {
  return (
    <html className="no-js" lang="">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />

        <title>{title}</title>

        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />

        <meta name="description" ontent={description} />
        <meta name="keywords" content="" />

        <meta name="author" content="" />
        <meta name="copyright" content="" />
        <meta name="application-name" content="FlipED" />

        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="" />
        <meta property="og:url" content="" />
        <meta property="og:description" content={description} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="" />
        <meta name="twitter:description" content="" />
        <meta name="twitter:image" content="" />
        <link rel="stylesheet" href="/css/grid.css" />
        <style id="css" dangerouslySetInnerHTML={{__html: style}} />
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{__html: children}} />
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
        <link rel="stylesheet" href="/css/sweetalert.css" />
        {vendors && <script id="vendors" src={vendors} />}
        {script && <script id="source" src={script} data-initial-state={JSON.stringify(state)} />}
      </body>
    </html>
  )
}

Html.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
  script: PropTypes.string,
  children: PropTypes.string,
  state: PropTypes.object.isRequired
}

export default Html
